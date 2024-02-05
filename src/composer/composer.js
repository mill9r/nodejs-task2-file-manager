import {compress} from "../archivation/archivation.js";
import {changeDirectory, goToUpDir} from "../os/navigation.js";
import {createFile, list, readFile} from "../file/file.service.js";

const composer = {
    'compress': compress,
    'up': goToUpDir,
    'ls': list,
    'cd': changeDirectory,
    'add': createFile,
    'cat': readFile
}

async function executeComposerFunction(command, params) {
    if (typeof composer[command] === 'function') {
        try {
            return await composer[command].apply(null, params);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('The specified command is not a function.');
    }
}

export {executeComposerFunction}