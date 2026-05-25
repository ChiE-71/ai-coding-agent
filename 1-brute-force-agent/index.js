import readFileContent from "./tools/readFile.js";
import createFile from "./tools/createFile.js";

// const prompt = process.argv[2];

const ollama = "http://localhost:11434/api/generate";

async function fetchData() {
  try {
    const response = await fetch(ollama, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen3:8b",
        prompt:
          'You are a coding assistant. You MUST respond in valid JSON only. Follow this format:{"tool": "","path": "","content": ""}. Use the createFile tool to write and create new file. Use readFile to read and understand a file. explain to me the test.html file in this directory',
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok :" + response.statusText);
    }

    const data = await response.json();
    let cleanedResponse = data.response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    console.log(cleanedResponse);
    if (data.response) {
      const { tool, path, content } = JSON.parse(cleanedResponse);
      if (tool === "createFile") {
        createFile(path, content);
      } else if (tool === "readFile") {
        readFileContent(path);
      } else {
        console.error("Unknown tool specified in the response.");
      }
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

fetchData();
