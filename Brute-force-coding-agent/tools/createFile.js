import { writeFile } from "node:fs/promises";

function createFile(filePath, contents) {
  try {
    console.log(filePath, contents);
    const filePath = process.argv[2];
    const contents = process.argv[3];
    writeFile(filePath, contents);
    console.log(`File created at ${filePath}`);
  } catch (error) {
    console.error(`Error creating file: ${error}`);
  }
}

export default createFile;
