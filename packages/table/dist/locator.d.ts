/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { Grid } from "./common/grid";
import { Rect } from "./common/rect";
export interface ILocator {
    /**
     * Returns the width that a column must be to contain all the content of
     * its cells without truncating or wrapping.
     */
    getWidestVisibleCellInColumn: (columnIndex: number) => number;
    /**
     * Locates a column's index given the client X coordinate. Returns -1 if
     * the coordinate is not over a column.
     */
    convertPointToColumn: (clientX: number) => number;
    /**
     * Locates a row's index given the client Y coordinate. Returns -1 if
     * the coordinate is not over a row.
     */
    convertPointToRow: (clientY: number) => number;
    /**
     * Locates a cell's row and column index given the client X
     * coordinate. Returns -1 if the coordinate is not over a table cell.
     */
    convertPointToCell: (clientX: number, clientY: number) => {
        col: number;
        row: number;
    };
}
export declare class Locator implements ILocator {
    private tableElement;
    private bodyElement;
    private grid;
    private static CELL_HORIZONTAL_PADDING;
    constructor(tableElement: HTMLElement, bodyElement: HTMLElement, grid: Grid);
    setGrid(grid: Grid): void;
    getViewportRect(): Rect;
    getWidestVisibleCellInColumn(columnIndex: number): number;
    convertPointToColumn(clientX: number): number;
    convertPointToRow(clientY: number): number;
    convertPointToCell(clientX: number, clientY: number): {
        col: number;
        row: number;
    };
    private getTableRect();
    private getBodyRect();
    /**
     * Subtracts the scroll offset from the element's bounding client rect.
     */
    private unscrollElementRect(element);
    private convertCellIndexToClientX;
    private convertCellIndexToClientY;
}
