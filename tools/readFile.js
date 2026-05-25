import { readFile } from "node:fs/promises";

async function readFileContent(filePath) {
    try {
        const contents = await readFile(filePath, { encoding: 'utf-8' });
        console.log(`Content of ${filePath}: ${contents}`);
    } catch (error) {
        console.error(`Error reading file: ${error}`);
    }
}

export default readFileContent;