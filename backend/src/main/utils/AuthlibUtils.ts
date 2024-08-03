import ProjectConfig from "../configs/ProjectConfig";
import IdentifierModel, { ValueModel } from "../models/injector/response/IdentifierModel";
import InfoResponse from "../models/injector/response/InfoModel";
import ProfileModel, { ProfilePlayer } from "../models/injector/response/ProfileModel";
import { TexturesModel } from "../models/injector/response/TexturesModel";

import SertificateService from "../services/SertificateService";

export default class AuthlibUtils {
    static Status = class {
        public static get() : InfoResponse {
            return {
                meta: {
                    serverName: ProjectConfig.Injector.ProjectName,
                    implementationName: ProjectConfig.Injector.Description,
                    implementationVersion: ProjectConfig.Injector.Version,
                    links: {
                        homepage: ProjectConfig.Injector.SiteGeneral,
                        register: ProjectConfig.Injector.SiteRegistration
                    }
                },
                skinDomains: [
                    ProjectConfig.Injector.Domain,
                    `.${ProjectConfig.Injector.Domain}`
                ],
                signaturePublickey: SertificateService.getPublicKey()
            }
        }

        public static out = {
            type: 'object',
            properties: {
                meta: {
                    type: 'object',
                    properties: {
                        serverName: { type: 'string' },
                        implementationName: { type: 'string' },
                        implementationVersion: { type: 'string' },
                        links: {
                            type: 'object',
                            properties: {
                                homepage: { type: 'string' },
                                register: { type: 'string' }
                            }
                        }
                    }
                },
                skinDomains: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                signaturePublickey: {
                    type: 'string'
                }
            }
        }
    }

