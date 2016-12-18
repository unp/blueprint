/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { IProps } from "@blueprintjs/core";
import * as React from "react";
import { ResizeHandle } from "../interactions/resizeHandle";
export interface IRowHeaderCellProps extends IProps {
    /**
     * If true, will apply the active class to the header to indicate it is
     * part of an external operation.
     */
    isActive?: boolean;
    /**
     * Specifies whether the full column is part of a selection.
     */
    isRowSelected?: boolean;
    /**
     * The name displayed in the header of the column.
     */
    name?: string;
    /**
     * An element, like a `<Menu>`, this is displayed by right-clicking
     * anywhere in the header.
     */
    menu?: JSX.Element;
    /**
     * A `ResizeHandle` React component that allows users to drag-resize the
     * header.
     */
    resizeHandle?: ResizeHandle;
    /**
     * CSS styles for the top level element.
     */
    style?: React.CSSProperties;
}
export interface IRowHeaderState {
    isActive: boolean;
}
export declare class RowHeaderCell extends React.Component<IRowHeaderCellProps, IRowHeaderState> {
    state: {
        isActive: boolean;
    };
    render(): JSX.Element;
    renderContextMenu(_event: React.MouseEvent<HTMLElement>): JSX.Element;
}
