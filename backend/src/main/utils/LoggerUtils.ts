import * as fs from 'fs';
import * as path from 'path';

import GeneralConfig from '../configs/GeneralConfig';
import FilesConfig from '../configs/FilesConfig';
import DateUtils from './DateUtils';

export default class LoggerUtils {
    public static DEBUG(input: string) {
        const output = `${DateUtils.getLoggerDate()} [${`DEBUG`}] ${input}`;
        if(GeneralConfig.debug) {
            console.log(output);
            this.inputLog(output);
        }
    }

    public static INFO(input: string) {
        const output = `${DateUtils.getLoggerDate()} [${` INFO`}] ${input}`;
        console.log(output);
        this.inputLog(output);
    }

    public static ERROR(input: string) {
        const output = `${DateUtils.getLoggerDate()} [${`ERROR`}] ${input}`;
        console.log(output);
        this.inputLog(output);
    }

    private static inputLog(input: string) {
        fs.appendFile(path.join(FilesConfig.Logs.dir, FilesConfig.Logs.file), `${input}\n`,
            (err) => {
                // if(err) throw err;
                // console.log('Data has been added!');
            }
        );
    }
}