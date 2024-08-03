import * as moment from 'moment-timezone';

import GeneralConfig from '../configs/GeneralConfig';

/**
 * Утилита для работы с временем
 */
export default class DateUtils {
    public static init() {
        moment.tz.setDefault(GeneralConfig.timezone);
    }

    public static getLoggerDate() {
        const timeNow = moment();
        return timeNow.format('YYYY.MM.DD HH:mm:ss');
    }

    public getAt() : Date {
        return moment(new Date()).toDate();
    }

    public getTTL(days: number) : Date {
        return moment(new Date()).add(days, 'days').toDate();
    }
}