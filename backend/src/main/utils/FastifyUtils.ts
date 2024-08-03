import LoggerUtils from "./LoggerUtils";

export default class FastifyUtils {
    static Template = class {
        public static req(code: number, error: String, errorMessage: String, cause: String ) {
            return {
                code,
                error,
                errorMessage,
                cause,
            }
        }

        public static out = {
            type: 'object',
            properties: {
                code: { type: 'number' },
                error: { type: 'string' },
                errorMessage: { type: 'string' },
                cause: { type: 'string' },
            },
        }
    }

    static Error = class {
        public static catch(error: any, code: string) {
            LoggerUtils.DEBUG(`Выброшено исключение SQL: \n${error}`);
            LoggerUtils.ERROR(`${error.stack}`);
            return FastifyUtils.Template.req(
                500,
                "Internal Server Error",
                `[${code}] Sorry, server is down! We are working on this problem!`,
                undefined
            )
        }
    }
}