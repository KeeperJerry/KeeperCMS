import * as dotenv from 'dotenv';
import * as path from 'path';

import EasyUtils from '../utils/EasyUtils';
dotenv.config();

export default class FilesConfig {
    /**
     * Настройка логирования
     */
    static Logs = class {
        static dir : string = path.resolve(`logs`);
        static file : string = `backend.log`;
        /**
         * Удалять ли лог при перезапуске?
         */
        static reset : boolean = EasyUtils.parseBoolean(process.env.LOGGER_RESET_FILE);
    }

    /**
     * Настройка ключей шифрования
     */
    static Keys = class {
        static dir : string = path.resolve(`keys`);
        
        static privateKey : string = `private.pem`;
        static publicKey : string = `public.pem`;
    }
}