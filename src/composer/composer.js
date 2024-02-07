import {changeDirectory, dirPathDecorator, goToUpDir} from "../os/navigation.js";
import {processOsCommand} from "../os/os.service.js";
import {calculateHash} from "../hash/hash.js";
import {compress, decompress} from "../archivation/archivation.js";
import {create} from "../file/create.js";
import {read} from "../file/read.js";
import {list} from "../os/read-directories.js";
import {copy} from "../file/copy.js";
import {renameFile} from "../file/rename.js";
import {deleteFile} from "../file/delete.js";

const composer = {
    'up': goToUpDir,
    'ls': list,
    'cd': changeDirectory,
    'add': dirPathDecorator(create),
    'cat': dirPathDecorator(read),
    'cp': dirPathDecorator(copy),
    'mv': dirPathDecorator(renameFile),
    'rm': dirPathDecorator(deleteFile),
    'os': processOsCommand,
    'hash': dirPathDecorator(calculateHash),
    'compress': dirPathDecorator(compress),
    'decompress': dirPathDecorator(decompress)
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
