import fs from "fs";
import zlib from "zlib";
import {OPERATION_FAILED} from "../constants/index.js";

const compress = (inPath, outPath) => {
    return new Promise((resolve, reject) => {
        try {
            const zlibStream = zlib.createBrotliCompress();
            const {inStream, outStream} = getFileStreams(inPath, outPath, reject);
            inStream.pipe(zlibStream).pipe(outStream);

            inStream.on('close', resolve);
        } catch (error) {
            reject(new Error(OPERATION_FAILED));
        }

    })

}

const decompress = (inPath, outPath) => {
    return new Promise((resolve, reject) => {
        try {
            const zlibStream = zlib.createBrotliDecompress();
            const {inStream, outStream} = getFileStreams(inPath, outPath, reject);
            inStream.pipe(zlibStream).pipe(outStream);
            inStream.on('close', resolve);
        } catch (error) {
            reject(new Error(OPERATION_FAILED));
        }
    })
}

const getFileStreams = (inPath, outPath, reject) => {

    const inStream = fs.createReadStream(inPath)
    const outStream = fs.createWriteStream(outPath)
    inStream.on('error', () => {
        reject(new Error(OPERATION_FAILED));
    });
    outStream.on('error', () => {
        reject(new Error(OPERATION_FAILED));
    });
    return {
        inStream,
        outStream,
    }


}

export {compress, decompress}
