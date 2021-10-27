const readline = require("linebyline");
const fs = require("fs");

const rl = readline("./access.log");

rl.on("line", function (line, lineCount, byteCount) {
  if (line.includes("89.123.1.41")) {
    fs.appendFileSync(
      "89.123.1.41_requests.log",
      lineCount + " : " + line + "\n"
    );
  }
  if (line.includes("34.48.240.111")) {
    fs.appendFileSync(
      "34.48.240.111_requests.log",
      lineCount + " : " + line + "\n"
    );
  }
});

rl.on("error", function (e) {
  console.log(e);
});
