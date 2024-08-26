import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";

import FastifyUtils from "../../../utils/FastifyUtils";
import MCPlayersEntity from "../../../orm/entity/MCPlayersEntity";
import MCPlayersRepository from "../../../orm/repository/MCPlayersRepository";
import AuthlibUtils from "../../../utils/AuthlibUtils";
import LoggerUtils from "../../../utils/LoggerUtils";
import ConvertUtils from "../../../utils/ConvertUtils";

export default class ProfileController {
    public static async get(request: FastifyRequest, reply: FastifyReply) {
        const unsigned: boolean = request.query[`unsigned`] == `true`;
        let uuid: string = request.params[`uuid`]; // Заебал

        // Проверяем на критические переменные
        if (!uuid || uuid.length === 0) {
            return FastifyUtils.Template.req(
                403,
                "IllegalArgumentException",
                "[2101] Invalid argument",
                undefined
            );
        }

        if (uuid.length === 32) {
            uuid = ConvertUtils.toDashes(uuid)
        } else {
            return FastifyUtils.Template.req(
                403,
                "IllegalArgumentException",
                "[2102] Invalid argument",
                undefined
            );
        }

        let db_player : MCPlayersEntity;
        try {
            db_player = await MCPlayersRepository.findOneBy({ id: uuid });
        } catch (error) {
            reply.code(500);
            return FastifyUtils.Error.catch(error, "2103");
        }

        if (!db_player) {
            reply.code(401);
            return FastifyUtils.Template.req(
                403, 
                "Unauthorized",
                "[2104] The request requires user authentication!",
                undefined
            );
        }

        try {
            LoggerUtils.DEBUG(JSON.stringify(db_player));
            reply.code(200);
            return AuthlibUtils.Textures.get(
                db_player.id,
                db_player.nickname,
                db_player.hashSkin,
                db_player.hashCloak,
                db_player.typeSkin,
                unsigned
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