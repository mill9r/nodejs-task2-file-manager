import {compress} from "../archivation/archivation.js";
import {changeDirectory, goToUpDir} from "../os/navigation.js";
import {createFile, list, readFile} from "../file/file.service.js";
import {processOsCommand} from "../os/os.service.js";
import {getHash} from "../hash/hash.service.js";
import {compressFile, decompressFile} from "../archivation/archivation.service.js";

const composer = {
    'up': goToUpDir,
    'ls': list,
    'cd': changeDirectory,
    'add': createFile,
    'cat': readFile,
    'os': processOsCommand,
    'hash': getHash,
    'compress': compressFile,
    'decompress': decompressFile
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