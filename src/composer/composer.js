import {compress} from "../archivation/archivation.js";
import {goToUpDir} from "../os/navigation.js";
import {list} from "../file/file.service.js";

const composer = {
    'compress': compress,
    'up': goToUpDir,
    'ls': list
}

async function executeComposerFunction(input) {
    if (typeof composer[input[0]] === 'function') {
        try {
            const result = await composer[input[0]].apply(null, input);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('The specified command is not a function.');
    }
}

export {executeComposerFunction}