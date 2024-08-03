import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import HasJoinedModels from "../../../models/injector/request/HasJoinedModels";
import FastifyUtils from "../../../utils/FastifyUtils";
import MCSessionsRepository from "../../../orm/repository/MCSessionsRepository";
import AuthlibUtils from "../../../utils/AuthlibUtils";
import LoggerUtils from "../../../utils/LoggerUtils";
import MCSessionsEntity from "../../../orm/entity/MCSessionsEntity";

type CustomRequest = FastifyRequest<{ Querystring: { query: HasJoinedModels }}>

export default class HasJoinedComponent {
    public static async get(request: CustomRequest, reply: FastifyReply) {
        const { query } = request.query;

        // Проверяем на критические переменные
        if (
            !query.username || query.username.length === 0 ||
            !query.serverId || query.serverId.length === 0
        ) {
            return FastifyUtils.Template.req(
                403,
                "IllegalArgumentException",
                "[2201] Invalid argument",
                undefined
            );
        }

        let db_session: MCSessionsEntity;
        try {
            db_session = await MCSessionsRepository.findOneBy({ serverId: query.serverId })
        } catch (error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "2202");
        }

        if (!db_session) {
            reply.code(403);
            return FastifyUtils.Template.req(
                403,
                "Unauthorized",
                "[2203] The request requires user authentication!",
                undefined
            );
        }

        let db_player = db_session.playerUuid;

        try {
            LoggerUtils.DEBUG(JSON.stringify(db_player));
            reply.code(200);
            return AuthlibUtils.Textures.get(
                db_player.id,
                db_player.nickname,
                db_player.hashSkin,
                db_player.hashCloak,
                db_player.typeSkin,
                false
            );
        } catch (error) {
            reply.code(500);
            return FastifyUtils.Error.catch(error, "2105");
        }
    }

    public static out: RouteShorthandOptions = {
        schema: {
            response: {
                200: AuthlibUtils.Textures.out,
                403: FastifyUtils.Template.out,
                404: FastifyUtils.Template.out,
                500: FastifyUtils.Template.out,
            }
        }
    }
}