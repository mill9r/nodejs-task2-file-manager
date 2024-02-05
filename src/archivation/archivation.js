import fs from "fs";
import zlib from "zlib";

const compress = (inPath, outPath) => {
    const zlibStream = zlib.createBrotliCompress();
    const {inStream, outStream} = getFileStreams(inPath, outPath);
    inStream.pipe(zlibStream).pipe(outStream);
}

const decompress = (inPath, outPath) => {
    const zlibStream = zlib.createBrotliDecompress();
    const {inStream, outStream} = getFileStreams(inPath, outPath);
    inStream.pipe(zlibStream).pipe(outStream);
}

const getFileStreams = (inPath, outPath) => {
    return {
        inStream: fs.createReadStream(inPath),
        outStream: fs.createWriteStream(outPath)
    }
}

export {compress, decompress}
