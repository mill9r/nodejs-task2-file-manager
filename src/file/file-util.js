import {join} from "path";
import fs from 'fs/promises'

const getCurrentDirName = () => {
    return process.cwd()
}

const doesDirectoryExist = async (path) => {
    try {
        await fs.access(path)
        return true
    } catch (error) {
        return false
    }
}


const doesFileExist = async (dir, file) => {
    try {
        if (!await doesDirectoryExist(dir)) {
            return false
        }
        const stats = await fs.stat(join(dir, file))
        return stats.isFile()
    } catch (error) {
        return false
    }
}

export {getCurrentDirName, doesDirectoryExist, doesFileExist}

