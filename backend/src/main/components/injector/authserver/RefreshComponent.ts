import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import RefreshModel from "../../../models/injector/request/RefreshModel";
import LoggerUtils from "../../../utils/LoggerUtils";
import FastifyUtils from "../../../utils/FastifyUtils";
import MCSessionsEntity from "../../../orm/entity/MCSessionsEntity";
import MCSessionsRepository from "../../../orm/repository/MCSessionsRepository";
import DateUtils from "../../../utils/DateUtils";
import AuthlibUtils from "../../../utils/AuthlibUtils";
import ConvertUtils from "../../../utils/ConvertUtils";

type CustomRequest = FastifyRequest<{ Body: RefreshModel; }>;

export default class RefreshComponent {
    public static async get(request: CustomRequest, reply: FastifyReply) {
        const body : RefreshModel = request.body;

        LoggerUtils.DEBUG(`[${request.method}] [BODY] ${JSON.stringify(body)}`);

        /**
         * Проверяем на критические переменные
         */
        if (
            !body.accessToken || body.accessToken.length === 0 || 
            !body.clientToken || body.clientToken.length === 0
        ) {
            reply.code(401);
            return FastifyUtils.Template.req(
                401,
                "Unauthorized",
                "[1201] The request requires user authentication!",
                undefined
            )
        }

        /**
         * Проверка токенов доступа
         */
        let db_token : MCSessionsEntity;
        try {
            db_token = await MCSessionsRepository.findOneBy({ accessToken: body.accessToken })
        } catch (error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "1202");
        }

        if (!db_token) {
            reply.code(404);
            return FastifyUtils.Template.req(
                404,
                "Unauthorized",
                "[1203] The request requires user authentication",
                undefined
            );
        }

        if (db_token.clientToken !== body.clientToken) {
            reply.code(404);
            return FastifyUtils.Template.req(
                404,
                "Unauthorized",
                "[1204] The request requires user authentication",
                undefined
            );
        }

        /**
         * Удаляем старую сессию
         */
        let db_profile = db_token.playerUuid; // Перед удалением
        try {
            await MCSessionsRepository.delete(db_token)
        } catch (error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "1205");
        }

        /**
         * Генерация новых токенов доступа
         */
        const dates: DateUtils = new DateUtils;
        let db_new_token : MCSessionsEntity;
        try {
            db_new_token = await MCSessionsRepository.save({ 
                clientToken: body.clientToken,
                playerUuid: db_profile,
                ipClient: request.ip,
                createdAt: dates.getAt(),
                endedAt: dates.getTTL(7),
            })
        } catch (error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "1206");
        }
        

        reply.code(200);
        return AuthlibUtils.RefreshProfile.get(
            body.requestUser,
            db_new_token.accessToken,
            db_new_token.clientToken,
            { id: ConvertUtils.withoutDashes(db_profile.id), name: db_profile.nickname },
            db_profile.user.uuid,
            db_profile.user.email
        );       
    }

    public static out: RouteShorthandOptions = {
        schema: {
            response: {
                200: AuthlibUtils.RefreshProfile.out,
                403: FastifyUtils.Template.out,
                404: FastifyUtils.Template.out,
                500: FastifyUtils.Template.out,
            }
        }
    }
}