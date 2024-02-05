import {compress, decompress} from "./archivation.js";
import path from "node:path";
import {getCurrentDirName} from "../file/file-util.js";

export const compressFile = async (from, to) => {
    await compress(path.join(getCurrentDirName(), from), path.join(getCurrentDirName(), to))
}

export const decompressFile = async (from, to) => {
    await decompress(path.join(getCurrentDirName(), from), path.join(getCurrentDirName(), to))
}