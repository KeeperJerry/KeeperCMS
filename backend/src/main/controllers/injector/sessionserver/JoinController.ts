import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";

import JoinModels from "../../../models/injector/request/JoinModels";
import FastifyUtils from "../../../utils/FastifyUtils";
import MCSessionsRepository from "../../../orm/repository/MCSessionsRepository";
import MCSessionsEntity from "../../../orm/entity/MCSessionsEntity";
import ConvertUtils from "../../../utils/ConvertUtils";

type CustomRequest = FastifyRequest<{ Body: JoinModels; }>;

export default class JoinController {
    public static async get(request: CustomRequest, reply: FastifyReply) {
        const body: JoinModels = request.body;

        /**
         * Проверяем на критические переменные
         */
        if (
            !body.accessToken || body.accessToken.length === 0 || 
            !body.selectedProfile || body.selectedProfile.length === 0 || 
            !body.serverId || body.serverId.length === 0 
        ) {
            reply.code(401);
            return FastifyUtils.Template.req(
                401,
                "IllegalArgumentException",
                "[2301] Invalid argument",
                undefined
            )
        }

        /**
         * Проверка токенов доступа
         */
        let db_session: MCSessionsEntity;
        try {
            db_session = await MCSessionsRepository.findOneBy({ accessToken: body.accessToken })
        } catch(error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "2302");
        }

        if (!db_session) {
            reply.code(403);
            return FastifyUtils.Template.req(
                403,
                "Unauthorized",
                "[2303] The request requires user authentication!",
                undefined
            );
        }

        if (db_session.playerUuid.id !== ConvertUtils.toDashes(body.selectedProfile)) {
            reply.code(403);
            return FastifyUtils.Template.req(
                403,
                "Unauthorized",
                "[2304] The request requires user authentication!",
                undefined
            );
        }

        try {
            await MCSessionsRepository.update(db_session, { serverId: body.serverId, ipClient: request.ip })
        } catch(error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "2305");
        }

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