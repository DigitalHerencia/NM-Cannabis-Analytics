// @ts-nocheck
import fs from 'fs';
import path from 'path';
import targetFiles from './targetUtility.js';

const writeMarkdownFile = async (content, filePath) => {
  try {
    await fs.promises.writeFile(filePath, content, 'utf8');
    console.log(`Markdown file written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing markdown file: ${error.message}`);
    throw error;
  }
};

const generateMarkdownContent = async (files) => {
  const categorizedFiles = files.reduce((acc, file) => {
    let category = path.basename(path.dirname(file));
    if (file.includes("scenes")) {
      category = "scenes";
    }
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(file);
    return acc;
  }, {});

  const markdownContents = {};

  for (const [category, files] of Object.entries(categorizedFiles)) {
    let markdownContent = `# ${category}\n\n`;
    for (const file of files) {
      console.log(`Reading file: ${file}`);
      try {
        const fileContent = await fs.promises.readFile(file, 'utf8');
        markdownContent += `## ${file}\n\n`;
        markdownContent += "```javascript\n";
        markdownContent += fileContent;
        markdownContent += "\n```\n\n";
      } catch (error) {
        console.error(`Error reading file ${file}: ${error.message}`);
      }
    }
    markdownContents[category] = markdownContent;
  }

  return markdownContents;
};

const main = async () => {
  try {
    const outputDir = process.argv[2];
    const files = targetFiles;

    const markdownContents = await generateMarkdownContent(files);

    for (const [category, content] of Object.entries(markdownContents)) {
      if (category !== 'server-files' && category !== 'client-files') { // Exclude specified categories
        const outputFilePath = path.join(outputDir, `${category}Arch.md`);
        await writeMarkdownFile(content, outputFilePath);
      }
    }
  } catch (error) {
    throw new Error(`An error occurred during processing: ${error.message}`);
  }
};

main();
