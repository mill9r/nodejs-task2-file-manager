import {resolve, isAbsolute} from "node:path";
import fs from "node:fs/promises";
import {printCurrentDir} from "../print/print.js";


const goToUpDir = () => {
    const currentDir = process.cwd();
    const parentDir = resolve(currentDir, '..');
    const inNotRootDirectory = currentDir !== parentDir;

    if (inNotRootDirectory) {
        process.chdir(parentDir);
    }

}

const changeDirectory = async (path) => {
    let newPath;

    if (isAbsolute(path)) {
        newPath = path;
    } else {
        newPath = resolve(process.cwd(), path);
    }

    const isPathExist = await fs.access(newPath).then(() => true).catch(() => false);
    const isDirectory = await fs.lstat(newPath);

    isDirectory.isDirectory()

    if (isPathExist && isDirectory.isDirectory()) {
        process.chdir(newPath);
        printCurrentDir(process.cwd())
    } else {
        console.error(`The path "${newPath}" does not exist or is not a directory.`);
    }
}


export {goToUpDir, changeDirectory}