import * as moment from "moment";
import { AbstractComponent, IProps, Position } from "@blueprintjs/core";
import { IDatePickerBaseProps } from "./datePickerCore";
export interface IDateInputProps extends IDatePickerBaseProps, IProps {
    /**
     * Allows the user to clear the selection by clicking the currently selected day.
     * Passed to `DatePicker` component
     */
    canClearSelection?: boolean;
    /**
     * Whether the calendar popover should close when a date is selected.
     * @default true
     */
    closeOnSelection?: boolean;
    /**
     * Whether the component should be enabled or disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * The default date to be used in the component when uncontrolled.
     */
    defaultValue?: Date;
    /**
     * The format of the date. See options
     * here: http://momentjs.com/docs/#/displaying/format/
     * @default "YYYY-MM-DD"
     */
    format?: string;
    /**
     * The error message to display when the date selected invalid.
     * @default "Invalid date"
     */
    invalidDateMessage?: string;
    /**
     * Called when the user selects a new valid date through the `DatePicker` or by typing
     * in the input.
     */
    onChange?: (selectedDate: Date) => void;
    /**
     * Called when the user finishes typing in a new date and the date causes an error state.
     * If the date is invalid, `new Date(undefined)` will be returned. If the date is out of range,
     * the out of range date will be returned (`onChange` is not called in this case).
     */
    onError?: (errorDate: Date) => void;
    /**
     * If true, the Popover will open when the user clicks on the input. If false, the Popover will only
     * open when the calendar icon is clicked.
     * @default true
     */
    openOnFocus?: boolean;
    /**
     * The error message to display when the date selected is out of range.
     * @default "Out of range"
     */
    outOfRangeMessage?: string;
    /**
     * The position the date popover should appear in relative to the input box.
     * @default Position.BOTTOM
     */
    popoverPosition?: Position;
    /**
     * The currently selected day. If this prop is present, the component acts in a controlled manner.
     * To display no date in the input field, pass `null` to the value prop. To display an invalid date error
     * in the input field, pass `new Date(undefined)` to the value prop.
     */
    value?: Date;
}
export interface IDateInputState {
    value?: moment.Moment;
    valueString?: string;
    isInputFocused?: boolean;
    isOpen?: boolean;
}
export declare class DateInput extends AbstractComponent<IDateInputProps, IDateInputState> {
    static defaultProps: IDateInputProps;
    displayName: string;
    private inputRef;
    constructor(props?: IDateInputProps, context?: any);
    render(): JSX.Element;
    componentWillReceiveProps(nextProps: IDateInputProps): void;
    private getDateString;
    private validAndInRange(value);
    private isNull(value);
    private dateIsInRange(value);
    private handleClosePopover;
    private handleDateChange;
    private handleIconClick;
    private handleInputFocus;
    private handleInputClick;
    private handleInputChange;
    private handleInputBlur;
    private setInputRef;
    /**
     * Translate a moment into a Date object, adjusting the moment timezone into the local one.
     * This is a no-op unless moment-timezone's setDefault has been called.
     */
    private fromMomentToDate;
    /**
     * Translate a Date object into a moment, adjusting the local timezone into the moment one.
     * This is a no-op unless moment-timezone's setDefault has been called.
     */
    private fromDateToMoment;
}
