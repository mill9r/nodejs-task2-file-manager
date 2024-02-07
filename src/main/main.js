import {replService} from "../repl/repl.service.js";
import {executeComposerFunction} from "../composer/composer.js";
import {parseArgs} from "../cli/args.js";
import {printGoodBuyMessage, printWelcomeMessage} from "../print/print.js";
import {changeDirectory, dirPathDecorator} from "../os/navigation.js";
import {homeDir} from "../os/os.js";
import {ENTER_COMMAND, OPERATION_FAILED} from "../constants/index.js";
import {getCommand, getParams, validateCommand} from "../cli/util.js";
import {getCurrentDirName} from "../file/file-util.js";

const main = async () => {
    const args = parseArgs();
    let user = args.get('username');
    printWelcomeMessage(user);
    await dirPathDecorator(changeDirectory)(homeDir);
    console.log(ENTER_COMMAND);

    process.on('SIGINT', function () {
        printGoodBuyMessage(user);
        process.exit(2);
    });


    replService({
        exitCodeCb: printGoodBuyMessage, params: user, handleInputCb: async (input) => {
            console.log(ENTER_COMMAND)
            const command = getCommand(input);
            const params = getParams(input);

            const validatedCommand = validateCommand(command, params)
            if (validatedCommand.isValid) {
                executeComposerFunction(command, params).then((result) => {
                    if (result !== undefined) {
                        console.log(result)
                    }

                    console.log(getCurrentDirName());
                })
                    .catch(err => {
                        console.error(OPERATION_FAILED);
                    });
            }

            if (!validatedCommand.isValid) {
                console.log(validatedCommand.error)
            }
        }
    });

}


await main()
