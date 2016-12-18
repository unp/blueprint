export declare type DateRange = [Date | undefined, Date | undefined];
export declare function areEqual(date1: Date, date2: Date): boolean;
export declare function areSameDay(date1: Date, date2: Date): boolean;
export declare function areSameMonth(date1: Date, date2: Date): boolean;
export declare function areSameTime(date1: Date, date2: Date): boolean;
export declare function clone(d: Date): Date;
export declare function isDayInRange(date: Date, dateRange: DateRange, exclusive?: boolean): boolean;
export declare function isDayRangeInRange(innerRange: DateRange, outerRange: DateRange): boolean;
export declare function isMonthInRange(date: Date, dateRange: DateRange): boolean;
/**
 * @returns a Date at the exact time-wise midpoint between startDate and endDate
 */
export declare function getDateBetween(dateRange: DateRange): Date;
export declare function getDateTime(date: Date, time: Date): Date;
