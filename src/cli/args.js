import {getArgsAsMap} from "./util.js";

const parseArgs = () => {
    const paramsStartFrom = 2
    return getArgsAsMap(process.argv.slice(paramsStartFrom));
};

export {parseArgs}
