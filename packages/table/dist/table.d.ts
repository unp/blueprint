/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { AbstractComponent, IProps } from "@blueprintjs/core";
import * as React from "react";
import { IColumnProps } from "./column";
import { Rect } from "./common/rect";
import { IColumnWidths } from "./headers/columnHeader";
import { IRowHeaderRenderer, IRowHeights } from "./headers/rowHeader";
import { IContextMenuRenderer } from "./interactions/menus";
import { IIndexedResizeCallback } from "./interactions/resizable";
import { ISelectedRegionTransform } from "./interactions/selectable";
import { Locator } from "./locator";
import { IRegion, IStyledRegionGroup, RegionCardinality } from "./regions";
export interface ITableProps extends IProps, IRowHeights, IColumnWidths {
    /**
     * If `false`, only a single region of a single column/row/cell may be
     * selected at one time. Using <kbd class="pt-key">ctrl</kbd> or
     * <kbd class="pt-key">meta</kbd> key will have no effect,
     * and a mouse drag will select the current column/row/cell only.
     * @default true
     */
    allowMultipleSelection?: boolean;
    /**
     * The children of a `Table` component, which must be React elements
     * that use `IColumnProps`.
     */
    children?: React.ReactElement<IColumnProps>;
    /**
     * If true, empty space in the table container will be filled with empty
     * cells instead of a blank background.
     * @default false
     */
    fillBodyWithGhostCells?: boolean;
    /**
     * If false, disables resizing of columns.
     * @default true
     */
    isColumnResizable?: boolean;
    /**
     * If resizing is enabled, this callback will be invoked when the user
     * finishes drag-resizing a column.
     */
    onColumnWidthChanged?: IIndexedResizeCallback;
    /**
     * A sparse number array with a length equal to the number of columns. Any
     * non-null value will be used to set the width of the column at the same
     * index. Note that if you want to update these values when the user
     * drag-resizes a column, you may define a callback for `onColumnWidthChanged`.
     */
    columnWidths?: number[];
    /**
     * If false, disables resizing of rows.
     * @default false
     */
    isRowResizable?: boolean;
    /**
     * If resizing is enabled, this callback will be invoked when the user
     * finishes drag-resizing a row.
     */
    onRowHeightChanged?: IIndexedResizeCallback;
    /**
     * A sparse number array with a length equal to the number of rows. Any
     * non-null value will be used to set the height of the row at the same
     * index. Note that if you want to update these values when the user
     * drag-resizes a row, you may define a callback for `onRowHeightChanged`.
     */
    rowHeights?: number[];
    /**
     * If false, hides the row headers and settings menu.
     * @default true
     */
    isRowHeaderShown?: boolean;
    /**
     * A callback called when the selection is changed in the table.
     */
    onSelection?: (selectedRegions: IRegion[]) => void;
    /**
     * Render each row's header cell
     */
    renderRowHeader?: IRowHeaderRenderer;
    /**
     * An optional callback for displaying a context menu when right-clicking
     * on the table body. The callback is supplied with an array of
     * `IRegion`s. If the mouse click was on a selection, the array will
     * contain all selected regions. Otherwise it will have one `IRegion` that
     * represents the clicked cell.
     */
    renderBodyContextMenu?: IContextMenuRenderer;
    /**
     * The number of rows in the table.
     */
    numRows?: number;
    /**
     * If defined, will set the selected regions in the cells. If defined, this
     * changes table selection to "controlled" mode, meaning you in charge of
     * setting the selections in response to events in the `onSelection`
     * callback.
     *
     * Note that the `selectionModes` prop controls which types of events are
     * triggered to the `onSelection` callback, but does not restrict what
     * selection you can pass to the `selectedRegions` prop. Therefore you can,
     * for example, convert cell clicks into row selections.
     */
    selectedRegions?: IRegion[];
    /**
     * An optional transform function that will be applied to the located
     * `Region`.
     *
     * This allows you to, for example, convert cell `Region`s into row
     * `Region`s while maintaining the existing multi-select and meta-click
     * functionality.
     */
    selectedRegionTransform?: ISelectedRegionTransform;
    /**
     * A `SelectionModes` enum value indicating the selection mode. You may
     * equivalently provide an array of `RegionCardinality` enum values for
     * precise configuration.
     *
     * ```
     * SelectionModes enum values:
     * ALL
     * NONE
     * COLUMNS_AND_CELLS
     * COLUMNS_ONLY
     * ROWS_AND_CELLS
     * ROWS_ONLY
     * ```
     *
     * ```
     * RegionCardinality enum values:
     * FULL_COLUMNS
     * FULL_ROWS
     * FULL_TABLE
     * CELLS
     * ```
     *
     * @default SelectionModes.ALL
     */
    selectionModes?: RegionCardinality[];
    /**
     * Styled region groups are rendered as overlays above the table and are
     * marked with their own className for custom styling.
     */
    styledRegionGroups?: IStyledRegionGroup[];
}
export interface ITableState {
    /**
     * An array of column widths. These are initialized from the column props
     * and updated when the user drags column header resize handles.
     */
    columnWidths?: number[];
    /**
     * An ILocator object used for locating cells, rows, or columns given
     * client coordinates as well as determining cell bounds given their
     * indices.
     */
    locator?: Locator;
    /**
     * If `true`, will disable updates that will cause re-renders of children
     * components. This is used, for example, to disable layout updates while
     * the user is dragging a resize handle.
     */
    isLayoutLocked?: boolean;
    /**
     * The `Rect` bounds of the viewport used to perform virtual viewport
     * performance enhancements.
     */
    viewportRect?: Rect;
    /**
     * An array of pixel offsets for resize guides, which are drawn over the
     * table body when a column is being resized.
     */
    verticalGuides?: number[];
    /**
     * An array of pixel offsets for resize guides, which are drawn over the
     * table body when a row is being resized.
     */
    horizontalGuides?: number[];
    /**
     * An array of row heights. These are initialized updated when the user
     * drags row header resize handles.
     */
    rowHeights?: number[];
    /**
     * An array of Regions representing the selections of the table.
     */
    selectedRegions?: IRegion[];
}
export declare class Table extends AbstractComponent<ITableProps, ITableState> {
    static defaultProps: ITableProps;
    private static createColumnIdIndex(children);
    private bodyElement;
    private childrenArray;
    private columnIdToIndex;
    private grid;
    private menuElement;
    private resizeSensorDetach;
    private rootTableElement;
    private rowHeaderElement;
    constructor(props: ITableProps, context?: any);
    componentWillReceiveProps(nextProps: ITableProps): void;
    render(): JSX.Element;
    /**
     * When the component mounts, the HTML Element refs will be available, so
     * we constructor the Locator, which queries the elements' bounding
     * ClientRects.
     */
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    protected validateProps(props: ITableProps & {
        children: React.ReactNode;
    }): void;
    private renderMenu();
    private syncMenuWidth();
    private getColumnProps(columnIndex);
    private columnHeaderCellRenderer;
    private renderColumnHeader();
    private renderRowHeader();
    private bodyCellRenderer;
    private renderBody();
    private isGuidesShowing();
    private isSelectionModeEnabled(selectionMode);
    private getEnabledSelectionHandler(selectionMode);
    private invalidateGrid();
    private validateGrid();
    /**
     * Renders a `RegionLayer`, applying styles to the regions using the
     * supplied `IRegionStyler`. `RegionLayer` is a `PureRender` component, so
     * the `IRegionStyler` should be a new instance on every render if we
     * intend to redraw the region layer.
     */
    private maybeRenderRegions(getRegionStyle);
    private maybeRenderBodyRegions();
    private maybeRenderColumnHeaderRegions();
    private maybeRenderRowHeaderRegions();
    private handleColumnWidthChanged;
    private handleRowHeightChanged;
    private handleRootScroll;
    private handleBodyScroll;
    private handleColumnResizeGuide;
    private handleRowResizeGuide;
    private clearSelection;
    private handleSelection;
    private handleLayoutLock;
    private setBodyRef;
    private setMenuRef;
    private setRootTableRef;
    private setRowHeaderRef;
}
