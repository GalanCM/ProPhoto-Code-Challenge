var child_process = require('child_process');

console.log("Installing dependencies…")
child_process.exec("yarn install", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`${stdout}`);

  console.log("\n\nBuilding Plugin…");
  child_process.exec("node node_modules/.bin/webpack -p", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`${stdout}`);
  });
});
