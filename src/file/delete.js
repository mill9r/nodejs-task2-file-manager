import {unlink} from 'node:fs/promises';

const deleteFile = async (path) => await unlink(path);

export {deleteFile}