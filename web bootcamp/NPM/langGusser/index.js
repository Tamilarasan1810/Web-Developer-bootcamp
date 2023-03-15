
import { createRequire } from "module";
const require = createRequire(import.meta.url);
 

import { franc } from "franc";
import langs from "langs";

const  langCode=franc("bonjour je suis tamil");
console.log(langCode);
if (langCode==='und')
{
    console.log("Sorry Couldn't identify the language:(");
}
else {
const language=langs.where("3", langCode);
console.log(language.name);}