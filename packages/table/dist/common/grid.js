/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var regions_1 = require("../regions");
var rect_1 = require("./rect");
var utils_1 = require("./utils");
var EXTREMA_LAST_IN_ROW = ["bp-table-last-in-row"];
var EXTREMA_LAST_IN_COLUMN = ["bp-table-last-in-column"];
var EXTREMA_LAST_IN_ROW_AND_COLUMN = ["bp-table-last-in-column", "bp-table-last-in-row"];
var EXTREMA_NONE = [];
/**
 * This class manages the sizes of grid cells using arrays of individual row/column sizes.
 */
var Grid = (function () {
    /**
     * This constructor accumulates the heights and widths in `O(n)`, saving
     * time in later calculations.
     *
     * @param bleed - The number of rows/cols that we expand beyond the
     *     viewport (on all sides). This helps avoid displaying an empty
     *     viewport when the user scrolls quickly.
     */
    function Grid(rowHeights, columnWidths, bleed, ghostHeight, ghostWidth) {
        var _this = this;
        if (bleed === void 0) { bleed = Grid.DEFAULT_BLEED; }
        if (ghostHeight === void 0) { ghostHeight = Grid.DEFAULT_GHOST_HEIGHT; }
        if (ghostWidth === void 0) { ghostWidth = Grid.DEFAULT_GHOST_WIDTH; }
        this.getCumulativeWidthAt = function (index) {
            if (index >= _this.numCols) {
                return _this.cumulativeColumnWidths[_this.numCols - 1] + _this.ghostWidth * (index - _this.numCols + 1);
            }
            else {
                return _this.cumulativeColumnWidths[index];
            }
        };
        this.getCumulativeHeightAt = function (index) {
            if (index >= _this.numRows) {
                return _this.cumulativeRowHeights[_this.numRows - 1] + _this.ghostHeight * (index - _this.numRows + 1);
            }
            else {
                return _this.cumulativeRowHeights[index];
            }
        };
        this.columnWidths = columnWidths;
        this.rowHeights = rowHeights;
        this.cumulativeColumnWidths = utils_1.Utils.accumulate(columnWidths);
        this.cumulativeRowHeights = utils_1.Utils.accumulate(rowHeights);
        this.numCols = columnWidths.length;
        this.numRows = rowHeights.length;
        this.bleed = bleed;
        this.ghostHeight = ghostHeight;
        this.ghostWidth = ghostWidth;
    }
    /**
     * Returns the `Rect` bounds of a cell in scrollpane client space.
     *
     * Scrollpane client coordinate space uses the origin of the scrollpane
     * client (the inside part that you're moving around).
     *
     * For example, let's say you're scrolling around a block of 1000 x 1000
     * cells. Regardless where you've scrolled, the first cell is always at
     * 0,0 in scrollpane client space. the cell to the right of it is always
     * at, e.g., 100,0.
     */
    Grid.prototype.getCellRect = function (rowIndex, columnIndex) {
        var height = this.rowHeights[rowIndex];
        var top = this.cumulativeRowHeights[rowIndex] - height;
        var width = this.columnWidths[columnIndex];
        var left = this.cumulativeColumnWidths[columnIndex] - width;
        return new rect_1.Rect(left, top, width, height);
    };
    /**
     * Returns the `Rect` bounds of a cell in scrollpane client space.
     *
     * If the cell is beyond the bounds of the user-defined table cells, it is
     * considered a "ghost" cell. If a width/height is not defined for that
     * row/column, we use the default width/height.
     */
    Grid.prototype.getGhostCellRect = function (rowIndex, columnIndex) {
        var left = 0;
        var top = 0;
        var width = 0;
        var height = 0;
        if (rowIndex >= this.rowHeights.length) {
            height = this.ghostHeight;
            top = this.getHeight() + this.ghostHeight * (rowIndex - this.numRows);
        }
        else {
            height = this.rowHeights[rowIndex];
            top = this.cumulativeRowHeights[rowIndex] - height;
        }
        if (columnIndex >= this.columnWidths.length) {
            width = this.ghostWidth;
            left = this.getWidth() + this.ghostWidth * (columnIndex - this.numCols);
        }
        else {
            width = this.columnWidths[columnIndex];
            left = this.cumulativeColumnWidths[columnIndex] - width;
        }
        return new rect_1.Rect(left, top, width, height);
    };
    /**
     * Returns the `Rect` with the base coordinate and height of the specified row.
     */
    Grid.prototype.getRowRect = function (rowIndex) {
        var height = this.rowHeights[rowIndex];
        var top = this.cumulativeRowHeights[rowIndex] - height;
        return new rect_1.Rect(0, top, this.getWidth(), height);
    };
    /**
     * Returns the `Rect` with the base coordinate and width of the specified column.
     */
    Grid.prototype.getColumnRect = function (columnIndex) {
        var width = this.columnWidths[columnIndex];
        var left = this.cumulativeColumnWidths[columnIndex] - width;
        return new rect_1.Rect(left, 0, width, this.getHeight());
    };
    /**
     * Returns the total width of the entire grid
     */
    Grid.prototype.getWidth = function () {
        return this.cumulativeColumnWidths[this.numCols - 1];
    };
    /**
     * Returns the total width of the entire grid
     */
    Grid.prototype.getHeight = function () {
        return this.cumulativeRowHeights[this.numRows - 1];
    };
    /**
     * Returns the `Rect` bounds of entire grid
     */
    Grid.prototype.getRect = function () {
        return new rect_1.Rect(0, 0, this.getWidth(), this.getHeight());
    };
    /**
     * Maps each cell that intersects with the given `Rect` argument. The
     * indices of iteration are extended in both directions by the integer
     * `bleed` class property, then are clamped between 0 and the number of
     * rows/columns.
     *
     * Uses a binary search for each of the 4 edges of the bounds, resulting
     * in a runtime of `O(log(rows) + log(cols))` plus the `O(irows * icols)`
     * iteration of intersecting cells.
     */
    Grid.prototype.mapCellsInRect = function (rect, callback) {
        var results = [];
        if (rect == null) {
            return results;
        }
        var _a = this.getRowIndicesInRect(rect), rowIndexStart = _a.rowIndexStart, rowIndexEnd = _a.rowIndexEnd;
        var _b = this.getColumnIndicesInRect(rect), columnIndexStart = _b.columnIndexStart, columnIndexEnd = _b.columnIndexEnd;
        for (var rowIndex = rowIndexStart; rowIndex <= rowIndexEnd; rowIndex++) {
            for (var columnIndex = columnIndexStart; columnIndex <= columnIndexEnd; columnIndex++) {
                results.push(callback(rowIndex, columnIndex));
            }
        }
        return results;
    };
    /**
     * Maps each row that intersects with the given `Rect` argument.
     *
     * See Grid.mapCellsInRect for more details.
     */
    Grid.prototype.mapRowsInRect = function (rect, callback) {
        var results = [];
        if (rect == null) {
            return results;
        }
        var _a = this.getRowIndicesInRect(rect), rowIndexStart = _a.rowIndexStart, rowIndexEnd = _a.rowIndexEnd;
        for (var rowIndex = rowIndexStart; rowIndex <= rowIndexEnd; rowIndex++) {
            results.push(callback(rowIndex));
        }
        return results;
    };
    /**
     * Maps each column that intersects with the given `Rect` argument.
     *
     * See Grid.mapCellsInRect for more details.
     */
    Grid.prototype.mapColumnsInRect = function (rect, callback) {
        var results = [];
        if (rect == null) {
            return results;
        }
        var _a = this.getColumnIndicesInRect(rect), columnIndexStart = _a.columnIndexStart, columnIndexEnd = _a.columnIndexEnd;
        for (var columnIndex = columnIndexStart; columnIndex <= columnIndexEnd; columnIndex++) {
            results.push(callback(columnIndex));
        }
        return results;
    };
    /**
     * Returns the start and end indices of rows that intersect with the given
     * `Rect` argument.
     */
    Grid.prototype.getRowIndicesInRect = function (rect, includeGhostCells, limit) {
        if (includeGhostCells === void 0) { includeGhostCells = false; }
        if (limit === void 0) { limit = Grid.DEFAULT_MAX_ROWS; }
        if (rect == null) {
            return { rowIndexEnd: 0, rowIndexStart: 0 };
        }
        var searchEnd = includeGhostCells ? Math.max(this.numRows, Grid.DEFAULT_MAX_ROWS) : this.numRows;
        var _a = this.getIndicesInInterval(rect.top, rect.top + rect.height, searchEnd, !includeGhostCells, this.getCumulativeHeightAt), start = _a.start, end = _a.end;
        if (limit > 0 && end - start > limit) {
            end = start + limit;
        }
        return {
            rowIndexEnd: end,
            rowIndexStart: start,
        };
    };
    /**
     * Returns the start and end indices of columns that intersect with the
     * given `Rect` argument.
     */
    Grid.prototype.getColumnIndicesInRect = function (rect, includeGhostCells, limit) {
        if (includeGhostCells === void 0) { includeGhostCells = false; }
        if (limit === void 0) { limit = Grid.DEFAULT_MAX_COLUMNS; }
        if (rect == null) {
            return { columnIndexEnd: 0, columnIndexStart: 0 };
        }
        var searchEnd = includeGhostCells ? Math.max(this.numCols, Grid.DEFAULT_MAX_COLUMNS) : this.numCols;
        var _a = this.getIndicesInInterval(rect.left, rect.left + rect.width, searchEnd, !includeGhostCells, this.getCumulativeWidthAt), start = _a.start, end = _a.end;
        if (limit > 0 && end - start > limit) {
            end = start + limit;
        }
        return {
            columnIndexEnd: end,
            columnIndexStart: start,
        };
    };
    Grid.prototype.isGhostIndex = function (rowIndex, columnIndex) {
        return (rowIndex >= this.numRows || columnIndex >= this.numCols);
    };
    Grid.prototype.getExtremaClasses = function (rowIndex, columnIndex, rowEnd, columnEnd) {
        if (rowIndex === rowEnd && columnIndex === columnEnd) {
            return EXTREMA_LAST_IN_ROW_AND_COLUMN;
        }
        if (rowIndex === rowEnd) {
            return EXTREMA_LAST_IN_COLUMN;
        }
        if (columnIndex === columnEnd) {
            return EXTREMA_LAST_IN_ROW;
        }
        return EXTREMA_NONE;
    };
    Grid.prototype.getRegionStyle = function (region) {
        var cardinality = regions_1.Regions.getRegionCardinality(region);
        switch (cardinality) {
            case regions_1.RegionCardinality.CELLS: {
                var cellRect0 = this.getCellRect(region.rows[0], region.cols[0]);
                var cellRect1 = this.getCellRect(region.rows[1], region.cols[1]);
                var offsetLeft = region.cols[0] === 0 ? 0 : 1;
                var offsetTop = region.rows[0] === 0 ? 0 : 1;
                var rect = cellRect0.union(cellRect1);
                rect.height += offsetTop;
                rect.left -= offsetLeft;
                rect.width += offsetLeft;
                rect.top -= offsetTop;
                return Object.assign(rect.style(), { display: "block" });
            }
            case regions_1.RegionCardinality.FULL_COLUMNS: {
                var cellRect0 = this.getCellRect(0, region.cols[0]);
                var cellRect1 = this.getCellRect(0, region.cols[1]);
                var rect = cellRect0.union(cellRect1);
                var offsetLeft = region.cols[0] === 0 ? 0 : 1;
                return {
                    bottom: 0,
                    display: "block",
                    left: rect.left - offsetLeft,
                    top: 0,
                    width: rect.width + offsetLeft,
                };
            }
            case regions_1.RegionCardinality.FULL_ROWS: {
                var cellRect0 = this.getCellRect(region.rows[0], 0);
                var cellRect1 = this.getCellRect(region.rows[1], 0);
                var rect = cellRect0.union(cellRect1);
                var offsetTop = region.rows[0] === 0 ? 0 : 1;
                return {
                    display: "block",
                    height: rect.height + offsetTop,
                    left: 0,
                    right: 0,
                    top: rect.top - offsetTop,
                };
            }
            case regions_1.RegionCardinality.FULL_TABLE:
                return {
                    bottom: 0,
                    display: "block",
                    left: 0,
                    right: 0,
                    top: 0,
                };
            default: return { display: "none" };
        }
    };
    Grid.prototype.getIndicesInInterval = function (min, max, count, useEndBleed, lookup) {
        var start = utils_1.Utils.binarySearch(min, count - 1, lookup);
        var end = utils_1.Utils.binarySearch(max, count - 1, lookup);
        // correct exact pixel alignment
        if (start >= 0 && min === lookup(start)) {
            start += 1;
        }
        // apply bounded bleeds
        start = Math.max(0, start - this.bleed);
        if (useEndBleed) {
            end = Math.min(count - 1, end + this.bleed);
        }
        else {
            end = Math.min(count - 1, end);
        }
        return { start: start, end: end };
    };
    Grid.DEFAULT_BLEED = 3;
    Grid.DEFAULT_MAX_COLUMNS = 50;
    Grid.DEFAULT_MAX_ROWS = 200;
    Grid.DEFAULT_GHOST_HEIGHT = 20;
    Grid.DEFAULT_GHOST_WIDTH = 150;
    return Grid;
}());
exports.Grid = Grid;

