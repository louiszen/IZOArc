const Fs = require("./Fs");

( async () => {
  Fs.copyFolderRecursiveSync("./src/IZOArc/__CodeGen/cpfiles/.custom-template", "./");
  console.log("[o] Copied files to .custom-template to root. ");
  Fs.copyFolderRecursiveSync("./src/IZOArc/__CodeGen/cpfiles/.vscode", "./");
  console.log("[o] Copied files to .vscode to root. ");
  Fs.copyFileSync("./src/IZOArc/__CodeGen/cpfiles/package.json", "./");
  console.log("[o] Copied files to package.json to root. ");
})();