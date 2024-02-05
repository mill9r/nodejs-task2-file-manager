import {INVALID_INPUT, NEW_LINE} from "../constants/index.js";

export const getArgsAsMap = (args, argStartWith = '--') => {
    const map = new Map();
    if (!args || args.length === 0) {
        return new Map();
    }

    for (let i = 0; i < args.length; i++) {
        const [key, value] = args[i].split('=');

        if (key.startsWith(argStartWith)) {
            map.set(key.replace(argStartWith, ''), value);
            i++;
        }
    }

    return map;
}

const commands = {
    'cat': 1,
    'add': 1,
    'rn': 2,
    'cp': 2,
    'mv': 2,
    'rm': 1,
    'os': 1,
    'hash': 1,
    'compress': 2,
    'decompress': 2,
    'ls': 0,
    'cd': 1,
    'up': 0
};

const validOsCommands = ['--EOL', '--cpus', '--homedir', '--username', '--architecture'];


export const validateCommand = (command, params) => {
    if (!commands.hasOwnProperty(command)) {
        return {isValid: false, error: INVALID_INPUT};
    }

    const expectedParams = commands[command];
    if (params.length !== expectedParams) {
        return {isValid: false, error: INVALID_INPUT};
    }

    if (command === 'os') {
        if (!validOsCommands.includes(params[0])) {
            return {isValid: false, error: INVALID_INPUT};
        }
    }


    return {isValid: true};
}


export const getCommand = input => {
    const parts = input.replace(NEW_LINE, '').split(' ');
    return parts[0];
};
export const getParams = input => {
    const parts = input.replace(NEW_LINE, '').split(' ');
    return parts.slice(1);
}

