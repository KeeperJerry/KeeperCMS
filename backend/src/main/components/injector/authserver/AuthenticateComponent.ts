import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";

import LoginModel from "../../../models/injector/request/LoginModel";
import { ProfilePlayer } from "../../../models/injector/response/ProfileModel";

import DateUtils from "../../../utils/DateUtils";
import LoggerUtils from "../../../utils/LoggerUtils";
import FastifyUtils from "../../../utils/FastifyUtils";
import SignUtils from "../../../utils/SignUtils";
import AuthlibUtils from "../../../utils/AuthlibUtils";

import UsersRepository from "../../../orm/repository/UsersRepository";
import UsersEntity from "../../../orm/entity/UsersEntity";
import MCPlayersEntity from "../../../orm/entity/MCPlayersEntity";
import MCPlayersRepository from "../../../orm/repository/MCPlayersRepository";
import MCSessionsEntity from "../../../orm/entity/MCSessionsEntity";
import MCSessionsRepository from "../../../orm/repository/MCSessionsRepository";
import ConvertUtils from "../../../utils/ConvertUtils";

type CustomRequest = FastifyRequest<{ Body: LoginModel; }>;

export default class AuthenticateComponent {
    public static async get(request: CustomRequest, reply: FastifyReply) {
        const body : LoginModel = request.body;
        const su: SignUtils = new SignUtils();

        LoggerUtils.DEBUG(`[${request.method}] [BODY] ${JSON.stringify(body)}`);

        /**
         * Проверяем на критические переменные
         */
        if (
            !body.username || body.username.length === 0 || 
            !body.password || body.password.length === 0
        ) {
            reply.code(401);
            return FastifyUtils.Template.req(
                401,
                "Unauthorized",
                "[1101] The request requires user authentication!",
                undefined
            )
        }

        if (
            body.clientToken === undefined || 
            typeof body.clientToken !== "string" 
            || body.clientToken.trim().length === 0
        ) {
            body.clientToken = su.getRandomMD5();
        } else {
            if (!/^[a-zA-Z0-9_-]+$/.test(body.clientToken))
            {
                reply.code(403);
                return FastifyUtils.Template.req(
                    403,
                    "Unauthorized",
                    "[1102] The request requires user authentication!",
                    undefined
                );
            }
        }

        if (body.requestUser === undefined) body.requestUser = false;

        /**
         * Проверка пользователя в базе данных
         */
        let user_db: UsersEntity;
        try {
            user_db = await UsersRepository.findOneBy({ email: body.username });
        } catch (error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "1103");
        }
        
        if(!user_db) {
            reply.code(401);
            return FastifyUtils.Template.req(
                401, 
                "Unauthorized",
                "[1104] Wrong user or password",
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
                "[1105] Wrong user or password",
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
            FastifyUtils.Error.catch(error, "1106");
        }

        if (db_players.length === 0) {
            reply.code(404);
            return FastifyUtils.Template.req(
                404,
                "Not Found",
                "[1107] Players is not found. Please, create player on the site or contact support",
                undefined
            );
        }

        /**
         * Проверка активного игрового профиля пользователя
         */
        let selectPlayer: ProfilePlayer;
        let idSelectPlayer: number;
        let players: ProfilePlayer[] = [];
        db_players.forEach((element: MCPlayersEntity, index: number) : any => {
            players.push({ id: ConvertUtils.withoutDashes(element.id.toString()) , name: element.nickname });
            if (element.selected === true) {
                selectPlayer = { id: ConvertUtils.withoutDashes(element.id.toString()), name: element.nickname };
                idSelectPlayer = index;
            }
        });
        LoggerUtils.DEBUG(`Active profile: ${JSON.stringify(selectPlayer)}`);

        /**
         * Генерация новых токенов доступа
         */
        const dates: DateUtils = new DateUtils;
        let db_session: MCSessionsEntity;
        try {
            db_session = await MCSessionsRepository.save({
                clientToken: body.clientToken,
                playerUuid: db_players[idSelectPlayer],

                ipClient: request.ip,
                createdAt: dates.getAt(),
                endedAt: dates.getTTL(7),

            });
        } catch (error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "1108");
        }

        reply.code(200);
        return AuthlibUtils.Profile.get(
            body.requestUser,
            db_session.accessToken,
            db_session.clientToken,
            selectPlayer,
            players,
            user_db.uuid,
            user_db.email
        );
    }

    public static out: RouteShorthandOptions = {
        schema: {
            response: {
                200: AuthlibUtils.Profile.out,
                403: FastifyUtils.Template.out,
                404: FastifyUtils.Template.out,
                500: FastifyUtils.Template.out,
            }
        }
    }
}