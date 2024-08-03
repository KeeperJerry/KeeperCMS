import * as fs from 'fs';

import LoggerUtils from './LoggerUtils';

export default class DirsUtils {
    public static checkDirectory(directory : string): void {
        if (!fs.existsSync(directory)) {
            fs.promises.mkdir(directory, { recursive: true });
            LoggerUtils.DEBUG(`[FILES] Create directory: ${directory}`);
        }
    }

    public static destroyFiles(dir: any) {
        if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
    }
}