import MCSessionsEntity from "../orm/entity/MCSessionsEntity";
import PlayersEntity from "../orm/entity/MCPlayersEntity";
import UsersEntity from "../orm/entity/UsersEntity";
import MCsessionsRepository from "../orm/repository/MCSessionsRepository";

import PlayersRepository from "../orm/repository/MCPlayersRepository";
import DateUtils from "../utils/DateUtils";

export default class TokenService {
    public static async checkTTLUser(user: UsersEntity) {
        /**
         * Получение игровых профилей пользователя
         */
        let db_players : PlayersEntity[];
        try {
            db_players = await PlayersRepository.findBy({ user: user });
        } catch (error) {
            return;
        }

        if (db_players.length === 0) {
            return;
        }

        db_players.forEach(async (element: PlayersEntity) => {
            await TokenService.checkTTLPlayer(element);
        });
    }

    public static async checkTTLPlayer(player: PlayersEntity) {
        let db_session : MCSessionsEntity[];
        try {
            db_session = await MCsessionsRepository.findBy({ playerUuid : player })
        } catch (error) {
            return;
        }

        db_session.forEach(async (element: MCSessionsEntity) => {
            await TokenService.checkTTLSession(element);
        });
    }

    public static async checkTTLSession(session: MCSessionsEntity) {
        const dates: DateUtils = new DateUtils;
        if (session.endedAt < dates.getAt()) {
            try {
                await MCsessionsRepository.delete(session)
            } catch (error) {
                return;
            }
        }
    }
}