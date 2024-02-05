import {readFile as readFileAsync} from 'node:fs/promises';

const read = async (path) => await readFileAsync(path, {encoding: 'utf-8'});

export {read}