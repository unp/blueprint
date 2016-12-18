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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@blueprintjs/core");
var React = require("react");
var cell_1 = require("./cell/cell");
var rect_1 = require("./common/rect");
var utils_1 = require("./common/utils");
var menus_1 = require("./interactions/menus");
var selectable_1 = require("./interactions/selectable");
var regions_1 = require("./regions");
var TABLE_BODY_CLASSES = "bp-table-body-virtual-client bp-table-cell-client";
var CELL_GHOST_CLASS = "bp-table-cell-ghost";
var CELL_LEDGER_ODD_CLASS = "bp-table-cell-ledger-odd";
var CELL_LEDGER_EVEN_CLASS = "bp-table-cell-ledger-even";
/**
 * For perf, we want to ignore changes to the `ISelectableProps` part of the
 * `ITableBodyProps` since those are only used when a context menu is launched.
 */
var UPDATE_PROPS_KEYS = [
    "grid",
    "locator",
    "viewportRect",
    "cellRenderer",
    "rowIndexStart",
    "rowIndexEnd",
    "columnIndexStart",
    "columnIndexEnd",
];
var TableBody = (function (_super) {
    __extends(TableBody, _super);
    function TableBody() {
        var _this = this;
        _super.apply(this, arguments);
        this.renderGhostCell = function (rowIndex, columnIndex, extremaClasses) {
            var grid = _this.props.grid;
            var cell = utils_1.Utils.assignClasses(cell_1.emptyCellRenderer(rowIndex, columnIndex), TableBody.cellClassNames(rowIndex, columnIndex), extremaClasses, CELL_GHOST_CLASS, (_a = {},
                _a[CELL_LEDGER_ODD_CLASS] = (rowIndex % 2) === 1,
                _a[CELL_LEDGER_EVEN_CLASS] = (rowIndex % 2) === 0,
                _a
            ));
            var key = TableBody.cellReactKey(rowIndex, columnIndex);
            var style = Object.assign({}, cell.props.style, rect_1.Rect.style(grid.getGhostCellRect(rowIndex, columnIndex)));
            return React.cloneElement(cell, { key: key, style: style });
            var _a;
        };
        this.renderCell = function (rowIndex, columnIndex, extremaClasses) {
            var _a = _this.props, allowMultipleSelection = _a.allowMultipleSelection, grid = _a.grid, cellRenderer = _a.cellRenderer, onSelection = _a.onSelection, selectedRegions = _a.selectedRegions, selectedRegionTransform = _a.selectedRegionTransform;
            var cell = utils_1.Utils.assignClasses(cellRenderer(rowIndex, columnIndex), TableBody.cellClassNames(rowIndex, columnIndex), extremaClasses, (_b = {},
                _b[CELL_LEDGER_ODD_CLASS] = (rowIndex % 2) === 1,
                _b[CELL_LEDGER_EVEN_CLASS] = (rowIndex % 2) === 0,
                _b
            ));
            var key = TableBody.cellReactKey(rowIndex, columnIndex);
            var style = Object.assign({}, cell.props.style, rect_1.Rect.style(grid.getCellRect(rowIndex, columnIndex)));
            return (React.createElement(selectable_1.DragSelectable, {allowMultipleSelection: allowMultipleSelection, key: key, locateClick: _this.locateClick, locateDrag: _this.locateDrag, onSelection: onSelection, selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform}, React.cloneElement(cell, { style: style })));
            var _b;
        };
        this.locateClick = function (event) {
            var _a = _this.props.locator.convertPointToCell(event.clientX, event.clientY), col = _a.col, row = _a.row;
            return regions_1.Regions.cell(row, col);
        };
        this.locateDrag = function (_event, coords) {
            var start = _this.props.locator.convertPointToCell(coords.activation[0], coords.activation[1]);
            var end = _this.props.locator.convertPointToCell(coords.current[0], coords.current[1]);
            return regions_1.Regions.cell(start.row, start.col, end.row, end.col);
        };
    }
    /**
     * Returns the array of class names that must be applied to each table
     * cell so that we can locate any cell based on its coordinate.
     */
    TableBody.cellClassNames = function (rowIndex, columnIndex) {
        return [
            ("bp-table-cell-row-" + rowIndex),
            ("bp-table-cell-col-" + columnIndex),
        ];
    };
    TableBody.shallowCompareKeys = function (objA, objB, keys) {
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (objA[key] !== objB[key]) {
                return false;
            }
        }
        return true;
    };
    TableBody.cellReactKey = function (rowIndex, columnIndex) {
        return "cell-" + rowIndex + "-" + columnIndex;
    };
    TableBody.prototype.shouldComponentUpdate = function (nextProps) {
        var shallowEqual = TableBody.shallowCompareKeys(this.props, nextProps, UPDATE_PROPS_KEYS);
        return !shallowEqual;
    };
    TableBody.prototype.render = function () {
        var _a = this.props, grid = _a.grid, rowIndexStart = _a.rowIndexStart, rowIndexEnd = _a.rowIndexEnd, columnIndexStart = _a.columnIndexStart, columnIndexEnd = _a.columnIndexEnd;
        var cells = [];
        for (var rowIndex = rowIndexStart; rowIndex <= rowIndexEnd; rowIndex++) {
            for (var columnIndex = columnIndexStart; columnIndex <= columnIndexEnd; columnIndex++) {
                var isGhost = grid.isGhostIndex(rowIndex, columnIndex);
                var extremaClasses = grid.getExtremaClasses(rowIndex, columnIndex, rowIndexEnd, columnIndexEnd);
                var renderer = isGhost ? this.renderGhostCell : this.renderCell;
                cells.push(renderer(rowIndex, columnIndex, extremaClasses));
            }
        }
        var style = grid.getRect().sizeStyle();
        return React.createElement("div", {className: TABLE_BODY_CLASSES, style: style}, cells);
    };
    TableBody.prototype.renderContextMenu = function (e) {
        var _a = this.props, selectedRegions = _a.selectedRegions, renderBodyContextMenu = _a.renderBodyContextMenu, grid = _a.grid;
        if (renderBodyContextMenu == null) {
            return undefined;
        }
        var target = this.locateClick(e.nativeEvent);
        return renderBodyContextMenu(new menus_1.MenuContext(target, selectedRegions, grid.numRows, grid.numCols));
    };
    TableBody = __decorate([
        core_1.ContextMenuTarget
    ], TableBody);
    return TableBody;
}(React.Component));
exports.TableBody = TableBody;

