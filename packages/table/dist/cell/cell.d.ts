import * as React from "react";
import { IIntentProps, IProps } from "@blueprintjs/core";
export interface ICellProps extends IIntentProps, IProps {
    key?: string;
    style?: React.CSSProperties;
    /**
     * An optional native tooltip that is displayed on hover
     */
    tooltip?: string;
}
export declare type ICellRenderer = (rowIndex: number, columnIndex: number) => React.ReactElement<ICellProps>;
export declare const emptyCellRenderer: (_rowIndex: number, _columnIndex: number) => JSX.Element;
export declare class Cell extends React.Component<ICellProps, {}> {
    render(): JSX.Element;
}
