import {copyFile} from 'node:fs/promises';

const copy = async (from, to) => await copyFile(from, to);


export {copy}