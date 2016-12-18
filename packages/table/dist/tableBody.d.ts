/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { IProps } from "@blueprintjs/core";
import * as React from "react";
import { ICellRenderer } from "./cell/cell";
import { Grid, IColumnIndices, IRowIndices } from "./common/grid";
import { Rect } from "./common/rect";
import { IContextMenuRenderer } from "./interactions/menus";
import { ISelectableProps } from "./interactions/selectable";
import { ILocator } from "./locator";
export interface ITableBodyProps extends ISelectableProps, IRowIndices, IColumnIndices, IProps {
    /**
     * A cell renderer for the cells in the body.
     */
    cellRenderer: ICellRenderer;
    /**
     * The grid computes sizes of cells, rows, or columns from the
     * configurable `columnWidths` and `rowHeights`.
     */
    grid: Grid;
    /**
     * Locates the row/column/cell given a mouse event.
     */
    locator: ILocator;
    /**
     * The `Rect` bounds of the visible viewport with respect to its parent
     * scrollable pane.
     */
    viewportRect: Rect;
    /**
     * An optional callback for displaying a context menu when right-clicking
     * on the table body. The callback is supplied with an `IMenuContext`
     * containing the `IRegion`s of interest.
     */
    renderBodyContextMenu?: IContextMenuRenderer;
}
export declare class TableBody extends React.Component<ITableBodyProps, {}> {
    /**
     * Returns the array of class names that must be applied to each table
     * cell so that we can locate any cell based on its coordinate.
     */
    static cellClassNames(rowIndex: number, columnIndex: number): string[];
    static shallowCompareKeys(objA: any, objB: any, keys: string[]): boolean;
    private static cellReactKey(rowIndex, columnIndex);
    shouldComponentUpdate(nextProps: ITableBodyProps): boolean;
    render(): JSX.Element;
    renderContextMenu(e: React.MouseEvent<HTMLElement>): JSX.Element;
    private renderGhostCell;
    private renderCell;
    private locateClick;
    private locateDrag;
}
