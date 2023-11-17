import * as fs from "node:fs";

fs.readFile(
  "Use a method with a callback.txt",
  { encoding: "utf-8" },
  function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  }
);
