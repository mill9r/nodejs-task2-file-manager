import {inputStream, outputStream} from "../cli/cli.js";
import {Transform} from 'stream';
import {executeComposerFunction} from "../composer/composer.js";
import {parseArgs} from "../cli/args.js";
import {printGoodBuyMessage, printWelcomeMessage} from "../print/print.js";
import {changeDirectory} from "../os/navigation.js";
import {homeDir} from "../os/os.js";
import {ENTER_COMMAND} from "../constants/index.js";

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
                const input = chunk.toString().split(' ').map(i => i.replace('\r\n', ''))
                console.log(input)
                executeComposerFunction(input).then(() => {
                    const content = 'Enter command\r\n';
                    this.push(content);
                    callback();
                })
                    .catch(err => {
                        console.error('Operation failed');
                        callback();
                    });

            }
        })


        inputStream.pipe(transform).pipe(outputStream);
    };

    await transform()
}


await main()