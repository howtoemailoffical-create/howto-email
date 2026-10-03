import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd(), content=path.join(root,'src/content/articles'), pages=path.join(root,'src/pages');
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/\.(md|mdx)$/.test(e.name))files.push(p)}}
walk(content);
const errors=[],warnings=[],slugs=new Map();
for(const file of files){
 const rel=path.relative(content,file).replaceAll('\\','/'),text=fs.readFileSync(file,'utf8');
 if(!text.startsWith('---\n')){errors.push(`${rel}: missing YAML frontmatter`);continue}
 const end=text.indexOf('\n---',4);if(end<0){errors.push(`${rel}: unterminated frontmatter`);continue}
 const fm=text.slice(4,end);
 for(const key of ['title','description','section'])if(!new RegExp('^'+key+':\\s*.+$','m').test(fm))errors.push(`${rel}: missing ${key}`);
 for(const line of fm.split('\n'))if(/^(title|description):\s+[^"'|>].*:\s/.test(line))errors.push(`${rel}: quote YAML value containing a colon -> ${line}`);
 const slug=rel.replace(/\.(md|mdx)$/,'');if(slugs.has(slug))errors.push(`duplicate article slug: ${slug}`);slugs.set(slug,file);
 if(!/## Reference material\s*$/m.test(text))warnings.push(`${rel}: no Reference material section`);
}
const known=new Set([...slugs.keys()].map(s=>'/'+s+'/'));
function walkPages(dir){if(!fs.existsSync(dir))return;for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walkPages(p);else if(/\.astro$/.test(e.name)){const rel=path.relative(pages,p).replaceAll('\\','/').replace(/\.astro$/,'');known.add(rel==='index'?'/':'/'+rel.replace(/\/index$/,'')+'/')}}}
walkPages(pages);
const linkRe=/\]\((\/[^)#?]+\/?)(?:[?#][^)]*)?\)|href=["'](\/[^"'#?]+\/?)/g;
for(const file of files){const rel=path.relative(content,file).replaceAll('\\','/'),text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(linkRe)){let u=m[1]||m[2];if(!u||u.startsWith('/api/'))continue;if(!u.endsWith('/'))u+='/';if(!known.has(u))warnings.push(`${rel}: internal link target not found: ${u}`)}}
if(warnings.length){console.log('\nWarnings:');warnings.forEach(x=>console.log('  - '+x))}
if(errors.length){console.error('\nValidation errors:');errors.forEach(x=>console.error('  - '+x));process.exit(1)}
console.log(`Validated ${files.length} articles with no blocking content errors.`);
