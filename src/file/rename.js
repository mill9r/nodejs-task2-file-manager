import {rename} from 'node:fs/promises';

const renameFile = async (from, to) => await rename(from, to)

export {renameFile}