    static RefreshProfile = class {
        public static get(
            requestUser: boolean,
            accessToken: String, 
            clientToken: String,
            selectedProfile: ProfilePlayer,
            uuid: string,
            email: string,
        ) {
            let user;
            if(requestUser) {
                user = {
                    id: uuid,
                    name: email,
                    properties: [
                        {
                            name: "preferredLanguage",
                            value: "ru-ru"
                        },
                        {
                            name: "registrationCountry",
                            value: "RU"
                        }
                    ]
                }
            } else {
                user = undefined
            }

            return {
                accessToken,
                clientToken,
                selectedProfile,
                user
            }
        }

        public static out = {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                clientToken: { type: 'string' },
                selectedProfile: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                    }
                },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        properties: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    value: { type: 'string' },
                                }
                            }
                        }
                    }
                },
            }
        }
    }

    static Profile = class {
        public static get(
            requestUser: boolean,
            accessToken: String, 
            clientToken: String,
            selectedProfile: ProfilePlayer,
            availableProfiles: ProfilePlayer[],
            uuid: string,
            email: string,
        ) : ProfileModel {
            let user;
            if(requestUser) {
                user = {
                    id: uuid,
                    name: email,
                    properties: [
                        {
                            name: "preferredLanguage",
                            value: "ru-ru"
                        },
                        {
                            name: "registrationCountry",
                            value: "RU"
                        }
                    ]
                }
            } else {
                user = undefined
            }

            return {
                accessToken,
                clientToken,
                selectedProfile,
                availableProfiles,
                user
            }
        }

        public static out = {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                clientToken: { type: 'string' },
                selectedProfile: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                    }
                },
                availableProfiles: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                        }
                    }
                },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        properties: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    value: { type: 'string' },
                                }
                            }
                        }
                    }
                },
            }
        }
    }

    static Textures = class {
        /*
        public static getTextures(slim: boolean, skin_hash: string, cloak_hash: string) {
            let result_skin: { url: string; metadata?: { model: string } };
            if(skin_hash == "") {
                result_skin = null;
            } else {
                if(skin_hash != null) {
                    if (slim) {
                        result_skin = {
                            url: `${ProjectConfig.Skins.SkinsUsersUrl}/${ProjectConfig.Skins.SkinsDirs}/${skin_hash}.png`,
                            metadata: {
                                model: "slim",
                            }
                        }
                    } else {
                        result_skin = {
                            url: `${ProjectConfig.Skins.SkinsUsersUrl}/${ProjectConfig.Skins.SkinsDirs}/${skin_hash}.png`,
                        }
                    }
                } else {
                    result_skin = null;
                }
            }

            let result_cloak: { url: string };
            if(cloak_hash == "") {
                result_cloak = null;
            } else {
                if(cloak_hash != null) {
                    result_cloak = {
                        url: `${ProjectConfig.Skins.SkinsUsersUrl}/${ProjectConfig.Skins.CapesDirs}/${cloak_hash}.png`
                    }
                } else {
                    result_cloak = null;
                }
            }

            // Ну это говно с ифами, но я хз как это сделать по другому
            if (result_skin == null && result_cloak == null) {
                return {}
            }

            if (result_skin != null && result_cloak == null) {
                return {
                    SKIN: result_skin
                }
            }

            if (result_skin == null && result_cloak != null) {
                return {
                    CAPE: result_cloak
                }
            }

            return {
                SKIN: result_skin,
                CAPE: result_cloak
            }
        }
        */

        public static getTextures(slim: boolean, skin_hash: string, cloak_hash: string) {
            const getSkinResult = (hash: string, model?: string) => {
                if (!hash) return null;
                return model
                    ? { url: `${ProjectConfig.Skins.SkinsUsersUrl}/${hash}`, metadata: { model } }
                    : { url: `${ProjectConfig.Skins.SkinsUsersUrl}/${hash}` };
            };
        
            const getCloakResult = (hash: string) => {
                if (!hash) return null;
                return { url: `${ProjectConfig.Skins.SkinsUsersUrl}/${hash}` };
            };
        
            const result_skin = slim ? getSkinResult(skin_hash, "slim") : getSkinResult(skin_hash);
            const result_cloak = getCloakResult(cloak_hash);
        
            if (!result_skin && !result_cloak) return {};
            if (result_skin && !result_cloak) return { SKIN: result_skin };
            if (!result_skin && result_cloak) return { CAPE: result_cloak };
        
            return { SKIN: result_skin, CAPE: result_cloak };
        }

        public static toBase64(
            uuid: string, 
            username: string, 
            skin_hash: string, 
            cloak_hash: string,
            slim: boolean,  
            unsigned: boolean
        ) {
            let to64result : TexturesModel = {
                timestamp: Date.now(),
                profileId: uuid,
                profileName: username,
                textures: this.getTextures(slim, skin_hash, cloak_hash),
            };

            if(unsigned) {
                to64result.signatureRequired = true;
            }

            return Buffer.from(
                JSON.stringify(to64result, null, 4)
            );
        }

        public static get(
            uuid: string, 
            username: string, 
            skin_hash: string, 
            cloak_hash: string, 
            slim: boolean, 
            unsigned: boolean 
        ) : IdentifierModel {
            let resultProperties: ValueModel[] = [];
            const to_base64 = this.toBase64(uuid, username, skin_hash, cloak_hash, slim, unsigned).toString('base64');

            // Формируем массив на случай передачи еще параметров
            if(unsigned) {
                resultProperties.push(
                    {
                        name: "textures",
                        value: to_base64,
                    }
                );
            } else {
                resultProperties.push(
                    {
                        name: "textures",
                        value: to_base64,
                        signature: SertificateService.getSignature(to_base64)
                    }
                );
            }

            return {
                id: uuid,
                name: username,
                properties: resultProperties
            }
        }

        public static out = {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                properties: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            value: { type: 'string' },
                            signature: { type: 'string' },
                        }
                    }
                }
            }
        }
    }

    static MCProfiles = class {
        public static out = {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' }
                }
            }
        }
    }
}