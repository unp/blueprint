import * as React from "react";
import { Grid, IColumnIndices } from "../common/grid";
import { Rect } from "../common/index";
import { IIndexedResizeCallback } from "../interactions/resizable";
import { ILockableLayout } from "../interactions/resizeHandle";
import { ISelectableProps } from "../interactions/selectable";
import { ILocator } from "../locator";
import { IColumnHeaderRenderer } from "./columnHeaderCell";
export interface IColumnWidths {
    minColumnWidth?: number;
    maxColumnWidth?: number;
    defaultColumnWidth?: number;
}
export interface IColumnHeaderProps extends ISelectableProps, IColumnIndices, IColumnWidths, ILockableLayout {
    /**
     * A IColumnHeaderRenderer that, for each `<Column>`, will delegate to:
     * 1. The `renderColumnHeader` method from the `<Column>`
     * 2. A `<ColumnHeaderCell>` using the `name` prop from the `<Column>`
     * 3. A `<ColumnHeaderCell>` with a `name` generated from `Utils.toBase26Alpha`
     */
    cellRenderer: IColumnHeaderRenderer;
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
     * Enables/disables the resize interaction.
     * @default true
     */
    isResizable?: boolean;
    /**
     * A callback invoked when user is done resizing the column
     */
    onColumnWidthChanged: IIndexedResizeCallback;
    /**
     * This callback is called while the user is resizing a column. The guides
     * array contains pixel offsets for where to display the resize guides in
     * the table body's overlay layer.
     */
    onResizeGuide: (guides: number[]) => void;
}
export declare class ColumnHeader extends React.Component<IColumnHeaderProps, {}> {
    static defaultProps: {
        isResizable: boolean;
    };
    render(): JSX.Element;
    private renderGhostCell;
    private renderCell;
    private locateClick;
    private locateDrag;
}
