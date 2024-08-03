import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";

import ValidateModels from "../../../models/injector/request/ValidateModels";

import FastifyUtils from "../../../utils/FastifyUtils";
import MCSessionsEntity from "../../../orm/entity/MCSessionsEntity";
import MCSessionsRepository from "../../../orm/repository/MCSessionsRepository";

type CustomRequest = FastifyRequest<{ Body: ValidateModels; }>;

export default class ValidateComponent {
    public static async get(request: CustomRequest, reply: FastifyReply) {
        const { 
            accessToken, 
            clientToken 
        } : ValidateModels = request.body;

        // Проверяем на критические переменные
        if (
            !accessToken || accessToken.length === 0 ||
            !clientToken || clientToken.length === 0
        ) {
            reply.code(403);
            return FastifyUtils.Template.req(
                403,
                "Unauthorized",
                "[1501] The request requires user authentication!",
                undefined
            );
        }

        /**
         * Проверка токенов доступа
         */
        let db_session: MCSessionsEntity;
        try {
            db_session = await MCSessionsRepository.findOneBy({ accessToken: accessToken })
        } catch(error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "1502");
        }

        if (!db_session) {
            reply.code(403);
            return FastifyUtils.Template.req(
                403,
                "Unauthorized",
                "[1503] The request requires user authentication!",
                undefined
            );
        }

        if (db_session.clientToken !== clientToken) {
            reply.code(403);
            return FastifyUtils.Template.req(
                403,
                "Unauthorized",
                "[1504] The request requires user authentication!",
                undefined
            );
        }
        
        reply.code(204);
        return;
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