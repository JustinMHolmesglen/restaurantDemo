export function getFileFromUrl(downloadUrl){
const baseUrl = `mongodb://localhost:37017/` 
let fileGlob = downloadUrl.replace(baseUrl, "");

//remove end of url string
const indexOfEndPath = fileGlob.indexOf("?");
fileGlob = fileGlob.substring(0, indexOfEndPath)

//return existing fileglob
console.log(`generated fileFlob : ${fileGlob}`)
return fileGlob;

}