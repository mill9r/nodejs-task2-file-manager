import {inputStream, outputStream} from "../cli/cli.js";
import {Transform} from 'stream';
import {executeComposerFunction} from "../composer/composer.js";
import {parseArgs} from "../cli/args.js";
import {printGoodBuyMessage, printWelcomeMessage} from "../print/print.js";
import {changeDirectory} from "../os/navigation.js";
import {homeDir} from "../os/os.js";
import {ENTER_COMMAND, NEW_LINE} from "../constants/index.js";
import {getCommand, getParams, validateCommand} from "../cli/util.js";

const main = async () => {
    const args = parseArgs();
    let user = args.get('username');
    printWelcomeMessage(user);
    await changeDirectory(homeDir);
    console.log(ENTER_COMMAND)

    process.on('SIGINT', function () {
        printGoodBuyMessage(user);
        process.exit(2);
    });


    const transform = async () => {
        const transform = new Transform({
            transform(chunk, encoding, callback) {
                try {
                    const command = getCommand(chunk.toString());
                    const params = getParams(chunk.toString());

                    const validatedCommand = validateCommand(command, params)
                    if (validatedCommand.isValid) {
                        executeComposerFunction(command, params).then((result) => {
                            console.log(result)
                            const content = `Enter command${NEW_LINE}`;
                            this.push(content);
                            callback();
                        })
                            .catch(err => {
                                console.error('Operation failed');
                                callback();
                            });
                    }

                    if (!validatedCommand.isValid) {
                        console.log(validatedCommand.error)
                        callback()
                    }
                } catch (err) {
                    console.error('Operation failed');
                }
            }
        })


        inputStream.pipe(transform).pipe(outputStream);
    };

    await transform()
}


await main()