import * as React from "react";
import { Grid, IRowIndices } from "../common/grid";
import { Rect } from "../common/rect";
import { IIndexedResizeCallback } from "../interactions/resizable";
import { ILockableLayout } from "../interactions/resizeHandle";
import { ISelectableProps } from "../interactions/selectable";
import { ILocator } from "../locator";
import { IRowHeaderCellProps } from "./rowHeaderCell";
export declare type IRowHeaderRenderer = (rowIndex: number) => React.ReactElement<IRowHeaderCellProps>;
export interface IRowHeights {
    minRowHeight?: number;
    maxRowHeight?: number;
    defaultRowHeight?: number;
}
export interface IRowHeaderProps extends ISelectableProps, IRowIndices, IRowHeights, ILockableLayout {
    /**
     * Enables/disables the resize interaction.
     * @default false
     */
    isResizable?: boolean;
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
     * This callback is called while the user is resizing a column. The guides
     * array contains pixel offsets for where to display the resize guides in
     * the table body's overlay layer.
     */
    onResizeGuide: (guides: number[]) => void;
    /**
     * A callback invoked when user is done resizing the column
     */
    onRowHeightChanged: IIndexedResizeCallback;
    /**
     * Renders the cell for each row header
     */
    renderRowHeader?: IRowHeaderRenderer;
    /**
     * The `Rect` bounds of the visible viewport with respect to its parent
     * scrollable pane.
     */
    viewportRect: Rect;
}
export declare class RowHeader extends React.Component<IRowHeaderProps, {}> {
    static defaultProps: {
        isResizable: boolean;
        renderRowHeader: (rowIndex: number) => JSX.Element;
    };
    render(): JSX.Element;
    private renderGhostCell;
    private renderCell;
    private locateClick;
    private locateDrag;
}
/**
 * A default implementation of `IRowHeaderRenderer` that displays 1-indexed
 * numbers for each row.
 */
export declare function renderDefaultRowHeader(rowIndex: number): JSX.Element;
