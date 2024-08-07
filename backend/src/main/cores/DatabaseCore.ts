import { DataSource } from 'typeorm';

import SQLConfigs from "../configs/SQLConfigs";
import LoggerUtils from '../utils/LoggerUtils';

import UsersEntity from '../orm/entity/UsersEntity';
import PlayersEntity from '../orm/entity/MCPlayersEntity';
import MCSessionsEntity from '../orm/entity/MCSessionsEntity';
import GeneralConfig from '../configs/GeneralConfig';

/**
 * Класс с интерфейсом базы данных
 */
export default class DatabaseCore {
    public static pool = new DataSource({
        type: "mariadb",
        host: SQLConfigs.host,
        port: SQLConfigs.port,
        username: SQLConfigs.user,
        password: SQLConfigs.password,
        database: SQLConfigs.database,
        synchronize: SQLConfigs.sync,
        logging: GeneralConfig.debug,
        entities: [
            MCSessionsEntity,
            PlayersEntity,
            UsersEntity,
        ],
        subscribers: [],
        migrations: [],
    });

    public static async init() {
        this.pool.initialize()
            .then(() => {
                LoggerUtils.INFO("Data Source has been initialized!");
            })
            .catch((err) => {
                LoggerUtils.ERROR("Error during Data Source initialization:\n" + err);
            });
    }
}