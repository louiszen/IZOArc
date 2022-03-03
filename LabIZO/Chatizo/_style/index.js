let requireComponent = require.context(
  "",
  false,
  /.css$/
);

let list = {};

requireComponent.keys().forEach((fileName) => {

  let componentName = fileName
    .replace(/^\.\//, "")
    .replace(/\.\w+$/, "");

  if(componentName === "index" || componentName.startsWith("_")){ 
    return;
  }
  
  let doc = require("./" + componentName + ".css").default;
  list[componentName] = doc;

});


export default list;