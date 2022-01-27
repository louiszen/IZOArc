const Fs = require("./Fs");

( async () => {
  Fs.copyFolderRecursiveSync("./.custom-template", "./src/IZOArc/__CodeGen/cpfiles/");
  console.log("[U][v] Updated files to .custom-template to cpfiles.");
  Fs.copyFolderRecursiveSync("./.vscode", "./src/IZOArc/__CodeGen/cpfiles/");
  console.log("[U][v] Updated files to .vscode to cpfiles.");
})();