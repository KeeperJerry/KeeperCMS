import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import SignUtils from "../../../utils/SignUtils";
import LoggerUtils from "../../../utils/LoggerUtils";
import FastifyUtils from "../../../utils/FastifyUtils";
import SignoutModel from "../../../models/injector/request/SignoutModel";
import UsersEntity from "../../../orm/entity/UsersEntity";
import UsersRepository from "../../../orm/repository/UsersRepository";
import MCSessionsRepository from "../../../orm/repository/MCSessionsRepository";
import MCPlayersEntity from "../../../orm/entity/MCPlayersEntity";
import MCPlayersRepository from "../../../orm/repository/MCPlayersRepository";

type CustomRequest = FastifyRequest<{ Body: SignoutModel; }>;

export default class SignOutController {
    public static async get(request: CustomRequest, reply: FastifyReply) {
        const body : SignoutModel = request.body;
        const su: SignUtils = new SignUtils();

        LoggerUtils.DEBUG(`[${request.method}] [BODY] ${JSON.stringify(body)}`);

        // Проверяем на критические переменные
        if (
            !body.username || body.username.length === 0 || 
            !body.password || body.password.length === 0
        ) {
            reply.code(401);
            return FastifyUtils.Template.req(
                401,
                "Unauthorized",
                "[1401] The request requires user authentication!",
                undefined
            )
        }

        /**
         * Проверка пользователя в базе данных
         */
        let user_db: UsersEntity;
        try {
            user_db = await UsersRepository.findOneBy({ email: body.username });
        } catch (error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "1402");
        }
        
        if(!user_db) {
            reply.code(401);
            return FastifyUtils.Template.req(
                401, 
                "Unauthorized",
                "[1403] Wrong user or password",
                undefined
            );
        }

        /**
         * Проверка пароля в базе данных
         */
        if (!await su.checkPass(body.password, user_db.password)) {
            reply.code(401);
            return FastifyUtils.Template.req(
                401, 
                "Unauthorized",
                "[1404] Wrong user or password",
                undefined
            );
        }

        /**
         * Проверка игровых профилей пользователя
         */
        let db_players : MCPlayersEntity[];
        try {
            db_players = await MCPlayersRepository.findBy({ user: user_db });
        } catch (error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "1405");
        }

        if (db_players.length === 0) {
            reply.code(204);
            return "";
        }

        /**
         * Поиск игрового профиля пользователя
         */
        db_players.forEach(async (element: MCPlayersEntity, index: number) : Promise<any> => {
            /**
             * Анулирование токенов доступа игрокам
             */
            try {
                await MCSessionsRepository.delete({ playerUuid: element })
            } catch (error) {
                reply.code(500);
                FastifyUtils.Error.catch(error, "1406");
            }
        });

        reply.code(204);
        return "";
    }

    public static out: RouteShorthandOptions = {
        schema: {
            response: {
                403: FastifyUtils.Template.out,
                404: FastifyUtils.Template.out,
                500: FastifyUtils.Template.out,
            }
        }
    }
}