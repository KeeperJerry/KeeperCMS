export default class EasyUtils {
    public static parseBoolean(value: any) {
        return value === `false` ? false : !!value;
    }
}