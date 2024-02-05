import {readDir} from "./list.js";
import {getCurrentDirName} from "./file-util.js";
import {DirContentPattern, printTable} from "../print/print.js";
import {create} from "./create.js";
import path from "node:path";
import {read} from "./read.js";

const DIRECTORY = 'directory';
const FILE = 'file';

const list = async () => {
    const currentDir = getCurrentDirName();
    const result = await readDir(currentDir);
    const directories = [];
    const files = [];

    result.forEach((item) => {
        if (item.isDirectory()) {
            directories.push(item);
        } else {
            files.push(item);
        }
    });

    directories.sort();
    files.sort();

    const preparedDirsForPrint = directories.map(item => new DirContentPattern(item.name, DIRECTORY));

    const preparedFilesForPrint = files.map(item => new DirContentPattern(item.name, FILE));


    printTable([...preparedDirsForPrint, ...preparedFilesForPrint])
}

const createFile = async (name) => {
    await create(path.join(getCurrentDirName(), name), '')
}

const readFile = async (name) => {
    console.log(await read(path.join(getCurrentDirName(), name)));
}


export {list, createFile, readFile}