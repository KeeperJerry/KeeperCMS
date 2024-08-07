import * as dotenv from 'dotenv';
dotenv.config();

export default class ProjectConfig {
    static Injector = class {
        public static Domain = process.env.SERVER_DOMAIN;
        public static ProjectName = process.env.SERVER_NAME;
        public static Description = process.env.SERVER_DESCRIPTION;
        public static Version = "0.1.1";
        public static Author = "KeeperJerry";

        public static SiteGeneral = process.env.SERVER_URL_SITE;
        public static SiteRegistration = process.env.SERVER_URL_REG;
    }

    static Skins = class {
        public static SkinsUsersUrl = process.env.SKINS_URL;
    }
}