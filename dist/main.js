#!/usr/bin/env node
var R={count:84,generatedAt:"2026-06-23T03:00:05.827Z",sourceVersion:"dataforseo-mcp-server@2.9.9",tools:[{name:"ai_opt_kw_data_loc_and_lang",title:"AI Optimization Keywords Data Locations and Languages",description:"Utility tool for 'AI Optimization Keyword Data Locations and Languages' (ai_opt_kw_data_loc_and_lang) to get list of availible locations and languages",module:"ai-optimization",endpoint:"/v3/ai_optimization/ai_keyword_data/locations_and_languages",method:"GET",pathTemplate:null,params:[],payloadPassthrough:null},{name:"ai_optimization_keyword_data_search_volume",title:"AI Optimization Keyword Data Search Volume",description:"This endpoint provides search volume data for your target keywords, reflecting their estimated usage in AI LLMs",module:"ai-optimization",endpoint:"/v3/ai_optimization/ai_keyword_data/keywords_search_volume/live",method:"POST",pathTemplate:null,params:[{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:"Keywords. The maximum number of keywords you can specify: 1000"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:"full name of the location, example: 'United Kingdom', 'United States'"},{name:"language_code",coreType:"string",nullable:!1,optional:!1,description:"Search engine language code (e.g., 'en')"}],payloadPassthrough:!0},{name:"ai_optimization_llm_mentions_filters",title:"AI Optimization LLM Mentions Filters",description:"This endpoint provides all the necessary information about filters that can be used with AI Optimization LLM Mentions API endpoints",module:"ai-optimization",endpoint:"/v3/ai_optimization/llm_mentions/available_filters",method:"GET",pathTemplate:null,params:[],payloadPassthrough:null},{name:"ai_opt_llm_ment_agg_metrics",title:"AI Optimization LLM Mentions Aggregated Metrics",description:"This endpoint provides aggregated metrics for mentions of the keywords or domains specified in the target array of the request.",module:"ai-optimization",endpoint:"/v3/ai_optimization/llm_mentions/aggregated_metrics/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"array",nullable:!1,optional:!1,description:"Array of target objects to search for LLM mentions. Each object must contain either 'domain' or 'keyword'. Maximum number of targets: 1000"},{name:"location_name",coreType:"string",nullable:!1,optional:!0,description:"full name of the location, example: 'United Kingdom', 'United States'"},{name:"language_code",coreType:"string",nullable:!1,optional:!0,description:"Search engine language code (e.g., 'en')"},{name:"platform",coreType:"enum",nullable:!1,optional:!0,description:"Platform to search for LLM mentions"},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Example:
  Single: ["ai_search_volume", ">", "1000"]
The full list of possible filters is available in 'ai_optimization_llm_mentions_fil`},{name:"internal_list_limit",coreType:"number",nullable:!1,optional:!0,description:"Internal parameter to limit the number of items processed. Not exposed to end-users."}],payloadPassthrough:!0},{name:"ai_opt_llm_ment_cross_agg_metrics",title:"AI Optimization LLM Mentions Cross Aggregated Metrics",description:"This endpoint provides aggregated metrics grouped by custom keys for mentions of the keywords or domains specified in the target array of the request",module:"ai-optimization",endpoint:"/v3/ai_optimization/llm_mentions/cross_aggregated_metrics/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:"array of objects containing target entities with aggregation keys. you can specify up to 10, but not less than 2"},{name:"location_name",coreType:"string",nullable:!1,optional:!0,description:"full name of the location, example: 'United Kingdom', 'United States'"},{name:"language_code",coreType:"string",nullable:!1,optional:!0,description:"Search engine language code (e.g., 'en')"},{name:"platform",coreType:"enum",nullable:!1,optional:!0,description:"Platform to search for LLM mentions"},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Example:
  Single: ["ai_search_volume", ">", "1000"]
The full list of possible filters is available in 'ai_optimization_llm_mentions_fil`},{name:"internal_list_limit",coreType:"number",nullable:!1,optional:!0,description:"Internal parameter to limit the number of items processed. Not exposed to end-users."}],payloadPassthrough:!0},{name:"ai_opt_llm_ment_search",title:"AI Optimization LLM Mentions Search",description:"This endpoint provides aggregated LLM mentions metrics grouped by the most frequently mentioned pages for the specified target",module:"ai-optimization",endpoint:"/v3/ai_optimization/llm_mentions/search/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"array",nullable:!1,optional:!1,description:"Array of target objects to search for LLM mentions. Each object must contain either 'domain' or 'keyword'. Maximum number of targets: 1000"},{name:"location_name",coreType:"string",nullable:!1,optional:!0,description:"full name of the location, example: 'United Kingdom', 'United States'"},{name:"language_code",coreType:"string",nullable:!1,optional:!0,description:"Search engine language code (e.g., 'en')"},{name:"platform",coreType:"enum",nullable:!1,optional:!0,description:"Platform to search for LLM mentions"},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Example:
  Single: ["ai_search_volume", ">", "1000"]
The full list of possible filters is available in 'ai_optimization_llm_mentions_fil`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`resuresults sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["ai_search_volume,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["ai_search_volume,desc"]
The ful`},{name:"limit",coreType:"number",nullable:!1,optional:!0,description:"Number of results to return. Default is 10, maximum is 1000."}],payloadPassthrough:!0},{name:"ai_opt_llm_ment_top_domains",title:"AI Optimization LLM Mentions Top Domains",description:"This endpoint provides aggregated LLM mentions metrics grouped by the most frequently mentioned domains for the specified target",module:"ai-optimization",endpoint:"/v3/ai_optimization/llm_mentions/top_domains/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"array",nullable:!1,optional:!1,description:"Array of target objects to search for LLM mentions. Each object must contain either 'domain' or 'keyword'. Maximum number of targets: 1000"},{name:"location_name",coreType:"string",nullable:!1,optional:!0,description:"full name of the location, example: 'United Kingdom', 'United States'"},{name:"language_code",coreType:"string",nullable:!1,optional:!0,description:"Search engine language code (e.g., 'en')"},{name:"platform",coreType:"enum",nullable:!1,optional:!0,description:"Platform to search for LLM mentions"},{name:"links_scope",coreType:"enum",nullable:!1,optional:!0,description:"specifies which links will be used to extract domains and aggregation"},{name:"initial_dataset_filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Example:
  Single: ["ai_search_volume", ">", "1000"]
The full list of possible filters is available in 'ai_optimization_llm_mentions_fil`},{name:"items_list_limit",coreType:"number",nullable:!1,optional:!0,description:"maximum number of results in the items array, min value is 1, max value is 10"},{name:"internal_list_limit",coreType:"number",nullable:!1,optional:!0,description:"maximum number of elements within internal arrays, min value is 1, max value is 10"}],payloadPassthrough:!0},{name:"ai_opt_llm_ment_top_pages",title:"AI Optimization LLM Mentions Top Pages",description:"This endpoint provides aggregated LLM mentions metrics grouped by the most frequently mentioned pages for the specified target",module:"ai-optimization",endpoint:"/v3/ai_optimization/llm_mentions/top_pages/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"array",nullable:!1,optional:!1,description:"Array of target objects to search for LLM mentions. Each object must contain either 'domain' or 'keyword'. Maximum number of targets: 1000"},{name:"location_name",coreType:"string",nullable:!1,optional:!0,description:"full name of the location, example: 'United Kingdom', 'United States'"},{name:"language_code",coreType:"string",nullable:!1,optional:!0,description:"Search engine language code (e.g., 'en')"},{name:"platform",coreType:"enum",nullable:!1,optional:!0,description:"Platform to search for LLM mentions"},{name:"links_scope",coreType:"enum",nullable:!1,optional:!0,description:"specifies which links will be used to extract domains and aggregation"},{name:"initial_dataset_filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Example:
  Single: ["ai_search_volume", ">", "1000"]
The full list of possible filters is available in 'ai_optimization_llm_mentions_fil`},{name:"items_list_limit",coreType:"number",nullable:!1,optional:!0,description:"maximum number of results in the items array, min value is 1, max value is 10"},{name:"internal_list_limit",coreType:"number",nullable:!1,optional:!0,description:"maximum number of elements within internal arrays, min value is 1, max value is 10"}],payloadPassthrough:!0},{name:"ai_opt_llm_ment_loc_and_lang",title:"AI Optimization LLM Mentions Locations and Languages",description:"Utility tool for 'AI Optimization LLM Mentions Locations and Languages' (ai_opt_llm_ment_loc_and_lang) to get list of available locations and languages",module:"ai-optimization",endpoint:"/v3/ai_optimization/llm_mentions/locations_and_languages",method:"GET",pathTemplate:null,params:[],payloadPassthrough:null},{name:"ai_optimization_chat_gpt_scraper_locations",title:"AI Optimization Chat GPT Scraper Locations",description:"Utility tool for ai_optimization_chat_gpt_scraper to get list of available locations",module:"ai-optimization",endpoint:"/v3/ai_optimization/chat_gpt/llm_scraper/locations",method:"POST",pathTemplate:null,params:[{name:"country_iso_code",coreType:"string",nullable:!1,optional:!0,description:"ISO 3166-1 alpha-2 country code, for example: US, GB, MT"},{name:"location_name",coreType:"string",nullable:!1,optional:!0,description:"Name of location or it`s part."}],payloadPassthrough:!0},{name:"ai_optimization_chat_gpt_scraper",title:"AI Optimization Chat GPT Scraper",description:"This endpoint provides results from ChatGPT searches",module:"ai-optimization",endpoint:"/v3/ai_optimization/chat_gpt/llm_scraper/live/advanced",method:"POST",pathTemplate:null,params:[{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:`keyword
required field
you can specify up to 2000 characters in the keyword field
all %## will be decoded (plus character ‘+’ will be decoded to a space character)
if you need to use the “%” character for your keyword, please specify it as “%25”;
if you need to use the “+” character for your keyword, please specify it as “%2B”`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:"full name of the location, example: 'United Kingdom', 'United States'"},{name:"language_code",coreType:"string",nullable:!1,optional:!1,description:"Search engine language code (e.g., 'en')"},{name:"force_web_search",coreType:"boolean",nullable:!1,optional:!0,description:"force AI agent to use web search"}],payloadPassthrough:!0},{name:"ai_optimization_llm_models",title:"AI Optimization LLM Models",description:"Utility tool for ai_optimization_llm_response to get list of availible locations and languages",module:"ai-optimization",endpoint:"/v3/ai_optimization/TESTSTR/llm_responses/models",method:"GET",pathTemplate:{template:"/v3/ai_optimization/{llm_type}/llm_responses/models",vars:["llm_type"]},params:[{name:"llm_type",coreType:"string",nullable:!1,optional:!1,description:"type of llm. Must be one of: 'claude', 'gemini', 'chat_gpt', 'perplexity'"}],payloadPassthrough:null},{name:"ai_optimization_llm_response",title:"AI Optimization LLM Response",description:"This endpoint allows you to retrieve structured responses from a specific AI model, based on the input parameters",module:"ai-optimization",endpoint:"/v3/ai_optimization/TESTSTR/llm_responses/live",method:"POST",pathTemplate:{template:"/v3/ai_optimization/{llm_type}/llm_responses/live",vars:["llm_type"]},params:[{name:"llm_type",coreType:"string",nullable:!1,optional:!1,description:"type of llm. Must be one of: 'claude', 'gemini', 'chat_gpt', 'perplexity'"},{name:"user_prompt",coreType:"string",nullable:!1,optional:!1,description:"Prompt for the AI model. The question or task you want to send to the AI model. You can specify up to 500 characters in the user_prompt field"},{name:"model_name",coreType:"string",nullable:!1,optional:!1,description:"name of the AI model. consists of the actual model name and version name. if not sure which model to use, first call the ai_optimization_llm_models tool to get list of available models for the specified llm_type"},{name:"temperature",coreType:"number",nullable:!1,optional:!0,description:"randomness of the AI response optional field higher values make output more diverse; lower values make output more focused;"},{name:"top_p",coreType:"number",nullable:!1,optional:!0,description:"diversity of the AI response, optional field, controls diversity of the response by limiting token selection;"},{name:"web_search",coreType:"boolean",nullable:!1,optional:!0,description:"enable web search for current information. When enabled, the AI model can access and cite current web information;"}],payloadPassthrough:!0},{name:"backlinks_anchors",title:"Backlinks Anchors",description:"This endpoint will provide you with a detailed overview of anchors used when linking to the specified website with relevant backlink data for each of them",module:"backlinks",endpoint:"/v3/backlinks/anchors/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned anchors"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned anchors
optional field
default value: 0
if you specify the 10 value, the first ten anchors in the results array will be omitted and the data will be provided for the successive anchors`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: =, <>, in, not_in, like, not_like, ilike, not_ilike, regex, not_regex, match, not_match
Use % with like/not_like to match any string of zero or more characters.
Examples:
  Single: ["rank",">","80"]
  Combined: [["page_from_rank",">","55"],"and",["dofollow","=",true]]`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["rank,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["domain_from_rank,desc","page_from_rank,asc"]`}],payloadPassthrough:!0},{name:"backlinks_backlinks",title:"Backlinks Backlinks",description:"This endpoint will provide you with a list of backlinks and relevant data for the specified domain, subdomain, or webpage",module:"backlinks",endpoint:"/v3/backlinks/backlinks/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"mode",coreType:"string",defaultValue:"as_is",nullable:!1,optional:!0,description:`results grouping type
optional field
possible grouping types:
as_is – returns all backlinks
one_per_domain – returns one backlink per domain
one_per_anchor – returns one backlink per anchor
default value: as_is`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned backlinks"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of the returned backlinks
optional field
default value: 0
if you specify the 10 value, the first ten backlinks in the results array will be omitted and the data will be provided for the successive backlinks`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: =, <>, in, not_in, like, not_like, ilike, not_ilike, regex, not_regex, match, not_match
Use % with like/not_like to match any string of zero or more characters.
Examples:
  Single: ["rank",">","80"]
  Combined: [["page_from_rank",">","55"],"and",["dofollow","=",true]]`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["rank,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["domain_from_rank,desc","page_from_rank,asc"]`}],payloadPassthrough:!0},{name:"backlinks_bulk_backlinks",title:"Backlinks Bulk Backlinks",description:`This endpoint will provide you with the number of backlinks pointing to domains, subdomains, and pages specified in the targets array. The returned numbers correspond to all live backlinks, that is, total number of referring links with all attributes (e.g., nofollow, noreferrer, ugc, sponsored etc) that were found during the latest check.
Note that if you indicate a domain as a target, you will get results for the root domain (domain with all of its subdomains), e.g. dataforseo.com and app.dataforseo.com`,module:"backlinks",endpoint:"/v3/backlinks/bulk_backlinks/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`domains, subdomains or webpages to get rank for
required field
you can set up to 1000 domains, subdomains or webpages
the domain or subdomain should be specified without https:// and www.
the page should be specified with absolute URL (including http:// or https://)
example:
"targets": [
"forbes.com",
"cnn.com",
"bbc.com",
"yelp.com",
"https://www.apple.com/iphone/",
"https://ahrefs.com/blog/",
"ibm.com",
"https://variety.com/",
"https://stackoverflow.com/",
"www.trustpilot.com"
]`}],payloadPassthrough:!0},{name:"backlinks_bulk_new_lost_backlinks",title:"Backlinks Bulk New Lost Backlinks",description:`This endpoint will provide you with the number of referring domains pointing to domains, subdomains, and pages specified in the targets array. The returned numbers are based on all live referring domains, that is, total number of domains pointing to the target with any type of backlinks (e.g., nofollow, noreferrer, ugc, sponsored etc) that were found during the latest check.
Note that if you indicate a domain as a target, you will get result for the root domain (domain with all of its subdomains), e.g. dataforseo.com and app.dataforseo.com`,module:"backlinks",endpoint:"/v3/backlinks/bulk_new_lost_backlinks/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`domains, subdomains or webpages to get rank for
required field
you can set up to 1000 domains, subdomains or webpages
the domain or subdomain should be specified without https:// and www.
the page should be specified with absolute URL (including http:// or https://)
example:
"targets": [
"forbes.com",
"cnn.com",
"bbc.com",
"yelp.com",
"https://www.apple.com/iphone/",
"https://ahrefs.com/blog/",
"ibm.com",
"https://variety.com/",
"https://stackoverflow.com/",
"www.trustpilot.com"
]`},{name:"date_from",coreType:"string",nullable:!1,optional:!0,description:`starting date of the time range
optional field
this field indicates the date which will be used as a threshold for new and lost backlinks;
the backlinks that appeared in our index after the specified date will be considered as new;
the backlinks that weren’t found after the specified date, but were present before, will be considered as lost;
default value: today’s date -(minus) one month;
e.g. if today is 2021-10-13, default date_from will be 2021-09-13.
minimum value equals today’s date -(minus`}],payloadPassthrough:!0},{name:"backlinks_bulk_new_lost_referring_domains",title:"Backlinks Bulk New Lost Referring Domains",description:`This endpoint will provide you with the number of referring domains pointing to the domains, subdomains and pages specified in the targets array.
Note that if you indicate a domain as a target, you will get result for the root domain (domain with all of its subdomains), e.g. dataforseo.com and app.dataforseo.com`,module:"backlinks",endpoint:"/v3/backlinks/bulk_new_lost_referring_domains/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`domains, subdomains or webpages to get rank for
required field
you can set up to 1000 domains, subdomains or webpages
the domain or subdomain should be specified without https:// and www.
the page should be specified with absolute URL (including http:// or https://)
example:
"targets": [
"forbes.com",
"cnn.com",
"bbc.com",
"yelp.com",
"https://www.apple.com/iphone/",
"https://ahrefs.com/blog/",
"ibm.com",
"https://variety.com/",
"https://stackoverflow.com/",
"www.trustpilot.com"
]`},{name:"date_from",coreType:"string",nullable:!1,optional:!0,description:`starting date of the time range
optional field
this field indicates the date which will be used as a threshold for new and lost backlinks;
the backlinks that appeared in our index after the specified date will be considered as new;
the backlinks that weren’t found after the specified date, but were present before, will be considered as lost;
default value: today’s date -(minus) one month;
e.g. if today is 2021-10-13, default date_from will be 2021-09-13.
minimum value equals today’s date -(minus`}],payloadPassthrough:!0},{name:"backlinks_bulk_pages_summary",title:"Backlinks Bulk Pages Summary",description:"This endpoint will provide you with a comprehensive overview of backlinks and related data for a bulk of up to 1000 pages, domains, or subdomains. If you indicate a single page as a target, you will get comprehensive summary data on all backlinks for that page.",module:"backlinks",endpoint:"/v3/backlinks/bulk_pages_summary/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`domains, subdomains or webpages to get summary data for
required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)
you can specify up to 1000 pages, domains, or subdomains in each request.
note that the URLs you set in a single request cannot belong to more than 100 different domains.`},{name:"include_subdomains",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"backlinks_bulk_ranks",title:"Backlinks Bulk Ranks",description:"This endpoint will provide you with rank scores of the domains, subdomains, and pages specified in the targets array. The score is based on the number of referring domains pointing to the specified domains, subdomains, or pages. The rank values represent real-time data for the date of the request and range from 0 (no backlinks detected) to 1,000 (highest rank). A similar scoring system is used in Google’s Page Rank algorithm",module:"backlinks",endpoint:"/v3/backlinks/bulk_ranks/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`domains, subdomains or webpages to get rank for
required field
you can set up to 1000 domains, subdomains or webpages
the domain or subdomain should be specified without https:// and www.
the page should be specified with absolute URL (including http:// or https://)
example:
"targets": [
"forbes.com",
"cnn.com",
"bbc.com",
"yelp.com",
"https://www.apple.com/iphone/",
"https://ahrefs.com/blog/",
"ibm.com",
"https://variety.com/",
"https://stackoverflow.com/",
"www.trustpilot.com"
]`},{name:"rank_scale",coreType:"string",defaultValue:"one_thousand",nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"backlinks_bulk_referring_domains",title:"Backlinks Bulk Referring Domains",description:`This endpoint will provide you with the number of referring domains pointing to domains, subdomains, and pages specified in the targets array. The returned numbers are based on all live referring domains, that is, total number of domains pointing to the target with any type of backlinks (e.g., nofollow, noreferrer, ugc, sponsored etc) that were found during the latest check.
Note that if you indicate a domain as a target, you will get result for the root domain (domain with all of its subdomains), e.g. dataforseo.com and app.dataforseo.com`,module:"backlinks",endpoint:"/v3/backlinks/bulk_referring_domains/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`domains, subdomains or webpages to get rank for
required field
you can set up to 1000 domains, subdomains or webpages
the domain or subdomain should be specified without https:// and www.
the page should be specified with absolute URL (including http:// or https://)
example:
"targets": [
"forbes.com",
"cnn.com",
"bbc.com",
"yelp.com",
"https://www.apple.com/iphone/",
"https://ahrefs.com/blog/",
"ibm.com",
"https://variety.com/",
"https://stackoverflow.com/",
"www.trustpilot.com"
]`}],payloadPassthrough:!0},{name:"backlinks_bulk_spam_score",title:"Backlinks Bulk Spam Score",description:"This endpoint will provide you with spam scores of the domains, subdomains, and pages you specified in the targets array. Spam Score is DataForSEO’s proprietary metric that indicates how “spammy” your target is on a scale from 0 to 100",module:"backlinks",endpoint:"/v3/backlinks/bulk_spam_score/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`domains, subdomains or webpages to get rank for
required field
you can set up to 1000 domains, subdomains or webpages
the domain or subdomain should be specified without https:// and www.
the page should be specified with absolute URL (including http:// or https://)
example:
"targets": [
"forbes.com",
"cnn.com",
"bbc.com",
"yelp.com",
"https://www.apple.com/iphone/",
"https://ahrefs.com/blog/",
"ibm.com",
"https://variety.com/",
"https://stackoverflow.com/",
"www.trustpilot.com"
]`}],payloadPassthrough:!0},{name:"backlinks_competitors",title:"Backlinks Competitors",description:"This endpoint will provide you with a list of competitors that share some part of the backlink profile with a target website, along with a number of backlink intersections and the rank of every competing website",module:"backlinks",endpoint:"/v3/backlinks/competitors/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned domains"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned networks
optional field
default value: 0
if you specify the 10 value, the first ten domains in the results array will be omitted and the data will be provided for the successive pages`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, =, <>, in, not_in, like, not_like, ilike, not_ilike, match, not_match
Use % with like/not_like to match any string of zero or more characters.
Examples:
  Single: ["rank",">","100"]
  Combined: [["target","like","%forbes%"],"and",[["rank",">","100"],"or",["intersections",">",`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["rank,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["intersections,desc","rank,asc"]`},{name:"main_domain",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:""},{name:"exclude_large_domains",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:""},{name:"exclude_internal_backlinks",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"backlinks_domain_intersection",title:"Backlinks Domain Intersection",description:"This endpoint will provide you with the list of domains pointing to the specified websites. This endpoint is especially useful for creating a Link Gap feature that shows what domains link to your competitors but do not link out to your website",module:"backlinks",endpoint:"/v3/backlinks/domain_intersection/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`domains, subdomains or webpages to get links for
required field
you can set up to 20 domains, subdomains or webpages
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"exclude_targets",coreType:"array",nullable:!1,optional:!0,description:`domains, subdomains or webpages you want to exclude
optional field
you can specify up to 10 domains, subdomains or webpages
if you use this array, results will contain the referring domains that link to targets but don't link to exclude_targets
example: ["bbc.com","https://www.apple.com/iphone/*","https://dataforseo.com/apis/*"]`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned results"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the array of returned results
optional field
default value: 0
if you specify the 10 value, the first ten backlinks in the results array will be omitted and the data will be provided for the successive backlinks`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, =, <>, in, not_in, like, not_like, ilike, not_ilike, match, not_match
Use % with like/not_like to match any string of zero or more characters.
Examples:
  Single: ["1.internal_links_count",">","1"]
  Combined: [["2.referring_pages",">","2"],"and",["1.backlinks",">","10"]]`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["backlinks,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["backlinks,desc","rank,asc"]`}],payloadPassthrough:!0},{name:"backlinks_domain_pages_summary",title:"Backlinks Domain Pages Summary",description:"This endpoint will provide you with detailed summary data on all backlinks and related metrics for each page of the target domain or subdomain you specify. If you indicate a single page as a target, you will get comprehensive summary data on all backlinks for that page",module:"backlinks",endpoint:"/v3/backlinks/domain_pages_summary/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned anchors"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned anchors
optional field
default value: 0
if you specify the 10 value, the first ten anchors in the results array will be omitted and the data will be provided for the successive anchors`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, =, <>, in, not_in, like, not_like, ilike, not_ilike, match, not_match
Use % with like/not_like to match any string of zero or more characters.
Examples:
  Single: ["referring_links_types.anchors",">","1"]
  Combined: [["broken_pages",">","2"],"and",["backlinks",">","10"]]`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["backlinks,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["backlinks,desc","rank,asc"]`}],payloadPassthrough:!0},{name:"backlinks_domain_pages",title:"Backlinks Domain Pages",description:"This endpoint will provide you with a detailed overview of domain pages with backlink data for each page",module:"backlinks",endpoint:"/v3/backlinks/domain_pages/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned pages"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned pages
optional field
default value: 0
if you specify the 10 value, the first ten pages in the results array will be omitted and the data will be provided for the successive pages`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, =, <>, in, not_in, like, not_like, ilike, not_ilike, match, not_match
Use % with like/not_like to match any string of zero or more characters.
Examples:
  Single: ["meta.internal_links_count",">","1"]
  Combined: [["meta.external_links_count",">","2"],"and",["backlinks",">","`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["page_summary.backlinks,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["page_summary.backlinks,desc",`}],payloadPassthrough:!0},{name:"backlinks_available_filters",title:"Backlinks Available Filters",description:`Here you will find all the necessary information about filters that can be used with DataForSEO Backlinks API endpoints.

Please, keep in mind that filters are associated with a certain object in the result array, and should be specified accordingly.`,module:"backlinks",endpoint:"/v3/backlinks/available_filters",method:"GET",pathTemplate:null,params:[{name:"tool",coreType:"string",nullable:!1,optional:!0,description:"The name of the tool to get filters for"}],payloadPassthrough:null},{name:"backlinks_page_intersection",title:"Backlinks Page Intersection",description:"This endpoint will provide you with the list of domains pointing to the specified websites. This endpoint is especially useful for creating a Link Gap feature that shows what domains link to your competitors but do not link out to your website",module:"backlinks",endpoint:"/v3/backlinks/page_intersection/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`domains, subdomains or webpages to get links for
required field
you can set up to 20 domains, subdomains or webpages
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned results"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the array of returned results
optional field
default value: 0
if you specify the 10 value, the first ten backlinks in the results array will be omitted and the data will be provided for the successive backlinks`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, =, <>, in, not_in, like, not_like, ilike, not_ilike, match, not_match
Use % with like/not_like to match any string of zero or more characters.
Examples:
  Single: ["1.rank",">","80"]
  Combined: [["2.page_from_rank",">","55"],"and",["1.original","=","true"]]`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["rank,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["domain_from_rank,desc","page_from_rank,asc"]`}],payloadPassthrough:!0},{name:"backlinks_referring_domains",title:"Backlinks Referring Domains",description:"This endpoint will provide you with a detailed overview of referring domains pointing to the target you specify",module:"backlinks",endpoint:"/v3/backlinks/referring_domains/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned pages"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned pages
optional field
default value: 0
if you specify the 10 value, the first ten pages in the results array will be omitted and the data will be provided for the successive pages`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, =, <>, in, not_in, like, not_like, ilike, not_ilike, match, not_match
Use % with like/not_like to match any string of zero or more characters.
Examples:
  Single: ["meta.internal_links_count",">","1"]
  Combined: [["meta.external_links_count",">","2"],"and",["backlinks",">","`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["page_summary.backlinks,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["page_summary.backlinks,desc",`}],payloadPassthrough:!0},{name:"backlinks_referring_networks",title:"Backlinks Referring Networks",description:"This endpoint will provide you with a detailed overview of referring domains pointing to the target you specify",module:"backlinks",endpoint:"/v3/backlinks/referring_networks/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"network_address_type",coreType:"string",defaultValue:"ip",nullable:!1,optional:!0,description:`indicates the type of network to get data for
optional field
possible values: ip, subnet
default value: ip`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned networks"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned networks
optional field
default value: 0
if you specify the 10 value, the first ten domains in the results array will be omitted and the data will be provided for the successive pages`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, =, <>, in, not_in, like, not_like, ilike, not_ilike, match, not_match
Use % with like/not_like to match any string of zero or more characters.
Examples:
  Single: ["referring_pages",">","1"]
  Combined: [["referring_pages",">","2"],"and",["backlinks",">","10"]]`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["backlinks,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["backlinks,desc","rank,asc"]`}],payloadPassthrough:!0},{name:"backlinks_summary",title:"Backlinks Summary",description:"This endpoint will provide you with an overview of backlinks data available for a given domain, subdomain, or webpage",module:"backlinks",endpoint:"/v3/backlinks/summary/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain, subdomain or webpage to get backlinks for
        required field
a domain or a subdomain should be specified without https:// and www.
a page should be specified with absolute URL (including http:// or https://)`},{name:"include_subdomains",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:""},{name:"exclude_internal_backlinks",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"backlinks_timeseries_new_lost_summary",title:"Backlinks Timeseries New Lost Summary",description:`This endpoint will provide you with the number of new and lost backlinks and referring domains for the domain specified in the target field.
The results will be provided for a period between the two indicated dates, and metrics will be grouped by the time range that you define: day, week, month, or year.
Data from this endpoint will be especially helpful for building time-series graphs of new and lost backlinks and referring domains.

`,module:"backlinks",endpoint:"/v3/backlinks/timeseries_new_lost_summary/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain to get data for
required field
a domain should be specified without https:// and www.
example:
"forbes.com"`},{name:"date_from",coreType:"string",nullable:!1,optional:!0,description:""},{name:"date_to",coreType:"string",nullable:!1,optional:!0,description:""},{name:"group_range",coreType:"string",defaultValue:"month",nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"backlinks_timeseries_summary",title:"Backlinks Timeseries Summary",description:`This endpoint will provide you with an overview of backlink data for the target domain available during a period between the two indicated dates. Backlink metrics will be grouped by the time range that you define: day, week, month, or year.
Data from this endpoint will be especially helpful for building time-series graphs of daily, weekly, monthly, and yearly link-building progress`,module:"backlinks",endpoint:"/v3/backlinks/timeseries_summary/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain to get data for
required field
a domain should be specified without https:// and www.
example:
"forbes.com"`},{name:"date_from",coreType:"string",nullable:!1,optional:!0,description:""},{name:"date_to",coreType:"string",nullable:!1,optional:!0,description:""},{name:"group_range",coreType:"string",defaultValue:"month",nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"business_data_business_listings_filters",title:"Business Data Business Listings Filters",description:`Here you will find all the necessary information about filters that can be used with Business Data API business listings endpoints.

Please, keep in mind that filters are associated with a certain object in the result array, and should be specified accordingly.`,module:"business-data-api",endpoint:"/v3/business_data/business_listings/available_filters",method:"GET",pathTemplate:null,params:[{name:"tool",coreType:"string",nullable:!1,optional:!0,description:"The name of the tool to get filters for"}],payloadPassthrough:null},{name:"business_data_business_listings_search",title:"Business Data Business Listings Search",description:"Business Listings Search API provides results containing information about business entities listed on Google Maps in the specified categories. You will receive the address, contacts, rating, working hours, and other relevant data",module:"business-data-api",endpoint:"/v3/business_data/business_listings/search/live",method:"POST",pathTemplate:null,params:[{name:"description",coreType:"string",nullable:!1,optional:!0,description:`description of the element in SERP
optional field
the description of the business entity for which the results are collected;
can contain up to 200 characters`},{name:"title",coreType:"string",nullable:!1,optional:!0,description:`title of the element in SERP
optional field
the name of the business entity for which the results are collected;
can contain up to 200 characters`},{name:"categories",coreType:"array",nullable:!1,optional:!0,description:`business categories
the categories you specify are used to search for business listings;
if you don’t use this field, we will return business listings found in the specified location;
you can specify up to 10 categories`},{name:"location_coordinate",coreType:"string",nullable:!1,optional:!0,description:`GPS coordinates of a location
optional field
location_coordinate parameter should be specified in the “latitude,longitude,radius” format
the maximum number of decimal digits for “latitude” and “longitude”: 7
the value of “radius” is specified in kilometres (km)
the minimum value for “radius”: 1
the maximum value for “radius”: 100000
example:
53.476225,-2.243572,200`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned businesses"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned businesses
optional field
default value: 0
if you specify the 10 value, the first ten entities in the results array will be omitted and the data will be provided for the successive entities`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, like, not_like, match, not_match
Use % with like/not_like as a wildcard.
Example:
  Single: ["rating.value", ">", 3]`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting parameter
example:
["rating.value,desc"]note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["rating.value,desc","rating.votes_co`},{name:"is_claimed",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"content_analysis_phrase_trends",title:"Content Analysis Phrase Trends",description:"This endpoint will provide you with data on all citations of the target keyword for the indicated date range",module:"content-analysis",endpoint:"/v3/content_analysis/phrase_trends/live",method:"POST",pathTemplate:null,params:[{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:`target keyword
        Note: to match an exact phrase instead of a stand-alone keyword, use double quotes and backslashes;`},{name:"keyword_fields",coreType:"object",nullable:!1,optional:!0,description:`target keyword fields and target keywords
        use this parameter to filter the dataset by keywords that certain fields should contain;
        you can indicate several fields;
        Note: to match an exact phrase instead of a stand-alone keyword, use double quotes and backslashes;
        example:
        {
          "snippet": "\\"logitech mouse\\"",
          "main_title": "sale"
        }`},{name:"page_type",coreType:"array",nullable:!1,optional:!0,description:"target page types"},{name:"initial_dataset_filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based initial dataset filter expression applied to Search endpoint fields. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, like, not_like, has, has_not, match, not_match
Use % with like/not_like as a wildcard.
Examples:
  Single: ["domain", "<>", "logitech.com"]
  Combined: [["domain", "<>", "logitech.com"], "and",`},{name:"date_from",coreType:"string",nullable:!1,optional:!1,description:`starting date of the time range
        date format: "yyyy-mm-dd"`},{name:"date_to",coreType:"string",nullable:!1,optional:!0,description:""},{name:"date_group",coreType:"enum",defaultValue:"month",nullable:!1,optional:!0,description:""},{name:"internal_list_limit",coreType:"number",defaultValue:1,nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"content_analysis_search",title:"Content Analysis Search",description:"This endpoint will provide you with detailed citation data available for the target keyword",module:"content-analysis",endpoint:"/v3/content_analysis/search/live",method:"POST",pathTemplate:null,params:[{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:`target keyword
        Note: to match an exact phrase instead of a stand-alone keyword, use double quotes and backslashes;`},{name:"keyword_fields",coreType:"object",nullable:!1,optional:!0,description:`target keyword fields and target keywords
        use this parameter to filter the dataset by keywords that certain fields should contain;
        you can indicate several fields;
        Note: to match an exact phrase instead of a stand-alone keyword, use double quotes and backslashes;
        example:
        {
          "snippet": "\\"logitech mouse\\"",
          "main_title": "sale"
        }`},{name:"page_type",coreType:"array",nullable:!1,optional:!0,description:"target page types"},{name:"search_mode",coreType:"enum",nullable:!1,optional:!0,description:"results grouping type"},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"maximum number of results to return"},{name:"offset",coreType:"number",defaultValue:0,nullable:!1,optional:!0,description:"offset in the results array of returned keywords"},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, like, not_like, match, not_match
Use % with like/not_like as a wildcard.
Examples:
  Single: ["country", "=", "US"]
  Combined: [["domain_rank", ">", 800], "and", ["content_info.connotation_types.negative", ">", 0.9]]
  Nested: [["domain_rank"`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["content_info.sentiment_connotations.anger,desc"]
default rule:
["content_info.sentiment_connotations.anger,desc"]
note that you can set no more than three sorting rules in a single request
you should us`}],payloadPassthrough:!0},{name:"content_analysis_summary",title:"Content Analysis Summary",description:"This endpoint will provide you with an overview of citation data available for the target keyword",module:"content-analysis",endpoint:"/v3/content_analysis/summary/live",method:"POST",pathTemplate:null,params:[{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:`target keyword
        Note: to match an exact phrase instead of a stand-alone keyword, use double quotes and backslashes;`},{name:"keyword_fields",coreType:"object",nullable:!1,optional:!0,description:`target keyword fields and target keywords
        use this parameter to filter the dataset by keywords that certain fields should contain;
        you can indicate several fields;
        Note: to match an exact phrase instead of a stand-alone keyword, use double quotes and backslashes;
        example:
        {
          "snippet": "\\"logitech mouse\\"",
          "main_title": "sale"
        }`},{name:"page_type",coreType:"array",nullable:!1,optional:!0,description:"target page types"},{name:"initial_dataset_filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based initial dataset filter expression applied to Search endpoint fields. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, like, not_like, has, has_not, match, not_match
Use % with like/not_like as a wildcard.
Examples:
  Single: ["domain", "<>", "logitech.com"]
  Combined: [["domain", "<>", "logitech.com"], "and",`},{name:"positive_connotation_threshold",coreType:"number",defaultValue:0.4,nullable:!1,optional:!0,description:""},{name:"sentiments_connotation_threshold",coreType:"number",defaultValue:0.4,nullable:!1,optional:!0,description:""},{name:"internal_list_limit",coreType:"number",defaultValue:1,nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"dataforseo_labs_bulk_traffic_estimation",title:"DataForSEO Labs Bulk Traffic Estimation",description:"This endpoint will provide you with estimated monthly traffic volumes for up to 1,000 domains, subdomains, or webpages. Along with organic search traffic estimations, you will also get separate values for paid search, featured snippet, and local pack results.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/bulk_traffic_estimation/live",method:"POST",pathTemplate:null,params:[{name:"targets",coreType:"array",nullable:!1,optional:!1,description:`target domains, subdomains, and webpages.
        you can specify domains, subdomains, and webpages in this field;
domains and subdomains should be specified without https:// and www.;
pages should be specified with absolute URL, including https:// and www.;
you can set up to 1000 domains, subdomains or webpages`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"ignore_synonyms",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:"ignore highly similar keywords, if set to true, results will be more accurate"},{name:"item_types",coreType:"array",defaultValue:["organic"],nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"dataforseo_labs_google_competitors_domain",title:"DataForSEO Labs Google Competitors Domain",description:"This endpoint will provide you with a full overview of ranking and traffic data of the competitor domains from organic and paid search. In addition to that, you will get the metrics specific to the keywords both competitor domains and your domain rank for within the same SERP.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/competitors_domain/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:"target domain"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"ignore_synonyms",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:"ignore highly similar keywords, if set to true, results will be more accurate"},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["metrics.organic.count", ">", 50]
  Combined: [["metrics.organic.pos_1", "<>", 0], "and", ["metrics.organic.impress`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting parameter
default rule:
["relevance,desc"]
example:
["relevance,desc","keyword_info.search_volume,desc"]`},{name:"exclude_top_domains",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:`indicates whether to exclude world's largest websites
        optional field
        default value: false
        set to true if you want to get highly-relevant competitors excluding the top websites`},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"},{name:"item_types",coreType:"array",defaultValue:["organic"],nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"dataforseo_labs_google_domain_intersection",title:"DataForSEO Labs Google Domain Intersection",description:"This endpoint will provide you with the keywords for which both specified domains rank within the same SERP. You will get search volume, competition, cost-per-click and impressions data on each intersecting keyword. Along with that, you will get data on the first and second domain's SERP element discovered for this keyword, as well as the estimated traffic volume and cost of ad traffic.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/domain_intersection/live",method:"POST",pathTemplate:null,params:[{name:"target1",coreType:"string",nullable:!1,optional:!1,description:"target domain 1"},{name:"target2",coreType:"string",nullable:!1,optional:!1,description:"target domain 2"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"ignore_synonyms",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:"ignore highly similar keywords, if set to true, results will be more accurate"},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["keyword_data.keyword_info.search_volume", "in", [100, 1000]]
  Combined: [["first_domain_serp_element.etv", ">", 0`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting parameter
example:
["keyword_data.keyword_info.competition,desc"]
default rule:
["keyword_data.keyword_info.search_volume,desc"]
note that you can set no more than three sorting rules in a single request
you should use`},{name:"intersections",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:""},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"},{name:"item_types",coreType:"array",defaultValue:["organic"],nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"dataforseo_labs_google_domain_rank_overview",title:"DataForSEO Labs Google Domain Rank Overview",description:"This endpoint will provide you with ranking and traffic data from organic and paid search for the specified domain. You will be able to review the domain ranking distribution in SERPs as well as estimated monthly traffic volume for both organic and paid results.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/domain_rank_overview/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:"target domain"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"ignore_synonyms",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:"ignore highly similar keywords, if set to true, results will be more accurate"}],payloadPassthrough:!0},{name:"dataforseo_labs_google_historical_rank_overview",title:"DataForSEO Labs Google Historical Rank Overview",description:"This endpoint will provide you with historical data on rankings and traffic of the specified domain, such as domain ranking distribution in SERPs and estimated monthly traffic volume for both organic and paid results",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/historical_rank_overview/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:"target domain"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"ignore_synonyms",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:"ignore highly similar keywords, if set to true, results will be more accurate"},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"}],payloadPassthrough:!0},{name:"dataforseo_labs_google_historical_serps",title:"DataForSEO Labs Google Historical SERPs",description:"This endpoint will provide you with Google SERPs collected within the specified time frame. You will also receive a complete overview of featured snippets and other extra elements that were present within the specified dates. The data will allow you to analyze the dynamics of keyword rankings over time for the specified keyword and location.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/historical_serps/live",method:"POST",pathTemplate:null,params:[{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:"target keyword"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"date_from",coreType:"string",nullable:!1,optional:!0,description:"starting date of the time range, date format: YYYY-MM-DD"},{name:"date_to",coreType:"string",nullable:!1,optional:!0,description:"ending date of the time range, date format: YYYY-MM-DD"}],payloadPassthrough:!0},{name:"dataforseo_labs_google_page_intersection",title:"DataForSEO Labs Google Page Intersection",description:`This endpoint will provide you with the keywords for which specified pages rank within the same SERP. You will get search volume, competition, cost-per-click and impressions data on each intersecting keyword. Along with that, you will get data on SERP elements that specified pages rank for in search results, as well as the estimated traffic volume and cost of ad traffic. Page Intersection endpoint supports organic, paid, local pack and featured snippet results.

Find keywords several webpages rank for:
If you would like to get the keywords several pages rank for, you need to specify webpages only in the pages object. This way, you will receive intersected ranked keywords for the specified URLs.

Find keywords your competitors rank for but you do not:
If you would like to receive all keywords several pages rank for, but particular pages do not, you need to use the exclude_pages array as well. This way you will receive the keywords for which the URLs from the pages object rank for, but the URLs from the exclude_pages array do not`,module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/page_intersection/live",method:"POST",pathTemplate:null,params:[{name:"pages",coreType:"array",nullable:!1,optional:!1,description:`pages array
required field
you can set up to 20 pages in this object
the pages should be specified with absolute URLs (including http:// or https://)
if you specify a single page here, we will return results only for this page;
you can also use a wildcard ('*') character to specify the search pattern
example:
"example.com"
search for the exact URL
"example.com/eng/*"
search for the example.com page and all its related URLs which start with '/eng/', such as "example.com/eng/index.html" and "examp`},{name:"exclude_pages",coreType:"array",nullable:!1,optional:!0,description:`URLs of pages you want to exclude
optional field
you can set up to 10 pages in this array
if you use this array, results will contain the keywords for which URLs from the pages object rank, but URLs from exclude_pages array do not;
note that if you specify this field, the results will be based on the keywords any URL from pages ranks for regardless of intersections between them. However, you can set intersection_mode to intersect and results will contain the keywords all URLs from pages rank for`},{name:"intersection_mode",coreType:"enum",nullable:!1,optional:!0,description:`indicates whether to intersect keywords
optional field
use this field to intersect or merge results for the specified URLs
possible values: union, intersect

union – results are based on all keywords any URL from pages rank for;

intersect – results are based on the keywords all URLs from pages rank for in the same SERP:

by default, results are based on the intersect mode if you specify only pages array. If you specify exclude_pages as well, results are based on the union mode`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"ignore_synonyms",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:"ignore highly similar keywords, if set to true, results will be more accurate"},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["keyword_data.keyword_info.search_volume", "in", [100, 1000]]
  Combined: [["intersection_result.1.etv", ">", 0], "`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting parameter
example:
["keyword_data.keyword_info.competition,desc"]
default rule:
["keyword_data.keyword_info.search_volume,desc"]
note that you can set no more than three sorting rules in a single request
you should use`},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"},{name:"item_types",coreType:"array",defaultValue:["organic"],nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"dataforseo_labs_google_ranked_keywords",title:"DataForSEO Labs Google Ranked Keywords",description:"This endpoint will provide you with the list of keywords that any domain or webpage is ranking for. You will also get SERP elements related to the keyword position, as well as impressions, monthly searches and other data relevant to the returned keywords.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/ranked_keywords/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`domain name or page url
required field
the domain name of the target website or URL of the target webpage;
the domain name must be specified without https:// or www.;
the webpage URL must be specified with https:// or www.
Note: if you specify the webpage URL without https:// or www., the result will be returned for the entire domain rather than the specific page`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array of filter conditions and logical operators. Each filter condition is an array of [field, operator, value].
        Maximum 8 filters allowed.
        Available operators: =, <>, <, <=, >, >=, in, not_in, like, not_like, ilike, not_ilike, regex, not_regex, match, not_match
        Logical operators: "and", "or"
        Examples:
        Simple filter: [["ranked_serp_element.serp_item.rank_group","<=",10]]
        With logical operator: [["ranked_serp_element.serp_item.rank_group","<=",10],"`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["keyword_data.keyword_info.competition,desc"]
default rule:
["ranked_serp_element.serp_item.rank_group,asc"]
note that you can set no more than three sorting rules in a single request
you should use a co`},{name:"include_subdomains",coreType:"boolean",nullable:!1,optional:!0,description:"Include keywords from subdomains"},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"},{name:"item_types",coreType:"array",defaultValue:["organic"],nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"dataforseo_labs_google_relevant_pages",title:"DataForSEO Labs Google Relevant Pages",description:"This endpoint will provide you with rankings and traffic data for the web pages of the specified domain. You will be able to review each page’s ranking distribution and estimated monthly traffic volume from both organic and paid searches.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/relevant_pages/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:"target domain"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"ignore_synonyms",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:"ignore highly similar keywords, if set to true, results will be more accurate"},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
            optional field
            default value: 0
            if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["metrics.organic.count", ">", 50]
  Combined: [["metrics.organic.pos_1", "<>", 0], "and", ["metrics.organic.impress`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to specify a sorting type
example:
["metrics.paid.etv,asc"]
Note: you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["metrics.organic.etv,desc","metrics.paid`},{name:"exclude_top_domains",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:`indicates whether to exclude world’s largest websites
optional field
default value: false
set to true if you want to get highly-relevant competitors excluding the top websites`},{name:"item_types",coreType:"array",defaultValue:["organic"],nullable:!1,optional:!0,description:""},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"}],payloadPassthrough:!0},{name:"dataforseo_labs_google_serp_competitors",title:"DataForSEO Labs Google SERP Competitors",description:"This endpoint will provide you with a list of domains ranking for the keywords you specify. You will also get SERP rankings, rating, estimated traffic volume, and visibility values the provided domains gain from the specified keywords.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/serp_competitors/live",method:"POST",pathTemplate:null,params:[{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:`keywords array
required field
the results will be based on the keywords you specify in this array
UTF-8 encoding;
the keywords will be converted to lowercase format;
you can specify the maximum of 200 keywords`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["median_position", "in", [1, 10]]
  Combined: [["median_position", "in", [1, 10]], "and", ["domain", "not_like", "%`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
the comma is used as a separator
example:
["avg_position,asc"]
default rule:
["rating,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["avg_position,asc","etv,de`},{name:"include_subdomains",coreType:"boolean",nullable:!1,optional:!0,description:"Include keywords from subdomains"},{name:"item_types",coreType:"array",defaultValue:["organic"],nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"dataforseo_labs_google_subdomains",title:"DataForSEO Labs Google Subdomains",description:"This endpoint will provide you with a list of subdomains of the specified domain, along with the ranking distribution across organic and paid search. In addition to that, you will also get the estimated traffic volume of subdomains based on search volume.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/subdomains/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:"target domain"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"ignore_synonyms",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:"ignore highly similar keywords, if set to true, results will be more accurate"},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["metrics.organic.count", ">", 50]
  Combined: [["metrics.organic.pos_1", "<>", 0], "and", ["metrics.organic.impress`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to specify a sorting type
example:
["metrics.paid.etv,asc"]
Note: you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["metrics.organic.etv,desc","metrics.paid`},{name:"item_types",coreType:"array",defaultValue:["organic"],nullable:!1,optional:!0,description:""},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"}],payloadPassthrough:!0},{name:"dataforseo_labs_bulk_keyword_difficulty",title:"DataForSEO Labs Bulk Keyword Difficulty",description:"This endpoint will provide you with the Keyword Difficulty metric for a maximum of 1,000 keywords in one API request. Keyword Difficulty stands for the relative difficulty of ranking in the first top-10 organic results for the related keyword. Keyword Difficulty in DataForSEO API responses indicates the chance of getting in top-10 organic results for a keyword on a logarithmic scale from 0 to 100.",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/bulk_keyword_difficulty/live",method:"POST",pathTemplate:null,params:[{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:`target keywords
required field
UTF-8 encoding
maximum number of keywords you can specify in this array: 1000`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`}],payloadPassthrough:!0},{name:"dataforseo_labs_google_historical_keyword_data",title:"DataForSEO Labs Google Historical Keyword Data",description:"This endpoint provides Google historical keyword data for specified keywords, including search volume, cost-per-click, competition values for paid search, monthly searches, and search volume trends. You can get historical keyword data since August, 2021, depending on keywords along with location and language combination",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/historical_keyword_data/live",method:"POST",pathTemplate:null,params:[{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:`keywords
required field
The maximum number of keywords you can specify: 700
The maximum number of characters for each keyword: 80
The maximum number of words for each keyword phrase: 10
the specified keywords will be converted to lowercase format, data will be provided in a separate array
note that if some of the keywords specified in this array are omitted in the results you receive, then our database doesn't contain such keywords and cannot return data on them
you will not be charged for the k`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`}],payloadPassthrough:!0},{name:"dataforseo_labs_google_keyword_overview",title:"DataForSEO Labs Google Keyword Overview",description:"This endpoint provides Google keyword data for specified keywords. For each keyword, you will receive current cost-per-click, competition values for paid search, search volume, search intent, monthly searches",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/keyword_overview/live",method:"POST",pathTemplate:null,params:[{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:`keywords
required field
The maximum number of keywords you can specify: 700
The maximum number of characters for each keyword: 80
The maximum number of words for each keyword phrase: 10
the specified keywords will be converted to lowercase format, data will be provided in a separate array
note that if some of the keywords specified in this array are omitted in the results you receive, then our database doesn't contain such keywords and cannot return data on them
you will not be charged for the k`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"}],payloadPassthrough:!0},{name:"dataforseo_labs_google_keywords_for_site",title:"DataForSEO Labs Google Keywords For Site",description:"The Keywords For Site endpoint will provide you with a list of keywords relevant to the target domain. Each keyword is supplied with relevant, search volume data for the last month, cost-per-click, competition",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/keywords_for_site/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:"target domain"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["keyword_info.search_volume", ">", 0]
  Combined: [["keyword_info.search_volume", "in", [0, 1000]], "and", ["keywor`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting parameter
default rule:
["relevance,desc"]
example:
["relevance,desc","keyword_info.search_volume,desc"]`},{name:"include_subdomains",coreType:"boolean",nullable:!1,optional:!0,description:"Include keywords from subdomains"},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"}],payloadPassthrough:!0},{name:"dataforseo_labs_google_keyword_ideas",title:"DataForSEO Labs Google Keyword Ideas",description:`The Keyword Ideas provides search terms that are relevant to the product or service categories of the specified keywords. The algorithm selects the keywords which fall into the same categories as the seed keywords specified in a POST array.
As a result, you will get a list of relevant keyword ideas for up to 200 seed keywords.
Along with each keyword idea, you will get its search volume rate for the last month, search volume trend for the previous 12 months, as well as current cost-per-click and competition values. Moreover, this endpoint supplies minimum, maximum and average values of daily impressions, clicks and CPC for each result.
`,module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/keyword_ideas/live",method:"POST",pathTemplate:null,params:[{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:"target keywords"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
  required field
  only in format "Country" (not "City" or "Region")
  example:
  'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["keyword_info.search_volume", ">", 0]
  Combined: [["keyword_info.search_volume", "in", [0, 1000]], "and", ["keywor`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting parameter
default rule:
["relevance,desc"]
relevance is used as the default sorting rule to provide you with the closest keyword ideas. We recommend using this sorting rule to get highly-relevant search terms. Note tha`},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"}],payloadPassthrough:!0},{name:"dataforseo_labs_google_keyword_suggestions",title:"DataForSEO Labs Google Keyword Suggestions",description:`The Keyword Suggestions provides search queries that include the specified seed keyword.

The algorithm is based on the full-text search for the specified keyword and therefore returns only those search terms that contain the keyword you set in the POST array with additional words before, after, or within the specified key phrase. Returned keyword suggestions can contain the words from the specified key phrase in a sequence different from the one you specify.

As a result, you will get a list of long-tail keywords with each keyword in the list matching the specified search term.

Along with each suggested keyword, you will get its search volume rate for the last month, search volume trend for the previous 12 months, as well as current cost-per-click and competition values. Moreover, this endpoint supplies minimum, maximum and average values of daily impressions, clicks and CPC for each result.

`,module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/keyword_suggestions/live",method:"POST",pathTemplate:null,params:[{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:"target keyword"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["keyword_info.search_volume", ">", 0]
  Combined: [["keyword_info.search_volume", "in", [0, 1000]], "and", ["keywor`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
a comma is used as a separator
example:
["keyword_info.competition,desc"]
default rule:
["keyword_info.search_volume,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
examp`},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"}],payloadPassthrough:!0},{name:"dataforseo_labs_google_related_keywords",title:"DataForSEO Labs Google Related Keywords",description:`The Related Keywords endpoint provides keywords appearing in the
 "searches related to" SERP element
You can get up to 4680 keyword ideas by specifying the search depth. Each related keyword comes with the list of relevant product categories, search volume rate for the last month, search volume trend for the previous 12 months, as well as current cost-per-click and competition values. Moreover, this endpoint supplies minimum, maximum and average values of daily impressions, clicks and CPC for each result.

Datasource: DataForSEO SERPs Database
Search algorithm: depth-first search for queries appearing in the "search related to" element of SERP for the specified seed keyword.
`,module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/related_keywords/live",method:"POST",pathTemplate:null,params:[{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:"target keyword"},{name:"depth",coreType:"number",defaultValue:1,nullable:!1,optional:!0,description:"keyword search depth"},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["keyword_data.keyword_info.search_volume", ">", 0]
  Combined: [["keyword_info.search_volume", "in", [0, 1000]], "a`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["keyword_data.keyword_info.competition,desc"]
default rule:
["keyword_data.keyword_info.search_volume,desc"]
note that you can set no more than three sorting rules in a single request
you should use a co`},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"}],payloadPassthrough:!0},{name:"dataforseo_labs_search_intent",title:"DataForSEO Labs Search Intent",description:`This endpoint will provide you with search intent data for up to 1,000 keywords. For each keyword that you specify when setting a task, the API will return the keyword's search intent and intent probability. Besides the highest probable search intent, the results will also provide you with other likely search intent(s) and their probability.
Based on keyword data and search results data, our system has been trained to detect four types of search intent: informational, navigational, commercial, transactional.`,module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/search_intent/live",method:"POST",pathTemplate:null,params:[{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:`target keywords
required field
UTF-8 encoding
maximum number of keywords you can specify in this array: 1000`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        Note: this endpoint currently supports the following languages only:
ar,
zh-TW,
cs,
da,
nl,
en,
fi,
fr,
de,
he,
hi,
it,
ja,
ko,
ms,
nb,
pl,
pt,
ro,
ru,
es,
sv,
th,
uk,
vi,
bg,
hr,
sr,
sl,
bs`}],payloadPassthrough:!0},{name:"dataforseo_labs_google_top_searches",title:"DataForSEO Labs Google Top Searches",description:"The Top Searches endpoint of DataForSEO Labs API can provide you with over 7 billion keywords from the DataForSEO Keyword Database. Each keyword in the API response is provided with a set of relevant keyword data with Google Ads metrics",module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/google/top_searches/live",method:"POST",pathTemplate:null,params:[{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
only in format "Country" (not "City" or "Region")
example:
'United Kingdom', 'United States', 'Canada'`},{name:"language_code",coreType:"string",defaultValue:"en",nullable:!1,optional:!0,description:`language code
        required field
        example:
        en`},{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"Maximum number of keywords to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned keywords
        optional field
        default value: 0
        if you specify the 10 value, the first ten keywords in the results array will be omitted and the data will be provided for the successive keywords`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, match, not_match, ilike, not_ilike, like, not_like
Use % with like/not_like/ilike/not_ilike as a wildcard.
Examples:
  Single: ["keyword_info.search_volume", ">", 0]
  Combined: [["keyword_info.search_volume", "in", [0, 1000]], "and", ["keywor`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`resuresults sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting type
example:
["keyword_info.competition,desc"]
default rule:
["keyword_info.search_volume,desc"]
note that you can set no more than three sorting rules in a single request
you should use a comma to separate severa`},{name:"include_clickstream_data",coreType:"boolean",defaultValue:!1,nullable:!1,optional:!0,description:"Include or exclude data from clickstream-based metrics in the result"}],payloadPassthrough:!0},{name:"dataforseo_labs_available_filters",title:"DataForSEO Labs Available Filters",description:`Here you will find all the necessary information about filters that can be used with DataForSEO Labs API endpoints.

Please, keep in mind that filters are associated with a certain object in the result array, and should be specified accordingly.`,module:"dataforseo-labs",endpoint:"/v3/dataforseo_labs/available_filters",method:"GET",pathTemplate:null,params:[{name:"tool",coreType:"string",nullable:!1,optional:!0,description:"The name of the tool to get filters for"}],payloadPassthrough:null},{name:"domain_analytics_technologies_available_filters",title:"Domain Analytics Technologies Available Filters",description:`Here you will find all the necessary information about filters that can be used with DataForSEO Technologies API endpoints.

Please, keep in mind that filters are associated with a certain object in the result array, and should be specified accordingly.`,module:"domain-analytics",endpoint:"/v3/domain_analytics/technologies/available_filters",method:"GET",pathTemplate:null,params:[{name:"tool",coreType:"string",nullable:!1,optional:!0,description:"The name of the tool to get filters for"}],payloadPassthrough:null},{name:"domain_analytics_technologies_domain_technologies",title:"Domain Analytics Technologies Domain Technologies",description:"Using this endpoint you will get a list of technologies used in a particular domain",module:"domain-analytics",endpoint:"/v3/domain_analytics/technologies/domain_technologies/live",method:"POST",pathTemplate:null,params:[{name:"target",coreType:"string",nullable:!1,optional:!1,description:`target domain
required field
domain name of the website to analyze
Note: results will be returned for the specified domain only`}],payloadPassthrough:!0},{name:"domain_analytics_whois_available_filters",title:"Domain Analytics WHOIS Available Filters",description:`Here you will find all the necessary information about filters that can be used with DataForSEO WHOIS API endpoints.

Please, keep in mind that filters are associated with a certain object in the result array, and should be specified accordingly.`,module:"domain-analytics",endpoint:"/v3/domain_analytics/whois/available_filters",method:"GET",pathTemplate:null,params:[{name:"tool",coreType:"string",nullable:!1,optional:!0,description:"The name of the tool to get filters for"}],payloadPassthrough:null},{name:"domain_analytics_whois_overview",title:"Domain Analytics WHOIS Overview",description:"This endpoint will provide you with Whois data enriched with backlink stats, and ranking and traffic info from organic and paid search results. Using this endpoint you will be able to get all these data for the domains matching the parameters you specify in the request",module:"domain-analytics",endpoint:"/v3/domain_analytics/whois/overview/live",method:"POST",pathTemplate:null,params:[{name:"limit",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:"the maximum number of returned domains"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:`offset in the results array of returned businesses
optional field
default value: 0
if you specify the 10 value, the first ten entities in the results array will be omitted and the data will be provided for the successive entities`},{name:"filters",coreType:"array",nullable:!1,optional:!0,description:`Array-based filter expression. A single condition is a 3-element array: [field, operator, value]. Combine conditions with ["and"|"or"] between them: [condition, "and", condition]. Max 8 filters.
Operators: regex, not_regex, <, <=, >, >=, =, <>, in, not_in, like, not_like, match, not_match
Use % with like/not_like as a wildcard.
Example:
  Single: ["rating.value", ">", 3]`},{name:"order_by",coreType:"array",nullable:!1,optional:!0,description:`results sorting rules
optional field
you can use the same values as in the filters array to sort the results
possible sorting types:
asc – results will be sorted in the ascending order
desc – results will be sorted in the descending order
you should use a comma to set up a sorting parameter
example:
["rating.value,desc"]note that you can set no more than three sorting rules in a single request
you should use a comma to separate several sorting rules
example:
["rating.value,desc","rating.votes_co`},{name:"is_claimed",coreType:"boolean",defaultValue:!0,nullable:!1,optional:!0,description:""}],payloadPassthrough:!0},{name:"kw_data_dfs_trends_demography",title:"Keywords Data DataForSEO Trends Demography",description:"This endpoint will provide you with the demographic breakdown (by age and gender) of keyword popularity per each specified term based on DataForSEO Trends data",module:"keywords-data",endpoint:"/v3/keywords_data/dataforseo_trends/demography/live",method:"POST",pathTemplate:null,params:[{name:"location_name",coreType:"string",defaultValue:null,nullable:!1,optional:!0,description:`full name of the location
        optional field
        in format "Country"
        example:
        United Kingdom`},{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:`keywords
        the maximum number of keywords you can specify: 5`},{name:"type",coreType:"enum",defaultValue:"web",nullable:!1,optional:!0,description:"dataforseo trends type"},{name:"date_from",coreType:"string",nullable:!1,optional:!0,description:`starting date of the time range
          if you don’t specify this field, the current day and month of the preceding year will be used by default
          minimal value for the web type: 2004-01-01
          minimal value for other types: 2008-01-01
          date format: "yyyy-mm-dd"
          example:
          "2019-01-15"`},{name:"date_to",coreType:"string",nullable:!1,optional:!0,description:`ending date of the time range
            if you don’t specify this field, the today’s date will be used by default
            date format: "yyyy-mm-dd"
            example:
            "2019-01-15"`},{name:"time_range",coreType:"enum",defaultValue:"past_7_days",nullable:!1,optional:!0,description:`preset time ranges
            if you specify date_from or date_to parameters, this field will be ignored when setting a task`}],payloadPassthrough:!0},{name:"kw_data_dfs_trends_explore",title:"Keywords Data DataForSEO Trends Explore",description:"This endpoint will provide you with the keyword popularity data from DataForSEO Trends. You can check keyword trends for Google Search, Google News, and Google Shopping",module:"keywords-data",endpoint:"/v3/keywords_data/dataforseo_trends/explore/live",method:"POST",pathTemplate:null,params:[{name:"location_name",coreType:"string",defaultValue:null,nullable:!1,optional:!0,description:`full name of the location
        optional field
        in format "Country"
        example:
        United Kingdom`},{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:`keywords
        the maximum number of keywords you can specify: 5`},{name:"type",coreType:"enum",defaultValue:"web",nullable:!1,optional:!0,description:"dataforseo trends type"},{name:"date_from",coreType:"string",nullable:!1,optional:!0,description:`starting date of the time range
          if you don’t specify this field, the current day and month of the preceding year will be used by default
          minimal value for the web type: 2004-01-01
          minimal value for other types: 2008-01-01
          date format: "yyyy-mm-dd"
          example:
          "2019-01-15"`},{name:"date_to",coreType:"string",nullable:!1,optional:!0,description:`ending date of the time range
            if you don’t specify this field, the today’s date will be used by default
            date format: "yyyy-mm-dd"
            example:
            "2019-01-15"`},{name:"time_range",coreType:"enum",defaultValue:"past_7_days",nullable:!1,optional:!0,description:`preset time ranges
            if you specify date_from or date_to parameters, this field will be ignored when setting a task`}],payloadPassthrough:!0},{name:"kw_data_dfs_trends_subregion_interests",title:"Keywords Data DataForSEO Trends Subregion Interests",description:"This endpoint will provide you with location-specific keyword popularity data from DataForSEO Trends",module:"keywords-data",endpoint:"/v3/keywords_data/dataforseo_trends/subregion_interests/live",method:"POST",pathTemplate:null,params:[{name:"location_name",coreType:"string",defaultValue:null,nullable:!1,optional:!0,description:`full name of the location
        optional field
        in format "Country"
        example:
        United Kingdom`},{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:`keywords
        the maximum number of keywords you can specify: 5`},{name:"type",coreType:"enum",defaultValue:"web",nullable:!1,optional:!0,description:"dataforseo trends type"},{name:"date_from",coreType:"string",nullable:!1,optional:!0,description:`starting date of the time range
          if you don’t specify this field, the current day and month of the preceding year will be used by default
          minimal value for the web type: 2004-01-01
          minimal value for other types: 2008-01-01
          date format: "yyyy-mm-dd"
          example:
          "2019-01-15"`},{name:"date_to",coreType:"string",nullable:!1,optional:!0,description:`ending date of the time range
            if you don’t specify this field, the today’s date will be used by default
            date format: "yyyy-mm-dd"
            example:
            "2019-01-15"`},{name:"time_range",coreType:"enum",defaultValue:"past_7_days",nullable:!1,optional:!0,description:`preset time ranges
            if you specify date_from or date_to parameters, this field will be ignored when setting a task`}],payloadPassthrough:!0},{name:"kw_data_google_ads_locations",title:"Keywords Data Google Ads Locations",description:"Utility tool for kw_data_google_ads_search_volume to get list of availible locations.",module:"keywords-data",endpoint:"/v3/keywords_data/google_ads/locations",method:"POST",pathTemplate:null,params:[{name:"country_iso_code",coreType:"string",nullable:!1,optional:!1,description:"ISO 3166-1 alpha-2 country code, for example: US, GB, MT"},{name:"location_type",coreType:"string",nullable:!1,optional:!0,description:"Type of location. Possible variants: 'TV Region','Postal Code','Neighborhood','Governorate','National Park','Quarter','Canton','Airport','Okrug','Prefecture','City','Country','Province','Barrio','Sub-District','Congressional District','Municipality District','district','DMA Region','Union Territory','Territory','Colloquial Area','Autonomous Community','Borough','County','State','District','City Region','Commune','Region','Department','Division','Sub-Ward','Municipality','University'"},{name:"location_name",coreType:"string",nullable:!1,optional:!0,description:"Name of location or it`s part."}],payloadPassthrough:!0},{name:"kw_data_google_ads_search_volume",title:"Keywords Data Google Ads Search Volume",description:"Get search volume data for keywords from Google Ads",module:"keywords-data",endpoint:"/v3/keywords_data/google_ads/search_volume/live",method:"POST",pathTemplate:null,params:[{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
Location format - hierarchical, comma-separated (from most specific to least)
 Can be one of:
 1. Country only: "United States"
 2. Region,Country: "California,United States"
 3. City,Region,Country: "San Francisco,California,United States"`},{name:"language_code",coreType:"string",defaultValue:null,nullable:!1,optional:!0,description:`Language two-letter ISO code (e.g., 'en').
optional field`},{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:"Array of keywords to get search volume for"}],payloadPassthrough:!0},{name:"kw_data_google_trends_categories",title:"Keywords Data Google Trends Categories",description:"This endpoint will provide you list of Google Trends Categories",module:"keywords-data",endpoint:"/v3/keywords_data/google_trends/categories/live",method:"GET",pathTemplate:null,params:[]},{name:"kw_data_google_trends_explore",title:"Keywords Data Google Trends Explore",description:"This endpoint will provide you with the keyword popularity data from the ‘Explore’ feature of Google Trends. You can check keyword trends for Google Search, Google News, Google Images, Google Shopping, and YouTube",module:"keywords-data",endpoint:"/v3/keywords_data/google_trends/explore/live",method:"POST",pathTemplate:null,params:[{name:"location_name",coreType:"string",defaultValue:null,nullable:!1,optional:!0,description:`full name of the location
        optional field
        in format "Country"
        example:
        United Kingdom`},{name:"language_code",coreType:"string",defaultValue:null,nullable:!1,optional:!0,description:`Language two-letter ISO code (e.g., 'en').
        optional field`},{name:"keywords",coreType:"array",nullable:!1,optional:!1,description:`keywords
        the maximum number of keywords you can specify: 5
        the maximum number of characters you can specify in a keyword: 100
        the minimum number of characters must be greater than 1
        comma characters (,) in the specified keywords will be unset and ignored
        Note: keywords cannot consist of a combination of the following characters: < > |  " - + = ~ ! : * ( ) [ ] { }

        Note: to obtain google_trends_topics_list and google_trends_queries_list items, speci`},{name:"type",coreType:"enum",defaultValue:"web",nullable:!1,optional:!0,description:"google trends type"},{name:"date_from",coreType:"string",nullable:!1,optional:!0,description:`starting date of the time range
          if you don’t specify this field, the current day and month of the preceding year will be used by default
          minimal value for the web type: 2004-01-01
          minimal value for other types: 2008-01-01
          date format: "yyyy-mm-dd"
          example:
          "2019-01-15"`},{name:"date_to",coreType:"string",nullable:!1,optional:!0,description:`ending date of the time range
            if you don’t specify this field, the today’s date will be used by default
            date format: "yyyy-mm-dd"
            example:
            "2019-01-15"`},{name:"time_range",coreType:"enum",defaultValue:"past_7_days",nullable:!1,optional:!0,description:`preset time ranges
            if you specify date_from or date_to parameters, this field will be ignored when setting a task`},{name:"item_types",coreType:"array",defaultValue:["google_trends_graph"],nullable:!1,optional:!0,description:`types of items returned
            to speed up the execution of the request, specify one item at a time`},{name:"category_code",coreType:"number",defaultValue:null,nullable:!1,optional:!0,description:`google trends search category
            you can receive the list of available categories with their category_code by making a separate request to the keywords_data_google_trends_categories tool`}],payloadPassthrough:!0},{name:"merchant_amazon_asin_live_advanced",title:"Merchant Amazon ASIN Live Advanced",description:`Get detailed product information from Amazon by ASIN (Amazon Standard Identification Number).
Returns product title, price, description, images, reviews summary, seller info,
shipping options, and other product attributes for the specified ASIN.`,module:"merchant",endpoint:"/v3/merchant/amazon/asin/live/advanced",method:"POST",pathTemplate:null,params:[{name:"asin",coreType:"string",nullable:!1,optional:!1,description:`product ID
required field
unique product identifier (ASIN) in Amazon
you can receive the asin parameter by making a separate request to the merchant_amazon_products_live_advanced`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
Location format - hierarchical, comma-separated (from most specific to least)
 Can be one of:
 1. Country only: "United States"
 2. Postal Code,Region,Country: "90210,California,United States"`},{name:"language_code",coreType:"string",defaultValue:"en_US",nullable:!1,optional:!0,description:`language code
required field
example: "en_US"
supported languages: ar_SA, ar_AE, zh_CN, zh_TW, cs_CZ, nl_NL, en_AU, en_CA, en_IN, en_AE, en_GB, en_US, fr_CA, fr_FR, de_DE, he_IL, hi_IN, it_IT, ja_JP, ko_KR, pl_PL, pt_BR, es_MX, es_ES, es_US, sv_SE, tr_TR`}],payloadPassthrough:!0},{name:"merchant_amazon_locations",title:"Merchant Amazon Locations",description:`Utility tool for Amazon merchant tools (merchant_amazon_asin_live_advanced,
merchant_amazon_sellers_live_advanced, merchant_amazon_products_live_advanced)
to get the list of available locations with their location_code and location_name values.
You can optionally filter the list by country ISO code.`,module:"merchant",endpoint:"/v3/merchant/amazon/locations/TESTSTR",method:"GET",pathTemplate:null,params:[{name:"country",coreType:"string",nullable:!1,optional:!0,description:`ISO 3166-1 alpha-2 country code to filter locations by
optional field
example: "US", "GB", "DE"
if omitted, the full list of available Amazon locations is returned`},{name:"location_name_contains",coreType:"string",nullable:!1,optional:!0,description:`filter locations by a substring match on location_name
optional field
example: "New York", "London"
if omitted, no name filtering is applied`},{name:"limit",coreType:"number",nullable:!1,optional:!0,description:"maximum number of locations to return"},{name:"offset",coreType:"number",nullable:!1,optional:!0,description:"offset in the results array of returned locations"}],payloadPassthrough:null},{name:"merchant_amazon_products_live_advanced",title:"Merchant Amazon Products Live Advanced",description:`Search Amazon products by keyword and get the list of matching items.
Returns product titles, ASINs, prices, ratings, images, sponsored placements,
and other SERP-like results for the specified keyword on Amazon.`,module:"merchant",endpoint:"/v3/merchant/amazon/products/live/advanced",method:"POST",pathTemplate:null,params:[{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:`keyword
required field
the keyword that will be searched for on Amazon;
example: "shoes"`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
  required field
  Location format - hierarchical, comma-separated (from most specific to least)
   Can be one of:
   1. Country only: "United States"
   2. Postal Code,Region,Country: "90210,California,United States"`},{name:"language_code",coreType:"string",defaultValue:"en_US",nullable:!1,optional:!0,description:`language code
required field
example: "en_US"
supported languages: ar_SA, ar_AE, zh_CN, zh_TW, cs_CZ, nl_NL, en_AU, en_CA, en_IN, en_AE, en_GB, en_US, fr_CA, fr_FR, de_DE, he_IL, hi_IN, it_IT, ja_JP, ko_KR, pl_PL, pt_BR, es_MX, es_ES, es_US, sv_SE, tr_TR`},{name:"department",coreType:"enum",nullable:!1,optional:!0,description:`amazon product department
optional field
specify one of the supported amazon departments for extracting product listings`},{name:"price_min",coreType:"number",nullable:!1,optional:!0,description:`minimum product price
optional field
minimum price of the returned products listed on Amazon for the specified query
example: 5
Note: if you specify price_min, the search_param parameter will be ignored`},{name:"price_max",coreType:"number",nullable:!1,optional:!0,description:`maximum product price
optional field
maximum price of the returned products listed on Amazon for the specified query
example: 100
Note: if you specify price_max, the search_param parameter will be ignored`},{name:"sort_by",coreType:"enum",nullable:!1,optional:!0,description:`results sorting rules
optional field
supported values: relevance, price_low_to_high, price_high_to_low, featured, avg_customer_review, newest_arrival
example: "relevance"`}],payloadPassthrough:!0},{name:"merchant_amazon_sellers_live_advanced",title:"Merchant Amazon Sellers Live Advanced",description:`Get the list of sellers offering a specific Amazon product (by ASIN).
Returns seller names, ratings, prices, shipping conditions, and product offers
available from each merchant for the requested ASIN.`,module:"merchant",endpoint:"/v3/merchant/amazon/sellers/live/advanced",method:"POST",pathTemplate:null,params:[{name:"asin",coreType:"string",nullable:!1,optional:!1,description:`product identifier (ASIN) on Amazon
required field
the unique identifier of the product on Amazon;
example: "B07D528W98"`},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
  required field
  Location format - hierarchical, comma-separated (from most specific to least)
   Can be one of:
   1. Country only: "United States"
   2. Postal Code,Region,Country: "90210,California,United States"`},{name:"language_code",coreType:"string",defaultValue:"en_US",nullable:!1,optional:!0,description:`language code
required field
example: "en_US"
supported languages: ar_SA, ar_AE, zh_CN, zh_TW, cs_CZ, nl_NL, en_AU, en_CA, en_IN, en_AE, en_GB, en_US, fr_CA, fr_FR, de_DE, he_IL, hi_IN, it_IT, ja_JP, ko_KR, pl_PL, pt_BR, es_MX, es_ES, es_US, sv_SE, tr_TR`}],payloadPassthrough:!0},{name:"on_page_content_parsing",title:"On Page Content Parsing",description:"This endpoint allows parsing the content on any page you specify and will return the structured content of the target page, including link URLs, anchors, headings, and textual content.",module:"onpage",endpoint:"/v3/on_page/content_parsing/live",method:"POST",pathTemplate:null,params:[{name:"url",coreType:"string",nullable:!1,optional:!1,description:"URL of the page to parse"},{name:"enable_javascript",coreType:"boolean",nullable:!1,optional:!0,description:"Enable JavaScript rendering"},{name:"custom_user_agent",coreType:"string",nullable:!1,optional:!0,description:"Custom User-Agent header"},{name:"accept_language",coreType:"string",nullable:!1,optional:!0,description:"Accept-Language header value"}],payloadPassthrough:!0},{name:"on_page_instant_pages",title:"On Page Instant Pages",description:"Using this function you will get page-specific data with detailed information on how well a particular page is optimized for organic search",module:"onpage",endpoint:"/v3/on_page/instant_pages",method:"POST",pathTemplate:null,params:[{name:"url",coreType:"string",nullable:!1,optional:!1,description:"URL to analyze"},{name:"enable_javascript",coreType:"boolean",nullable:!1,optional:!0,description:"Enable JavaScript rendering"},{name:"custom_js",coreType:"string",nullable:!1,optional:!0,description:"Custom JavaScript code to execute"},{name:"custom_user_agent",coreType:"string",nullable:!1,optional:!0,description:"Custom User-Agent header"},{name:"accept_language",coreType:"string",nullable:!1,optional:!0,description:`language header for accessing the website
        all locale formats are supported (xx, xx-XX, xxx-XX, etc.)
        Note: if you do not specify this parameter, some websites may deny access; in this case, pages will be returned with the "type":"broken in the response array`}],payloadPassthrough:!0},{name:"on_page_lighthouse",title:"On Page Lighthouse",description:"The OnPage Lighthouse API is based on Google’s open-source Lighthouse project for measuring the quality of web pages and web apps.",module:"onpage",endpoint:"/v3/on_page/lighthouse/live/json",method:"POST",pathTemplate:null,params:[{name:"url",coreType:"string",nullable:!1,optional:!1,description:"URL of the page to parse"},{name:"enable_javascript",coreType:"boolean",nullable:!1,optional:!0,description:"Enable JavaScript rendering"},{name:"custom_user_agent",coreType:"string",nullable:!1,optional:!0,description:"Custom User-Agent header"},{name:"accept_language",coreType:"string",nullable:!1,optional:!0,description:"Accept-Language header value"},{name:"full_data",coreType:"boolean",nullable:!1,optional:!0,description:"Return the complete API response instead of a reduced version"}],payloadPassthrough:!0},{name:"serp_organic_live_advanced",title:"SERP Organic Live Advanced",description:"Get organic search results for a keyword in specified search engine",module:"serp",endpoint:"/v3/serp/google/organic/live/advanced",method:"POST",pathTemplate:{template:"/v3/serp/{search_engine}/organic/live/advanced",vars:["search_engine"]},params:[{name:"search_engine",coreType:"string",defaultValue:"google",nullable:!1,optional:!0,description:"search engine name, one of: google, yahoo, bing."},{name:"location_name",coreType:"string",defaultValue:"United States",nullable:!1,optional:!0,description:`full name of the location
required field
Location format - hierarchical, comma-separated (from most specific to least)
 Can be one of:
 1. Country only: "United States"
 2. Region,Country: "California,United States"
 3. City,Region,Country: "San Francisco,California,United States"`},{name:"depth",coreType:"number",defaultValue:10,nullable:!1,optional:!0,description:`parsing depth
optional field
number of results in SERP`},{name:"language_code",coreType:"string",nullable:!1,optional:!1,description:"search engine language code (e.g., 'en')"},{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:"Search keyword"},{name:"max_crawl_pages",coreType:"number",defaultValue:1,nullable:!1,optional:!0,description:`page crawl limit
optional field
number of search results pages to crawl
max value: 100
Note: the max_crawl_pages and depth parameters complement each other`},{name:"device",coreType:"string",defaultValue:"desktop",nullable:!1,optional:!0,description:`device type
optional field
can take the values:desktop, mobile
default value: desktop`},{name:"people_also_ask_click_depth",coreType:"number",nullable:!1,optional:!0,description:`clicks on the corresponding element
        specify the click depth on the people_also_ask element to get additional people_also_ask_element items;`}],payloadPassthrough:!0},{name:"serp_locations",title:"SERP Locations",description:"Utility tool for serp_organic_live_advanced to get list of availible locations.",module:"serp",endpoint:"/v3/serp/google/locations",method:"POST",pathTemplate:{template:"/v3/serp/{search_engine}/locations",vars:["search_engine"]},params:[{name:"search_engine",coreType:"string",defaultValue:"google",nullable:!1,optional:!0,description:"search engine name, one of: google, yahoo, bing."},{name:"country_iso_code",coreType:"string",nullable:!1,optional:!1,description:"ISO 3166-1 alpha-2 country code, for example: US, GB, MT"},{name:"location_type",coreType:"string",nullable:!1,optional:!0,description:"Type of location. Possible variants: 'TV Region','Postal Code','Neighborhood','Governorate','National Park','Quarter','Canton','Airport','Okrug','Prefecture','City','Country','Province','Barrio','Sub-District','Congressional District','Municipality District','district','DMA Region','Union Territory','Territory','Colloquial Area','Autonomous Community','Borough','County','State','District','City Region','Commune','Region','Department','Division','Sub-Ward','Municipality','University'"},{name:"location_name",coreType:"string",nullable:!1,optional:!0,description:"Name of location or it`s part."}],payloadPassthrough:!0},{name:"serp_youtube_locations",title:"SERP YouTube Locations",description:"Utility tool to get list of available locations for: serp_youtube_organic_live_advanced, serp_youtube_video_info_live_advanced, serp_youtube_video_comments_live_advanced, serp_youtube_video_subtitles_live_advanced.",module:"serp",endpoint:"/v3/serp/youtube/locations",method:"POST",pathTemplate:null,params:[{name:"country_iso_code",coreType:"string",nullable:!1,optional:!1,description:"ISO 3166-1 alpha-2 country code, for example: US, GB, MT"},{name:"location_type",coreType:"string",nullable:!1,optional:!0,description:"Type of location. Possible variants: 'TV Region','Postal Code','Neighborhood','Governorate','National Park','Quarter','Canton','Airport','Okrug','Prefecture','City','Country','Province','Barrio','Sub-District','Congressional District','Municipality District','district','DMA Region','Union Territory','Territory','Colloquial Area','Autonomous Community','Borough','County','State','District','City Region','Commune','Region','Department','Division','Sub-Ward','Municipality','University'"},{name:"location_name",coreType:"string",nullable:!1,optional:!0,description:"Name of location or it`s part."}],payloadPassthrough:!0},{name:"serp_youtube_organic_live_advanced",title:"SERP YouTube Organic Live Advanced",description:"provides top 20 blocks of youtube search engine results for a keyword",module:"serp",endpoint:"/v3/serp/youtube/organic/live/advanced",method:"POST",pathTemplate:null,params:[{name:"keyword",coreType:"string",nullable:!1,optional:!1,description:"Search keyword"},{name:"location_name",coreType:"string",nullable:!1,optional:!1,description:`full name of the location
required field
Location format - hierarchical, comma-separated (from most specific to least)
 Can be one of:
 1. Country only: "United States"
 2. Region,Country: "California,United States"
 3. City,Region,Country: "San Francisco,California,United States"`},{name:"language_code",coreType:"string",nullable:!1,optional:!1,description:"search engine language code (e.g., 'en')"},{name:"device",coreType:"string",defaultValue:"desktop",nullable:!1,optional:!0,description:`device type
optional field
can take the values:desktop, mobile
default value: desktop`},{name:"os",coreType:"string",defaultValue:"windows",nullable:!1,optional:!0,description:`device operating system
optional field
if you specify desktop in the device field, choose from the following values: windows, macos
default value: windows
if you specify mobile in the device field, choose from the following values: android, ios
default value: android`},{name:"block_depth",coreType:"number",defaultValue:20,nullable:!1,optional:!0,description:`parsing depth
optional field
number of blocks of results in SERP
max value: 700`}],payloadPassthrough:!0},{name:"serp_youtube_video_comments_live_advanced",title:"SERP YouTube Video Comments Live Advanced",description:"provides data on the video comments you specify",module:"serp",endpoint:"/v3/serp/youtube/video_comments/live/advanced",method:"POST",pathTemplate:null,params:[{name:"video_id",coreType:"string",nullable:!1,optional:!1,description:"ID of the video"},{name:"location_name",coreType:"string",nullable:!1,optional:!1,description:`full name of the location
required field
Location format - hierarchical, comma-separated (from most specific to least)
 Can be one of:
 1. Country only: "United States"
 2. Region,Country: "California,United States"
 3. City,Region,Country: "San Francisco,California,United States"`},{name:"language_code",coreType:"string",nullable:!1,optional:!1,description:"search engine language code (e.g., 'en')"},{name:"device",coreType:"string",defaultValue:"desktop",nullable:!1,optional:!0,description:`device type
optional field
can take the values:desktop, mobile
default value: desktop`},{name:"os",coreType:"string",defaultValue:"windows",nullable:!1,optional:!0,description:`device operating system
optional field
if you specify desktop in the device field, choose from the following values: windows, macos
default value: windows
if you specify mobile in the device field, choose from the following values: android, ios
default value: android`},{name:"depth",coreType:"number",defaultValue:20,nullable:!1,optional:!0,description:"parsing depth, number of results in SERP, max value: 700"}],payloadPassthrough:!0},{name:"serp_youtube_video_info_live_advanced",title:"SERP YouTube Video Info Live Advanced",description:"provides data on the video you specify",module:"serp",endpoint:"/v3/serp/youtube/video_info/live/advanced",method:"POST",pathTemplate:null,params:[{name:"video_id",coreType:"string",nullable:!1,optional:!1,description:"ID of the video"},{name:"location_name",coreType:"string",nullable:!1,optional:!1,description:`full name of the location
required field
Location format - hierarchical, comma-separated (from most specific to least)
 Can be one of:
 1. Country only: "United States"
 2. Region,Country: "California,United States"
 3. City,Region,Country: "San Francisco,California,United States"`},{name:"language_code",coreType:"string",nullable:!1,optional:!1,description:"search engine language code (e.g., 'en')"},{name:"device",coreType:"string",defaultValue:"desktop",nullable:!1,optional:!0,description:`device type
optional field
can take the values:desktop, mobile
default value: desktop`},{name:"os",coreType:"string",defaultValue:"windows",nullable:!1,optional:!0,description:`device operating system
optional field
if you specify desktop in the device field, choose from the following values: windows, macos
default value: windows
if you specify mobile in the device field, choose from the following values: android, ios
default value: android`}],payloadPassthrough:!0},{name:"serp_youtube_video_subtitles_live_advanced",title:"SERP YouTube Video Subtitles Live Advanced",description:"provides data on the video subtitles you specify",module:"serp",endpoint:"/v3/serp/youtube/video_subtitles/live/advanced",method:"POST",pathTemplate:null,params:[{name:"video_id",coreType:"string",nullable:!1,optional:!1,description:"ID of the video"},{name:"location_name",coreType:"string",nullable:!1,optional:!1,description:`full name of the location
required field
Location format - hierarchical, comma-separated (from most specific to least)
 Can be one of:
 1. Country only: "United States"
 2. Region,Country: "California,United States"
 3. City,Region,Country: "San Francisco,California,United States"`},{name:"language_code",coreType:"string",nullable:!1,optional:!1,description:"search engine language code (e.g., 'en')"},{name:"subtitles_language",coreType:"string",nullable:!1,optional:!0,description:"language code of original text (e.g., 'en')"},{name:"subtitles_translate_language",coreType:"string",nullable:!1,optional:!0,description:"language code of translated text (e.g., 'en')"},{name:"device",coreType:"string",defaultValue:"desktop",nullable:!1,optional:!0,description:`device type
optional field
can take the values:desktop, mobile
default value: desktop`},{name:"os",coreType:"string",defaultValue:"windows",nullable:!1,optional:!0,description:`device operating system
optional field
if you specify desktop in the device field, choose from the following values: windows, macos
default value: windows
if you specify mobile in the device field, choose from the following values: android, ios
default value: android`}],payloadPassthrough:!0}]};var F=ne(R),g=F.tools,y={volume:"kw_data_google_ads_search_volume","search-volume":"kw_data_google_ads_search_volume","keyword-overview":"dataforseo_labs_google_keyword_overview",difficulty:"dataforseo_labs_bulk_keyword_difficulty","keyword-difficulty":"dataforseo_labs_bulk_keyword_difficulty",ideas:"dataforseo_labs_google_keyword_ideas","keyword-ideas":"dataforseo_labs_google_keyword_ideas",suggestions:"dataforseo_labs_google_keyword_suggestions",related:"dataforseo_labs_google_related_keywords","related-keywords":"dataforseo_labs_google_related_keywords","keywords-for-site":"dataforseo_labs_google_keywords_for_site","ranked-keywords":"dataforseo_labs_google_ranked_keywords","search-intent":"dataforseo_labs_search_intent","top-searches":"dataforseo_labs_google_top_searches","historical-keywords":"dataforseo_labs_google_historical_keyword_data","traffic-estimation":"dataforseo_labs_bulk_traffic_estimation",trends:"kw_data_dfs_trends_explore","dataforseo-trends":"kw_data_dfs_trends_explore","trends-demography":"kw_data_dfs_trends_demography","trends-subregions":"kw_data_dfs_trends_subregion_interests","google-trends":"kw_data_google_trends_explore","google-trends-categories":"kw_data_google_trends_categories",serp:"serp_organic_live_advanced","serp-youtube":"serp_youtube_organic_live_advanced","youtube-video":"serp_youtube_video_info_live_advanced","serp-locations":"serp_locations",competitors:"dataforseo_labs_google_competitors_domain","domain-competitors":"dataforseo_labs_google_competitors_domain","serp-competitors":"dataforseo_labs_google_serp_competitors","domain-intersection":"dataforseo_labs_google_domain_intersection","page-intersection":"dataforseo_labs_google_page_intersection","rank-overview":"dataforseo_labs_google_domain_rank_overview","historical-ranks":"dataforseo_labs_google_historical_rank_overview",backlinks:"backlinks_summary","backlinks-summary":"backlinks_summary","backlinks-list":"backlinks_backlinks","backlinks-anchors":"backlinks_anchors","referring-domains":"backlinks_referring_domains","backlinks-referring-domains":"backlinks_referring_domains","backlinks-domain-pages":"backlinks_domain_pages","backlinks-domain-pages-summary":"backlinks_domain_pages_summary","backlinks-page-intersection":"backlinks_page_intersection","backlinks-domain-intersection":"backlinks_domain_intersection","backlinks-competitors":"backlinks_competitors","backlinks-timeseries":"backlinks_timeseries_summary","backlinks-new-lost":"backlinks_timeseries_new_lost_summary","backlinks-referring-networks":"backlinks_referring_networks","bulk-backlinks":"backlinks_bulk_backlinks","bulk-ranks":"backlinks_bulk_ranks","bulk-spam-score":"backlinks_bulk_spam_score","bulk-referring-domains":"backlinks_bulk_referring_domains","bulk-new-lost-backlinks":"backlinks_bulk_new_lost_backlinks","bulk-new-lost-domains":"backlinks_bulk_new_lost_referring_domains",lighthouse:"on_page_lighthouse","onpage-lighthouse":"on_page_lighthouse","onpage-instant":"on_page_instant_pages","onpage-content":"on_page_content_parsing",whois:"domain_analytics_whois_overview",technologies:"domain_analytics_technologies_domain_technologies",amazon:"merchant_amazon_asin_live_advanced","amazon-search":"merchant_amazon_products_live_advanced","amazon-sellers":"merchant_amazon_sellers_live_advanced","amazon-locations":"merchant_amazon_locations","business-search":"business_data_business_listings_search","content-search":"content_analysis_search","ai-volume":"ai_optimization_keyword_data_search_volume","ai-locations":"ai_opt_kw_data_loc_and_lang","llm-response":"ai_optimization_llm_response","llm-models":"ai_optimization_llm_models","chatgpt-scraper":"ai_optimization_chat_gpt_scraper","llm-mentions":"ai_opt_llm_ment_search","llm-mentions-search":"ai_opt_llm_ment_search","llm-mentions-domains":"ai_opt_llm_ment_top_domains","llm-mentions-pages":"ai_opt_llm_ment_top_pages","llm-mentions-metrics":"ai_opt_llm_ment_agg_metrics","llm-mentions-cross":"ai_opt_llm_ment_cross_agg_metrics"},h=new Map(g.map((e)=>[e.name,e]));function P(e){if(y[e])return h.get(y[e]);if(h.has(e))return h.get(e);let n=e.replace(/-/g,"_");if(h.has(n))return h.get(n);let a=e.replace(/_/g,"-");if(y[a])return h.get(y[a]);return}function I(){return[...new Set(g.map((e)=>e.module))].sort()}function C(e){return e?g.filter((n)=>n.module===e):[...g]}var ee={kw_data_google_trends_categories:{path:"/v3/keywords_data/google_trends/categories"}};function M(e,n){let a=ee[e.name];if(e.name==="merchant_amazon_locations"){let o=n.country===void 0?void 0:S(z(e,"country"),n.country);return{path:`/v3/merchant/amazon/locations${o===void 0?"":`/${encodeURIComponent(String(o))}`}`,method:"GET"}}if(e.pathTemplate){let o=e.pathTemplate.template;for(let i of e.pathTemplate.vars){let r=z(e,i),l=n[i]??r.defaultValue;if(l===void 0||l===null)throw Error(`Templated path requires --${i.replace(/_/g,"-")} for "${e.name}"`);o=o.replace(`{${i}}`,encodeURIComponent(String(S(r,l))))}return{path:o,method:a?.method??e.method}}let t=a?.path??e.endpoint;if(t===null)throw Error(`Tool "${e.name}" has no endpoint or path template`);return{path:t,method:a?.method??e.method}}function q(e,n){let a={};for(let t of e.params){let o=n[t.name];if(o===void 0)if(t.defaultValue!==void 0&&t.defaultValue!==null)o=t.defaultValue;else continue;a[t.name]=S(t,o)}return a}function S(e,n){if(n===null){if(e.nullable===!0)return null;throw Error(`--${e.name.replace(/_/g,"-")} does not accept null`)}switch(e.coreType){case"string":if(typeof n!=="string")throw Error(`--${e.name.replace(/_/g,"-")} must be a string`);return n;case"number":{if(typeof n==="number"){if(!Number.isFinite(n))throw Error(`--${e.name.replace(/_/g,"-")} must be a finite number`);return n}if(typeof n!=="string"||n.trim()==="")throw Error(`--${e.name.replace(/_/g,"-")} must be a finite number`);let a=Number(n);if(!Number.isFinite(a))throw Error(`--${e.name.replace(/_/g,"-")} must be a finite number`);return a}case"boolean":{if(typeof n==="boolean")return n;if(typeof n!=="string")throw Error(`--${e.name.replace(/_/g,"-")} must be a boolean`);if(/^(1|true|yes|on)$/i.test(n))return!0;if(/^(0|false|no|off)$/i.test(n))return!1;throw Error(`--${e.name.replace(/_/g,"-")} must be a boolean`)}case"array":if(!Array.isArray(n))throw Error(`--${e.name.replace(/_/g,"-")} must be an array`);return n;case"object":if(!G(n))throw Error(`--${e.name.replace(/_/g,"-")} must be a JSON object`);return n;case"enum":if(typeof n!=="string")throw Error(`--${e.name.replace(/_/g,"-")} must be a string enum value`);if(e.enumValues!==void 0&&e.enumValues.length>0&&!e.enumValues.includes(n))throw Error(`--${e.name.replace(/_/g,"-")} must be one of: ${e.enumValues.join(", ")}`);return n;default:throw Error(`Unsupported param type for --${e.name.replace(/_/g,"-")}: ${e.coreType}`)}}function k(e){return e.params.filter((n)=>!n.optional&&n.defaultValue===void 0)}function z(e,n){let a=e.params.find((t)=>t.name===n);if(a===void 0)throw Error(`Registry error: "${e.name}" is missing param "${n}"`);return a}function ne(e){let n=T(e,"registry"),a=U(n.tools,"registry.tools").map(ae),t=se(n.count,"registry.count");if(t!==a.length)throw Error(`Registry count mismatch: count=${t}, tools=${a.length}`);return{count:t,generatedAt:p(n.generatedAt,"registry.generatedAt"),sourceVersion:p(n.sourceVersion,"registry.sourceVersion"),tools:a}}function ae(e,n){let a=`registry.tools[${n}]`,t=T(e,a);return{name:p(t.name,`${a}.name`),title:p(t.title,`${a}.title`),description:p(t.description,`${a}.description`),module:p(t.module,`${a}.module`),endpoint:le(t.endpoint,`${a}.endpoint`),method:p(t.method,`${a}.method`),pathTemplate:oe(t.pathTemplate,`${a}.pathTemplate`),params:U(t.params,`${a}.params`).map((o,i)=>te(o,`${a}.params[${i}]`))}}function te(e,n){let a=T(e,n),t={name:p(a.name,`${n}.name`),coreType:ie(a.coreType,`${n}.coreType`),optional:D(a.optional,`${n}.optional`),description:p(a.description,`${n}.description`)};if(a.elementType!==void 0)t.elementType=p(a.elementType,`${n}.elementType`);if(a.enumValues!==void 0)t.enumValues=E(a.enumValues,`${n}.enumValues`);if(a.defaultValue!==void 0)t.defaultValue=a.defaultValue;if(a.nullable!==void 0)t.nullable=D(a.nullable,`${n}.nullable`);return t}function oe(e,n){if(e===void 0||e===null)return e;let a=T(e,n);return{template:p(a.template,`${n}.template`),vars:E(a.vars,`${n}.vars`)}}function ie(e,n){let a=p(e,n);switch(a){case"array":case"boolean":case"enum":case"number":case"object":case"string":return a;default:throw Error(`${n} has unsupported param type: ${a}`)}}function le(e,n){if(e===null)return null;return p(e,n)}function p(e,n){if(typeof e!=="string")throw Error(`${n} must be a string`);return e}function se(e,n){if(typeof e!=="number"||!Number.isFinite(e))throw Error(`${n} must be a finite number`);return e}function D(e,n){if(typeof e!=="boolean")throw Error(`${n} must be a boolean`);return e}function U(e,n){if(!Array.isArray(e))throw Error(`${n} must be an array`);return e}function E(e,n){return U(e,n).map((t,o)=>p(t,`${n}[${o}]`))}function T(e,n){if(!G(e))throw Error(`${n} must be an object`);return e}function G(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}import{readFileSync as re}from"node:fs";import{homedir as de}from"node:os";import{join as ue}from"node:path";var ce="https://api.dataforseo.com",pe=120;class x extends Error{status_code;status_message;full;constructor(e){super(`DataForSEO error ${e.status_code}: ${e.status_message}`);this.status_code=e.status_code,this.status_message=e.status_message,this.full=e}}async function K(e,n,a,t){if(!e.startsWith("/"))throw Error(`DataForSEO API path must start with "/": ${e}`);if(n.trim()==="")throw Error("DataForSEO HTTP method is required");let o=ce+e,i=n.toUpperCase(),r=t.timeout??pe;if(!Number.isFinite(r)||r<=0)throw Error(`Request timeout must be a positive number of seconds: ${r}`);let l={method:i,headers:{Authorization:"Basic "+Buffer.from(`${t.username}:${t.password}`).toString("base64"),"Content-Type":"application/json"},signal:AbortSignal.timeout(r*1000)};if(i!=="GET"&&a!==null)l.body=JSON.stringify(a);let d;try{d=await fetch(o,l)}catch(m){if(!(m instanceof Error))throw Error("fetch rejected with a non-Error value");if(m.name==="TimeoutError"||m.name==="AbortError")throw Error(`Request timed out after ${r}s: ${i} ${e}`,{cause:m});throw m}let s=await d.text(),c;try{c=JSON.parse(s)}catch(m){throw Error(`Non-JSON response (HTTP ${d.status}) from ${i} ${e}: ${s.slice(0,300)}`,{cause:m})}let f=fe(c,i,e);if(f.status_code!==20000)throw new x(f);return f}function me(e,n={}){let a;try{a=re(e,"utf8")}catch(o){if(ye(o)&&o.code==="ENOENT"&&n.required!==!0)return{};throw Error(`Failed to read DataForSEO env file: ${e}`,{cause:o})}let t={};for(let[o,i]of a.split(`
`).entries()){let r=i.trim();if(r===""||r.startsWith("#"))continue;let l=r.match(/^export\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);if(l===null)throw Error(`Malformed env file line ${o+1} in ${e}`);let d=l[1],s=l[2].trim();if(s.startsWith('"')&&s.endsWith('"')||s.startsWith("'")&&s.endsWith("'"))s=s.slice(1,-1);else if(s.startsWith('"')||s.endsWith('"')||s.startsWith("'")||s.endsWith("'"))throw Error(`Unmatched quote on env file line ${o+1} in ${e}`);t[d]=s}return t}function B(e,n,a){let t=a??process.env.DATAFORSEO_ENV_FILE,o=t??ue(de(),".config/dataforseo/env"),i=process.env.DATAFORSEO_USERNAME,r=process.env.DATAFORSEO_PASSWORD,l=v(e,i),d=v(n,r),c=t!==void 0||l===void 0||d===void 0?me(o,{required:t!==void 0}):{},f=v(e,i,c.DATAFORSEO_USERNAME),m=v(n,r,c.DATAFORSEO_PASSWORD);if(!f||!m)throw Error(`DataForSEO credentials not found. Set DATAFORSEO_USERNAME / DATAFORSEO_PASSWORD env vars,
create ${o} with:
  export DATAFORSEO_USERNAME='you@login'
  export DATAFORSEO_PASSWORD='your-api-password'
or pass --username / --password.`);return{username:f,password:m}}function fe(e,n,a){if(!he(e))throw Error(`Malformed DataForSEO response from ${n} ${a}: expected an object`);if(typeof e.status_code!=="number")throw Error(`Malformed DataForSEO response from ${n} ${a}: status_code must be a number`);if(typeof e.status_message!=="string")throw Error(`Malformed DataForSEO response from ${n} ${a}: status_message must be a string`);return{...e,status_code:e.status_code,status_message:e.status_message}}function he(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}function ye(e){return e instanceof Error&&"code"in e}function ge(e){return typeof e==="string"&&e.trim()!==""}function v(...e){for(let n of e)if(ge(n))return n;return}var be={kw_data_google_ads_search_volume:[{headers:["keyword","volume","competition","low_bid","high_bid","cpc"],paths:["keyword","search_volume","competition","low_top_of_page_bid","high_top_of_page_bid","cpc"]}],dataforseo_labs_google_keyword_overview:[{headers:["keyword","volume","difficulty","cpc","competition","intent"],paths:["keyword","keyword_info.search_volume","keyword_properties.keyword_difficulty","keyword_info.cpc","keyword_info.competition","search_intent_info.main_intent"]},{headers:["keyword","volume","cpc","competition"],paths:["keyword","keyword_info.search_volume","keyword_info.cpc","keyword_info.competition"]}],dataforseo_labs_bulk_keyword_difficulty:[{headers:["keyword","difficulty"],paths:["keyword","keyword_difficulty"]}],dataforseo_labs_google_ranked_keywords:[{headers:["keyword","volume","rank","url","etv"],paths:["keyword","keyword_info.search_volume","rank_info.rank_absolute","rank_info.url","rank_info.etv"]}],serp_organic_live_advanced:[{headers:["rank","type","domain","title","url","etv"],paths:["rank_absolute","type","domain","title","url","etv"],rowFilter:(e)=>Boolean(e.url)}],backlinks_backlinks:[{headers:["url_from","url_to","domain_from","anchor","spam_score"],paths:["backlink","url","domain_from","anchor","spam_score"]}],backlinks_referring_domains:[{headers:["domain","backlinks","first_seen","last_seen"],paths:["referring_domain","backlinks","first_seen","last_seen"]}],dataforseo_labs_google_keywords_for_site:[{headers:["keyword","volume","rank","cpc"],paths:["keyword","keyword_info.search_volume","rank_info.rank_absolute","cpc"]}],dataforseo_labs_google_keyword_ideas:[{headers:["keyword","volume","difficulty","cpc"],paths:["keyword","keyword_info.search_volume","keyword_properties.keyword_difficulty","cpc"]}],dataforseo_labs_google_related_keywords:[{headers:["keyword","volume","relevance"],paths:["keyword","keyword_info.search_volume","relevance"]}],dataforseo_labs_google_keyword_suggestions:[{headers:["keyword","volume","difficulty","cpc"],paths:["keyword","keyword_info.search_volume","keyword_properties.keyword_difficulty","cpc"]}],serp_youtube_organic_live_advanced:[{headers:["rank","type","title","url","video_id"],paths:["rank_absolute","type","title","url","video_id"]}]};function N(e,n){let a=e;for(let t of n.split(".")){if(!W(a))return;a=a[t]}return a}var _e=new Set(["items","results","organic_items","paid_items"]);function A(e,n,a,t){if(e==null||a>8)return;if(Array.isArray(e)){let o=e.filter(W);if(o.length)t.push({rows:o,underItems:_e.has(n||"")});for(let i of e)A(i,n,a+1,t);return}if(typeof e==="object")for(let[o,i]of Object.entries(e))A(i,o,a+1,t)}function Y(e){let n=0;for(let a of Object.values(e[0]||{}))if(a!=null&&typeof a!=="object")n++;return n*100+Math.min(e.length,50)}function we(e){let n=[];if(A(e,null,0,n),!n.length)return null;let a=n.filter((i)=>i.underItems).flatMap((i)=>i.rows);if(a.length)return a;let t=n[0].rows,o=Y(t);for(let i=1;i<n.length;i++){let r=Y(n[i].rows);if(r>o)t=n[i].rows,o=r}return t}function j(e,n){let a=be[n],t=we(e),o=null,i=null;if(a&&t&&t.length){for(let d of a){let s=d.rowFilter?t.filter(d.rowFilter):t;if(s.length&&d.paths.every((c)=>N(s[0],c)!==void 0)){o=d.headers,i=d.paths,t=s;break}}if(!i){if(o=a[0].headers,i=a[0].paths,a[0].rowFilter)t=t.filter(a[0].rowFilter)}}if(!t||!t.length){if(e&&typeof e==="object"&&!Array.isArray(e)){let d=["key	value"];for(let[s,c]of Object.entries(e)){if(c==null||typeof c==="object")continue;d.push(`${s}	${String(c)}`)}if(d.length>1)return d.join(`
`)}return ke(e)}if(!o){let d=new Set;for(let s of t.slice(0,25))for(let c of Object.keys(s))if(typeof s[c]!=="object")d.add(c);o=[...d],i=o}if(o===null||i===null)throw Error("TSV formatter failed to resolve column paths");let r=(d)=>{let s=d==null?"":typeof d==="object"?JSON.stringify(d):String(d);return s.includes("\t")||s.includes(`
`)?JSON.stringify(s):s},l=[o.join("\t")];for(let d of t)l.push(i.map((s)=>r(N(d,s))).join("\t"));return l.join(`
`)}function W(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}function ke(e){let n=JSON.stringify(e,null,2);return n===void 0?String(e):n}var H="0.1.1",Te=`d4s ${H} — DataForSEO CLI (84 endpoints, direct REST)`;function ve(e){let n={command:null,positional:[],flags:{},global:{json:!1,tsv:!1,raw:!1}},a=0;while(a<e.length){let t=e[a++];if(t==="--"){n.positional.push(...e.slice(a));break}if(t.startsWith("--")||t.startsWith("-")&&t.length>1){let o=t,i,r=t.indexOf("=");if(r>=0)o=t.slice(0,r),i=t.slice(r+1);switch(o){case"--json":_(o,i),n.global.json=!0;continue;case"--tsv":_(o,i),n.global.tsv=!0;continue;case"--raw":_(o,i),n.global.raw=!0;continue;case"--location":{let l=b(e,a,o,i);n.global.location=l.value,a=l.nextIndex;continue}case"--lang":case"--language":{let l=b(e,a,o,i);n.global.lang=l.value,a=l.nextIndex;continue}case"--username":{let l=b(e,a,o,i);n.global.username=l.value,a=l.nextIndex;continue}case"--password":{let l=b(e,a,o,i);n.global.password=l.value,a=l.nextIndex;continue}case"--env-file":{let l=b(e,a,o,i);n.global.envFile=l.value,a=l.nextIndex;continue}case"--timeout":{let l=b(e,a,o,i);n.global.timeout=J(l.value,o),a=l.nextIndex;continue}case"--help":case"-h":if(_(o,i),n.command!==null&&n.command!=="help")n.positional.unshift(n.command);n.command="help";continue;case"--version":case"-v":_(o,i),n.command="version";continue;default:{if(!o.startsWith("--"))throw Error(`Unknown short option: ${o}`);if(o.startsWith("--no-")){_(o,i),X(n.flags,o.slice(5),!1);continue}let l=e[a];if(i===void 0&&l!==void 0&&!Z(l))i=e[a++];X(n.flags,o.slice(2),i??!0)}}}else if(n.command===null)n.command=t;else n.positional.push(t)}return xe(n.global),n}function X(e,n,a){let t=n.replace(/-/g,"_");if(e[t]===void 0)e[t]=a;else if(Array.isArray(e[t]))e[t].push(a);else e[t]=[e[t],a]}function b(e,n,a,t){if(t!==void 0)return{value:t,nextIndex:n};let o=e[n];if(o===void 0||Z(o))throw Error(`${a} requires a value`);return{value:o,nextIndex:n+1}}function _(e,n){if(n!==void 0)throw Error(`${e} does not accept a value`)}function Z(e){return e.startsWith("-")&&e.length>1}function J(e,n){if(e.trim()==="")throw Error(`${n} must be a positive number`);let a=Number(e);if(!Number.isFinite(a)||a<=0)throw Error(`${n} must be a positive number`);return a}function xe(e){let n=[e.json?"--json":void 0,e.tsv?"--tsv":void 0,e.raw?"--raw":void 0].filter((a)=>a!==void 0);if(n.length>1)throw Error(`Choose only one output mode: ${n.join(", ")}`)}function Se(e){if(e===void 0||e==="")return!1;if(/^(1|true|yes|on)$/i.test(e))return!0;if(/^(0|false|no|off)$/i.test(e))return!1;throw Error("D4S_DEBUG must be a boolean value")}function V(){console.log(`${Te}

USAGE
  d4s <command> [--param value ...] [--tsv|--json|--raw]
  d4s list [module]
  d4s help <command>

GLOBAL OPTIONS
  --tsv                 Tab-separated output (default: pretty JSON)
  --json                Pretty JSON (default)
  --raw                 Full raw API response
  --location "Place"    Shortcut for --location-name (when the tool supports it)
  --lang en             Shortcut for --language-code
  --username / --password   Override credentials
  --env-file PATH       Credentials file (default ~/.config/dataforseo/env)
  --timeout N           Request timeout in seconds (default 120)
  -h, --help            Show this help
  -v, --version         Print version

CREDENTIALS (any of)
  1. --username/--password flags
  2. DATAFORSEO_USERNAME / DATAFORSEO_PASSWORD env vars
  3. ~/.config/dataforseo/env with: export DATAFORSEO_USERNAME='...'

POPULAR COMMANDS (see 'd4s list' for all 84)
  volume --keywords a,b,c            Google Ads search volume
  keyword-overview --keywords a,b    Volume + organic difficulty + intent
  difficulty --keywords a,b          Bulk organic keyword difficulty
  related --keyword "p0420"          Related keywords
  ideas --keywords "obd2 codes"      Keyword ideas
  serp --keyword "p0420 code" --lang en   Live Google SERP
  ranked-keywords --target X.com     Keywords a domain ranks for
  competitors --target X.com         Domain competitors
  backlinks --target X.com           Backlinks summary
  referring-domains --target X.com   Referring domains
  lighthouse --url https://X.com     On-page Lighthouse audit
  llm-mentions --target '[{"keyword":"p0420"}]'   Visibility in AI/LLM answers

Every tool also accepts its snake_case or kebab-case name and all documented
DataForSEO params as --flags (arrays via comma or repeated flags).`)}function Pe(e){if(!e)console.error("Unknown command. Run 'd4s list' to see all commands."),process.exit(1);let n=k(e);if(console.log(`${e.title}  (${e.name})`),console.log(`module: ${e.module}   endpoint: ${e.method} ${e.pathTemplate?e.pathTemplate.template:e.endpoint}`),console.log(`
${e.description}
`),n.length)console.log(`REQUIRED: ${n.map((a)=>"--"+a.name.replace(/_/g,"-")).join(", ")}`);console.log(`
PARAMS:`);for(let a of e.params){let t="--"+a.name.replace(/_/g,"-"),o=a.coreType==="array"&&a.elementType?`array<${a.elementType}>`:a.coreType,i=a.optional?"optional":"required",r=a.defaultValue!==void 0&&a.defaultValue!==null?` default=${JSON.stringify(a.defaultValue)}`:"";if(console.log(`  ${t.padEnd(28)} ${o.padEnd(16)} ${i}${r}`),a.description)console.log(`      ${a.description.split(`
`)[0].slice(0,120)}`)}}function Ce(e){let n=e?[e]:I();for(let a of n){console.log(`
## ${a}`);for(let t of C(a)){let o=Object.entries(y).find(([,r])=>r===t.name)?.[0],i=k(t).map((r)=>"--"+r.name.replace(/_/g,"-")).join(" ");console.log(`  ${t.name}${o?` (${o})`:""}
      ${t.method} ${t.pathTemplate?t.pathTemplate.template:t.endpoint}`+(i?`
      required: ${i}`:""))}}console.log(`
${C(e).length} tool(s)${e?` in ${e}`:""}, ${g.length} total.`)}function Ue(e,n){let a={...n.flags},t=new Map(e.params.map((o)=>[o.name,o]));Ae(e,a,n.global.location),Ve(e,a,n.global.lang);for(let o of Object.keys(a))if(!t.has(o))throw Error(`Unknown param --${o.replace(/_/g,"-")} for command "${e.name}". Run 'd4s help ${e.name}' for valid params.`);for(let o of e.params){if(a[o.name]===void 0)continue;if(o.coreType==="array")a[o.name]=Le(o,a[o.name]);if(o.coreType==="object")a[o.name]=Oe(o,a[o.name])}return a}function Ae(e,n,a){if(a===void 0)return;if(e.params.some((t)=>t.name==="location_name")){n.location_name??=a;return}if(e.params.some((t)=>t.name==="location_code")){n.location_code??=J(a,"--location");return}throw Error(`Command "${e.name}" does not accept --location`)}function Ve(e,n,a){if(a===void 0)return;if(!e.params.some((t)=>t.name==="language_code"))throw Error(`Command "${e.name}" does not accept --lang`);n.language_code??=a}function Le(e,n){if(Array.isArray(n))return n;if(typeof n!=="string")return n;let a=n.trim();if(a==="")throw Error(`--${e.name.replace(/_/g,"-")} must not be empty`);if(a.startsWith("[")){let o=O(a,e);if(!Array.isArray(o))throw Error(`--${e.name.replace(/_/g,"-")} JSON value must be an array`);return o}if(a.startsWith("{")){let o=O(a,e);if(!Q(o))throw Error(`--${e.name.replace(/_/g,"-")} JSON value must be an object`);return[o]}let t=a.split(",").map((o)=>o.trim());if(t.some((o)=>o===""))throw Error(`--${e.name.replace(/_/g,"-")} contains an empty comma-separated item`);return t}function Oe(e,n){if(typeof n!=="string")return n;let a=n.trim();if(a==="")throw Error(`--${e.name.replace(/_/g,"-")} must not be empty`);return O(a,e)}function O(e,n){try{return JSON.parse(e)}catch(a){throw Error(`--${n.name.replace(/_/g,"-")} must be valid JSON`,{cause:a})}}function Re(e){if(e===void 0||e===null)return!0;if(typeof e==="string")return e.trim()==="";if(Array.isArray(e))return e.length===0;return!1}function Q(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}function ze(e){if(!Array.isArray(e.tasks)||e.tasks.length===0)return e;let n=e.tasks[0];if(Q(n)&&"result"in n)return n.result;return n}function w(e){if(e instanceof Error)return e.message;throw Error("Caught non-Error exception")}function L(e){let n=JSON.stringify(e,null,2);return n===void 0?String(e):n}function De(e){if(e.positional[0]!==void 0)return e.positional[0];let n=e.flags.command;if(n===void 0)return;if(typeof n!=="string")throw Error("--command must be provided exactly once with a command name");return n}async function Ie(){let e=process.argv.slice(2),n;try{n=Se(process.env.D4S_DEBUG)}catch(u){console.error(w(u)),process.exit(2)}if(e.length===0)V(),process.exit(0);let a;try{a=ve(e)}catch(u){console.error(w(u)),process.exit(2)}if(a.command==="version")console.log(H),process.exit(0);if(a.command==="help"){let u=De(a);if(!u)V(),process.exit(0);Pe(P(String(u))),process.exit(0)}if(a.command==="list")Ce(a.positional[0]),process.exit(0);if(!a.command||a.command==="help")V(),process.exit(0);let t=P(a.command);if(!t)console.error(`Unknown command: ${a.command}
Run 'd4s list' for all commands or 'd4s help <command>'.`),process.exit(1);let o;try{o=Ue(t,a)}catch(u){console.error(w(u)),process.exit(2)}let i=k(t).filter((u)=>Re(o[u.name]));if(i.length)console.error(`Missing required param(s): ${i.map((u)=>"--"+u.name.replace(/_/g,"-")).join(", ")}
Run 'd4s help ${a.command}' for full details.`),process.exit(2);let r,l,d;try{r=q(t,o);let u=M(t,r);l=u.path,d=u.method}catch(u){console.error(w(u)),process.exit(2)}let s;try{if(s=B(a.global.username,a.global.password,a.global.envFile),a.global.timeout!==void 0)s.timeout=a.global.timeout}catch(u){console.error(w(u)),process.exit(1)}let c=d==="GET"?null:[r];if(n){if(console.error(`# ${d} ${l}`),c)console.error(`# body: ${JSON.stringify(c)}`)}let f;try{f=await K(l,d,c,s)}catch(u){if(u instanceof x){if(console.error(`DataForSEO error ${u.status_code}: ${u.status_message}`),a.global.raw||n)console.log(L(u.full));process.exit(1)}console.error(w(u)),process.exit(1)}if(a.global.raw){console.log(L(f));return}let m=ze(f);if(a.global.tsv){console.log(j(m,t.name));return}console.log(L(m))}Ie().catch((e)=>{if(!(e instanceof Error))console.error("Caught non-Error exception"),process.exit(1);console.error(e.stack??e.message),process.exit(1)});
