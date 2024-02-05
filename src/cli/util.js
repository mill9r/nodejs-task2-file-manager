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


