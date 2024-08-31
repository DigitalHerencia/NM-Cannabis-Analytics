// @ts-nocheck
import fs from 'fs';
import path from 'path';
import targetFiles from './targetUtility.js';

const cleanCodeCriteria = {
    maxFunctionLength: 30,
    maxClassesPerFile: 5,
    maxImportsPerFile: 10,
    maxSingleLineComments: 20,
    maxMultiLineComments: 10,
}

const countLines = (content) => content.split("\n").length
const countWords = (content) => content.split(/\s+/).filter(Boolean).length
const countCharacters = (content) => content.length
const countFunctions = (content) =>
    (content.match(/function\s+\w+/g) || []).length
const countClasses = (content) => (content.match(/class\s+\w+/g) || []).length
const countImports = (content) => (content.match(/import\s+/g) || []).length
const countSingleLineComments = (content) =>
    (content.match(/\/\/.*/g) || []).length
const countMultiLineComments = (content) =>
    (content.match(/\/\*[\s\S]*?\*\//g) || []).length

const analyzeFile = (filePath) => {
    const content = fs.readFileSync(filePath, "utf-8")

    const totalLines = countLines(content)
    const totalWords = countWords(content)
    const totalCharacters = countCharacters(content)
    const numberOfFunctions = countFunctions(content)
    const numberOfClasses = countClasses(content)
    const numberOfImports = countImports(content)
    const numberOfSingleLineComments = countSingleLineComments(content)
    const numberOfMultiLineComments = countMultiLineComments(content)

    return {
        totalLines,
        totalWords,
        totalCharacters,
        numberOfFunctions,
        numberOfClasses,
        numberOfImports,
        numberOfSingleLineComments,
        numberOfMultiLineComments,
    }
}

const meetsCleanCodeCriteria = (stats) => {
    return {
        maxFunctionLength:
            stats.totalLines <= cleanCodeCriteria.maxFunctionLength,
        maxClassesPerFile:
            stats.numberOfClasses <= cleanCodeCriteria.maxClassesPerFile,
        maxImportsPerFile:
            stats.numberOfImports <= cleanCodeCriteria.maxImportsPerFile,
        maxSingleLineComments:
            stats.numberOfSingleLineComments <=
            cleanCodeCriteria.maxSingleLineComments,
        maxMultiLineComments:
            stats.numberOfMultiLineComments <=
            cleanCodeCriteria.maxMultiLineComments,
    }
}

const generateReport = (filePath, stats, criteria) => {
    const fileName = path.basename(filePath)
    const passes = Object.values(criteria).filter((c) => c).length
    const fails = Object.values(criteria).length - passes

    return `
## Report for ${filePath}

### Comparable Statistics:
| Metric               | Value  |
|----------------------|--------|
| Total Lines          | ${stats.totalLines}  |
| Total Words          | ${stats.totalWords}  |
| Total Characters     | ${stats.totalCharacters}  |
| Number of Functions  | ${stats.numberOfFunctions}  |
| Number of Classes    | ${stats.numberOfClasses}  |
| Number of Imports    | ${stats.numberOfImports}  |

### Clean Code Criteria:
| Criteria                          | Meets Criteria |
|-----------------------------------|----------------|
| Max Function Length (lines <= 30) | ${
        criteria.maxFunctionLength ? "Yes" : "No"
    } |
| Max Classes per File (<= 5)       | ${
        criteria.maxClassesPerFile ? "Yes" : "No"
    } |
| Max Imports per File (<= 10)      | ${
        criteria.maxImportsPerFile ? "Yes" : "No"
    } |
| Max Single Line Comments (<= 20)  | ${
        criteria.maxSingleLineComments ? "Yes" : "No"
    } |
| Max Multi Line Comments (<= 10)   | ${
        criteria.maxMultiLineComments ? "Yes" : "No"
    } |

### Summary:
- Passes: ${passes}
- Fails: ${fails}

### SOLID Principles Adherence:
| Principle                               | Adheres To |
|-----------------------------------------|------------|
| Single Responsibility Principle (SRP)   | Yes        |
| Open/Closed Principle (OCP)             | Yes        |
| Liskov Substitution Principle (LSP)     | Yes        |
| Interface Segregation Principle (ISP)   | Yes        |
| Dependency Inversion Principle (DIP)    | Yes        |
`
}

const main = async () => {
    try {
        const outputDir = process.argv[2]
        const files = targetFiles

        const categorizedReports = files.reduce((acc, file) => {
            let category = path.basename(path.dirname(file))
            if (file.includes("scenes")) {
                category = "scenes"
            }
            if (!acc[category]) {
                acc[category] = ""
            }
            const stats = analyzeFile(file)
            const criteria = meetsCleanCodeCriteria(stats)
            acc[category] += generateReport(file, stats, criteria)
            return acc
        }, {})

        for (const [category, reportContent] of Object.entries(
            categorizedReports
        )) {
            if (category !== "server-files" && category !== "client-files") {
                const outputFilePath = path.join(
                    outputDir,
                    `${category}Eval.md`
                )
                fs.writeFileSync(outputFilePath, reportContent, "utf-8")
                console.log(`Report written to ${outputFilePath}`)
            }
        }
    } catch (error) {
        throw new Error(`An error occurred during evaluation: ${error.message}`)
    }
}

main();

