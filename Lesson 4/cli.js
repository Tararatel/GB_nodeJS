const fs = require("fs");
const path = require("path");
const readline = require("readline");
const inquirer = require("inquirer");

const isFile = (path) => fs.lstatSync(path).isFile();
const filesList = (path) => fs.readdirSync(path);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = async (query) =>
  new Promise((resolve) => rl.questions(query, resolve));
(async () => {
  const query = await questions("What are we looking for? ");
  const data = await funcInquirer(__dirname);

  const regex = new RegExp(query, "g");
  const foundMatches = data.match(regex);

  if (foundMatches !== null)
    console.log(`Matches found: ${foundMatches.length}`);
  else console.log("No matches found");

  rl.close();
})();

const funcInquirer = (pathToFiles) =>
  inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "In which file are we looking for matches?",
        choices: filesList(pathToFiles),
      },
    ])
    .then((answer) => {
      const name = answer.fileName;
      const fullPath = path.resolve(pathToFiles, name);

      if (isFile(fullPath)) {
        const data = fs.readFileSync(fullPath, "utf-8");
        return data;
      } else {
        return funcInquirer(fullPath);
      }
    });
