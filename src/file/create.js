import {writeFile} from 'node:fs/promises';

const create = async (path) => await writeFile(path)

export {create}