//# sourceMappingURL=data:application/json;base64,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QUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELE1BQU0sQ0FBQyxFQUFDLFlBQUssRUFBRSxRQUFHLEVBQUMsQ0FBQztJQUN4QixDQUFDO0lBblhhLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztJQUN6QixxQkFBZ0IsR0FBRyxHQUFHLENBQUM7SUFDdkIseUJBQW9CLEdBQUcsRUFBRSxDQUFDO0lBQzFCLHdCQUFtQixHQUFHLEdBQUcsQ0FBQztJQWdYNUMsV0FBQztBQUFELENBclhBLEFBcVhDLElBQUE7QUFyWFksWUFBSSxPQXFYaEIsQ0FBQSIsImZpbGUiOiJjb21tb24vZ3JpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCB7IElSZWdpb24sIFJlZ2lvbkNhcmRpbmFsaXR5LCBSZWdpb25zIH0gZnJvbSBcIi4uL3JlZ2lvbnNcIjtcbmltcG9ydCB7IFJlY3QgfSBmcm9tIFwiLi9yZWN0XCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCB0eXBlIElDZWxsTWFwcGVyPFQ+ID0gKHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIpID0+IFQ7XG5leHBvcnQgdHlwZSBJUm93TWFwcGVyPFQ+ID0gKHJvd0luZGV4OiBudW1iZXIpID0+IFQ7XG5leHBvcnQgdHlwZSBJQ29sdW1uTWFwcGVyPFQ+ID0gKGNvbHVtbkluZGV4OiBudW1iZXIpID0+IFQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJvd0luZGljZXMge1xuICAgIHJvd0luZGV4U3RhcnQ6IG51bWJlcjtcbiAgICByb3dJbmRleEVuZDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb2x1bW5JbmRpY2VzIHtcbiAgICBjb2x1bW5JbmRleFN0YXJ0OiBudW1iZXI7XG4gICAgY29sdW1uSW5kZXhFbmQ6IG51bWJlcjtcbn1cblxuY29uc3QgRVhUUkVNQV9MQVNUX0lOX1JPVyA9IFtcImJwLXRhYmxlLWxhc3QtaW4tcm93XCJdO1xuY29uc3QgRVhUUkVNQV9MQVNUX0lOX0NPTFVNTiA9IFtcImJwLXRhYmxlLWxhc3QtaW4tY29sdW1uXCJdO1xuY29uc3QgRVhUUkVNQV9MQVNUX0lOX1JPV19BTkRfQ09MVU1OID0gW1wiYnAtdGFibGUtbGFzdC1pbi1jb2x1bW5cIiwgXCJicC10YWJsZS1sYXN0LWluLXJvd1wiXTtcbmNvbnN0IEVYVFJFTUFfTk9ORTogc3RyaW5nW10gPSBbXTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIG1hbmFnZXMgdGhlIHNpemVzIG9mIGdyaWQgY2VsbHMgdXNpbmcgYXJyYXlzIG9mIGluZGl2aWR1YWwgcm93L2NvbHVtbiBzaXplcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEdyaWQge1xuICAgIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9CTEVFRCA9IDM7XG4gICAgcHVibGljIHN0YXRpYyBERUZBVUxUX01BWF9DT0xVTU5TID0gNTA7XG4gICAgcHVibGljIHN0YXRpYyBERUZBVUxUX01BWF9ST1dTID0gMjAwO1xuICAgIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9HSE9TVF9IRUlHSFQgPSAyMDtcbiAgICBwdWJsaWMgc3RhdGljIERFRkFVTFRfR0hPU1RfV0lEVEggPSAxNTA7XG5cbiAgICBwdWJsaWMgbnVtQ29sczogbnVtYmVyO1xuICAgIHB1YmxpYyBudW1Sb3dzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBibGVlZDogbnVtYmVyO1xuICAgIHByaXZhdGUgY29sdW1uV2lkdGhzOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIHJvd0hlaWdodHM6IG51bWJlcltdO1xuICAgIHByaXZhdGUgY3VtdWxhdGl2ZUNvbHVtbldpZHRoczogbnVtYmVyW107XG4gICAgcHJpdmF0ZSBjdW11bGF0aXZlUm93SGVpZ2h0czogbnVtYmVyW107XG4gICAgcHJpdmF0ZSBnaG9zdEhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgZ2hvc3RXaWR0aDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBjb25zdHJ1Y3RvciBhY2N1bXVsYXRlcyB0aGUgaGVpZ2h0cyBhbmQgd2lkdGhzIGluIGBPKG4pYCwgc2F2aW5nXG4gICAgICogdGltZSBpbiBsYXRlciBjYWxjdWxhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYmxlZWQgLSBUaGUgbnVtYmVyIG9mIHJvd3MvY29scyB0aGF0IHdlIGV4cGFuZCBiZXlvbmQgdGhlXG4gICAgICogICAgIHZpZXdwb3J0IChvbiBhbGwgc2lkZXMpLiBUaGlzIGhlbHBzIGF2b2lkIGRpc3BsYXlpbmcgYW4gZW1wdHlcbiAgICAgKiAgICAgdmlld3BvcnQgd2hlbiB0aGUgdXNlciBzY3JvbGxzIHF1aWNrbHkuXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICByb3dIZWlnaHRzOiBudW1iZXJbXSxcbiAgICAgICAgY29sdW1uV2lkdGhzOiBudW1iZXJbXSxcbiAgICAgICAgYmxlZWQgPSBHcmlkLkRFRkFVTFRfQkxFRUQsXG4gICAgICAgIGdob3N0SGVpZ2h0ID0gR3JpZC5ERUZBVUxUX0dIT1NUX0hFSUdIVCxcbiAgICAgICAgZ2hvc3RXaWR0aCA9IEdyaWQuREVGQVVMVF9HSE9TVF9XSURUSCxcbiAgICApIHtcbiAgICAgICAgdGhpcy5jb2x1bW5XaWR0aHMgPSBjb2x1bW5XaWR0aHM7XG4gICAgICAgIHRoaXMucm93SGVpZ2h0cyA9IHJvd0hlaWdodHM7XG4gICAgICAgIHRoaXMuY3VtdWxhdGl2ZUNvbHVtbldpZHRocyA9IFV0aWxzLmFjY3VtdWxhdGUoY29sdW1uV2lkdGhzKTtcbiAgICAgICAgdGhpcy5jdW11bGF0aXZlUm93SGVpZ2h0cyA9IFV0aWxzLmFjY3VtdWxhdGUocm93SGVpZ2h0cyk7XG4gICAgICAgIHRoaXMubnVtQ29scyA9IGNvbHVtbldpZHRocy5sZW5ndGg7XG4gICAgICAgIHRoaXMubnVtUm93cyA9IHJvd0hlaWdodHMubGVuZ3RoO1xuICAgICAgICB0aGlzLmJsZWVkID0gYmxlZWQ7XG4gICAgICAgIHRoaXMuZ2hvc3RIZWlnaHQgPSBnaG9zdEhlaWdodDtcbiAgICAgICAgdGhpcy5naG9zdFdpZHRoID0gZ2hvc3RXaWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBgUmVjdGAgYm91bmRzIG9mIGEgY2VsbCBpbiBzY3JvbGxwYW5lIGNsaWVudCBzcGFjZS5cbiAgICAgKlxuICAgICAqIFNjcm9sbHBhbmUgY2xpZW50IGNvb3JkaW5hdGUgc3BhY2UgdXNlcyB0aGUgb3JpZ2luIG9mIHRoZSBzY3JvbGxwYW5lXG4gICAgICogY2xpZW50ICh0aGUgaW5zaWRlIHBhcnQgdGhhdCB5b3UncmUgbW92aW5nIGFyb3VuZCkuXG4gICAgICpcbiAgICAgKiBGb3IgZXhhbXBsZSwgbGV0J3Mgc2F5IHlvdSdyZSBzY3JvbGxpbmcgYXJvdW5kIGEgYmxvY2sgb2YgMTAwMCB4IDEwMDBcbiAgICAgKiBjZWxscy4gUmVnYXJkbGVzcyB3aGVyZSB5b3UndmUgc2Nyb2xsZWQsIHRoZSBmaXJzdCBjZWxsIGlzIGFsd2F5cyBhdFxuICAgICAqIDAsMCBpbiBzY3JvbGxwYW5lIGNsaWVudCBzcGFjZS4gdGhlIGNlbGwgdG8gdGhlIHJpZ2h0IG9mIGl0IGlzIGFsd2F5c1xuICAgICAqIGF0LCBlLmcuLCAxMDAsMC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q2VsbFJlY3Qocm93SW5kZXg6IG51bWJlciwgY29sdW1uSW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnJvd0hlaWdodHNbcm93SW5kZXhdO1xuICAgICAgICBjb25zdCB0b3AgPSB0aGlzLmN1bXVsYXRpdmVSb3dIZWlnaHRzW3Jvd0luZGV4XSAtIGhlaWdodDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmNvbHVtbldpZHRoc1tjb2x1bW5JbmRleF07XG4gICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLmN1bXVsYXRpdmVDb2x1bW5XaWR0aHNbY29sdW1uSW5kZXhdIC0gd2lkdGg7XG4gICAgICAgIHJldHVybiBuZXcgUmVjdChsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGBSZWN0YCBib3VuZHMgb2YgYSBjZWxsIGluIHNjcm9sbHBhbmUgY2xpZW50IHNwYWNlLlxuICAgICAqXG4gICAgICogSWYgdGhlIGNlbGwgaXMgYmV5b25kIHRoZSBib3VuZHMgb2YgdGhlIHVzZXItZGVmaW5lZCB0YWJsZSBjZWxscywgaXQgaXNcbiAgICAgKiBjb25zaWRlcmVkIGEgXCJnaG9zdFwiIGNlbGwuIElmIGEgd2lkdGgvaGVpZ2h0IGlzIG5vdCBkZWZpbmVkIGZvciB0aGF0XG4gICAgICogcm93L2NvbHVtbiwgd2UgdXNlIHRoZSBkZWZhdWx0IHdpZHRoL2hlaWdodC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0R2hvc3RDZWxsUmVjdChyb3dJbmRleDogbnVtYmVyLCBjb2x1bW5JbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBsZWZ0ID0gMDtcbiAgICAgICAgbGV0IHRvcCA9IDA7XG4gICAgICAgIGxldCB3aWR0aCA9IDA7XG4gICAgICAgIGxldCBoZWlnaHQgPSAwO1xuICAgICAgICBpZiAocm93SW5kZXggPj0gdGhpcy5yb3dIZWlnaHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5naG9zdEhlaWdodDtcbiAgICAgICAgICAgIHRvcCA9IHRoaXMuZ2V0SGVpZ2h0KCkgKyB0aGlzLmdob3N0SGVpZ2h0ICogKHJvd0luZGV4IC0gdGhpcy5udW1Sb3dzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlaWdodCA9IHRoaXMucm93SGVpZ2h0c1tyb3dJbmRleF07XG4gICAgICAgICAgICB0b3AgPSB0aGlzLmN1bXVsYXRpdmVSb3dIZWlnaHRzW3Jvd0luZGV4XSAtIGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA+PSB0aGlzLmNvbHVtbldpZHRocy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5naG9zdFdpZHRoO1xuICAgICAgICAgICAgbGVmdCA9IHRoaXMuZ2V0V2lkdGgoKSArIHRoaXMuZ2hvc3RXaWR0aCAqIChjb2x1bW5JbmRleCAtIHRoaXMubnVtQ29scyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuY29sdW1uV2lkdGhzW2NvbHVtbkluZGV4XTtcbiAgICAgICAgICAgIGxlZnQgPSB0aGlzLmN1bXVsYXRpdmVDb2x1bW5XaWR0aHNbY29sdW1uSW5kZXhdIC0gd2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0KGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYFJlY3RgIHdpdGggdGhlIGJhc2UgY29vcmRpbmF0ZSBhbmQgaGVpZ2h0IG9mIHRoZSBzcGVjaWZpZWQgcm93LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRSb3dSZWN0KHJvd0luZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5yb3dIZWlnaHRzW3Jvd0luZGV4XTtcbiAgICAgICAgY29uc3QgdG9wID0gdGhpcy5jdW11bGF0aXZlUm93SGVpZ2h0c1tyb3dJbmRleF0gLSBoZWlnaHQ7XG4gICAgICAgIHJldHVybiBuZXcgUmVjdCgwLCB0b3AsIHRoaXMuZ2V0V2lkdGgoKSwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBgUmVjdGAgd2l0aCB0aGUgYmFzZSBjb29yZGluYXRlIGFuZCB3aWR0aCBvZiB0aGUgc3BlY2lmaWVkIGNvbHVtbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q29sdW1uUmVjdChjb2x1bW5JbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5jb2x1bW5XaWR0aHNbY29sdW1uSW5kZXhdO1xuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5jdW11bGF0aXZlQ29sdW1uV2lkdGhzW2NvbHVtbkluZGV4XSAtIHdpZHRoO1xuICAgICAgICByZXR1cm4gbmV3IFJlY3QobGVmdCwgMCwgd2lkdGgsIHRoaXMuZ2V0SGVpZ2h0KCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHRvdGFsIHdpZHRoIG9mIHRoZSBlbnRpcmUgZ3JpZFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VtdWxhdGl2ZUNvbHVtbldpZHRoc1t0aGlzLm51bUNvbHMgLSAxXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0b3RhbCB3aWR0aCBvZiB0aGUgZW50aXJlIGdyaWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdW11bGF0aXZlUm93SGVpZ2h0c1t0aGlzLm51bVJvd3MgLSAxXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBgUmVjdGAgYm91bmRzIG9mIGVudGlyZSBncmlkXG4gICAgICovXG4gICAgcHVibGljIGdldFJlY3QoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVjdCgwLCAwLCB0aGlzLmdldFdpZHRoKCksIHRoaXMuZ2V0SGVpZ2h0KCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgZWFjaCBjZWxsIHRoYXQgaW50ZXJzZWN0cyB3aXRoIHRoZSBnaXZlbiBgUmVjdGAgYXJndW1lbnQuIFRoZVxuICAgICAqIGluZGljZXMgb2YgaXRlcmF0aW9uIGFyZSBleHRlbmRlZCBpbiBib3RoIGRpcmVjdGlvbnMgYnkgdGhlIGludGVnZXJcbiAgICAgKiBgYmxlZWRgIGNsYXNzIHByb3BlcnR5LCB0aGVuIGFyZSBjbGFtcGVkIGJldHdlZW4gMCBhbmQgdGhlIG51bWJlciBvZlxuICAgICAqIHJvd3MvY29sdW1ucy5cbiAgICAgKlxuICAgICAqIFVzZXMgYSBiaW5hcnkgc2VhcmNoIGZvciBlYWNoIG9mIHRoZSA0IGVkZ2VzIG9mIHRoZSBib3VuZHMsIHJlc3VsdGluZ1xuICAgICAqIGluIGEgcnVudGltZSBvZiBgTyhsb2cocm93cykgKyBsb2coY29scykpYCBwbHVzIHRoZSBgTyhpcm93cyAqIGljb2xzKWBcbiAgICAgKiBpdGVyYXRpb24gb2YgaW50ZXJzZWN0aW5nIGNlbGxzLlxuICAgICAqL1xuICAgIHB1YmxpYyBtYXBDZWxsc0luUmVjdDxUPihyZWN0OiBSZWN0LCBjYWxsYmFjazogSUNlbGxNYXBwZXI8VD4pOiBUW10ge1xuICAgICAgICBjb25zdCByZXN1bHRzOiBUW10gPSBbXTtcbiAgICAgICAgaWYgKHJlY3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7cm93SW5kZXhTdGFydCwgcm93SW5kZXhFbmR9ID0gdGhpcy5nZXRSb3dJbmRpY2VzSW5SZWN0KHJlY3QpO1xuICAgICAgICBjb25zdCB7Y29sdW1uSW5kZXhTdGFydCwgY29sdW1uSW5kZXhFbmR9ID0gdGhpcy5nZXRDb2x1bW5JbmRpY2VzSW5SZWN0KHJlY3QpO1xuICAgICAgICBmb3IgKGxldCByb3dJbmRleCA9IHJvd0luZGV4U3RhcnQ7IHJvd0luZGV4IDw9IHJvd0luZGV4RW5kOyByb3dJbmRleCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW5JbmRleCA9IGNvbHVtbkluZGV4U3RhcnQ7IGNvbHVtbkluZGV4IDw9IGNvbHVtbkluZGV4RW5kOyBjb2x1bW5JbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKHJvd0luZGV4LCBjb2x1bW5JbmRleCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1hcHMgZWFjaCByb3cgdGhhdCBpbnRlcnNlY3RzIHdpdGggdGhlIGdpdmVuIGBSZWN0YCBhcmd1bWVudC5cbiAgICAgKlxuICAgICAqIFNlZSBHcmlkLm1hcENlbGxzSW5SZWN0IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICovXG4gICAgcHVibGljIG1hcFJvd3NJblJlY3Q8VD4ocmVjdDogUmVjdCwgY2FsbGJhY2s6IElSb3dNYXBwZXI8VD4pOiBUW10ge1xuICAgICAgICBjb25zdCByZXN1bHRzOiBUW10gPSBbXTtcbiAgICAgICAgaWYgKHJlY3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7cm93SW5kZXhTdGFydCwgcm93SW5kZXhFbmR9ID0gdGhpcy5nZXRSb3dJbmRpY2VzSW5SZWN0KHJlY3QpO1xuICAgICAgICBmb3IgKGxldCByb3dJbmRleCA9IHJvd0luZGV4U3RhcnQ7IHJvd0luZGV4IDw9IHJvd0luZGV4RW5kOyByb3dJbmRleCsrKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goY2FsbGJhY2socm93SW5kZXgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGVhY2ggY29sdW1uIHRoYXQgaW50ZXJzZWN0cyB3aXRoIHRoZSBnaXZlbiBgUmVjdGAgYXJndW1lbnQuXG4gICAgICpcbiAgICAgKiBTZWUgR3JpZC5tYXBDZWxsc0luUmVjdCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqL1xuICAgIHB1YmxpYyBtYXBDb2x1bW5zSW5SZWN0PFQ+KHJlY3Q6IFJlY3QsIGNhbGxiYWNrOiBJQ29sdW1uTWFwcGVyPFQ+KTogVFtdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0czogVFtdID0gW107XG4gICAgICAgIGlmIChyZWN0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qge2NvbHVtbkluZGV4U3RhcnQsIGNvbHVtbkluZGV4RW5kfSA9IHRoaXMuZ2V0Q29sdW1uSW5kaWNlc0luUmVjdChyZWN0KTtcbiAgICAgICAgZm9yIChsZXQgY29sdW1uSW5kZXggPSBjb2x1bW5JbmRleFN0YXJ0OyBjb2x1bW5JbmRleCA8PSBjb2x1bW5JbmRleEVuZDsgY29sdW1uSW5kZXgrKykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKGNvbHVtbkluZGV4KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3RhcnQgYW5kIGVuZCBpbmRpY2VzIG9mIHJvd3MgdGhhdCBpbnRlcnNlY3Qgd2l0aCB0aGUgZ2l2ZW5cbiAgICAgKiBgUmVjdGAgYXJndW1lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldFJvd0luZGljZXNJblJlY3QoXG4gICAgICAgIHJlY3Q6IFJlY3QsXG4gICAgICAgIGluY2x1ZGVHaG9zdENlbGxzID0gZmFsc2UsXG4gICAgICAgIGxpbWl0ID0gR3JpZC5ERUZBVUxUX01BWF9ST1dTLFxuICAgICk6IElSb3dJbmRpY2VzIHtcblxuICAgICAgICBpZiAocmVjdCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge3Jvd0luZGV4RW5kOiAwLCByb3dJbmRleFN0YXJ0OiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaEVuZCA9IGluY2x1ZGVHaG9zdENlbGxzID8gTWF0aC5tYXgodGhpcy5udW1Sb3dzLCBHcmlkLkRFRkFVTFRfTUFYX1JPV1MpIDogdGhpcy5udW1Sb3dzO1xuICAgICAgICBsZXQge3N0YXJ0LCBlbmR9ID0gdGhpcy5nZXRJbmRpY2VzSW5JbnRlcnZhbChcbiAgICAgICAgICAgIHJlY3QudG9wLFxuICAgICAgICAgICAgcmVjdC50b3AgKyByZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHNlYXJjaEVuZCxcbiAgICAgICAgICAgICFpbmNsdWRlR2hvc3RDZWxscyxcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3VtdWxhdGl2ZUhlaWdodEF0LFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChsaW1pdCA+IDAgJiYgZW5kIC0gc3RhcnQgPiBsaW1pdCkge1xuICAgICAgICAgICAgZW5kID0gc3RhcnQgKyBsaW1pdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3dJbmRleEVuZDogZW5kLFxuICAgICAgICAgICAgcm93SW5kZXhTdGFydDogc3RhcnQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc3RhcnQgYW5kIGVuZCBpbmRpY2VzIG9mIGNvbHVtbnMgdGhhdCBpbnRlcnNlY3Qgd2l0aCB0aGVcbiAgICAgKiBnaXZlbiBgUmVjdGAgYXJndW1lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldENvbHVtbkluZGljZXNJblJlY3QoXG4gICAgICAgIHJlY3Q6IFJlY3QsXG4gICAgICAgIGluY2x1ZGVHaG9zdENlbGxzID0gZmFsc2UsXG4gICAgICAgIGxpbWl0ID0gR3JpZC5ERUZBVUxUX01BWF9DT0xVTU5TLFxuICAgICk6IElDb2x1bW5JbmRpY2VzIHtcblxuICAgICAgICBpZiAocmVjdCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge2NvbHVtbkluZGV4RW5kOiAwLCBjb2x1bW5JbmRleFN0YXJ0OiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaEVuZCA9IGluY2x1ZGVHaG9zdENlbGxzID8gTWF0aC5tYXgodGhpcy5udW1Db2xzLCBHcmlkLkRFRkFVTFRfTUFYX0NPTFVNTlMpIDogdGhpcy5udW1Db2xzO1xuICAgICAgICBsZXQge3N0YXJ0LCBlbmR9ID0gdGhpcy5nZXRJbmRpY2VzSW5JbnRlcnZhbChcbiAgICAgICAgICAgIHJlY3QubGVmdCxcbiAgICAgICAgICAgIHJlY3QubGVmdCArIHJlY3Qud2lkdGgsXG4gICAgICAgICAgICBzZWFyY2hFbmQsXG4gICAgICAgICAgICAhaW5jbHVkZUdob3N0Q2VsbHMsXG4gICAgICAgICAgICB0aGlzLmdldEN1bXVsYXRpdmVXaWR0aEF0LFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChsaW1pdCA+IDAgJiYgZW5kIC0gc3RhcnQgPiBsaW1pdCkge1xuICAgICAgICAgICAgZW5kID0gc3RhcnQgKyBsaW1pdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2x1bW5JbmRleEVuZDogZW5kLFxuICAgICAgICAgICAgY29sdW1uSW5kZXhTdGFydDogc3RhcnQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGlzR2hvc3RJbmRleChyb3dJbmRleDogbnVtYmVyLCBjb2x1bW5JbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiAocm93SW5kZXggPj0gdGhpcy5udW1Sb3dzIHx8IGNvbHVtbkluZGV4ID49IHRoaXMubnVtQ29scyk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEV4dHJlbWFDbGFzc2VzKHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIsIHJvd0VuZDogbnVtYmVyLCBjb2x1bW5FbmQ6IG51bWJlcikge1xuICAgICAgICBpZiAocm93SW5kZXggPT09IHJvd0VuZCAmJiBjb2x1bW5JbmRleCA9PT0gY29sdW1uRW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gRVhUUkVNQV9MQVNUX0lOX1JPV19BTkRfQ09MVU1OO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb3dJbmRleCA9PT0gcm93RW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gRVhUUkVNQV9MQVNUX0lOX0NPTFVNTjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sdW1uSW5kZXggPT09IGNvbHVtbkVuZCkge1xuICAgICAgICAgICAgcmV0dXJuIEVYVFJFTUFfTEFTVF9JTl9ST1c7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVYVFJFTUFfTk9ORTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmVnaW9uU3R5bGUocmVnaW9uOiBJUmVnaW9uKSB7XG4gICAgICAgIGNvbnN0IGNhcmRpbmFsaXR5ID0gUmVnaW9ucy5nZXRSZWdpb25DYXJkaW5hbGl0eShyZWdpb24pO1xuICAgICAgICBzd2l0Y2ggKGNhcmRpbmFsaXR5KSB7XG4gICAgICAgICAgICBjYXNlIFJlZ2lvbkNhcmRpbmFsaXR5LkNFTExTOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbFJlY3QwID0gdGhpcy5nZXRDZWxsUmVjdChyZWdpb24ucm93c1swXSwgcmVnaW9uLmNvbHNbMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxSZWN0MSA9IHRoaXMuZ2V0Q2VsbFJlY3QocmVnaW9uLnJvd3NbMV0sIHJlZ2lvbi5jb2xzWzFdKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXRMZWZ0ID0gcmVnaW9uLmNvbHNbMF0gPT09IDAgPyAwIDogMTtcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXRUb3AgPSByZWdpb24ucm93c1swXSA9PT0gMCA/IDAgOiAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBjZWxsUmVjdDAudW5pb24oY2VsbFJlY3QxKTtcbiAgICAgICAgICAgICAgICByZWN0LmhlaWdodCArPSBvZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgcmVjdC5sZWZ0IC09IG9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgcmVjdC53aWR0aCArPSBvZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHJlY3QudG9wIC09IG9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihyZWN0LnN0eWxlKCksIHsgZGlzcGxheTogXCJibG9ja1wiIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfQ09MVU1OUzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxSZWN0MCA9IHRoaXMuZ2V0Q2VsbFJlY3QoMCwgcmVnaW9uLmNvbHNbMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxSZWN0MSA9IHRoaXMuZ2V0Q2VsbFJlY3QoMCwgcmVnaW9uLmNvbHNbMV0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBjZWxsUmVjdDAudW5pb24oY2VsbFJlY3QxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXRMZWZ0ID0gcmVnaW9uLmNvbHNbMF0gPT09IDAgPyAwIDogMTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0IC0gb2Zmc2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogcmVjdC53aWR0aCArIG9mZnNldExlZnQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfUk9XUzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxSZWN0MCA9IHRoaXMuZ2V0Q2VsbFJlY3QocmVnaW9uLnJvd3NbMF0sIDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxSZWN0MSA9IHRoaXMuZ2V0Q2VsbFJlY3QocmVnaW9uLnJvd3NbMV0sIDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBjZWxsUmVjdDAudW5pb24oY2VsbFJlY3QxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXRUb3AgPSByZWdpb24ucm93c1swXSA9PT0gMCA/IDAgOiAxO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodCArIG9mZnNldFRvcCxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogcmVjdC50b3AgLSBvZmZzZXRUb3AsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBSZWdpb25DYXJkaW5hbGl0eS5GVUxMX1RBQkxFOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiB7IGRpc3BsYXk6IFwibm9uZVwiIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q3VtdWxhdGl2ZVdpZHRoQXQgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5udW1Db2xzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdW11bGF0aXZlQ29sdW1uV2lkdGhzW3RoaXMubnVtQ29scyAtIDFdICsgdGhpcy5naG9zdFdpZHRoICogKGluZGV4IC0gdGhpcy5udW1Db2xzICsgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdW11bGF0aXZlQ29sdW1uV2lkdGhzW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDdW11bGF0aXZlSGVpZ2h0QXQgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5udW1Sb3dzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdW11bGF0aXZlUm93SGVpZ2h0c1t0aGlzLm51bVJvd3MgLSAxXSArIHRoaXMuZ2hvc3RIZWlnaHQgKiAoaW5kZXggLSB0aGlzLm51bVJvd3MgKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1bXVsYXRpdmVSb3dIZWlnaHRzW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW5kaWNlc0luSW50ZXJ2YWwoXG4gICAgICAgIG1pbjogbnVtYmVyLFxuICAgICAgICBtYXg6IG51bWJlcixcbiAgICAgICAgY291bnQ6IG51bWJlcixcbiAgICAgICAgdXNlRW5kQmxlZWQ6IGJvb2xlYW4sXG4gICAgICAgIGxvb2t1cDogKGluZGV4OiBudW1iZXIpID0+IG51bWJlcixcbiAgICApIHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gVXRpbHMuYmluYXJ5U2VhcmNoKG1pbiwgY291bnQgLSAxLCBsb29rdXApO1xuICAgICAgICBsZXQgZW5kID0gVXRpbHMuYmluYXJ5U2VhcmNoKG1heCwgY291bnQgLSAxLCBsb29rdXApO1xuXG4gICAgICAgIC8vIGNvcnJlY3QgZXhhY3QgcGl4ZWwgYWxpZ25tZW50XG4gICAgICAgIGlmIChzdGFydCA+PSAwICYmIG1pbiA9PT0gbG9va3VwKHN0YXJ0KSkge1xuICAgICAgICAgICAgc3RhcnQgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFwcGx5IGJvdW5kZWQgYmxlZWRzXG4gICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMCwgc3RhcnQgLSB0aGlzLmJsZWVkKTtcbiAgICAgICAgaWYgKHVzZUVuZEJsZWVkKSB7XG4gICAgICAgICAgICBlbmQgPSBNYXRoLm1pbihjb3VudCAtIDEsIGVuZCArIHRoaXMuYmxlZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kID0gTWF0aC5taW4oY291bnQgLSAxLCBlbmQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7c3RhcnQsIGVuZH07XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
