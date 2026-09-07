import fs from 'node:fs';
import path from 'node:path';
import {parseEnv} from 'node:util';
const runtime=parseEnv(fs.readFileSync('.env.local','utf8'));
const clientRoot='.next/static';
const files=fs.readdirSync(clientRoot,{recursive:true}).filter(p=>fs.statSync(path.join(clientRoot,p)).isFile());
let leaked=false,serverCode=false;
for(const f of files){const text=fs.readFileSync(path.join(clientRoot,f),'utf8');if(runtime.RESEND_API_KEY&&text.includes(runtime.RESEND_API_KEY))leaked=true;if(/RESEND_API_KEY|api\.resend\.com|INQUIRY_FROM_EMAIL|INQUIRY_TO_EMAIL/.test(text))serverCode=true;}
console.log(JSON.stringify({clientFilesChecked:files.length,credentialValueFound:leaked,serverEmailCodeFound:serverCode}));
if(leaked||serverCode)process.exit(1);
