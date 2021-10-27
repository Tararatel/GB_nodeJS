/* Напишите программу, которая находит в этом файле все записи с ip-адресами 89.123.1.41 и 34.48.240.111, а также сохраняет их в отдельные файлы с названием “%ip-адрес%_requests.log”. */

const fs = require("fs");
const ACCESS_LOG = "./access.log";

let file = fs.readFileSync(ACCESS_LOG, "utf8");
let arr = file.split(/\r?\n/);
arr.forEach((line, idx) => {
  if (line.includes("89.123.1.41")) {
    fs.writeFile(
      "89.123.1.41_requests.log",
      idx + 1 + " : " + line + "\n",
      {
        encoding: "utf-8",
        flag: "a",
      },
      (err) => {
        if (err) console.log(err);
      }
    );
  }
  if (line.includes("34.48.240.111")) {
    fs.writeFile(
      "34.48.240.111_requests.log",
      idx + 1 + " : " + line + "\n",
      {
        encoding: "utf-8",
        flag: "a",
      },
      (err) => {
        if (err) console.log(err);
      }
    );
  }
});
