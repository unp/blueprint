import { IProps } from "@blueprintjs/core";
import * as React from "react";
export declare enum TimePickerPrecision {
    MINUTE = 0,
    SECOND = 1,
    MILLISECOND = 2,
}
export interface ITimePickerProps extends IProps {
    /**
     * Initial time the `TimePicker` will display.
     * This should not be set if `value` is set.
     */
    defaultValue?: Date;
    /**
     * Callback invoked when the user changes the time.
     */
    onChange?: (newTime: Date) => void;
    /**
     * The precision of time the user can set.
     * @default TimePickerPrecision.MINUTE
     */
    precision?: TimePickerPrecision;
    /**
     * Whether to show arrows buttons for changing the time.
     * @default false
     */
    showArrowButtons?: Boolean;
    /**
     * The currently set time.
     * If this prop is present, the component acts in a controlled manner.
     */
    value?: Date;
}
export interface ITimePickerState {
    hourText?: string;
    minuteText?: string;
    secondText?: string;
    millisecondText?: string;
    value?: Date;
}
export declare class TimePicker extends React.Component<ITimePickerProps, ITimePickerState> {
    static defaultProps: ITimePickerProps;
    displayName: string;
    constructor(props?: ITimePickerProps, context?: any);
    render(): JSX.Element;
    componentWillReceiveProps(nextProps: ITimePickerProps): void;
    private maybeRenderArrowButton(isDirectionUp, className, onClick);
    private renderDivider(text?);
    private renderInput(className, unit, value);
    private getInputBlurHandler;
    private getInputChangeHandler;
    private getInputKeyDownHandler;
    /**
     * Generates a full ITimePickerState object with all text fields set to formatted strings based on value
     */
    private getFullStateFromValue(value);
    private incrementTime(unit);
    private decrementTime(unit);
    private updateTime(time, unit);
    private updateState(state);
}
export declare const TimePickerFactory: React.ComponentFactory<ITimePickerProps & {
    children?: React.ReactNode;
}, TimePicker>;
