import {writeFile} from 'node:fs/promises';

const create = async (path, name) => await writeFile(path, name)

export {create}