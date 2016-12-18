import * as React from "react";
import { IDatePickerLocaleUtils } from "./datePickerCore";
export interface IDatePickerCaptionProps {
    maxDate: Date;
    minDate: Date;
    onMonthChange?: (month: number) => void;
    onYearChange?: (year: number) => void;
    date?: Date;
    localeUtils?: IDatePickerLocaleUtils;
    locale?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
export declare class DatePickerCaption extends React.Component<IDatePickerCaptionProps, {}> {
    private displayedMonthText;
    private displayedYearText;
    private containerElement;
    private monthArrowElement;
    private yearArrowElement;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private containerRefHandler;
    private monthArrowRefHandler;
    private yearArrowRefHandler;
    private positionArrows();
    private handleMonthSelectChange;
    private handleYearSelectChange;
}
