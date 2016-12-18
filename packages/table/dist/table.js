/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@blueprintjs/core");
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var column_1 = require("./column");
var grid_1 = require("./common/grid");
var utils_1 = require("./common/utils");
var columnHeader_1 = require("./headers/columnHeader");
var columnHeaderCell_1 = require("./headers/columnHeaderCell");
var rowHeader_1 = require("./headers/rowHeader");
var resizeSensor_1 = require("./interactions/resizeSensor");
var guides_1 = require("./layers/guides");
var regions_1 = require("./layers/regions");
var locator_1 = require("./locator");
var regions_2 = require("./regions");
var tableBody_1 = require("./tableBody");
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.columnHeaderCellRenderer = function (columnIndex) {
            var props = _this.getColumnProps(columnIndex);
            var renderColumnHeader = props.renderColumnHeader;
            if (renderColumnHeader != null) {
                return renderColumnHeader(columnIndex);
            }
            else if (props.name != null) {
                return React.createElement(columnHeaderCell_1.ColumnHeaderCell, __assign({}, props));
            }
            else {
                return React.createElement(columnHeaderCell_1.ColumnHeaderCell, __assign({}, props, {name: utils_1.Utils.toBase26Alpha(columnIndex)}));
            }
        };
        this.bodyCellRenderer = function (rowIndex, columnIndex) {
            return _this.getColumnProps(columnIndex).renderCell(rowIndex, columnIndex);
        };
        this.handleColumnWidthChanged = function (columnIndex, width) {
            var columnWidths = _this.state.columnWidths.slice();
            columnWidths[columnIndex] = width;
            _this.invalidateGrid();
            _this.setState({ columnWidths: columnWidths });
            var onColumnWidthChanged = _this.props.onColumnWidthChanged;
            if (onColumnWidthChanged != null) {
                onColumnWidthChanged(columnIndex, width);
            }
        };
        this.handleRowHeightChanged = function (rowIndex, height) {
            var rowHeights = _this.state.rowHeights.slice();
            rowHeights[rowIndex] = height;
            _this.invalidateGrid();
            _this.setState({ rowHeights: rowHeights });
            var onRowHeightChanged = _this.props.onRowHeightChanged;
            if (onRowHeightChanged != null) {
                onRowHeightChanged(rowIndex, height);
            }
        };
        this.handleRootScroll = function (_event) {
            // Bug #211 - Native browser text selection events can cause the root
            // element to scroll even though it has a overflow:hidden style. The
            // only viable solution to this is to unscroll the element after the
            // browser scrolls it.
            if (_this.rootTableElement != null) {
                _this.rootTableElement.scrollLeft = 0;
                _this.rootTableElement.scrollTop = 0;
            }
        };
        this.handleBodyScroll = function (event) {
            // Prevent the event from propagating to avoid a resize event on the
            // resize sensor.
            event.stopPropagation();
            var _a = _this.state, locator = _a.locator, isLayoutLocked = _a.isLayoutLocked;
            if (locator != null && !isLayoutLocked) {
                var viewportRect = locator.getViewportRect();
                _this.setState({ viewportRect: viewportRect });
            }
        };
        this.handleColumnResizeGuide = function (verticalGuides) {
            _this.setState({ verticalGuides: verticalGuides });
        };
        this.handleRowResizeGuide = function (horizontalGuides) {
            _this.setState({ horizontalGuides: horizontalGuides });
        };
        this.clearSelection = function (_selectedRegions) {
            _this.handleSelection([]);
        };
        this.handleSelection = function (selectedRegions) {
            // only set selectedRegions state if not specified in props
            if (_this.props.selectedRegions == null) {
                _this.setState({ selectedRegions: selectedRegions });
            }
            var onSelection = _this.props.onSelection;
            if (onSelection != null) {
                onSelection(selectedRegions);
            }
        };
        this.handleLayoutLock = function (isLayoutLocked) {
            if (isLayoutLocked === void 0) { isLayoutLocked = false; }
            _this.setState({ isLayoutLocked: isLayoutLocked });
        };
        this.setBodyRef = function (ref) { return _this.bodyElement = ref; };
        this.setMenuRef = function (ref) { return _this.menuElement = ref; };
        this.setRootTableRef = function (ref) { return _this.rootTableElement = ref; };
        this.setRowHeaderRef = function (ref) { return _this.rowHeaderElement = ref; };
        var _a = this.props, defaultRowHeight = _a.defaultRowHeight, defaultColumnWidth = _a.defaultColumnWidth, numRows = _a.numRows, columnWidths = _a.columnWidths, rowHeights = _a.rowHeights, children = _a.children;
        this.childrenArray = React.Children.toArray(children);
        this.columnIdToIndex = Table.createColumnIdIndex(this.childrenArray);
        // Create height/width arrays using the lengths from props and
        // children, the default values from props, and finally any sparse
        // arrays passed into props.
        var newColumnWidths = this.childrenArray.map(function () { return defaultColumnWidth; });
        newColumnWidths = utils_1.Utils.assignSparseValues(newColumnWidths, columnWidths);
        var newRowHeights = utils_1.Utils.times(numRows, function () { return defaultRowHeight; });
        newRowHeights = utils_1.Utils.assignSparseValues(newRowHeights, rowHeights);
        var selectedRegions = (props.selectedRegions == null) ? [] : props.selectedRegions;
        this.state = {
            columnWidths: newColumnWidths,
            isLayoutLocked: false,
            rowHeights: newRowHeights,
            selectedRegions: selectedRegions,
        };
    }
    Table.createColumnIdIndex = function (children) {
        var columnIdToIndex = {};
        for (var i = 0; i < children.length; i++) {
            var key = children[i].props.id;
            if (key != null) {
                columnIdToIndex[String(key)] = i;
            }
        }
        return columnIdToIndex;
    };
    Table.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var defaultRowHeight = nextProps.defaultRowHeight, defaultColumnWidth = nextProps.defaultColumnWidth, columnWidths = nextProps.columnWidths, rowHeights = nextProps.rowHeights, children = nextProps.children, numRows = nextProps.numRows, selectedRegions = nextProps.selectedRegions;
        var newChildArray = React.Children.toArray(children);
        // Try to maintain widths of columns by looking up the width of the
        // column that had the same `ID` prop. If none is found, use the
        // previous width at the same index.
        var previousColumnWidths = newChildArray.map(function (child, index) {
            var mappedIndex = _this.columnIdToIndex[child.props.id];
            return _this.state.columnWidths[mappedIndex != null ? mappedIndex : index];
        });
        // Make sure the width/height arrays have the correct length, but keep
        // as many existing widths/heights when possible. Also, apply the
        // sparse width/heights from props.
        var newColumnWidths = this.state.columnWidths;
        newColumnWidths = utils_1.Utils.arrayOfLength(newColumnWidths, newChildArray.length, defaultColumnWidth);
        newColumnWidths = utils_1.Utils.assignSparseValues(newColumnWidths, previousColumnWidths);
        newColumnWidths = utils_1.Utils.assignSparseValues(newColumnWidths, columnWidths);
        var newRowHeights = this.state.rowHeights;
        newRowHeights = utils_1.Utils.arrayOfLength(newRowHeights, numRows, defaultRowHeight);
        newRowHeights = utils_1.Utils.assignSparseValues(newRowHeights, rowHeights);
        var newSelectedRegions = (selectedRegions == null) ? this.state.selectedRegions : selectedRegions;
        this.childrenArray = newChildArray;
        this.columnIdToIndex = Table.createColumnIdIndex(this.childrenArray);
        this.invalidateGrid();
        this.setState({
            columnWidths: newColumnWidths,
            rowHeights: newRowHeights,
            selectedRegions: newSelectedRegions,
        });
    };
    Table.prototype.render = function () {
        var isRowHeaderShown = this.props.isRowHeaderShown;
        this.validateGrid();
        return (React.createElement("div", {className: "bp-table-container", ref: this.setRootTableRef, onScroll: this.handleRootScroll}, 
            React.createElement("div", {className: "bp-table-top-container"}, 
                isRowHeaderShown ? this.renderMenu() : undefined, 
                this.renderColumnHeader()), 
            React.createElement("div", {className: "bp-table-bottom-container"}, 
                isRowHeaderShown ? this.renderRowHeader() : undefined, 
                this.renderBody())));
    };
    /**
     * When the component mounts, the HTML Element refs will be available, so
     * we constructor the Locator, which queries the elements' bounding
     * ClientRects.
     */
    Table.prototype.componentDidMount = function () {
        var _this = this;
        this.validateGrid();
        var locator = new locator_1.Locator(this.rootTableElement, this.bodyElement, this.grid);
        var viewportRect = locator.getViewportRect();
        this.setState({ locator: locator, viewportRect: viewportRect });
        this.resizeSensorDetach = resizeSensor_1.ResizeSensor.attach(this.rootTableElement, function () {
            if (!_this.state.isLayoutLocked) {
                _this.setState({ viewportRect: locator.getViewportRect() });
            }
        });
        this.syncMenuWidth();
    };
    Table.prototype.componentWillUnmount = function () {
        if (this.resizeSensorDetach != null) {
            this.resizeSensorDetach();
            delete this.resizeSensorDetach;
        }
    };
    Table.prototype.componentDidUpdate = function () {
        var locator = this.state.locator;
        if (locator != null) {
            this.validateGrid();
            locator.setGrid(this.grid);
        }
        this.syncMenuWidth();
    };
    Table.prototype.validateProps = function (props) {
        var ERROR_MESSAGE = "Children of Table must be Columns";
        React.Children.forEach(props.children, function (child) {
            // save as a variable so that union type narrowing works
            var cType = child.type;
            if (typeof cType === "string") {
                throw new Error(ERROR_MESSAGE);
            }
            else {
                var isColumn = cType.prototype === column_1.Column.prototype || column_1.Column.prototype.isPrototypeOf(cType);
                if (!isColumn) {
                    throw new Error(ERROR_MESSAGE);
                }
            }
        });
    };
    Table.prototype.renderMenu = function () {
        return (React.createElement("div", {className: "bp-table-menu", ref: this.setMenuRef}));
    };
    Table.prototype.syncMenuWidth = function () {
        var _a = this, menuElement = _a.menuElement, rowHeaderElement = _a.rowHeaderElement;
        if (menuElement != null && rowHeaderElement != null) {
            var width = rowHeaderElement.getBoundingClientRect().width;
            menuElement.style.width = width + "px";
        }
    };
    Table.prototype.getColumnProps = function (columnIndex) {
        var column = this.childrenArray[columnIndex];
        return column.props;
    };
    Table.prototype.renderColumnHeader = function () {
        var grid = this.grid;
        var _a = this.state, locator = _a.locator, selectedRegions = _a.selectedRegions, viewportRect = _a.viewportRect;
        var _b = this.props, allowMultipleSelection = _b.allowMultipleSelection, fillBodyWithGhostCells = _b.fillBodyWithGhostCells, isColumnResizable = _b.isColumnResizable, maxColumnWidth = _b.maxColumnWidth, minColumnWidth = _b.minColumnWidth, selectedRegionTransform = _b.selectedRegionTransform;
        var classes = classNames("bp-table-column-headers", {
            "bp-table-selection-enabled": this.isSelectionModeEnabled(regions_2.RegionCardinality.FULL_COLUMNS),
        });
        var columnIndices = grid.getColumnIndicesInRect(viewportRect, fillBodyWithGhostCells);
        return (React.createElement("div", {className: classes}, 
            React.createElement(columnHeader_1.ColumnHeader, __assign({allowMultipleSelection: allowMultipleSelection, cellRenderer: this.columnHeaderCellRenderer, grid: grid, isResizable: isColumnResizable, locator: locator, maxColumnWidth: maxColumnWidth, minColumnWidth: minColumnWidth, onColumnWidthChanged: this.handleColumnWidthChanged, onLayoutLock: this.handleLayoutLock, onResizeGuide: this.handleColumnResizeGuide, onSelection: this.getEnabledSelectionHandler(regions_2.RegionCardinality.FULL_COLUMNS), selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform, viewportRect: viewportRect}, columnIndices), this.props.children), 
            this.maybeRenderColumnHeaderRegions()));
    };
    Table.prototype.renderRowHeader = function () {
        var grid = this.grid;
        var _a = this.state, locator = _a.locator, selectedRegions = _a.selectedRegions, viewportRect = _a.viewportRect;
        var _b = this.props, allowMultipleSelection = _b.allowMultipleSelection, fillBodyWithGhostCells = _b.fillBodyWithGhostCells, isRowResizable = _b.isRowResizable, maxRowHeight = _b.maxRowHeight, minRowHeight = _b.minRowHeight, renderRowHeader = _b.renderRowHeader, selectedRegionTransform = _b.selectedRegionTransform;
        var classes = classNames("bp-table-row-headers", {
            "bp-table-selection-enabled": this.isSelectionModeEnabled(regions_2.RegionCardinality.FULL_ROWS),
        });
        var rowIndices = grid.getRowIndicesInRect(viewportRect, fillBodyWithGhostCells);
        return (React.createElement("div", {className: classes, ref: this.setRowHeaderRef}, 
            React.createElement(rowHeader_1.RowHeader, __assign({allowMultipleSelection: allowMultipleSelection, grid: grid, locator: locator, isResizable: isRowResizable, maxRowHeight: maxRowHeight, minRowHeight: minRowHeight, onLayoutLock: this.handleLayoutLock, onResizeGuide: this.handleRowResizeGuide, onRowHeightChanged: this.handleRowHeightChanged, onSelection: this.getEnabledSelectionHandler(regions_2.RegionCardinality.FULL_ROWS), renderRowHeader: renderRowHeader, selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform, viewportRect: viewportRect}, rowIndices)), 
            this.maybeRenderRowHeaderRegions()));
    };
    Table.prototype.renderBody = function () {
        var grid = this.grid;
        var _a = this.props, allowMultipleSelection = _a.allowMultipleSelection, fillBodyWithGhostCells = _a.fillBodyWithGhostCells, renderBodyContextMenu = _a.renderBodyContextMenu, selectedRegionTransform = _a.selectedRegionTransform;
        var _b = this.state, locator = _b.locator, selectedRegions = _b.selectedRegions, viewportRect = _b.viewportRect, verticalGuides = _b.verticalGuides, horizontalGuides = _b.horizontalGuides;
        var style = grid.getRect().sizeStyle();
        var rowIndices = grid.getRowIndicesInRect(viewportRect, fillBodyWithGhostCells);
        var columnIndices = grid.getColumnIndicesInRect(viewportRect, fillBodyWithGhostCells);
        var noVerticalScroll = fillBodyWithGhostCells &&
            grid.isGhostIndex(rowIndices.rowIndexEnd, 0) &&
            viewportRect != null && viewportRect.top === 0;
        var noHorizontalScroll = fillBodyWithGhostCells &&
            grid.isGhostIndex(0, columnIndices.columnIndexEnd) &&
            viewportRect != null && viewportRect.left === 0;
        // disable scroll for ghost cells
        var classes = classNames("bp-table-body", {
            "bp-table-no-horizontal-scroll": noHorizontalScroll,
            "bp-table-no-vertical-scroll": noVerticalScroll,
            "bp-table-selection-enabled": this.isSelectionModeEnabled(regions_2.RegionCardinality.CELLS),
        });
        return (React.createElement("div", {className: classes, onScroll: this.handleBodyScroll, ref: this.setBodyRef}, 
            React.createElement("div", {className: "bp-table-body-scroll-client", style: style}, 
                React.createElement(tableBody_1.TableBody, __assign({allowMultipleSelection: allowMultipleSelection, cellRenderer: this.bodyCellRenderer, grid: grid, locator: locator, onSelection: this.getEnabledSelectionHandler(regions_2.RegionCardinality.CELLS), renderBodyContextMenu: renderBodyContextMenu, selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform, viewportRect: viewportRect}, rowIndices, columnIndices)), 
                this.maybeRenderBodyRegions(), 
                React.createElement(guides_1.GuideLayer, {className: "bp-table-resize-guides", verticalGuides: verticalGuides, horizontalGuides: horizontalGuides}))
        ));
    };
    Table.prototype.isGuidesShowing = function () {
        return this.state.verticalGuides != null || this.state.horizontalGuides != null;
    };
    Table.prototype.isSelectionModeEnabled = function (selectionMode) {
        return this.props.selectionModes.indexOf(selectionMode) !== -1;
    };
    Table.prototype.getEnabledSelectionHandler = function (selectionMode) {
        if (!this.isSelectionModeEnabled(selectionMode)) {
            // If the selection mode isn't enabled, return a callback that
            // will clear the selection. For example, if row selection is
            // disabled, clicking on the row header will clear the table's
            // selection. If all selection modes are enabled, clicking on the
            // same region twice will clear the selection.
            return this.clearSelection;
        }
        else {
            return this.handleSelection;
        }
    };
    Table.prototype.invalidateGrid = function () {
        this.grid = null;
    };
    Table.prototype.validateGrid = function () {
        if (this.grid == null) {
            var _a = this.props, defaultRowHeight = _a.defaultRowHeight, defaultColumnWidth = _a.defaultColumnWidth;
            var _b = this.state, rowHeights = _b.rowHeights, columnWidths = _b.columnWidths;
            this.grid = new grid_1.Grid(rowHeights, columnWidths, grid_1.Grid.DEFAULT_BLEED, defaultRowHeight, defaultColumnWidth);
        }
    };
    /**
     * Renders a `RegionLayer`, applying styles to the regions using the
     * supplied `IRegionStyler`. `RegionLayer` is a `PureRender` component, so
     * the `IRegionStyler` should be a new instance on every render if we
     * intend to redraw the region layer.
     */
    Table.prototype.maybeRenderRegions = function (getRegionStyle) {
        if (this.isGuidesShowing()) {
            return undefined;
        }
        var regionGroups = regions_2.Regions.joinStyledRegionGroups(this.state.selectedRegions, this.props.styledRegionGroups);
        return regionGroups.map(function (regionGroup, index) {
            return (React.createElement(regions_1.RegionLayer, {className: classNames(regionGroup.className), key: index, regions: regionGroup.regions, getRegionStyle: getRegionStyle}));
        });
    };
    Table.prototype.maybeRenderBodyRegions = function () {
        var _this = this;
        var styler = function (region) {
            var cardinality = regions_2.Regions.getRegionCardinality(region);
            var style = _this.grid.getRegionStyle(region);
            switch (cardinality) {
                case regions_2.RegionCardinality.CELLS:
                    return style;
                case regions_2.RegionCardinality.FULL_COLUMNS:
                    style.top = "-1px";
                    return style;
                case regions_2.RegionCardinality.FULL_ROWS:
                    style.left = "-1px";
                    return style;
                default:
                    return { display: "none" };
            }
        };
        return this.maybeRenderRegions(styler);
    };
    Table.prototype.maybeRenderColumnHeaderRegions = function () {
        var _this = this;
        var styler = function (region) {
            var grid = _this.grid;
            var viewportRect = _this.state.viewportRect;
            if (viewportRect == null) {
                return {};
            }
            var cardinality = regions_2.Regions.getRegionCardinality(region);
            var style = grid.getRegionStyle(region);
            switch (cardinality) {
                case regions_2.RegionCardinality.FULL_COLUMNS:
                    style.bottom = "-1px";
                    style.transform = "translate3d(" + -viewportRect.left + "px, 0, 0)";
                    return style;
                default:
                    return { display: "none" };
            }
        };
        return this.maybeRenderRegions(styler);
    };
    Table.prototype.maybeRenderRowHeaderRegions = function () {
        var _this = this;
        var styler = function (region) {
            var grid = _this.grid;
            var viewportRect = _this.state.viewportRect;
            if (viewportRect == null) {
                return {};
            }
            var cardinality = regions_2.Regions.getRegionCardinality(region);
            var style = grid.getRegionStyle(region);
            switch (cardinality) {
                case regions_2.RegionCardinality.FULL_ROWS:
                    style.right = "-1px";
                    style.transform = "translate3d(0, " + -viewportRect.top + "px, 0)";
                    return style;
                default:
                    return { display: "none" };
            }
        };
        return this.maybeRenderRegions(styler);
    };
    Table.defaultProps = {
        allowMultipleSelection: true,
        defaultColumnWidth: 150,
        defaultRowHeight: 20,
        fillBodyWithGhostCells: false,
        isRowHeaderShown: true,
        minColumnWidth: 50,
        minRowHeight: 20,
        numRows: 0,
        renderRowHeader: rowHeader_1.renderDefaultRowHeader,
        selectionModes: regions_2.SelectionModes.ALL,
    };
    Table = __decorate([
        PureRender
    ], Table);
    return Table;
}(core_1.AbstractComponent));
exports.Table = Table;

