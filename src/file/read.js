import {readFile as readFileAsync} from 'node:fs/promises';

const readFile = async (path) => await readFileAsync(path, {encoding: 'utf-8'});

export {readFile}