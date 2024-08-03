import * as dotenv from 'dotenv';
dotenv.config();

import EasyUtils from "../utils/EasyUtils";

export default class GeneralConfig {
    static debug : boolean = EasyUtils.parseBoolean(process.env.APP_DEBUG);
    static host : string | undefined = process.env.APP_HOST;
    static port : string | undefined = process.env.APP_PORT;
    
    static timezone : string | undefined = process.env.TIME_ZONE;
}