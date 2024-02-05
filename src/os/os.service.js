import {architectureType, cpusCount, EOL, homeDir, userName} from "./os.js";

const osCommandsMap = {
    '--EOL': EOL,
    '--cpus': cpusCount,
    '--username': userName,
    '--homedir': homeDir,
    '--architecture': architectureType
}

const processOsCommand = (key) => {
    return osCommandsMap[key];
}

export {processOsCommand}