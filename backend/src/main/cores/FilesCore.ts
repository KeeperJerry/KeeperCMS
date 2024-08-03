import FilesConfig from "../configs/FilesConfig";
import DirsUtility from "../utils/DirsUtils";

export default class FilesCore {
    public static init() {
        this.clearLogFile();
        this.dirCheckList();
    }

    /**
     * Чистим лог файл перед запуском
     */
    private static clearLogFile() : void {
        if (FilesConfig.Logs.reset) {
            DirsUtility.destroyFiles(FilesConfig.Logs.file);
        }
    }

    /**
     * Проверка директории на наличие
     * (Лучше сделаю ее отдельно)
     */
    private static dirCheckList() : void {
        let folders : string[] = [];

        folders.push(FilesConfig.Logs.dir);
        folders.push(FilesConfig.Keys.dir);

        folders.forEach(folder => {
            DirsUtility.checkDirectory(folder);
        });
    }
}