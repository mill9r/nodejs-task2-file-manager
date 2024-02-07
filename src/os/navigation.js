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

const isPathExist = async (path) => await fs.access(path).then(() => true).catch(() => false);

const changeDirectory = async (path) => {
    let newPath;

    if (isAbsolute(path)) {
        newPath = path;
    } else {
        newPath = resolve(process.cwd(), path);
    }

    const isDirectory = await fs.lstat(newPath);

    isDirectory.isDirectory()

    if (await isPathExist(newPath) && isDirectory.isDirectory()) {
        process.chdir(newPath);
        printCurrentDir(process.cwd())
    } else {
        console.error(`The path "${newPath}" does not exist or is not a directory.`);
    }
}


const dirPathDecorator = (fn) => {
    return async (from, to) => {
        const isAbsolutePathValid = from && isAbsolute(from);
        const callAbsolutePath = isAbsolutePathValid && ((to && await isPathExist(to) && await isPathExist(from)) || await isPathExist(from));

        if (isAbsolutePathValid && callAbsolutePath) {
            return await fn(from, to);
        } else {
            return await fn(resolve(process.cwd(), from), to && resolve(process.cwd(), to));
        }

    }
}


export {goToUpDir, changeDirectory, dirPathDecorator}


