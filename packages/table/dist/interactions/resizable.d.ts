/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { IProps } from "@blueprintjs/core";
import * as React from "react";
import { ILockableLayout, Orientation } from "./resizeHandle";
export declare type IIndexedResizeCallback = (index: number, size: number) => void;
export interface IResizableProps extends IProps, ILockableLayout {
    /**
     * Enables/disables the resize interaction for the column.
     * @default true
     */
    isResizable?: boolean;
    /**
     * The optional maximum width of the column.
     */
    maxSize?: number;
    /**
     * The optional minimum width of the column.
     */
    minSize?: number;
    /**
     * A callback that is called while the user is dragging the resize
     * handle.
     *
     * @param size is the resized size
     */
    onSizeChanged?: (size: number) => void;
    /**
     * A callback that is called when the user is done dragging the resize
     * handle.
     *
     * @param size is the final resized size
     */
    onResizeEnd?: (size: number) => void;
    /**
     * A callback that is called when the user double clicks the resize handle
     */
    onDoubleClick?: () => void;
    /**
     * Determines how the resize handle is oriented in the resizable child.
     */
    orientation: Orientation;
    /**
     * The initial dimensional size.
     */
    size: number;
}
export interface IResizeableState {
    /**
     * The dimensional size, respecting minimum and maximum constraints.
     */
    size?: number;
    /**
     * The dimensional size, ignoring minimum and maximum constraints.
     */
    unclampedSize?: number;
}
export declare abstract class Resizable extends React.Component<IResizableProps, IResizeableState> {
    static defaultProps: {
        isResizable: boolean;
        minSize: number;
    };
    constructor(props: IResizableProps, context?: any);
    componentWillReceiveProps(nextProps: IResizableProps): void;
    render(): React.ReactElement<any>;
    private renderResizeHandle();
    /**
     * Returns the CSS style to apply to the child element given the state's
     * size value.
     */
    private getStyle();
    private offsetSize(offset);
}
