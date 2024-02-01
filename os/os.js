import os from 'os';
import {serializeData} from "../serializer/serilalizer.js";

const cpusCount = os.cpus().length

const homeDir = os.homedir();

const userName = os.userInfo().username;

const architectureType = os.arch();

const EOL = serializeData(os.EOL);

export {cpusCount, homeDir, userName, architectureType, EOL};
