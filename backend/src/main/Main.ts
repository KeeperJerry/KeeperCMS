import DatabaseCore from "./cores/DatabaseCore";
import FilesCore from "./cores/FilesCore";
import WebServerCore from "./cores/WebServerCore";
import SertificateService from "./services/SertificateService";
import DateUtils from "./utils/DateUtils";

export default class Main {
    public static main() : void {
        DateUtils.init();
        FilesCore.init();
        SertificateService.generateKeys();
        DatabaseCore.init();
        WebServerCore.init();
    }
}