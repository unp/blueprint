import { AbstractComponent, IProps } from "@blueprintjs/core";
import { IDatePickerProps } from "./datePicker";
import { ITimePickerProps } from "./timePicker";
export interface IDateTimePickerProps extends IProps {
    /**
     * The initial date and time value that will be set.
     * This will be ignored if `value` is set.
     * @default Date.now()
     */
    defaultValue?: Date;
    /**
     * Any props to be passed on to the `DatePicker` other than the `value` and `onChange` props as they come directly
     * from the `DateTimePicker` props.
     */
    datePickerProps?: IDatePickerProps;
    /**
     * Callback invoked when the user changes the date or time.
     */
    onChange?: (selectedDate: Date, isUserChange: boolean) => void;
    /**
     * Any props to be passed on to the `TimePicker` other than the `value` and `onChange` props as they come directly
     * from the `DateTimePicker` props.
     */
    timePickerProps?: ITimePickerProps;
    /**
     * The currently set date and time. If this prop is present, the component acts in a controlled manner.
     */
    value?: Date;
}
export interface IDateTimePickerState {
    value?: Date;
}
export declare class DateTimePicker extends AbstractComponent<IDateTimePickerProps, IDateTimePickerState> {
    static defaultProps: IDateTimePickerProps;
    displayName: string;
    constructor(props?: IDateTimePickerProps, context?: any);
    render(): JSX.Element;
    componentWillReceiveProps(nextProps: IDatePickerProps): void;
    handleDateChange: (date: Date, isUserChange: boolean) => void;
    handleTimeChange: (time: Date) => void;
}
