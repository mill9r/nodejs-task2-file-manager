import {createInterface} from 'readline';

function replService({exitCodeCb, params, handleInputCb, exitCb, exitParams}) {
    const rl = createInterface({input: process.stdin, output: process.stdout});
    rl.on('close', () => {
        exitCodeCb(params);
        process.exit();
    });
    rl.on('line', async (line) => {
        if (line.trim() === '.exit') {
            exitCb && exitCb(exitParams);
            rl.close();
            return;
        }

        if (line.trim() === '') {
            rl.prompt();
            return;
        }

        await handleInputCb(line);
        rl.prompt();
    });

    return rl;
}


export {replService};
