export default class ConvertUtils {
    public static toDashes(input: string) {
        //return input.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5')
        return input.replace(/-/g, '').replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/g, '$1-$2-$3-$4-$5');
    }

    public static withoutDashes(input: string) {
        return input.replace(/-/g, '');
    }
}