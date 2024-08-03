import * as dotenv from 'dotenv';
dotenv.config();

import EasyUtils from "../utils/EasyUtils";

/**
 * Настройка подключения к базе данных
 */
export default class SQLConfigs {
    public static host : string | undefined = process.env.DB_HOST;
    public static port : number = Number(process.env.DB_PORT) || 3306;
    public static database : string | undefined = process.env.DB_DATABASE;
    public static user : string | undefined = process.env.DB_USERNAME;
    public static password : string | undefined = process.env.DB_PASSWORD;

    public static sync : boolean = EasyUtils.parseBoolean(process.env.DB_SYNC);
}