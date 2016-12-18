import { AbstractComponent, IProps } from "@blueprintjs/core";
import * as React from "react";
import { DateRange } from "./common/dateUtils";
import { IDatePickerBaseProps } from "./datePickerCore";
export interface IDateRangeShortcut {
    label: string;
    dateRange: DateRange;
}
export interface IDateRangePickerProps extends IDatePickerBaseProps, IProps {
    /**
     * Whether the start and end dates of the range can be the same day.
     * If `true`, clicking a selected date will create a one-day range.
     * If `false`, clicking a selected date will clear the selection.
     * @default false
     */
    allowSingleDayRange?: boolean;
    /**
     * Initial DateRange the calendar will display as selected.
     * This should not be set if `value` is set.
     */
    defaultValue?: DateRange;
    /**
     * Called when the user selects a day.
     * If no days are selected, it will pass `[null, null]`.
     * If a start date is selected but not an end date, it will pass `[selectedDate, null]`.
     * If both a start and end date are selected, it will pass `[startDate, endDate]`.
     */
    onChange?: (selectedDates: DateRange) => void;
    /**
     * Whether shortcuts to quickly select a range of dates are displayed or not.
     * If `true`, preset shortcuts will be displayed.
     * If `false`, no shortcuts will be displayed.
     * If an array, the custom shortcuts provided will be displayed.
     * @default true
     */
    shortcuts?: boolean | IDateRangeShortcut[];
    /**
     * The currently selected DateRange.
     * If this prop is present, the component acts in a controlled manner.
     */
    value?: DateRange;
}
export interface IDateRangePickerState {
    displayMonth?: number;
    displayYear?: number;
    value?: DateRange;
}
export declare class DateRangePicker extends AbstractComponent<IDateRangePickerProps, IDateRangePickerState> {
    static defaultProps: IDateRangePickerProps;
    displayName: string;
    private modifiers;
    private states;
    constructor(props?: IDateRangePickerProps, context?: any);
    render(): JSX.Element;
    componentWillReceiveProps(nextProps: IDateRangePickerProps): void;
    protected validateProps(props: IDateRangePickerProps): void;
    private maybeRenderShortcuts();
    private renderCaption();
    private handleDayClick;
    private createRange(a, b);
    private getShorcutClickHandler(nextValue);
    private handleNextState(nextValue);
    private handleMonthChange;
    private handleMonthSelectChange;
    private handleYearSelectChange;
}
export declare const DateRangePickerFactory: React.ComponentFactory<IDateRangePickerProps & {
    children?: React.ReactNode;
}, DateRangePicker>;
