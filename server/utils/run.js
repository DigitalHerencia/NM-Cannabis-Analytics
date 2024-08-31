// @ts-nocheck
import { exec } from "child_process"
import fs from "fs"
import path from "path"
import {
    createPlaceholderFiles,
    createTimestampedDir,
    initSetup,
    verifySetup,
} from "./helperUtility.js"

// Define the output directory and log file paths
const outputDir = path.resolve(
    "H:/DigitalHerencia/.environments/DigitalHerencia_CompetitiveAdvantage/.vscode/.md"
)
const logFilePath = path.join(outputDir, "run_log.md")
const errorLogFilePath = path.join(outputDir, "run_error_log.md")

// Ensure the directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
}

const formatDate = (date) => {
    return date.toISOString().replace(/T/, " ").replace(/\..+/, "")
}

const logMessage = (message) => {
    const logEntry = `${formatDate(new Date())}: ${message}\n`
    console.log(message)
    fs.appendFileSync(logFilePath, logEntry)
}

const logError = (error) => {
    const errorEntry = `${formatDate(new Date())}: ${error}\n`
    console.error(error)
    fs.appendFileSync(errorLogFilePath, errorEntry)
}

const executeScript = (scriptPath, outputDir) => {
    return new Promise((resolve, reject) => {
        exec(`node ${scriptPath} ${outputDir}`, (error, stdout, stderr) => {
            if (error) {
                logError(`Error executing ${scriptPath}: ${error.message}`)
                reject(error)
            } else {
                logMessage(`Output from ${scriptPath}: ${stdout}`)
                if (stderr) {
                    logError(`Stderr from ${scriptPath}: ${stderr}`)
                }
                resolve(stdout)
            }
        })
    })
}

const runTools = async () => {
    let attempts = 0
    while (attempts < 5 && !verifySetup()) {
        logMessage(`Attempt ${attempts + 1}: Initializing setup...`)
        initSetup()
        attempts++
    }

    if (verifySetup()) {
        try {
            const timestampedDir = createTimestampedDir()
            const evalDir = path.join(timestampedDir, "reports")
            const archDir = path.join(timestampedDir, "archive")

            fs.mkdirSync(evalDir, { recursive: true })
            fs.mkdirSync(archDir, { recursive: true })

            createPlaceholderFiles(timestampedDir)

            logMessage("Starting both tools...")

            const archiveScriptPath = path.resolve(
                "H:/DigitalHerencia/.environments/DigitalHerencia_CompetitiveAdvantage/server/utils/archiveUtility.js"
            )
            const evalScriptPath = path.resolve(
                "H:/DigitalHerencia/.environments/DigitalHerencia_CompetitiveAdvantage/server/utils/evalUtility.js"
            )

            const archiveOutput = await executeScript(
                archiveScriptPath,
                archDir
            )
            const evalOutput = await executeScript(evalScriptPath, evalDir)

            const archiveFiles = fs.readdirSync(archDir).length
            const evalFiles = fs.readdirSync(evalDir).length

            const summary = `
            Summary:
            =========
            - Files Analyzed: ${archiveFiles + evalFiles}
            - Archive Files Created: ${archiveFiles}
            - Evaluation Files Created: ${evalFiles}

            Evaluation Summary:
            ===================
            ${evalOutput}

            Archive Summary:
            =================
            ${archiveOutput}
            `

            logMessage(summary)
            logMessage("Both tools executed successfully.")
        } catch (error) {
            logError(`An error occurred during execution: ${error.message}`)
        }
    } else {
        logError(
            "Helper function failed to set up the output directory and files after 5 attempts."
        )
        throw new Error(
            "Helper function failed to set up the output directory and files after 5 attempts."
        )
    }
}

runTools()
