import {readdir} from 'node:fs/promises';

const readDir = async (path) => await readdir(path, { withFileTypes: true })

export {readDir}