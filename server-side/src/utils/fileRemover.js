import fs from "fs";

export default function fileRemover(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        console.error("Error removing local file:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
