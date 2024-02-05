import {calculateHash} from "./hash.js";
import path from "node:path";
import {getCurrentDirName} from "../file/file-util.js";

const getHash = async (name) => calculateHash(path.join(getCurrentDirName(), name));
export {getHash}