//# sourceMappingURL=data:application/json;base64,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QU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQXlCLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxtQkFBVyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBdkRMO1FBQUMsd0JBQWlCO2lCQUFBO0lBb0hsQixnQkFBQztBQUFELENBbkhBLEFBbUhDLENBbkg4QixLQUFLLENBQUMsU0FBUyxHQW1IN0M7QUFuSFksaUJBQVMsWUFtSHJCLENBQUEiLCJmaWxlIjoidGFibGVCb2R5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0IHsgQ29udGV4dE1lbnVUYXJnZXQsIElQcm9wcyB9IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBlbXB0eUNlbGxSZW5kZXJlciwgSUNlbGxQcm9wcywgSUNlbGxSZW5kZXJlciB9IGZyb20gXCIuL2NlbGwvY2VsbFwiO1xuaW1wb3J0IHsgR3JpZCwgSUNvbHVtbkluZGljZXMsIElSb3dJbmRpY2VzIH0gZnJvbSBcIi4vY29tbW9uL2dyaWRcIjtcbmltcG9ydCB7IFJlY3QgfSBmcm9tIFwiLi9jb21tb24vcmVjdFwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9jb21tb24vdXRpbHNcIjtcbmltcG9ydCB7IElDb29yZGluYXRlRGF0YSB9IGZyb20gXCIuL2ludGVyYWN0aW9ucy9kcmFnZ2FibGVcIjtcbmltcG9ydCB7IElDb250ZXh0TWVudVJlbmRlcmVyLCBNZW51Q29udGV4dCB9IGZyb20gXCIuL2ludGVyYWN0aW9ucy9tZW51c1wiO1xuaW1wb3J0IHsgRHJhZ1NlbGVjdGFibGUsIElTZWxlY3RhYmxlUHJvcHMgfSBmcm9tIFwiLi9pbnRlcmFjdGlvbnMvc2VsZWN0YWJsZVwiO1xuaW1wb3J0IHsgSUxvY2F0b3IgfSBmcm9tIFwiLi9sb2NhdG9yXCI7XG5pbXBvcnQgeyBSZWdpb25zIH0gZnJvbSBcIi4vcmVnaW9uc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUYWJsZUJvZHlQcm9wcyBleHRlbmRzIElTZWxlY3RhYmxlUHJvcHMsIElSb3dJbmRpY2VzLCBJQ29sdW1uSW5kaWNlcywgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBBIGNlbGwgcmVuZGVyZXIgZm9yIHRoZSBjZWxscyBpbiB0aGUgYm9keS5cbiAgICAgKi9cbiAgICBjZWxsUmVuZGVyZXI6IElDZWxsUmVuZGVyZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZ3JpZCBjb21wdXRlcyBzaXplcyBvZiBjZWxscywgcm93cywgb3IgY29sdW1ucyBmcm9tIHRoZVxuICAgICAqIGNvbmZpZ3VyYWJsZSBgY29sdW1uV2lkdGhzYCBhbmQgYHJvd0hlaWdodHNgLlxuICAgICAqL1xuICAgIGdyaWQ6IEdyaWQ7XG5cbiAgICAvKipcbiAgICAgKiBMb2NhdGVzIHRoZSByb3cvY29sdW1uL2NlbGwgZ2l2ZW4gYSBtb3VzZSBldmVudC5cbiAgICAgKi9cbiAgICBsb2NhdG9yOiBJTG9jYXRvcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBgUmVjdGAgYm91bmRzIG9mIHRoZSB2aXNpYmxlIHZpZXdwb3J0IHdpdGggcmVzcGVjdCB0byBpdHMgcGFyZW50XG4gICAgICogc2Nyb2xsYWJsZSBwYW5lLlxuICAgICAqL1xuICAgIHZpZXdwb3J0UmVjdDogUmVjdDtcblxuICAgIC8qKlxuICAgICAqIEFuIG9wdGlvbmFsIGNhbGxiYWNrIGZvciBkaXNwbGF5aW5nIGEgY29udGV4dCBtZW51IHdoZW4gcmlnaHQtY2xpY2tpbmdcbiAgICAgKiBvbiB0aGUgdGFibGUgYm9keS4gVGhlIGNhbGxiYWNrIGlzIHN1cHBsaWVkIHdpdGggYW4gYElNZW51Q29udGV4dGBcbiAgICAgKiBjb250YWluaW5nIHRoZSBgSVJlZ2lvbmBzIG9mIGludGVyZXN0LlxuICAgICAqL1xuICAgIHJlbmRlckJvZHlDb250ZXh0TWVudT86IElDb250ZXh0TWVudVJlbmRlcmVyO1xufVxuXG5jb25zdCBUQUJMRV9CT0RZX0NMQVNTRVMgPSBcImJwLXRhYmxlLWJvZHktdmlydHVhbC1jbGllbnQgYnAtdGFibGUtY2VsbC1jbGllbnRcIjtcbmNvbnN0IENFTExfR0hPU1RfQ0xBU1MgPSBcImJwLXRhYmxlLWNlbGwtZ2hvc3RcIjtcbmNvbnN0IENFTExfTEVER0VSX09ERF9DTEFTUyA9IFwiYnAtdGFibGUtY2VsbC1sZWRnZXItb2RkXCI7XG5jb25zdCBDRUxMX0xFREdFUl9FVkVOX0NMQVNTID0gXCJicC10YWJsZS1jZWxsLWxlZGdlci1ldmVuXCI7XG5cbi8qKlxuICogRm9yIHBlcmYsIHdlIHdhbnQgdG8gaWdub3JlIGNoYW5nZXMgdG8gdGhlIGBJU2VsZWN0YWJsZVByb3BzYCBwYXJ0IG9mIHRoZVxuICogYElUYWJsZUJvZHlQcm9wc2Agc2luY2UgdGhvc2UgYXJlIG9ubHkgdXNlZCB3aGVuIGEgY29udGV4dCBtZW51IGlzIGxhdW5jaGVkLlxuICovXG5jb25zdCBVUERBVEVfUFJPUFNfS0VZUyA9IFtcbiAgICBcImdyaWRcIixcbiAgICBcImxvY2F0b3JcIixcbiAgICBcInZpZXdwb3J0UmVjdFwiLFxuICAgIFwiY2VsbFJlbmRlcmVyXCIsXG4gICAgXCJyb3dJbmRleFN0YXJ0XCIsXG4gICAgXCJyb3dJbmRleEVuZFwiLFxuICAgIFwiY29sdW1uSW5kZXhTdGFydFwiLFxuICAgIFwiY29sdW1uSW5kZXhFbmRcIixcbl07XG5cbkBDb250ZXh0TWVudVRhcmdldFxuZXhwb3J0IGNsYXNzIFRhYmxlQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJVGFibGVCb2R5UHJvcHMsIHt9PiB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYXJyYXkgb2YgY2xhc3MgbmFtZXMgdGhhdCBtdXN0IGJlIGFwcGxpZWQgdG8gZWFjaCB0YWJsZVxuICAgICAqIGNlbGwgc28gdGhhdCB3ZSBjYW4gbG9jYXRlIGFueSBjZWxsIGJhc2VkIG9uIGl0cyBjb29yZGluYXRlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2VsbENsYXNzTmFtZXMocm93SW5kZXg6IG51bWJlciwgY29sdW1uSW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgYGJwLXRhYmxlLWNlbGwtcm93LSR7cm93SW5kZXh9YCxcbiAgICAgICAgICAgIGBicC10YWJsZS1jZWxsLWNvbC0ke2NvbHVtbkluZGV4fWAsXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaGFsbG93Q29tcGFyZUtleXMob2JqQTogYW55LCBvYmpCOiBhbnksIGtleXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgIGlmIChvYmpBW2tleV0gIT09IG9iakJba2V5XSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjZWxsUmVhY3RLZXkocm93SW5kZXg6IG51bWJlciwgY29sdW1uSW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gYGNlbGwtJHtyb3dJbmRleH0tJHtjb2x1bW5JbmRleH1gO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzOiBJVGFibGVCb2R5UHJvcHMpIHtcbiAgICAgICAgY29uc3Qgc2hhbGxvd0VxdWFsID0gVGFibGVCb2R5LnNoYWxsb3dDb21wYXJlS2V5cyh0aGlzLnByb3BzLCBuZXh0UHJvcHMsIFVQREFURV9QUk9QU19LRVlTKTtcbiAgICAgICAgcmV0dXJuICFzaGFsbG93RXF1YWw7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBncmlkLCByb3dJbmRleFN0YXJ0LCByb3dJbmRleEVuZCwgY29sdW1uSW5kZXhTdGFydCwgY29sdW1uSW5kZXhFbmQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGNlbGxzOiBBcnJheTxSZWFjdC5SZWFjdEVsZW1lbnQ8YW55Pj4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcm93SW5kZXggPSByb3dJbmRleFN0YXJ0OyByb3dJbmRleCA8PSByb3dJbmRleEVuZDsgcm93SW5kZXgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uSW5kZXggPSBjb2x1bW5JbmRleFN0YXJ0OyBjb2x1bW5JbmRleCA8PSBjb2x1bW5JbmRleEVuZDsgY29sdW1uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzR2hvc3QgPSBncmlkLmlzR2hvc3RJbmRleChyb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4dHJlbWFDbGFzc2VzID0gZ3JpZC5nZXRFeHRyZW1hQ2xhc3Nlcyhyb3dJbmRleCwgY29sdW1uSW5kZXgsIHJvd0luZGV4RW5kLCBjb2x1bW5JbmRleEVuZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBpc0dob3N0ID8gdGhpcy5yZW5kZXJHaG9zdENlbGwgOiB0aGlzLnJlbmRlckNlbGw7XG4gICAgICAgICAgICAgICAgY2VsbHMucHVzaChyZW5kZXJlcihyb3dJbmRleCwgY29sdW1uSW5kZXgsIGV4dHJlbWFDbGFzc2VzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3R5bGUgPSBncmlkLmdldFJlY3QoKS5zaXplU3R5bGUoKTtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtUQUJMRV9CT0RZX0NMQVNTRVN9IHN0eWxlPXtzdHlsZX0+e2NlbGxzfTwvZGl2PjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyQ29udGV4dE1lbnUoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MRWxlbWVudD4pIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RlZFJlZ2lvbnMsIHJlbmRlckJvZHlDb250ZXh0TWVudSwgZ3JpZCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBpZiAocmVuZGVyQm9keUNvbnRleHRNZW51ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmxvY2F0ZUNsaWNrKGUubmF0aXZlRXZlbnQgYXMgTW91c2VFdmVudCk7XG4gICAgICAgIHJldHVybiByZW5kZXJCb2R5Q29udGV4dE1lbnUobmV3IE1lbnVDb250ZXh0KHRhcmdldCwgc2VsZWN0ZWRSZWdpb25zLCBncmlkLm51bVJvd3MsIGdyaWQubnVtQ29scykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyR2hvc3RDZWxsID0gKHJvd0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIsIGV4dHJlbWFDbGFzc2VzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBVdGlscy5hc3NpZ25DbGFzc2VzKFxuICAgICAgICAgICAgZW1wdHlDZWxsUmVuZGVyZXIocm93SW5kZXgsIGNvbHVtbkluZGV4KSxcbiAgICAgICAgICAgIFRhYmxlQm9keS5jZWxsQ2xhc3NOYW1lcyhyb3dJbmRleCwgY29sdW1uSW5kZXgpLFxuICAgICAgICAgICAgZXh0cmVtYUNsYXNzZXMsXG4gICAgICAgICAgICBDRUxMX0dIT1NUX0NMQVNTLCB7XG4gICAgICAgICAgICAgICAgW0NFTExfTEVER0VSX09ERF9DTEFTU106IChyb3dJbmRleCAlIDIpID09PSAxLFxuICAgICAgICAgICAgICAgIFtDRUxMX0xFREdFUl9FVkVOX0NMQVNTXTogKHJvd0luZGV4ICUgMikgPT09IDAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qga2V5ID0gVGFibGVCb2R5LmNlbGxSZWFjdEtleShyb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIGNlbGwucHJvcHMuc3R5bGUsIFJlY3Quc3R5bGUoZ3JpZC5nZXRHaG9zdENlbGxSZWN0KHJvd0luZGV4LCBjb2x1bW5JbmRleCkpKTtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjZWxsLCB7IGtleSwgc3R5bGUgfSBhcyBJQ2VsbFByb3BzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckNlbGwgPSAocm93SW5kZXg6IG51bWJlciwgY29sdW1uSW5kZXg6IG51bWJlciwgZXh0cmVtYUNsYXNzZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgY2VsbFJlbmRlcmVyLFxuICAgICAgICAgICAgb25TZWxlY3Rpb24sXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvbnMsXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybSxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBVdGlscy5hc3NpZ25DbGFzc2VzKFxuICAgICAgICAgICAgY2VsbFJlbmRlcmVyKHJvd0luZGV4LCBjb2x1bW5JbmRleCksXG4gICAgICAgICAgICBUYWJsZUJvZHkuY2VsbENsYXNzTmFtZXMocm93SW5kZXgsIGNvbHVtbkluZGV4KSxcbiAgICAgICAgICAgIGV4dHJlbWFDbGFzc2VzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFtDRUxMX0xFREdFUl9PRERfQ0xBU1NdOiAocm93SW5kZXggJSAyKSA9PT0gMSxcbiAgICAgICAgICAgICAgICBbQ0VMTF9MRURHRVJfRVZFTl9DTEFTU106IChyb3dJbmRleCAlIDIpID09PSAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGtleSA9IFRhYmxlQm9keS5jZWxsUmVhY3RLZXkocm93SW5kZXgsIGNvbHVtbkluZGV4KTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBjZWxsLnByb3BzLnN0eWxlLCBSZWN0LnN0eWxlKGdyaWQuZ2V0Q2VsbFJlY3Qocm93SW5kZXgsIGNvbHVtbkluZGV4KSkpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERyYWdTZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbj17YWxsb3dNdWx0aXBsZVNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICBsb2NhdGVDbGljaz17dGhpcy5sb2NhdGVDbGlja31cbiAgICAgICAgICAgICAgICBsb2NhdGVEcmFnPXt0aGlzLmxvY2F0ZURyYWd9XG4gICAgICAgICAgICAgICAgb25TZWxlY3Rpb249e29uU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUmVnaW9ucz17c2VsZWN0ZWRSZWdpb25zfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUmVnaW9uVHJhbnNmb3JtPXtzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KGNlbGwsIHsgc3R5bGUgfSBhcyBJQ2VsbFByb3BzKX1cbiAgICAgICAgICAgIDwvRHJhZ1NlbGVjdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhdGVDbGljayA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCB7IGNvbCwgcm93IH0gPSB0aGlzLnByb3BzLmxvY2F0b3IuY29udmVydFBvaW50VG9DZWxsKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICByZXR1cm4gUmVnaW9ucy5jZWxsKHJvdywgY29sKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvY2F0ZURyYWcgPSAoX2V2ZW50OiBNb3VzZUV2ZW50LCBjb29yZHM6IElDb29yZGluYXRlRGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMucHJvcHMubG9jYXRvci5jb252ZXJ0UG9pbnRUb0NlbGwoY29vcmRzLmFjdGl2YXRpb25bMF0sIGNvb3Jkcy5hY3RpdmF0aW9uWzFdKTtcbiAgICAgICAgY29uc3QgZW5kID0gdGhpcy5wcm9wcy5sb2NhdG9yLmNvbnZlcnRQb2ludFRvQ2VsbChjb29yZHMuY3VycmVudFswXSwgY29vcmRzLmN1cnJlbnRbMV0pO1xuICAgICAgICByZXR1cm4gUmVnaW9ucy5jZWxsKHN0YXJ0LnJvdywgc3RhcnQuY29sLCBlbmQucm93LCBlbmQuY29sKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
