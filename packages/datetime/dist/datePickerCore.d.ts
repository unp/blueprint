export interface IDatePickerLocaleUtils {
    formatDay: (day: Date, locale: string) => string;
    formatMonthTitle: (month: Date, locale: string) => string;
    formatWeekdayShort: (weekday: number, locale: string) => string;
    formatWeekdayLong: (weekday: number, locale: string) => string;
    getFirstDayOfWeek: (locale: string) => number;
    getMonths: (locale: string) => string[];
}
export interface IDatePickerDayModifiers {
    selected?: boolean;
    disabled?: boolean;
    [name: string]: boolean | undefined;
}
export interface IDatePickerModifiers {
    [name: string]: (date: Date) => boolean;
}
export interface IDatePickerBaseProps {
    /**
     * The initial month the calendar displays.
     */
    initialMonth?: Date;
    /**
     * The locale that gets passed to the functions in `localeUtils`.
     */
    locale?: string;
    /**
     * Collection of functions that provide internationalization support.
     */
    localeUtils?: IDatePickerLocaleUtils;
    /**
     * The latest date the user can select.
     * @default Dec. 31st of this year.
     */
    maxDate?: Date;
    /**
     * The earliest date the user can select.
     * @default Jan. 1st, 20 years in the past.
     */
    minDate?: Date;
    /**
     * Collection of functions that determine which modifier classes get applied to which days.
     * Each function should accept a `Date` and return a boolean.
     * See the [**react-day-picker** documentation](http://react-day-picker.js.org/Modifiers.html) to learn more.
     */
    modifiers?: IDatePickerModifiers;
}
export declare const DISABLED_MODIFIER: string;
export declare const OUTSIDE_MODIFIER: string;
export declare const SELECTED_MODIFIER: string;
export declare const SELECTED_RANGE_MODIFIER: string;
export declare const DISALLOWED_MODIFIERS: string[];
export declare function getDefaultMaxDate(): Date;
export declare function getDefaultMinDate(): Date;
export declare function combineModifiers(baseModifiers: IDatePickerModifiers, userModifiers: IDatePickerModifiers): IDatePickerModifiers;
