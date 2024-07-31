// @ts-nocheck
import fs from 'fs';
import path from 'path';

const outputDir = "H:\\DigitalHerencia\\.environment\\DigitalHerencia_CompetitiveAdvantage\\.vscode\\.md";
const requiredFiles = [
  'run_log.md',
  'run_error_log.md'
];

const createTimestampedDir = () => {
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];
  const timestampedDir = path.join(outputDir, timestamp);
  fs.mkdirSync(timestampedDir, { recursive: true });
  return timestampedDir;
};

const createPlaceholderFiles = (dir) => {
  const evalDir = path.join(dir, 'reports');
  const archDir = path.join(dir, 'archive');
  fs.mkdirSync(evalDir, { recursive: true });
  fs.mkdirSync(archDir, { recursive: true });

  const evalFiles = [
    'controllersEval.md',
    'routesEval.md',
    'scenesEval.md',
    'componentsEval.md',
    'server-filesEval.md',
    'stateEval.md',
    'client-filesEval.md'
  ];

  const archFiles = [
    'controllersArch.md',
    'routesArch.md',
    'scenesArch.md', // all scene files will be compiled here
    'componentsArch.md',
    'server-filesArch.md',
    'stateArch.md',
    'client-filesArch.md'
  ];

  evalFiles.forEach(file => {
    const evalFilePath = path.join(evalDir, file);
    if (!fs.existsSync(evalFilePath)) {
      fs.writeFileSync(evalFilePath, '');
    }
  });

  archFiles.forEach(file => {
    const archFilePath = path.join(archDir, file);
    if (!fs.existsSync(archFilePath)) {
      fs.writeFileSync(archFilePath, '');
    }
  });
};

const checkAndCreateDirs = () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
};

const checkAndCreateFiles = () => {
  requiredFiles.forEach((file) => {
    const filePath = path.join(outputDir, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
    }
  });
};

const verifySetup = () => {
  let setupComplete = true;
  if (!fs.existsSync(outputDir)) {
    setupComplete = false;
  }
  requiredFiles.forEach((file) => {
    const filePath = path.join(outputDir, file);
    if (!fs.existsSync(filePath)) {
      setupComplete = false;
    }
  });
  return setupComplete;
};

const initSetup = () => {
  try {
    checkAndCreateDirs();
    checkAndCreateFiles();
    return verifySetup();
  } catch (error) {
    console.error(`Initialization error: ${error.message}`);
    return false;
  }
};

export { createPlaceholderFiles, createTimestampedDir, initSetup, verifySetup };