//# sourceMappingURL=data:application/json;base64,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LENBQUM7SUFDM0MsQ0FBQztJQWhmYSxrQkFBWSxHQUFnQjtRQUN0QyxzQkFBc0IsRUFBRSxJQUFJO1FBQzVCLGtCQUFrQixFQUFFLEdBQUc7UUFDdkIsZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixzQkFBc0IsRUFBRSxLQUFLO1FBQzdCLGdCQUFnQixFQUFFLElBQUk7UUFDdEIsY0FBYyxFQUFFLEVBQUU7UUFDbEIsWUFBWSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxFQUFFLENBQUM7UUFDVixlQUFlLEVBQUUsa0NBQXNCO1FBQ3ZDLGNBQWMsRUFBRSx3QkFBYyxDQUFDLEdBQUc7S0FDckMsQ0FBQztJQWJOO1FBQUMsVUFBVTthQUFBO0lBb2tCWCxZQUFDO0FBQUQsQ0Fua0JBLEFBbWtCQyxDQW5rQjBCLHdCQUFpQixHQW1rQjNDO0FBbmtCWSxhQUFLLFFBbWtCakIsQ0FBQSIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50LCBJUHJvcHMgfSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFB1cmVSZW5kZXIgZnJvbSBcInB1cmUtcmVuZGVyLWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IENvbHVtbiwgSUNvbHVtblByb3BzIH0gZnJvbSBcIi4vY29sdW1uXCI7XG5pbXBvcnQgeyBHcmlkIH0gZnJvbSBcIi4vY29tbW9uL2dyaWRcIjtcbmltcG9ydCB7IFJlY3QgfSBmcm9tIFwiLi9jb21tb24vcmVjdFwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9jb21tb24vdXRpbHNcIjtcbmltcG9ydCB7IENvbHVtbkhlYWRlciwgSUNvbHVtbldpZHRocyB9IGZyb20gXCIuL2hlYWRlcnMvY29sdW1uSGVhZGVyXCI7XG5pbXBvcnQgeyBDb2x1bW5IZWFkZXJDZWxsIH0gZnJvbSBcIi4vaGVhZGVycy9jb2x1bW5IZWFkZXJDZWxsXCI7XG5pbXBvcnQgeyBJUm93SGVhZGVyUmVuZGVyZXIsIElSb3dIZWlnaHRzLCByZW5kZXJEZWZhdWx0Um93SGVhZGVyLCBSb3dIZWFkZXIgfSBmcm9tIFwiLi9oZWFkZXJzL3Jvd0hlYWRlclwiO1xuaW1wb3J0IHsgSUNvbnRleHRNZW51UmVuZGVyZXIgfSBmcm9tIFwiLi9pbnRlcmFjdGlvbnMvbWVudXNcIjtcbmltcG9ydCB7IElJbmRleGVkUmVzaXplQ2FsbGJhY2sgfSBmcm9tIFwiLi9pbnRlcmFjdGlvbnMvcmVzaXphYmxlXCI7XG5pbXBvcnQgeyBSZXNpemVTZW5zb3IgfSBmcm9tIFwiLi9pbnRlcmFjdGlvbnMvcmVzaXplU2Vuc29yXCI7XG5pbXBvcnQgeyBJU2VsZWN0ZWRSZWdpb25UcmFuc2Zvcm0gfSBmcm9tIFwiLi9pbnRlcmFjdGlvbnMvc2VsZWN0YWJsZVwiO1xuaW1wb3J0IHsgR3VpZGVMYXllciB9IGZyb20gXCIuL2xheWVycy9ndWlkZXNcIjtcbmltcG9ydCB7IElSZWdpb25TdHlsZXIsIFJlZ2lvbkxheWVyIH0gZnJvbSBcIi4vbGF5ZXJzL3JlZ2lvbnNcIjtcbmltcG9ydCB7IExvY2F0b3IgfSBmcm9tIFwiLi9sb2NhdG9yXCI7XG5pbXBvcnQgeyBJUmVnaW9uLCBJU3R5bGVkUmVnaW9uR3JvdXAsIFJlZ2lvbkNhcmRpbmFsaXR5LCBSZWdpb25zLCBTZWxlY3Rpb25Nb2RlcyB9IGZyb20gXCIuL3JlZ2lvbnNcIjtcbmltcG9ydCB7IFRhYmxlQm9keSB9IGZyb20gXCIuL3RhYmxlQm9keVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUYWJsZVByb3BzIGV4dGVuZHMgSVByb3BzLCBJUm93SGVpZ2h0cywgSUNvbHVtbldpZHRocyB7XG4gICAgLyoqXG4gICAgICogSWYgYGZhbHNlYCwgb25seSBhIHNpbmdsZSByZWdpb24gb2YgYSBzaW5nbGUgY29sdW1uL3Jvdy9jZWxsIG1heSBiZVxuICAgICAqIHNlbGVjdGVkIGF0IG9uZSB0aW1lLiBVc2luZyA8a2JkIGNsYXNzPVwicHQta2V5XCI+Y3RybDwva2JkPiBvclxuICAgICAqIDxrYmQgY2xhc3M9XCJwdC1rZXlcIj5tZXRhPC9rYmQ+IGtleSB3aWxsIGhhdmUgbm8gZWZmZWN0LFxuICAgICAqIGFuZCBhIG1vdXNlIGRyYWcgd2lsbCBzZWxlY3QgdGhlIGN1cnJlbnQgY29sdW1uL3Jvdy9jZWxsIG9ubHkuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNoaWxkcmVuIG9mIGEgYFRhYmxlYCBjb21wb25lbnQsIHdoaWNoIG11c3QgYmUgUmVhY3QgZWxlbWVudHNcbiAgICAgKiB0aGF0IHVzZSBgSUNvbHVtblByb3BzYC5cbiAgICAgKi9cbiAgICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0RWxlbWVudDxJQ29sdW1uUHJvcHM+O1xuXG4gICAgLyoqXG4gICAgICogSWYgdHJ1ZSwgZW1wdHkgc3BhY2UgaW4gdGhlIHRhYmxlIGNvbnRhaW5lciB3aWxsIGJlIGZpbGxlZCB3aXRoIGVtcHR5XG4gICAgICogY2VsbHMgaW5zdGVhZCBvZiBhIGJsYW5rIGJhY2tncm91bmQuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBmaWxsQm9keVdpdGhHaG9zdENlbGxzPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIElmIGZhbHNlLCBkaXNhYmxlcyByZXNpemluZyBvZiBjb2x1bW5zLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBpc0NvbHVtblJlc2l6YWJsZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBJZiByZXNpemluZyBpcyBlbmFibGVkLCB0aGlzIGNhbGxiYWNrIHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSB1c2VyXG4gICAgICogZmluaXNoZXMgZHJhZy1yZXNpemluZyBhIGNvbHVtbi5cbiAgICAgKi9cbiAgICBvbkNvbHVtbldpZHRoQ2hhbmdlZD86IElJbmRleGVkUmVzaXplQ2FsbGJhY2s7XG5cbiAgICAvKipcbiAgICAgKiBBIHNwYXJzZSBudW1iZXIgYXJyYXkgd2l0aCBhIGxlbmd0aCBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIGNvbHVtbnMuIEFueVxuICAgICAqIG5vbi1udWxsIHZhbHVlIHdpbGwgYmUgdXNlZCB0byBzZXQgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4gYXQgdGhlIHNhbWVcbiAgICAgKiBpbmRleC4gTm90ZSB0aGF0IGlmIHlvdSB3YW50IHRvIHVwZGF0ZSB0aGVzZSB2YWx1ZXMgd2hlbiB0aGUgdXNlclxuICAgICAqIGRyYWctcmVzaXplcyBhIGNvbHVtbiwgeW91IG1heSBkZWZpbmUgYSBjYWxsYmFjayBmb3IgYG9uQ29sdW1uV2lkdGhDaGFuZ2VkYC5cbiAgICAgKi9cbiAgICBjb2x1bW5XaWR0aHM/OiBudW1iZXJbXTtcblxuICAgIC8qKlxuICAgICAqIElmIGZhbHNlLCBkaXNhYmxlcyByZXNpemluZyBvZiByb3dzLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgaXNSb3dSZXNpemFibGU/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogSWYgcmVzaXppbmcgaXMgZW5hYmxlZCwgdGhpcyBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgdXNlclxuICAgICAqIGZpbmlzaGVzIGRyYWctcmVzaXppbmcgYSByb3cuXG4gICAgICovXG4gICAgb25Sb3dIZWlnaHRDaGFuZ2VkPzogSUluZGV4ZWRSZXNpemVDYWxsYmFjaztcblxuICAgIC8qKlxuICAgICAqIEEgc3BhcnNlIG51bWJlciBhcnJheSB3aXRoIGEgbGVuZ3RoIGVxdWFsIHRvIHRoZSBudW1iZXIgb2Ygcm93cy4gQW55XG4gICAgICogbm9uLW51bGwgdmFsdWUgd2lsbCBiZSB1c2VkIHRvIHNldCB0aGUgaGVpZ2h0IG9mIHRoZSByb3cgYXQgdGhlIHNhbWVcbiAgICAgKiBpbmRleC4gTm90ZSB0aGF0IGlmIHlvdSB3YW50IHRvIHVwZGF0ZSB0aGVzZSB2YWx1ZXMgd2hlbiB0aGUgdXNlclxuICAgICAqIGRyYWctcmVzaXplcyBhIHJvdywgeW91IG1heSBkZWZpbmUgYSBjYWxsYmFjayBmb3IgYG9uUm93SGVpZ2h0Q2hhbmdlZGAuXG4gICAgICovXG4gICAgcm93SGVpZ2h0cz86IG51bWJlcltdO1xuXG4gICAgLyoqXG4gICAgICogSWYgZmFsc2UsIGhpZGVzIHRoZSByb3cgaGVhZGVycyBhbmQgc2V0dGluZ3MgbWVudS5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgaXNSb3dIZWFkZXJTaG93bj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGNhbGxlZCB3aGVuIHRoZSBzZWxlY3Rpb24gaXMgY2hhbmdlZCBpbiB0aGUgdGFibGUuXG4gICAgICovXG4gICAgb25TZWxlY3Rpb24/OiAoc2VsZWN0ZWRSZWdpb25zOiBJUmVnaW9uW10pID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgZWFjaCByb3cncyBoZWFkZXIgY2VsbFxuICAgICAqL1xuICAgIHJlbmRlclJvd0hlYWRlcj86IElSb3dIZWFkZXJSZW5kZXJlcjtcblxuICAgIC8qKlxuICAgICAqIEFuIG9wdGlvbmFsIGNhbGxiYWNrIGZvciBkaXNwbGF5aW5nIGEgY29udGV4dCBtZW51IHdoZW4gcmlnaHQtY2xpY2tpbmdcbiAgICAgKiBvbiB0aGUgdGFibGUgYm9keS4gVGhlIGNhbGxiYWNrIGlzIHN1cHBsaWVkIHdpdGggYW4gYXJyYXkgb2ZcbiAgICAgKiBgSVJlZ2lvbmBzLiBJZiB0aGUgbW91c2UgY2xpY2sgd2FzIG9uIGEgc2VsZWN0aW9uLCB0aGUgYXJyYXkgd2lsbFxuICAgICAqIGNvbnRhaW4gYWxsIHNlbGVjdGVkIHJlZ2lvbnMuIE90aGVyd2lzZSBpdCB3aWxsIGhhdmUgb25lIGBJUmVnaW9uYCB0aGF0XG4gICAgICogcmVwcmVzZW50cyB0aGUgY2xpY2tlZCBjZWxsLlxuICAgICAqL1xuICAgIHJlbmRlckJvZHlDb250ZXh0TWVudT86IElDb250ZXh0TWVudVJlbmRlcmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiByb3dzIGluIHRoZSB0YWJsZS5cbiAgICAgKi9cbiAgICBudW1Sb3dzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogSWYgZGVmaW5lZCwgd2lsbCBzZXQgdGhlIHNlbGVjdGVkIHJlZ2lvbnMgaW4gdGhlIGNlbGxzLiBJZiBkZWZpbmVkLCB0aGlzXG4gICAgICogY2hhbmdlcyB0YWJsZSBzZWxlY3Rpb24gdG8gXCJjb250cm9sbGVkXCIgbW9kZSwgbWVhbmluZyB5b3UgaW4gY2hhcmdlIG9mXG4gICAgICogc2V0dGluZyB0aGUgc2VsZWN0aW9ucyBpbiByZXNwb25zZSB0byBldmVudHMgaW4gdGhlIGBvblNlbGVjdGlvbmBcbiAgICAgKiBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCB0aGUgYHNlbGVjdGlvbk1vZGVzYCBwcm9wIGNvbnRyb2xzIHdoaWNoIHR5cGVzIG9mIGV2ZW50cyBhcmVcbiAgICAgKiB0cmlnZ2VyZWQgdG8gdGhlIGBvblNlbGVjdGlvbmAgY2FsbGJhY2ssIGJ1dCBkb2VzIG5vdCByZXN0cmljdCB3aGF0XG4gICAgICogc2VsZWN0aW9uIHlvdSBjYW4gcGFzcyB0byB0aGUgYHNlbGVjdGVkUmVnaW9uc2AgcHJvcC4gVGhlcmVmb3JlIHlvdSBjYW4sXG4gICAgICogZm9yIGV4YW1wbGUsIGNvbnZlcnQgY2VsbCBjbGlja3MgaW50byByb3cgc2VsZWN0aW9ucy5cbiAgICAgKi9cbiAgICBzZWxlY3RlZFJlZ2lvbnM/OiBJUmVnaW9uW107XG5cbiAgICAvKipcbiAgICAgKiBBbiBvcHRpb25hbCB0cmFuc2Zvcm0gZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGxvY2F0ZWRcbiAgICAgKiBgUmVnaW9uYC5cbiAgICAgKlxuICAgICAqIFRoaXMgYWxsb3dzIHlvdSB0bywgZm9yIGV4YW1wbGUsIGNvbnZlcnQgY2VsbCBgUmVnaW9uYHMgaW50byByb3dcbiAgICAgKiBgUmVnaW9uYHMgd2hpbGUgbWFpbnRhaW5pbmcgdGhlIGV4aXN0aW5nIG11bHRpLXNlbGVjdCBhbmQgbWV0YS1jbGlja1xuICAgICAqIGZ1bmN0aW9uYWxpdHkuXG4gICAgICovXG4gICAgc2VsZWN0ZWRSZWdpb25UcmFuc2Zvcm0/OiBJU2VsZWN0ZWRSZWdpb25UcmFuc2Zvcm07XG5cbiAgICAvKipcbiAgICAgKiBBIGBTZWxlY3Rpb25Nb2Rlc2AgZW51bSB2YWx1ZSBpbmRpY2F0aW5nIHRoZSBzZWxlY3Rpb24gbW9kZS4gWW91IG1heVxuICAgICAqIGVxdWl2YWxlbnRseSBwcm92aWRlIGFuIGFycmF5IG9mIGBSZWdpb25DYXJkaW5hbGl0eWAgZW51bSB2YWx1ZXMgZm9yXG4gICAgICogcHJlY2lzZSBjb25maWd1cmF0aW9uLlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogU2VsZWN0aW9uTW9kZXMgZW51bSB2YWx1ZXM6XG4gICAgICogQUxMXG4gICAgICogTk9ORVxuICAgICAqIENPTFVNTlNfQU5EX0NFTExTXG4gICAgICogQ09MVU1OU19PTkxZXG4gICAgICogUk9XU19BTkRfQ0VMTFNcbiAgICAgKiBST1dTX09OTFlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqIFJlZ2lvbkNhcmRpbmFsaXR5IGVudW0gdmFsdWVzOlxuICAgICAqIEZVTExfQ09MVU1OU1xuICAgICAqIEZVTExfUk9XU1xuICAgICAqIEZVTExfVEFCTEVcbiAgICAgKiBDRUxMU1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQGRlZmF1bHQgU2VsZWN0aW9uTW9kZXMuQUxMXG4gICAgICovXG4gICAgc2VsZWN0aW9uTW9kZXM/OiBSZWdpb25DYXJkaW5hbGl0eVtdO1xuXG4gICAgLyoqXG4gICAgICogU3R5bGVkIHJlZ2lvbiBncm91cHMgYXJlIHJlbmRlcmVkIGFzIG92ZXJsYXlzIGFib3ZlIHRoZSB0YWJsZSBhbmQgYXJlXG4gICAgICogbWFya2VkIHdpdGggdGhlaXIgb3duIGNsYXNzTmFtZSBmb3IgY3VzdG9tIHN0eWxpbmcuXG4gICAgICovXG4gICAgc3R5bGVkUmVnaW9uR3JvdXBzPzogSVN0eWxlZFJlZ2lvbkdyb3VwW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRhYmxlU3RhdGUge1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGNvbHVtbiB3aWR0aHMuIFRoZXNlIGFyZSBpbml0aWFsaXplZCBmcm9tIHRoZSBjb2x1bW4gcHJvcHNcbiAgICAgKiBhbmQgdXBkYXRlZCB3aGVuIHRoZSB1c2VyIGRyYWdzIGNvbHVtbiBoZWFkZXIgcmVzaXplIGhhbmRsZXMuXG4gICAgICovXG4gICAgY29sdW1uV2lkdGhzPzogbnVtYmVyW107XG5cbiAgICAvKipcbiAgICAgKiBBbiBJTG9jYXRvciBvYmplY3QgdXNlZCBmb3IgbG9jYXRpbmcgY2VsbHMsIHJvd3MsIG9yIGNvbHVtbnMgZ2l2ZW5cbiAgICAgKiBjbGllbnQgY29vcmRpbmF0ZXMgYXMgd2VsbCBhcyBkZXRlcm1pbmluZyBjZWxsIGJvdW5kcyBnaXZlbiB0aGVpclxuICAgICAqIGluZGljZXMuXG4gICAgICovXG4gICAgbG9jYXRvcj86IExvY2F0b3I7XG5cbiAgICAvKipcbiAgICAgKiBJZiBgdHJ1ZWAsIHdpbGwgZGlzYWJsZSB1cGRhdGVzIHRoYXQgd2lsbCBjYXVzZSByZS1yZW5kZXJzIG9mIGNoaWxkcmVuXG4gICAgICogY29tcG9uZW50cy4gVGhpcyBpcyB1c2VkLCBmb3IgZXhhbXBsZSwgdG8gZGlzYWJsZSBsYXlvdXQgdXBkYXRlcyB3aGlsZVxuICAgICAqIHRoZSB1c2VyIGlzIGRyYWdnaW5nIGEgcmVzaXplIGhhbmRsZS5cbiAgICAgKi9cbiAgICBpc0xheW91dExvY2tlZD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYFJlY3RgIGJvdW5kcyBvZiB0aGUgdmlld3BvcnQgdXNlZCB0byBwZXJmb3JtIHZpcnR1YWwgdmlld3BvcnRcbiAgICAgKiBwZXJmb3JtYW5jZSBlbmhhbmNlbWVudHMuXG4gICAgICovXG4gICAgdmlld3BvcnRSZWN0PzogUmVjdDtcblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIHBpeGVsIG9mZnNldHMgZm9yIHJlc2l6ZSBndWlkZXMsIHdoaWNoIGFyZSBkcmF3biBvdmVyIHRoZVxuICAgICAqIHRhYmxlIGJvZHkgd2hlbiBhIGNvbHVtbiBpcyBiZWluZyByZXNpemVkLlxuICAgICAqL1xuICAgIHZlcnRpY2FsR3VpZGVzPzogbnVtYmVyW107XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBwaXhlbCBvZmZzZXRzIGZvciByZXNpemUgZ3VpZGVzLCB3aGljaCBhcmUgZHJhd24gb3ZlciB0aGVcbiAgICAgKiB0YWJsZSBib2R5IHdoZW4gYSByb3cgaXMgYmVpbmcgcmVzaXplZC5cbiAgICAgKi9cbiAgICBob3Jpem9udGFsR3VpZGVzPzogbnVtYmVyW107XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiByb3cgaGVpZ2h0cy4gVGhlc2UgYXJlIGluaXRpYWxpemVkIHVwZGF0ZWQgd2hlbiB0aGUgdXNlclxuICAgICAqIGRyYWdzIHJvdyBoZWFkZXIgcmVzaXplIGhhbmRsZXMuXG4gICAgICovXG4gICAgcm93SGVpZ2h0cz86IG51bWJlcltdO1xuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgUmVnaW9ucyByZXByZXNlbnRpbmcgdGhlIHNlbGVjdGlvbnMgb2YgdGhlIHRhYmxlLlxuICAgICAqL1xuICAgIHNlbGVjdGVkUmVnaW9ucz86IElSZWdpb25bXTtcbn1cblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBUYWJsZSBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PElUYWJsZVByb3BzLCBJVGFibGVTdGF0ZT4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFByb3BzOiBJVGFibGVQcm9wcyA9IHtcbiAgICAgICAgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbjogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdENvbHVtbldpZHRoOiAxNTAsXG4gICAgICAgIGRlZmF1bHRSb3dIZWlnaHQ6IDIwLFxuICAgICAgICBmaWxsQm9keVdpdGhHaG9zdENlbGxzOiBmYWxzZSxcbiAgICAgICAgaXNSb3dIZWFkZXJTaG93bjogdHJ1ZSxcbiAgICAgICAgbWluQ29sdW1uV2lkdGg6IDUwLFxuICAgICAgICBtaW5Sb3dIZWlnaHQ6IDIwLFxuICAgICAgICBudW1Sb3dzOiAwLFxuICAgICAgICByZW5kZXJSb3dIZWFkZXI6IHJlbmRlckRlZmF1bHRSb3dIZWFkZXIsXG4gICAgICAgIHNlbGVjdGlvbk1vZGVzOiBTZWxlY3Rpb25Nb2Rlcy5BTEwsXG4gICAgfTtcblxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZUNvbHVtbklkSW5kZXgoY2hpbGRyZW46IEFycmF5PFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+Pikge1xuICAgICAgICBjb25zdCBjb2x1bW5JZFRvSW5kZXg6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0ge307XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGNoaWxkcmVuW2ldLnByb3BzLmlkO1xuICAgICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uSWRUb0luZGV4W1N0cmluZyhrZXkpXSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbHVtbklkVG9JbmRleDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJvZHlFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGNoaWxkcmVuQXJyYXk6IEFycmF5PFJlYWN0LlJlYWN0RWxlbWVudDxJQ29sdW1uUHJvcHM+PjtcbiAgICBwcml2YXRlIGNvbHVtbklkVG9JbmRleDoge1trZXk6IHN0cmluZ106IG51bWJlcn07XG4gICAgcHJpdmF0ZSBncmlkOiBHcmlkO1xuICAgIHByaXZhdGUgbWVudUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgcmVzaXplU2Vuc29yRGV0YWNoOiAoKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgcm9vdFRhYmxlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByb3dIZWFkZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm9wczogSVRhYmxlUHJvcHMsIGNvbnRleHQ/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0IHsgZGVmYXVsdFJvd0hlaWdodCwgZGVmYXVsdENvbHVtbldpZHRoLCBudW1Sb3dzLCBjb2x1bW5XaWR0aHMsIHJvd0hlaWdodHMsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICB0aGlzLmNoaWxkcmVuQXJyYXkgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKSBhcyBBcnJheTxSZWFjdC5SZWFjdEVsZW1lbnQ8SUNvbHVtblByb3BzPj47XG4gICAgICAgIHRoaXMuY29sdW1uSWRUb0luZGV4ID0gVGFibGUuY3JlYXRlQ29sdW1uSWRJbmRleCh0aGlzLmNoaWxkcmVuQXJyYXkpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBoZWlnaHQvd2lkdGggYXJyYXlzIHVzaW5nIHRoZSBsZW5ndGhzIGZyb20gcHJvcHMgYW5kXG4gICAgICAgIC8vIGNoaWxkcmVuLCB0aGUgZGVmYXVsdCB2YWx1ZXMgZnJvbSBwcm9wcywgYW5kIGZpbmFsbHkgYW55IHNwYXJzZVxuICAgICAgICAvLyBhcnJheXMgcGFzc2VkIGludG8gcHJvcHMuXG4gICAgICAgIGxldCBuZXdDb2x1bW5XaWR0aHMgPSB0aGlzLmNoaWxkcmVuQXJyYXkubWFwKCgpID0+IGRlZmF1bHRDb2x1bW5XaWR0aCk7XG4gICAgICAgIG5ld0NvbHVtbldpZHRocyA9IFV0aWxzLmFzc2lnblNwYXJzZVZhbHVlcyhuZXdDb2x1bW5XaWR0aHMsIGNvbHVtbldpZHRocyk7XG4gICAgICAgIGxldCBuZXdSb3dIZWlnaHRzID0gVXRpbHMudGltZXMobnVtUm93cywgKCkgPT4gZGVmYXVsdFJvd0hlaWdodCk7XG4gICAgICAgIG5ld1Jvd0hlaWdodHMgPSBVdGlscy5hc3NpZ25TcGFyc2VWYWx1ZXMobmV3Um93SGVpZ2h0cywgcm93SGVpZ2h0cyk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRSZWdpb25zID0gKHByb3BzLnNlbGVjdGVkUmVnaW9ucyA9PSBudWxsKSA/IFtdIGFzIElSZWdpb25bXSA6IHByb3BzLnNlbGVjdGVkUmVnaW9ucztcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgY29sdW1uV2lkdGhzOiBuZXdDb2x1bW5XaWR0aHMsXG4gICAgICAgICAgICBpc0xheW91dExvY2tlZDogZmFsc2UsXG4gICAgICAgICAgICByb3dIZWlnaHRzOiBuZXdSb3dIZWlnaHRzLFxuICAgICAgICAgICAgc2VsZWN0ZWRSZWdpb25zLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogSVRhYmxlUHJvcHMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZGVmYXVsdFJvd0hlaWdodCxcbiAgICAgICAgICAgIGRlZmF1bHRDb2x1bW5XaWR0aCxcbiAgICAgICAgICAgIGNvbHVtbldpZHRocyxcbiAgICAgICAgICAgIHJvd0hlaWdodHMsXG4gICAgICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgICAgIG51bVJvd3MsXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvbnMsXG4gICAgICAgIH0gPSBuZXh0UHJvcHM7XG4gICAgICAgIGNvbnN0IG5ld0NoaWxkQXJyYXkgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKSBhcyBBcnJheTxSZWFjdC5SZWFjdEVsZW1lbnQ8SUNvbHVtblByb3BzPj47XG5cbiAgICAgICAgLy8gVHJ5IHRvIG1haW50YWluIHdpZHRocyBvZiBjb2x1bW5zIGJ5IGxvb2tpbmcgdXAgdGhlIHdpZHRoIG9mIHRoZVxuICAgICAgICAvLyBjb2x1bW4gdGhhdCBoYWQgdGhlIHNhbWUgYElEYCBwcm9wLiBJZiBub25lIGlzIGZvdW5kLCB1c2UgdGhlXG4gICAgICAgIC8vIHByZXZpb3VzIHdpZHRoIGF0IHRoZSBzYW1lIGluZGV4LlxuICAgICAgICBsZXQgcHJldmlvdXNDb2x1bW5XaWR0aHMgPSBuZXdDaGlsZEFycmF5Lm1hcCgoY2hpbGQ6IFJlYWN0LlJlYWN0RWxlbWVudDxJQ29sdW1uUHJvcHM+LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXBwZWRJbmRleCA9IHRoaXMuY29sdW1uSWRUb0luZGV4W2NoaWxkLnByb3BzLmlkXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmNvbHVtbldpZHRoc1ttYXBwZWRJbmRleCAhPSBudWxsID8gbWFwcGVkSW5kZXggOiBpbmRleF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgd2lkdGgvaGVpZ2h0IGFycmF5cyBoYXZlIHRoZSBjb3JyZWN0IGxlbmd0aCwgYnV0IGtlZXBcbiAgICAgICAgLy8gYXMgbWFueSBleGlzdGluZyB3aWR0aHMvaGVpZ2h0cyB3aGVuIHBvc3NpYmxlLiBBbHNvLCBhcHBseSB0aGVcbiAgICAgICAgLy8gc3BhcnNlIHdpZHRoL2hlaWdodHMgZnJvbSBwcm9wcy5cbiAgICAgICAgbGV0IG5ld0NvbHVtbldpZHRocyA9IHRoaXMuc3RhdGUuY29sdW1uV2lkdGhzO1xuICAgICAgICBuZXdDb2x1bW5XaWR0aHMgPSBVdGlscy5hcnJheU9mTGVuZ3RoKG5ld0NvbHVtbldpZHRocywgbmV3Q2hpbGRBcnJheS5sZW5ndGgsIGRlZmF1bHRDb2x1bW5XaWR0aCk7XG4gICAgICAgIG5ld0NvbHVtbldpZHRocyA9IFV0aWxzLmFzc2lnblNwYXJzZVZhbHVlcyhuZXdDb2x1bW5XaWR0aHMsIHByZXZpb3VzQ29sdW1uV2lkdGhzKTtcbiAgICAgICAgbmV3Q29sdW1uV2lkdGhzID0gVXRpbHMuYXNzaWduU3BhcnNlVmFsdWVzKG5ld0NvbHVtbldpZHRocywgY29sdW1uV2lkdGhzKTtcblxuICAgICAgICBsZXQgbmV3Um93SGVpZ2h0cyA9IHRoaXMuc3RhdGUucm93SGVpZ2h0cztcbiAgICAgICAgbmV3Um93SGVpZ2h0cyA9IFV0aWxzLmFycmF5T2ZMZW5ndGgobmV3Um93SGVpZ2h0cywgbnVtUm93cywgZGVmYXVsdFJvd0hlaWdodCk7XG4gICAgICAgIG5ld1Jvd0hlaWdodHMgPSBVdGlscy5hc3NpZ25TcGFyc2VWYWx1ZXMobmV3Um93SGVpZ2h0cywgcm93SGVpZ2h0cyk7XG5cbiAgICAgICAgY29uc3QgbmV3U2VsZWN0ZWRSZWdpb25zID0gKHNlbGVjdGVkUmVnaW9ucyA9PSBudWxsKSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWRSZWdpb25zIDogc2VsZWN0ZWRSZWdpb25zO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW5BcnJheSA9IG5ld0NoaWxkQXJyYXk7XG4gICAgICAgIHRoaXMuY29sdW1uSWRUb0luZGV4ID0gVGFibGUuY3JlYXRlQ29sdW1uSWRJbmRleCh0aGlzLmNoaWxkcmVuQXJyYXkpO1xuICAgICAgICB0aGlzLmludmFsaWRhdGVHcmlkKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29sdW1uV2lkdGhzOiBuZXdDb2x1bW5XaWR0aHMsXG4gICAgICAgICAgICByb3dIZWlnaHRzOiBuZXdSb3dIZWlnaHRzLFxuICAgICAgICAgICAgc2VsZWN0ZWRSZWdpb25zOiBuZXdTZWxlY3RlZFJlZ2lvbnMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaXNSb3dIZWFkZXJTaG93biB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgdGhpcy52YWxpZGF0ZUdyaWQoKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnAtdGFibGUtY29udGFpbmVyXCIgcmVmPXt0aGlzLnNldFJvb3RUYWJsZVJlZn0gb25TY3JvbGw9e3RoaXMuaGFuZGxlUm9vdFNjcm9sbH0+XG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnAtdGFibGUtdG9wLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICB7aXNSb3dIZWFkZXJTaG93biA/IHRoaXMucmVuZGVyTWVudSgpIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb2x1bW5IZWFkZXIoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJwLXRhYmxlLWJvdHRvbS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge2lzUm93SGVhZGVyU2hvd24gPyB0aGlzLnJlbmRlclJvd0hlYWRlcigpIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJCb2R5KCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSBjb21wb25lbnQgbW91bnRzLCB0aGUgSFRNTCBFbGVtZW50IHJlZnMgd2lsbCBiZSBhdmFpbGFibGUsIHNvXG4gICAgICogd2UgY29uc3RydWN0b3IgdGhlIExvY2F0b3IsIHdoaWNoIHF1ZXJpZXMgdGhlIGVsZW1lbnRzJyBib3VuZGluZ1xuICAgICAqIENsaWVudFJlY3RzLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUdyaWQoKTtcbiAgICAgICAgY29uc3QgbG9jYXRvciA9IG5ldyBMb2NhdG9yKFxuICAgICAgICAgICAgdGhpcy5yb290VGFibGVFbGVtZW50LFxuICAgICAgICAgICAgdGhpcy5ib2R5RWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMuZ3JpZCxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCB2aWV3cG9ydFJlY3QgPSBsb2NhdG9yLmdldFZpZXdwb3J0UmVjdCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9jYXRvciwgdmlld3BvcnRSZWN0IH0pO1xuXG4gICAgICAgIHRoaXMucmVzaXplU2Vuc29yRGV0YWNoID0gUmVzaXplU2Vuc29yLmF0dGFjaCh0aGlzLnJvb3RUYWJsZUVsZW1lbnQsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc0xheW91dExvY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aWV3cG9ydFJlY3Q6IGxvY2F0b3IuZ2V0Vmlld3BvcnRSZWN0KCkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3luY01lbnVXaWR0aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplU2Vuc29yRGV0YWNoICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplU2Vuc29yRGV0YWNoKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5yZXNpemVTZW5zb3JEZXRhY2g7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICBjb25zdCB7IGxvY2F0b3IgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGlmIChsb2NhdG9yICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVHcmlkKCk7XG4gICAgICAgICAgICBsb2NhdG9yLnNldEdyaWQodGhpcy5ncmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3luY01lbnVXaWR0aCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB2YWxpZGF0ZVByb3BzKHByb3BzOiBJVGFibGVQcm9wcyAmIHsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9KSB7XG4gICAgICAgIGNvbnN0IEVSUk9SX01FU1NBR0UgPSBcIkNoaWxkcmVuIG9mIFRhYmxlIG11c3QgYmUgQ29sdW1uc1wiO1xuICAgICAgICBSZWFjdC5DaGlsZHJlbi5mb3JFYWNoKHByb3BzLmNoaWxkcmVuLCAoY2hpbGQ6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICAvLyBzYXZlIGFzIGEgdmFyaWFibGUgc28gdGhhdCB1bmlvbiB0eXBlIG5hcnJvd2luZyB3b3Jrc1xuICAgICAgICAgICAgY29uc3QgY1R5cGUgPSBjaGlsZC50eXBlO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNUeXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01FU1NBR0UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0NvbHVtbiA9IGNUeXBlLnByb3RvdHlwZSA9PT0gQ29sdW1uLnByb3RvdHlwZSB8fCBDb2x1bW4ucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoY1R5cGUpO1xuICAgICAgICAgICAgICAgIGlmICghaXNDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01FU1NBR0UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJNZW51KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJwLXRhYmxlLW1lbnVcIlxuICAgICAgICAgICAgICAgIHJlZj17dGhpcy5zZXRNZW51UmVmfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN5bmNNZW51V2lkdGgoKSB7XG4gICAgICAgIGNvbnN0IHsgbWVudUVsZW1lbnQsIHJvd0hlYWRlckVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmIChtZW51RWxlbWVudCAhPSBudWxsICYmIHJvd0hlYWRlckVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSByb3dIZWFkZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICAgICAgbWVudUVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbHVtblByb3BzKGNvbHVtbkluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5jaGlsZHJlbkFycmF5W2NvbHVtbkluZGV4XSBhcyBSZWFjdC5SZWFjdEVsZW1lbnQ8SUNvbHVtblByb3BzPjtcbiAgICAgICAgcmV0dXJuIGNvbHVtbi5wcm9wcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbHVtbkhlYWRlckNlbGxSZW5kZXJlciA9IChjb2x1bW5JbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5nZXRDb2x1bW5Qcm9wcyhjb2x1bW5JbmRleCk7XG4gICAgICAgIGNvbnN0IHsgcmVuZGVyQ29sdW1uSGVhZGVyIH0gPSBwcm9wcztcbiAgICAgICAgaWYgKHJlbmRlckNvbHVtbkhlYWRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyQ29sdW1uSGVhZGVyKGNvbHVtbkluZGV4KTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wcy5uYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8Q29sdW1uSGVhZGVyQ2VsbCB7Li4ucHJvcHN9IC8+O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDxDb2x1bW5IZWFkZXJDZWxsIHsuLi5wcm9wc30gbmFtZT17VXRpbHMudG9CYXNlMjZBbHBoYShjb2x1bW5JbmRleCl9IC8+O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJDb2x1bW5IZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgeyBsb2NhdG9yLCBzZWxlY3RlZFJlZ2lvbnMsIHZpZXdwb3J0UmVjdCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbixcbiAgICAgICAgICAgIGZpbGxCb2R5V2l0aEdob3N0Q2VsbHMsXG4gICAgICAgICAgICBpc0NvbHVtblJlc2l6YWJsZSxcbiAgICAgICAgICAgIG1heENvbHVtbldpZHRoLFxuICAgICAgICAgICAgbWluQ29sdW1uV2lkdGgsXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybSxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWVzKFwiYnAtdGFibGUtY29sdW1uLWhlYWRlcnNcIiwge1xuICAgICAgICAgICAgXCJicC10YWJsZS1zZWxlY3Rpb24tZW5hYmxlZFwiOiB0aGlzLmlzU2VsZWN0aW9uTW9kZUVuYWJsZWQoUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9DT0xVTU5TKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGNvbHVtbkluZGljZXMgPSBncmlkLmdldENvbHVtbkluZGljZXNJblJlY3Qodmlld3BvcnRSZWN0LCBmaWxsQm9keVdpdGhHaG9zdENlbGxzKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PlxuICAgICAgICAgICAgICAgIDxDb2x1bW5IZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbj17YWxsb3dNdWx0aXBsZVNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXt0aGlzLmNvbHVtbkhlYWRlckNlbGxSZW5kZXJlcn1cbiAgICAgICAgICAgICAgICAgICAgZ3JpZD17Z3JpZH1cbiAgICAgICAgICAgICAgICAgICAgaXNSZXNpemFibGU9e2lzQ29sdW1uUmVzaXphYmxlfVxuICAgICAgICAgICAgICAgICAgICBsb2NhdG9yPXtsb2NhdG9yfVxuICAgICAgICAgICAgICAgICAgICBtYXhDb2x1bW5XaWR0aD17bWF4Q29sdW1uV2lkdGh9XG4gICAgICAgICAgICAgICAgICAgIG1pbkNvbHVtbldpZHRoPXttaW5Db2x1bW5XaWR0aH1cbiAgICAgICAgICAgICAgICAgICAgb25Db2x1bW5XaWR0aENoYW5nZWQ9e3RoaXMuaGFuZGxlQ29sdW1uV2lkdGhDaGFuZ2VkfVxuICAgICAgICAgICAgICAgICAgICBvbkxheW91dExvY2s9e3RoaXMuaGFuZGxlTGF5b3V0TG9ja31cbiAgICAgICAgICAgICAgICAgICAgb25SZXNpemVHdWlkZT17dGhpcy5oYW5kbGVDb2x1bW5SZXNpemVHdWlkZX1cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Rpb249e3RoaXMuZ2V0RW5hYmxlZFNlbGVjdGlvbkhhbmRsZXIoUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9DT0xVTU5TKX1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRSZWdpb25zPXtzZWxlY3RlZFJlZ2lvbnN9XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUmVnaW9uVHJhbnNmb3JtPXtzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybX1cbiAgICAgICAgICAgICAgICAgICAgdmlld3BvcnRSZWN0PXt2aWV3cG9ydFJlY3R9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5jb2x1bW5JbmRpY2VzfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9Db2x1bW5IZWFkZXI+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlckNvbHVtbkhlYWRlclJlZ2lvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyUm93SGVhZGVyKCkge1xuICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgbG9jYXRvciwgc2VsZWN0ZWRSZWdpb25zLCB2aWV3cG9ydFJlY3QgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24sXG4gICAgICAgICAgICBmaWxsQm9keVdpdGhHaG9zdENlbGxzLFxuICAgICAgICAgICAgaXNSb3dSZXNpemFibGUsXG4gICAgICAgICAgICBtYXhSb3dIZWlnaHQsXG4gICAgICAgICAgICBtaW5Sb3dIZWlnaHQsXG4gICAgICAgICAgICByZW5kZXJSb3dIZWFkZXIsXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybSxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWVzKFwiYnAtdGFibGUtcm93LWhlYWRlcnNcIiwge1xuICAgICAgICAgICAgXCJicC10YWJsZS1zZWxlY3Rpb24tZW5hYmxlZFwiOiB0aGlzLmlzU2VsZWN0aW9uTW9kZUVuYWJsZWQoUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9ST1dTKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJvd0luZGljZXMgPSBncmlkLmdldFJvd0luZGljZXNJblJlY3Qodmlld3BvcnRSZWN0LCBmaWxsQm9keVdpdGhHaG9zdENlbGxzKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXN9XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLnNldFJvd0hlYWRlclJlZn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Um93SGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93TXVsdGlwbGVTZWxlY3Rpb249e2FsbG93TXVsdGlwbGVTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgICAgIGdyaWQ9e2dyaWR9XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0b3I9e2xvY2F0b3J9XG4gICAgICAgICAgICAgICAgICAgIGlzUmVzaXphYmxlPXtpc1Jvd1Jlc2l6YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgbWF4Um93SGVpZ2h0PXttYXhSb3dIZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgIG1pblJvd0hlaWdodD17bWluUm93SGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICBvbkxheW91dExvY2s9e3RoaXMuaGFuZGxlTGF5b3V0TG9ja31cbiAgICAgICAgICAgICAgICAgICAgb25SZXNpemVHdWlkZT17dGhpcy5oYW5kbGVSb3dSZXNpemVHdWlkZX1cbiAgICAgICAgICAgICAgICAgICAgb25Sb3dIZWlnaHRDaGFuZ2VkPXt0aGlzLmhhbmRsZVJvd0hlaWdodENoYW5nZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0aW9uPXt0aGlzLmdldEVuYWJsZWRTZWxlY3Rpb25IYW5kbGVyKFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfUk9XUyl9XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclJvd0hlYWRlcj17cmVuZGVyUm93SGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFJlZ2lvbnM9e3NlbGVjdGVkUmVnaW9uc31cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRSZWdpb25UcmFuc2Zvcm09e3NlbGVjdGVkUmVnaW9uVHJhbnNmb3JtfVxuICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydFJlY3Q9e3ZpZXdwb3J0UmVjdH1cbiAgICAgICAgICAgICAgICAgICAgey4uLnJvd0luZGljZXN9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLm1heWJlUmVuZGVyUm93SGVhZGVyUmVnaW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBib2R5Q2VsbFJlbmRlcmVyID0gKHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29sdW1uUHJvcHMoY29sdW1uSW5kZXgpLnJlbmRlckNlbGwocm93SW5kZXgsIGNvbHVtbkluZGV4KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckJvZHkoKSB7XG4gICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbixcbiAgICAgICAgICAgIGZpbGxCb2R5V2l0aEdob3N0Q2VsbHMsXG4gICAgICAgICAgICByZW5kZXJCb2R5Q29udGV4dE1lbnUsXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybSxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgbG9jYXRvciwgc2VsZWN0ZWRSZWdpb25zLCB2aWV3cG9ydFJlY3QsIHZlcnRpY2FsR3VpZGVzLCBob3Jpem9udGFsR3VpZGVzIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ3JpZC5nZXRSZWN0KCkuc2l6ZVN0eWxlKCk7XG4gICAgICAgIGNvbnN0IHJvd0luZGljZXMgPSBncmlkLmdldFJvd0luZGljZXNJblJlY3Qodmlld3BvcnRSZWN0LCBmaWxsQm9keVdpdGhHaG9zdENlbGxzKTtcbiAgICAgICAgY29uc3QgY29sdW1uSW5kaWNlcyA9IGdyaWQuZ2V0Q29sdW1uSW5kaWNlc0luUmVjdCh2aWV3cG9ydFJlY3QsIGZpbGxCb2R5V2l0aEdob3N0Q2VsbHMpO1xuICAgICAgICBjb25zdCBub1ZlcnRpY2FsU2Nyb2xsID0gZmlsbEJvZHlXaXRoR2hvc3RDZWxscyAmJlxuICAgICAgICAgICAgZ3JpZC5pc0dob3N0SW5kZXgocm93SW5kaWNlcy5yb3dJbmRleEVuZCwgMCkgJiZcbiAgICAgICAgICAgIHZpZXdwb3J0UmVjdCAhPSBudWxsICYmIHZpZXdwb3J0UmVjdC50b3AgPT09IDA7XG4gICAgICAgIGNvbnN0IG5vSG9yaXpvbnRhbFNjcm9sbCA9IGZpbGxCb2R5V2l0aEdob3N0Q2VsbHMgJiZcbiAgICAgICAgICAgIGdyaWQuaXNHaG9zdEluZGV4KDAsIGNvbHVtbkluZGljZXMuY29sdW1uSW5kZXhFbmQpICYmXG4gICAgICAgICAgICB2aWV3cG9ydFJlY3QgIT0gbnVsbCAmJiB2aWV3cG9ydFJlY3QubGVmdCA9PT0gMDtcblxuICAgICAgICAvLyBkaXNhYmxlIHNjcm9sbCBmb3IgZ2hvc3QgY2VsbHNcbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoXCJicC10YWJsZS1ib2R5XCIsIHtcbiAgICAgICAgICAgIFwiYnAtdGFibGUtbm8taG9yaXpvbnRhbC1zY3JvbGxcIjogbm9Ib3Jpem9udGFsU2Nyb2xsLFxuICAgICAgICAgICAgXCJicC10YWJsZS1uby12ZXJ0aWNhbC1zY3JvbGxcIjogbm9WZXJ0aWNhbFNjcm9sbCxcbiAgICAgICAgICAgIFwiYnAtdGFibGUtc2VsZWN0aW9uLWVuYWJsZWRcIjogdGhpcy5pc1NlbGVjdGlvbk1vZGVFbmFibGVkKFJlZ2lvbkNhcmRpbmFsaXR5LkNFTExTKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICAgICAgIG9uU2Nyb2xsPXt0aGlzLmhhbmRsZUJvZHlTY3JvbGx9XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLnNldEJvZHlSZWZ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJicC10YWJsZS1ib2R5LXNjcm9sbC1jbGllbnRcIiBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVCb2R5XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd011bHRpcGxlU2VsZWN0aW9uPXthbGxvd011bHRpcGxlU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXt0aGlzLmJvZHlDZWxsUmVuZGVyZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkPXtncmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRvcj17bG9jYXRvcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0aW9uPXt0aGlzLmdldEVuYWJsZWRTZWxlY3Rpb25IYW5kbGVyKFJlZ2lvbkNhcmRpbmFsaXR5LkNFTExTKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckJvZHlDb250ZXh0TWVudT17cmVuZGVyQm9keUNvbnRleHRNZW51fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRSZWdpb25zPXtzZWxlY3RlZFJlZ2lvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybT17c2VsZWN0ZWRSZWdpb25UcmFuc2Zvcm19XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydFJlY3Q9e3ZpZXdwb3J0UmVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5yb3dJbmRpY2VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmNvbHVtbkluZGljZXN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMubWF5YmVSZW5kZXJCb2R5UmVnaW9ucygpfVxuXG4gICAgICAgICAgICAgICAgICAgIDxHdWlkZUxheWVyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJicC10YWJsZS1yZXNpemUtZ3VpZGVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsR3VpZGVzPXt2ZXJ0aWNhbEd1aWRlc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxHdWlkZXM9e2hvcml6b250YWxHdWlkZXN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNHdWlkZXNTaG93aW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS52ZXJ0aWNhbEd1aWRlcyAhPSBudWxsIHx8IHRoaXMuc3RhdGUuaG9yaXpvbnRhbEd1aWRlcyAhPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTZWxlY3Rpb25Nb2RlRW5hYmxlZChzZWxlY3Rpb25Nb2RlOiBSZWdpb25DYXJkaW5hbGl0eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3Rpb25Nb2Rlcy5pbmRleE9mKHNlbGVjdGlvbk1vZGUpICE9PSAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEVuYWJsZWRTZWxlY3Rpb25IYW5kbGVyKHNlbGVjdGlvbk1vZGU6IFJlZ2lvbkNhcmRpbmFsaXR5KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGlvbk1vZGVFbmFibGVkKHNlbGVjdGlvbk1vZGUpKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgc2VsZWN0aW9uIG1vZGUgaXNuJ3QgZW5hYmxlZCwgcmV0dXJuIGEgY2FsbGJhY2sgdGhhdFxuICAgICAgICAgICAgLy8gd2lsbCBjbGVhciB0aGUgc2VsZWN0aW9uLiBGb3IgZXhhbXBsZSwgaWYgcm93IHNlbGVjdGlvbiBpc1xuICAgICAgICAgICAgLy8gZGlzYWJsZWQsIGNsaWNraW5nIG9uIHRoZSByb3cgaGVhZGVyIHdpbGwgY2xlYXIgdGhlIHRhYmxlJ3NcbiAgICAgICAgICAgIC8vIHNlbGVjdGlvbi4gSWYgYWxsIHNlbGVjdGlvbiBtb2RlcyBhcmUgZW5hYmxlZCwgY2xpY2tpbmcgb24gdGhlXG4gICAgICAgICAgICAvLyBzYW1lIHJlZ2lvbiB0d2ljZSB3aWxsIGNsZWFyIHRoZSBzZWxlY3Rpb24uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbGVhclNlbGVjdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVNlbGVjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW52YWxpZGF0ZUdyaWQoKSB7XG4gICAgICAgIHRoaXMuZ3JpZCA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUdyaWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdyaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgeyBkZWZhdWx0Um93SGVpZ2h0LCBkZWZhdWx0Q29sdW1uV2lkdGggfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBjb25zdCB7IHJvd0hlaWdodHMsIGNvbHVtbldpZHRocyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9IG5ldyBHcmlkKFxuICAgICAgICAgICAgICAgIHJvd0hlaWdodHMsXG4gICAgICAgICAgICAgICAgY29sdW1uV2lkdGhzLFxuICAgICAgICAgICAgICAgIEdyaWQuREVGQVVMVF9CTEVFRCxcbiAgICAgICAgICAgICAgICBkZWZhdWx0Um93SGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRDb2x1bW5XaWR0aCxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgYFJlZ2lvbkxheWVyYCwgYXBwbHlpbmcgc3R5bGVzIHRvIHRoZSByZWdpb25zIHVzaW5nIHRoZVxuICAgICAqIHN1cHBsaWVkIGBJUmVnaW9uU3R5bGVyYC4gYFJlZ2lvbkxheWVyYCBpcyBhIGBQdXJlUmVuZGVyYCBjb21wb25lbnQsIHNvXG4gICAgICogdGhlIGBJUmVnaW9uU3R5bGVyYCBzaG91bGQgYmUgYSBuZXcgaW5zdGFuY2Ugb24gZXZlcnkgcmVuZGVyIGlmIHdlXG4gICAgICogaW50ZW5kIHRvIHJlZHJhdyB0aGUgcmVnaW9uIGxheWVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJSZWdpb25zKGdldFJlZ2lvblN0eWxlOiBJUmVnaW9uU3R5bGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzR3VpZGVzU2hvd2luZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVnaW9uR3JvdXBzID0gUmVnaW9ucy5qb2luU3R5bGVkUmVnaW9uR3JvdXBzKFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZFJlZ2lvbnMsXG4gICAgICAgICAgICB0aGlzLnByb3BzLnN0eWxlZFJlZ2lvbkdyb3VwcyxcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gcmVnaW9uR3JvdXBzLm1hcCgocmVnaW9uR3JvdXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxSZWdpb25MYXllclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMocmVnaW9uR3JvdXAuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgcmVnaW9ucz17cmVnaW9uR3JvdXAucmVnaW9uc31cbiAgICAgICAgICAgICAgICAgICAgZ2V0UmVnaW9uU3R5bGU9e2dldFJlZ2lvblN0eWxlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1heWJlUmVuZGVyQm9keVJlZ2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlciA9IChyZWdpb246IElSZWdpb24pOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXR5ID0gUmVnaW9ucy5nZXRSZWdpb25DYXJkaW5hbGl0eShyZWdpb24pO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmdyaWQuZ2V0UmVnaW9uU3R5bGUocmVnaW9uKTtcbiAgICAgICAgICAgIHN3aXRjaCAoY2FyZGluYWxpdHkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFJlZ2lvbkNhcmRpbmFsaXR5LkNFTExTOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfQ09MVU1OUzpcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUudG9wID0gXCItMXB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcblxuICAgICAgICAgICAgICAgIGNhc2UgUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9ST1dTOlxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5sZWZ0ID0gXCItMXB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRpc3BsYXk6IFwibm9uZVwiIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLm1heWJlUmVuZGVyUmVnaW9ucyhzdHlsZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJDb2x1bW5IZWFkZXJSZWdpb25zKCkge1xuICAgICAgICBjb25zdCBzdHlsZXIgPSAocmVnaW9uOiBJUmVnaW9uKTogUmVhY3QuQ1NTUHJvcGVydGllcyA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCB7IHZpZXdwb3J0UmVjdCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgICAgIGlmICh2aWV3cG9ydFJlY3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXR5ID0gUmVnaW9ucy5nZXRSZWdpb25DYXJkaW5hbGl0eShyZWdpb24pO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBncmlkLmdldFJlZ2lvblN0eWxlKHJlZ2lvbik7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoY2FyZGluYWxpdHkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfQ09MVU1OUzpcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUuYm90dG9tID0gXCItMXB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkey12aWV3cG9ydFJlY3QubGVmdH1weCwgMCwgMClgO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkaXNwbGF5OiBcIm5vbmVcIiB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5tYXliZVJlbmRlclJlZ2lvbnMoc3R5bGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1heWJlUmVuZGVyUm93SGVhZGVyUmVnaW9ucygpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVyID0gKHJlZ2lvbjogSVJlZ2lvbik6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgeyB2aWV3cG9ydFJlY3QgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICBpZiAodmlld3BvcnRSZWN0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYXJkaW5hbGl0eSA9IFJlZ2lvbnMuZ2V0UmVnaW9uQ2FyZGluYWxpdHkocmVnaW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZ3JpZC5nZXRSZWdpb25TdHlsZShyZWdpb24pO1xuICAgICAgICAgICAgc3dpdGNoIChjYXJkaW5hbGl0eSkge1xuICAgICAgICAgICAgICAgIGNhc2UgUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9ST1dTOlxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5yaWdodCA9IFwiLTFweFwiO1xuICAgICAgICAgICAgICAgICAgICBzdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwgJHstdmlld3BvcnRSZWN0LnRvcH1weCwgMClgO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkaXNwbGF5OiBcIm5vbmVcIiB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5tYXliZVJlbmRlclJlZ2lvbnMoc3R5bGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUNvbHVtbldpZHRoQ2hhbmdlZCA9IChjb2x1bW5JbmRleDogbnVtYmVyLCB3aWR0aDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbHVtbldpZHRocyA9IHRoaXMuc3RhdGUuY29sdW1uV2lkdGhzLnNsaWNlKCk7XG4gICAgICAgIGNvbHVtbldpZHRoc1tjb2x1bW5JbmRleF0gPSB3aWR0aDtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRlR3JpZCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29sdW1uV2lkdGhzIH0pO1xuXG4gICAgICAgIGNvbnN0IHsgb25Db2x1bW5XaWR0aENoYW5nZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmIChvbkNvbHVtbldpZHRoQ2hhbmdlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBvbkNvbHVtbldpZHRoQ2hhbmdlZChjb2x1bW5JbmRleCwgd2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVSb3dIZWlnaHRDaGFuZ2VkID0gKHJvd0luZGV4OiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvd0hlaWdodHMgPSB0aGlzLnN0YXRlLnJvd0hlaWdodHMuc2xpY2UoKTtcbiAgICAgICAgcm93SGVpZ2h0c1tyb3dJbmRleF0gPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0ZUdyaWQoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJvd0hlaWdodHMgfSk7XG5cbiAgICAgICAgY29uc3QgeyBvblJvd0hlaWdodENoYW5nZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmIChvblJvd0hlaWdodENoYW5nZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgb25Sb3dIZWlnaHRDaGFuZ2VkKHJvd0luZGV4LCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVSb290U2Nyb2xsID0gKF9ldmVudDogUmVhY3QuVUlFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgLy8gQnVnICMyMTEgLSBOYXRpdmUgYnJvd3NlciB0ZXh0IHNlbGVjdGlvbiBldmVudHMgY2FuIGNhdXNlIHRoZSByb290XG4gICAgICAgIC8vIGVsZW1lbnQgdG8gc2Nyb2xsIGV2ZW4gdGhvdWdoIGl0IGhhcyBhIG92ZXJmbG93OmhpZGRlbiBzdHlsZS4gVGhlXG4gICAgICAgIC8vIG9ubHkgdmlhYmxlIHNvbHV0aW9uIHRvIHRoaXMgaXMgdG8gdW5zY3JvbGwgdGhlIGVsZW1lbnQgYWZ0ZXIgdGhlXG4gICAgICAgIC8vIGJyb3dzZXIgc2Nyb2xscyBpdC5cbiAgICAgICAgaWYgKHRoaXMucm9vdFRhYmxlRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJvb3RUYWJsZUVsZW1lbnQuc2Nyb2xsTGVmdCA9IDA7XG4gICAgICAgICAgICB0aGlzLnJvb3RUYWJsZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQm9keVNjcm9sbCA9IChldmVudDogUmVhY3QuVUlFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgLy8gUHJldmVudCB0aGUgZXZlbnQgZnJvbSBwcm9wYWdhdGluZyB0byBhdm9pZCBhIHJlc2l6ZSBldmVudCBvbiB0aGVcbiAgICAgICAgLy8gcmVzaXplIHNlbnNvci5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgeyBsb2NhdG9yLCBpc0xheW91dExvY2tlZCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKGxvY2F0b3IgIT0gbnVsbCAmJiAhaXNMYXlvdXRMb2NrZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdwb3J0UmVjdCA9IGxvY2F0b3IuZ2V0Vmlld3BvcnRSZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmlld3BvcnRSZWN0IH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVDb2x1bW5SZXNpemVHdWlkZSA9ICh2ZXJ0aWNhbEd1aWRlczogbnVtYmVyW10pID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZlcnRpY2FsR3VpZGVzIH0gYXMgSVRhYmxlU3RhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlUm93UmVzaXplR3VpZGUgPSAoaG9yaXpvbnRhbEd1aWRlczogbnVtYmVyW10pID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGhvcml6b250YWxHdWlkZXMgfSBhcyBJVGFibGVTdGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhclNlbGVjdGlvbiA9IChfc2VsZWN0ZWRSZWdpb25zOiBJUmVnaW9uW10pID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3Rpb24oW10pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlU2VsZWN0aW9uID0gKHNlbGVjdGVkUmVnaW9uczogSVJlZ2lvbltdKSA9PiB7XG4gICAgICAgIC8vIG9ubHkgc2V0IHNlbGVjdGVkUmVnaW9ucyBzdGF0ZSBpZiBub3Qgc3BlY2lmaWVkIGluIHByb3BzXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkUmVnaW9ucyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRSZWdpb25zIH0gYXMgSVRhYmxlU3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBvblNlbGVjdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKG9uU2VsZWN0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIG9uU2VsZWN0aW9uKHNlbGVjdGVkUmVnaW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUxheW91dExvY2sgPSAoaXNMYXlvdXRMb2NrZWQgPSBmYWxzZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNMYXlvdXRMb2NrZWQgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRCb2R5UmVmID0gKHJlZjogSFRNTEVsZW1lbnQpID0+IHRoaXMuYm9keUVsZW1lbnQgPSByZWY7XG4gICAgcHJpdmF0ZSBzZXRNZW51UmVmID0gKHJlZjogSFRNTEVsZW1lbnQpID0+IHRoaXMubWVudUVsZW1lbnQgPSByZWY7XG4gICAgcHJpdmF0ZSBzZXRSb290VGFibGVSZWYgPSAocmVmOiBIVE1MRWxlbWVudCkgPT4gdGhpcy5yb290VGFibGVFbGVtZW50ID0gcmVmO1xuICAgIHByaXZhdGUgc2V0Um93SGVhZGVyUmVmID0gKHJlZjogSFRNTEVsZW1lbnQpID0+IHRoaXMucm93SGVhZGVyRWxlbWVudCA9IHJlZjtcblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
