const glob = require("glob");
const fs = require("fs");
const md5 = require("md5");
const path = require("path");

let files = glob.sync("svelte_js/public/build/*.{js,css}");
const manifest = files.map(p => {
  const extension = p.endsWith(".js") ? ".js" : ".css"
  const pathMd5 = `-${md5(fs.readFileSync(p))}${extension}`;
  const fname = path.basename(p);
  return [fname, fname.replace(extension, pathMd5), p];
});
let obj = {};
if (!fs.existsSync("public/packs")) {
  fs.mkdirSync("public/packs");
}
manifest.forEach(x => {
  obj[x[0]] = x[1];
  let output = `public/packs/${x[1]}`;
  fs.copyFile(x[2], output, (err) => {
    if (err) { throw err }
    console.log(output);
  })
})

fs.writeFile("public/packs/manifest.json", JSON.stringify(obj, null, 2), (err) => {
  if (err) { throw new err };
  console.log("ok")
});