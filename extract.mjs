import { readFile, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

// Resolve the installed dataforseo-mcp-server package (works on any machine).
const require = createRequire(import.meta.url);
import { existsSync, readdirSync } from 'node:fs';
function findPkg() {
  // 1. normal resolution (dev dependency / global)
  try { return path.dirname(require.resolve('dataforseo-mcp-server/package.json')); } catch {}
  // 2. npx cache(s)
  const npxRoot = path.join(process.env.HOME || '', '.npm/_npx');
  if (existsSync(npxRoot)) {
    for (const d of readdirSync(npxRoot)) {
      const cand = path.join(npxRoot, d, 'node_modules/dataforseo-mcp-server/package.json');
      if (existsSync(cand)) return path.dirname(cand);
    }
  }
  // 3. explicit override
  if (process.env.D4S_MCP_PKG && existsSync(process.env.D4S_MCP_PKG)) return process.env.D4S_MCP_PKG;
  return null;
}
const PKG = findPkg();
if (!PKG) {
  console.error('dataforseo-mcp-server not found. Install it first:');
  console.error('  npm install');
  console.error('  (or) set D4S_MCP_PKG=/path/to/dataforseo-mcp-server');
  process.exit(1);
}
const MODROOT = path.join(PKG, 'build/main/core/modules');
const sourcePkg = JSON.parse(await readFile(path.join(PKG, 'package.json'), 'utf8'));
const sourceVersion = `dataforseo-mcp-server@${sourcePkg.version}`;

// Discover tool files by content ("getName()" + "makeRequest("), not by name
// pattern, so we catch modules like ai-optimization whose tools aren't *.tool.js.
async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (e.name.endsWith('.js') && !e.name.endsWith('.map') && !e.name.endsWith('.module.js')) {
      const txt = await readFile(p, 'utf8');
      if (/\bgetName\s*\(/.test(txt) && /makeRequest\(/.test(txt) && !/class BaseTool/.test(txt)) out.push(p);
    }
  }
  return out;
}
const files = (await walk(MODROOT)).sort();

function unwrap(schema) {
  let s = schema, defaultValue = undefined, nullable = false;
  const optional = schema.isOptional();
  while (s._def && ['default','optional','nullable'].includes(s._def.type)) {
    if (s._def.type==='default') { if (defaultValue===undefined) defaultValue = s._def.defaultValue; s = s._def.innerType; }
    else s = s._def.innerType;
  }
  const core = s._def?.type || 'unknown';
  let elementType, enumValues;
  if (core === 'array' && s._def.element) elementType = unwrap(s._def.element).core;
  if (core === 'enum' && s._def.values) enumValues = s._def.values;
  return { coreType: core, defaultValue, nullable, optional, elementType, enumValues, description: (schema.description||'').trim().slice(0,500) };
}
function repr(m){
  if (m.defaultValue!==undefined && m.defaultValue!==null) return m.defaultValue;
  switch(m.coreType){case 'string':return 'TESTSTR';case 'boolean':return true;case 'number':return 1;
    case 'array':return [m.elementType==='number'?1:'TESTSTR'];case 'enum':return m.enumValues?.[0]??'TESTSTR';default:return 'TESTSTR';}
}

// parse path template from source: find makeRequest(`...`) and extract ${params.X} or ${X}
function parsePathTemplate(src){
  const m = src.match(/makeRequest\(\s*`([^`]+)`/);
  if (!m) return null;
  const tmpl = m[1];
  const vars = [...tmpl.matchAll(/\$\{(?:params\.)?([a-zA-Z_]\w*)\}/g)].map(x=>x[1]);
  if (!vars.length) return null;
  const template = tmpl.replace(/\$\{(?:params\.)?([a-zA-Z_]\w*)\}/g, (_,v)=>`{${v}}`);
  return { template, vars };
}

const registry = []; let capture=null;
const mock = { makeRequest(p,m,t){ capture={path:p,method:m,tasks:t}; throw new Error('mock'); } };

for (const f of files) {
  const rel = path.relative(MODROOT, f).replace(/(\.tool)?\.js$/,'');
  const mod = rel.split(path.sep)[0];
  const src = await readFile(f,'utf8');
  let mod2; try { mod2 = await import('file://'+f); } catch(e){ console.error('IMPORT FAIL',rel,e.message); continue; }
  const Cls = Object.values(mod2).find(v=>typeof v==='function' && v.prototype?.getName);
  if (!Cls){ console.error('NO CLASS', rel); continue; }
  let t; try { t = new Cls(mock); } catch(e){ console.error('CTOR',rel,e.message); continue; }
  const params = ((()=>{try{return t.getParams()||{}}catch(e){return{}}})());
  const paramList=[]; const repParams={};
  for (const [k,sch] of Object.entries(params)){ const meta=unwrap(sch); paramList.push({name:k,...meta}); repParams[k]=repr(meta); }
  capture=null; try{ await t.handle(repParams);}catch(e){}
  const ptmpl = parsePathTemplate(src);
  registry.push({
    name: t.getName(),
    title: t.getTitle?.() ?? t.getName(),
    description: t.getDescription(),
    module: mod,
    endpoint: capture?.path ?? null,
    method: capture?.method ?? 'POST',
    pathTemplate: ptmpl,                       // {template, vars} if templated
    params: paramList,
    payloadPassthrough: capture ? (capture.tasks && Object.keys(capture.tasks[0]||{}).length>=0) : false,
  });
}
console.log(JSON.stringify({count:registry.length, generatedAt:new Date().toISOString(), sourceVersion, tools:registry}, null, 2));
