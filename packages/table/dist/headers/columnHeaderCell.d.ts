/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { IProps } from "@blueprintjs/core";
import * as React from "react";
import { ResizeHandle } from "../interactions/resizeHandle";
export interface IColumnHeaderRenderer {
    (columnIndex: number): React.ReactElement<IColumnHeaderCellProps>;
}
export interface IColumnNameProps {
    /**
     * The name displayed in the header of the column.
     */
    name?: string;
    /**
     * A callback to override the default name rendering behavior. The default
     * behavior is to simply use the `ColumnHeaderCell`s name prop.
     *
     * This render callback can be used, for example, to provide a
     * `EditableName` component for editing column names.
     *
     * If you define this callback, we recommend you also set
     * `useInteractionBar` to true, to avoid issues with menus or selection.
     */
    renderName?: (name: string) => React.ReactElement<IProps>;
    /**
     * If true, adds an interaction bar on top of the column header cell and
     * moves the menu and selection interactions to it.
     *
     * This allows you to override the rendering of column name without worry
     * of clobbering the menu or other interactions.
     *
     * @default false
     */
    useInteractionBar?: boolean;
}
export interface IColumnHeaderCellProps extends IColumnNameProps, IProps {
    /**
     * If true, will apply the active class to the header to indicate it is
     * part of an external operation.
     *
     * @default false
     */
    isActive?: boolean;
    /**
     * Specifies if the full column is part of a selection.
     */
    isColumnSelected?: boolean;
    /**
     * An element, like a `<Menu>`, that is displayed by clicking the button
     * to the right of the header name, or by right-clicking anywhere in the
     * header.
     */
    menu?: JSX.Element;
    /**
     * The icon name for the header's menu button.
     * @default 'more'
     */
    menuIconName?: string;
    /**
     * CSS styles for the top level element
     */
    style?: React.CSSProperties;
    /**
     * A `ResizeHandle` React component that allows users to drag-resize the
     * header. If you are wrapping your `ColumnHeaderCell` in your own
     * component, you'll need to pass this through for resizing to work.
     */
    resizeHandle?: ResizeHandle;
}
export interface IColumnHeaderState {
    isActive: boolean;
}
export declare function HorizontalCellDivider(): JSX.Element;
export declare class ColumnHeaderCell extends React.Component<IColumnHeaderCellProps, IColumnHeaderState> {
    static defaultProps: IColumnHeaderCellProps;
    /**
     * This method determines if a MouseEvent was triggered on a target that
     * should be used as the header click/drag target. This enables users of
     * this component to render full interactive components in their header
     * cells without worry of selection or resize operations from capturing
     * their mouse events.
     */
    static isHeaderMouseTarget(target: HTMLElement): boolean;
    state: {
        isActive: boolean;
    };
    render(): JSX.Element;
    renderContextMenu(_event: React.MouseEvent<HTMLElement>): JSX.Element;
    private renderName();
    private maybeRenderContent();
    private maybeRenderDropdownMenu();
    private getPopoverStateChangeHandler;
}
