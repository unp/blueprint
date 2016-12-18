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
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var roundSize_1 = require("../common/roundSize");
var resizable_1 = require("../interactions/resizable");
var resizeHandle_1 = require("../interactions/resizeHandle");
var selectable_1 = require("../interactions/selectable");
var regions_1 = require("../regions");
var rowHeaderCell_1 = require("./rowHeaderCell");
var RowHeader = (function (_super) {
    __extends(RowHeader, _super);
    function RowHeader() {
        var _this = this;
        _super.apply(this, arguments);
        this.renderGhostCell = function (rowIndex, extremaClasses) {
            var grid = _this.props.grid;
            var rect = grid.getGhostCellRect(rowIndex, 0);
            var style = {
                height: rect.height + "px",
            };
            return (React.createElement(rowHeaderCell_1.RowHeaderCell, {key: "bp-table-row-" + rowIndex, className: classNames(extremaClasses), style: style}));
        };
        this.renderCell = function (rowIndex, extremaClasses) {
            var _a = _this.props, allowMultipleSelection = _a.allowMultipleSelection, grid = _a.grid, isResizable = _a.isResizable, maxRowHeight = _a.maxRowHeight, minRowHeight = _a.minRowHeight, onLayoutLock = _a.onLayoutLock, onResizeGuide = _a.onResizeGuide, onRowHeightChanged = _a.onRowHeightChanged, onSelection = _a.onSelection, renderRowHeader = _a.renderRowHeader, selectedRegions = _a.selectedRegions, selectedRegionTransform = _a.selectedRegionTransform;
            var rect = grid.getRowRect(rowIndex);
            var handleSizeChanged = function (size) {
                onResizeGuide([rect.top + size + 1]);
            };
            var handleResizeEnd = function (size) {
                onResizeGuide(null);
                onRowHeightChanged(rowIndex, size);
            };
            var cell = renderRowHeader(rowIndex);
            var className = classNames(cell.props.className, extremaClasses, {
                "bp-table-draggable": onSelection != null,
            });
            var isRowSelected = regions_1.Regions.hasFullRow(selectedRegions, rowIndex);
            return (React.createElement(selectable_1.DragSelectable, {allowMultipleSelection: allowMultipleSelection, key: "bp-table-row-" + rowIndex, locateClick: _this.locateClick, locateDrag: _this.locateDrag, onSelection: onSelection, selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform}, 
                React.createElement(resizable_1.Resizable, {isResizable: isResizable, maxSize: maxRowHeight, minSize: minRowHeight, onLayoutLock: onLayoutLock, onResizeEnd: handleResizeEnd, onSizeChanged: handleSizeChanged, orientation: resizeHandle_1.Orientation.HORIZONTAL, size: rect.height}, React.cloneElement(cell, { className: className, isRowSelected: isRowSelected }))
            ));
        };
        this.locateClick = function (event) {
            var row = _this.props.locator.convertPointToRow(event.clientY);
            return regions_1.Regions.row(row);
        };
        this.locateDrag = function (_event, coords) {
            var rowStart = _this.props.locator.convertPointToRow(coords.activation[1]);
            var rowEnd = _this.props.locator.convertPointToRow(coords.current[1]);
            return regions_1.Regions.row(rowStart, rowEnd);
        };
    }
    RowHeader.prototype.render = function () {
        var _a = this.props, grid = _a.grid, rowIndexEnd = _a.rowIndexEnd, rowIndexStart = _a.rowIndexStart, viewportRect = _a.viewportRect;
        var cells = [];
        for (var rowIndex = rowIndexStart; rowIndex <= rowIndexEnd; rowIndex++) {
            var extremaClasses = grid.getExtremaClasses(rowIndex, 0, rowIndexEnd, 1);
            var renderer = grid.isGhostIndex(rowIndex, -1) ? this.renderGhostCell : this.renderCell;
            cells.push(renderer(rowIndex, extremaClasses));
        }
        // always set height so that the layout can push out the element unless it overflows.
        var style = {
            height: grid.getRect().height + "px",
        };
        // use CSS translation to offset the cells
        if (viewportRect != null) {
            style.transform = "translate3d(0, " + (grid.getRowRect(rowIndexStart).top - viewportRect.top) + "px, 0)";
        }
        return (React.createElement(roundSize_1.RoundSize, null, 
            React.createElement("div", {style: style}, cells)
        ));
    };
    RowHeader.defaultProps = {
        isResizable: false,
        renderRowHeader: renderDefaultRowHeader,
    };
    RowHeader = __decorate([
        PureRender
    ], RowHeader);
    return RowHeader;
}(React.Component));
exports.RowHeader = RowHeader;
/**
 * A default implementation of `IRowHeaderRenderer` that displays 1-indexed
 * numbers for each row.
 */
function renderDefaultRowHeader(rowIndex) {
    return React.createElement(rowHeaderCell_1.RowHeaderCell, {name: "" + (rowIndex + 1)});
}
exports.renderDefaultRowHeader = renderDefaultRowHeader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWFkZXJzL3Jvd0hlYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRy9CLDBCQUEwQixxQkFBcUIsQ0FBQyxDQUFBO0FBRWhELDBCQUFrRCwyQkFBMkIsQ0FBQyxDQUFBO0FBQzlFLDZCQUE2Qyw4QkFBOEIsQ0FBQyxDQUFBO0FBQzVFLDJCQUFpRCw0QkFBNEIsQ0FBQyxDQUFBO0FBRTlFLHdCQUF3QixZQUFZLENBQUMsQ0FBQTtBQUNyQyw4QkFBbUQsaUJBQWlCLENBQUMsQ0FBQTtBQXFEckU7SUFBK0IsNkJBQW9DO0lBQW5FO1FBQUEsaUJBa0hDO1FBbEg4Qiw4QkFBb0M7UUErQnZELG9CQUFlLEdBQUcsVUFBQyxRQUFnQixFQUFFLGNBQXdCO1lBQ3pELDJCQUFJLENBQWdCO1lBQzVCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBTSxLQUFLLEdBQUc7Z0JBQ1YsTUFBTSxFQUFLLElBQUksQ0FBQyxNQUFNLE9BQUk7YUFDN0IsQ0FBQztZQUNGLE1BQU0sQ0FBQyxDQUNILG9CQUFDLDZCQUFhLEdBQ1YsR0FBRyxFQUFFLGtCQUFnQixRQUFXLEVBQ2hDLFNBQVMsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFFLEVBQ3RDLEtBQUssRUFBRSxLQUFNLEVBQ2YsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFBO1FBRU8sZUFBVSxHQUFHLFVBQUMsUUFBZ0IsRUFBRSxjQUF3QjtZQUM1RCxJQUFBLGdCQWFjLEVBWlYsa0RBQXNCLEVBQ3RCLGNBQUksRUFDSiw0QkFBVyxFQUNYLDhCQUFZLEVBQ1osOEJBQVksRUFDWiw4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QUFDSCxnQ0FBdUMsUUFBZ0I7SUFDbkQsTUFBTSxDQUFDLG9CQUFDLDZCQUFhLEdBQUMsSUFBSSxFQUFFLE1BQUcsUUFBUSxHQUFHLENBQUMsQ0FBRyxFQUFFLENBQUM7QUFDckQsQ0FBQztBQUZlLDhCQUFzQix5QkFFckMsQ0FBQSIsImZpbGUiOiJoZWFkZXJzL3Jvd0hlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFB1cmVSZW5kZXIgZnJvbSBcInB1cmUtcmVuZGVyLWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBHcmlkLCBJUm93SW5kaWNlcyB9IGZyb20gXCIuLi9jb21tb24vZ3JpZFwiO1xuaW1wb3J0IHsgUmVjdCB9IGZyb20gXCIuLi9jb21tb24vcmVjdFwiO1xuaW1wb3J0IHsgUm91bmRTaXplIH0gZnJvbSBcIi4uL2NvbW1vbi9yb3VuZFNpemVcIjtcbmltcG9ydCB7IElDb29yZGluYXRlRGF0YSB9IGZyb20gXCIuLi9pbnRlcmFjdGlvbnMvZHJhZ2dhYmxlXCI7XG5pbXBvcnQgeyBJSW5kZXhlZFJlc2l6ZUNhbGxiYWNrLCBSZXNpemFibGUgfSBmcm9tIFwiLi4vaW50ZXJhY3Rpb25zL3Jlc2l6YWJsZVwiO1xuaW1wb3J0IHsgSUxvY2thYmxlTGF5b3V0LCBPcmllbnRhdGlvbiB9IGZyb20gXCIuLi9pbnRlcmFjdGlvbnMvcmVzaXplSGFuZGxlXCI7XG5pbXBvcnQgeyBEcmFnU2VsZWN0YWJsZSwgSVNlbGVjdGFibGVQcm9wcyB9IGZyb20gXCIuLi9pbnRlcmFjdGlvbnMvc2VsZWN0YWJsZVwiO1xuaW1wb3J0IHsgSUxvY2F0b3IgfSBmcm9tIFwiLi4vbG9jYXRvclwiO1xuaW1wb3J0IHsgUmVnaW9ucyB9IGZyb20gXCIuLi9yZWdpb25zXCI7XG5pbXBvcnQgeyBJUm93SGVhZGVyQ2VsbFByb3BzLCBSb3dIZWFkZXJDZWxsIH0gZnJvbSBcIi4vcm93SGVhZGVyQ2VsbFwiO1xuXG5leHBvcnQgdHlwZSBJUm93SGVhZGVyUmVuZGVyZXIgPSAocm93SW5kZXg6IG51bWJlcikgPT4gUmVhY3QuUmVhY3RFbGVtZW50PElSb3dIZWFkZXJDZWxsUHJvcHM+O1xuXG5leHBvcnQgaW50ZXJmYWNlIElSb3dIZWlnaHRzIHtcbiAgICBtaW5Sb3dIZWlnaHQ/OiBudW1iZXI7XG4gICAgbWF4Um93SGVpZ2h0PzogbnVtYmVyO1xuICAgIGRlZmF1bHRSb3dIZWlnaHQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJvd0hlYWRlclByb3BzIGV4dGVuZHMgSVNlbGVjdGFibGVQcm9wcywgSVJvd0luZGljZXMsIElSb3dIZWlnaHRzLCBJTG9ja2FibGVMYXlvdXQge1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMvZGlzYWJsZXMgdGhlIHJlc2l6ZSBpbnRlcmFjdGlvbi5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGlzUmVzaXphYmxlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBncmlkIGNvbXB1dGVzIHNpemVzIG9mIGNlbGxzLCByb3dzLCBvciBjb2x1bW5zIGZyb20gdGhlXG4gICAgICogY29uZmlndXJhYmxlIGBjb2x1bW5XaWR0aHNgIGFuZCBgcm93SGVpZ2h0c2AuXG4gICAgICovXG4gICAgZ3JpZDogR3JpZDtcblxuICAgIC8qKlxuICAgICAqIExvY2F0ZXMgdGhlIHJvdy9jb2x1bW4vY2VsbCBnaXZlbiBhIG1vdXNlIGV2ZW50LlxuICAgICAqL1xuICAgIGxvY2F0b3I6IElMb2NhdG9yO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBjYWxsYmFjayBpcyBjYWxsZWQgd2hpbGUgdGhlIHVzZXIgaXMgcmVzaXppbmcgYSBjb2x1bW4uIFRoZSBndWlkZXNcbiAgICAgKiBhcnJheSBjb250YWlucyBwaXhlbCBvZmZzZXRzIGZvciB3aGVyZSB0byBkaXNwbGF5IHRoZSByZXNpemUgZ3VpZGVzIGluXG4gICAgICogdGhlIHRhYmxlIGJvZHkncyBvdmVybGF5IGxheWVyLlxuICAgICAqL1xuICAgIG9uUmVzaXplR3VpZGU6IChndWlkZXM6IG51bWJlcltdKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayBpbnZva2VkIHdoZW4gdXNlciBpcyBkb25lIHJlc2l6aW5nIHRoZSBjb2x1bW5cbiAgICAgKi9cbiAgICBvblJvd0hlaWdodENoYW5nZWQ6IElJbmRleGVkUmVzaXplQ2FsbGJhY2s7XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIHRoZSBjZWxsIGZvciBlYWNoIHJvdyBoZWFkZXJcbiAgICAgKi9cbiAgICByZW5kZXJSb3dIZWFkZXI/OiBJUm93SGVhZGVyUmVuZGVyZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYFJlY3RgIGJvdW5kcyBvZiB0aGUgdmlzaWJsZSB2aWV3cG9ydCB3aXRoIHJlc3BlY3QgdG8gaXRzIHBhcmVudFxuICAgICAqIHNjcm9sbGFibGUgcGFuZS5cbiAgICAgKi9cbiAgICB2aWV3cG9ydFJlY3Q6IFJlY3Q7XG59XG5cbkBQdXJlUmVuZGVyXG5leHBvcnQgY2xhc3MgUm93SGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElSb3dIZWFkZXJQcm9wcywge30+IHtcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaXNSZXNpemFibGU6IGZhbHNlLFxuICAgICAgICByZW5kZXJSb3dIZWFkZXI6IHJlbmRlckRlZmF1bHRSb3dIZWFkZXIsXG4gICAgfTtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgZ3JpZCwgcm93SW5kZXhFbmQsIHJvd0luZGV4U3RhcnQsIHZpZXdwb3J0UmVjdCB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBjb25zdCBjZWxsczogQXJyYXk8UmVhY3QuUmVhY3RFbGVtZW50PGFueT4+ID0gW107XG4gICAgICAgIGZvciAobGV0IHJvd0luZGV4ID0gcm93SW5kZXhTdGFydDsgcm93SW5kZXggPD0gcm93SW5kZXhFbmQ7IHJvd0luZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGV4dHJlbWFDbGFzc2VzID0gZ3JpZC5nZXRFeHRyZW1hQ2xhc3Nlcyhyb3dJbmRleCwgMCwgcm93SW5kZXhFbmQsIDEpO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBncmlkLmlzR2hvc3RJbmRleChyb3dJbmRleCwgLTEpID8gdGhpcy5yZW5kZXJHaG9zdENlbGwgOiB0aGlzLnJlbmRlckNlbGw7XG4gICAgICAgICAgICBjZWxscy5wdXNoKHJlbmRlcmVyKHJvd0luZGV4LCBleHRyZW1hQ2xhc3NlcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWx3YXlzIHNldCBoZWlnaHQgc28gdGhhdCB0aGUgbGF5b3V0IGNhbiBwdXNoIG91dCB0aGUgZWxlbWVudCB1bmxlc3MgaXQgb3ZlcmZsb3dzLlxuICAgICAgICBjb25zdCBzdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcbiAgICAgICAgICAgIGhlaWdodDogYCR7Z3JpZC5nZXRSZWN0KCkuaGVpZ2h0fXB4YCxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB1c2UgQ1NTIHRyYW5zbGF0aW9uIHRvIG9mZnNldCB0aGUgY2VsbHNcbiAgICAgICAgaWYgKHZpZXdwb3J0UmVjdCAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwgJHtncmlkLmdldFJvd1JlY3Qocm93SW5kZXhTdGFydCkudG9wIC0gdmlld3BvcnRSZWN0LnRvcH1weCwgMClgO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSb3VuZFNpemU+PGRpdiBzdHlsZT17c3R5bGV9PntjZWxsc308L2Rpdj48L1JvdW5kU2l6ZT5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckdob3N0Q2VsbCA9IChyb3dJbmRleDogbnVtYmVyLCBleHRyZW1hQ2xhc3Nlczogc3RyaW5nW10pID0+IHtcbiAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCByZWN0ID0gZ3JpZC5nZXRHaG9zdENlbGxSZWN0KHJvd0luZGV4LCAwKTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICAgICAgICBoZWlnaHQ6IGAke3JlY3QuaGVpZ2h0fXB4YCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSb3dIZWFkZXJDZWxsXG4gICAgICAgICAgICAgICAga2V5PXtgYnAtdGFibGUtcm93LSR7cm93SW5kZXh9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoZXh0cmVtYUNsYXNzZXMpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgIC8+KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckNlbGwgPSAocm93SW5kZXg6IG51bWJlciwgZXh0cmVtYUNsYXNzZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgaXNSZXNpemFibGUsXG4gICAgICAgICAgICBtYXhSb3dIZWlnaHQsXG4gICAgICAgICAgICBtaW5Sb3dIZWlnaHQsXG4gICAgICAgICAgICBvbkxheW91dExvY2ssXG4gICAgICAgICAgICBvblJlc2l6ZUd1aWRlLFxuICAgICAgICAgICAgb25Sb3dIZWlnaHRDaGFuZ2VkLFxuICAgICAgICAgICAgb25TZWxlY3Rpb24sXG4gICAgICAgICAgICByZW5kZXJSb3dIZWFkZXIsXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvbnMsXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybSxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgY29uc3QgcmVjdCA9IGdyaWQuZ2V0Um93UmVjdChyb3dJbmRleCk7XG5cbiAgICAgICAgY29uc3QgaGFuZGxlU2l6ZUNoYW5nZWQgPSAoc2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBvblJlc2l6ZUd1aWRlKFtyZWN0LnRvcCArIHNpemUgKyAxXSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaGFuZGxlUmVzaXplRW5kID0gKHNpemU6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgb25SZXNpemVHdWlkZShudWxsKTtcbiAgICAgICAgICAgIG9uUm93SGVpZ2h0Q2hhbmdlZChyb3dJbmRleCwgc2l6ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IHJlbmRlclJvd0hlYWRlcihyb3dJbmRleCk7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoY2VsbC5wcm9wcy5jbGFzc05hbWUsIGV4dHJlbWFDbGFzc2VzLCB7XG4gICAgICAgICAgICBcImJwLXRhYmxlLWRyYWdnYWJsZVwiOiBvblNlbGVjdGlvbiAhPSBudWxsLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgaXNSb3dTZWxlY3RlZCA9IFJlZ2lvbnMuaGFzRnVsbFJvdyhzZWxlY3RlZFJlZ2lvbnMsIHJvd0luZGV4KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERyYWdTZWxlY3RhYmxlXG4gICAgICAgICAgICAgICAgYWxsb3dNdWx0aXBsZVNlbGVjdGlvbj17YWxsb3dNdWx0aXBsZVNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICBrZXk9e2BicC10YWJsZS1yb3ctJHtyb3dJbmRleH1gfVxuICAgICAgICAgICAgICAgIGxvY2F0ZUNsaWNrPXt0aGlzLmxvY2F0ZUNsaWNrfVxuICAgICAgICAgICAgICAgIGxvY2F0ZURyYWc9e3RoaXMubG9jYXRlRHJhZ31cbiAgICAgICAgICAgICAgICBvblNlbGVjdGlvbj17b25TZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSZWdpb25zPXtzZWxlY3RlZFJlZ2lvbnN9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSZWdpb25UcmFuc2Zvcm09e3NlbGVjdGVkUmVnaW9uVHJhbnNmb3JtfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxSZXNpemFibGVcbiAgICAgICAgICAgICAgICAgICAgaXNSZXNpemFibGU9e2lzUmVzaXphYmxlfVxuICAgICAgICAgICAgICAgICAgICBtYXhTaXplPXttYXhSb3dIZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgIG1pblNpemU9e21pblJvd0hlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgb25MYXlvdXRMb2NrPXtvbkxheW91dExvY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uUmVzaXplRW5kPXtoYW5kbGVSZXNpemVFbmR9XG4gICAgICAgICAgICAgICAgICAgIG9uU2l6ZUNoYW5nZWQ9e2hhbmRsZVNpemVDaGFuZ2VkfVxuICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbj17T3JpZW50YXRpb24uSE9SSVpPTlRBTH1cbiAgICAgICAgICAgICAgICAgICAgc2l6ZT17cmVjdC5oZWlnaHR9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KGNlbGwsIHsgY2xhc3NOYW1lLCBpc1Jvd1NlbGVjdGVkIH0gYXMgSVJvd0hlYWRlckNlbGxQcm9wcyl9XG4gICAgICAgICAgICAgICAgPC9SZXNpemFibGU+XG4gICAgICAgICAgICA8L0RyYWdTZWxlY3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9jYXRlQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5wcm9wcy5sb2NhdG9yLmNvbnZlcnRQb2ludFRvUm93KGV2ZW50LmNsaWVudFkpO1xuICAgICAgICByZXR1cm4gUmVnaW9ucy5yb3cocm93KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvY2F0ZURyYWcgPSAoX2V2ZW50OiBNb3VzZUV2ZW50LCBjb29yZHM6IElDb29yZGluYXRlRGF0YSkgPT4ge1xuICAgICAgICBjb25zdCByb3dTdGFydCA9IHRoaXMucHJvcHMubG9jYXRvci5jb252ZXJ0UG9pbnRUb1Jvdyhjb29yZHMuYWN0aXZhdGlvblsxXSk7XG4gICAgICAgIGNvbnN0IHJvd0VuZCA9IHRoaXMucHJvcHMubG9jYXRvci5jb252ZXJ0UG9pbnRUb1Jvdyhjb29yZHMuY3VycmVudFsxXSk7XG4gICAgICAgIHJldHVybiBSZWdpb25zLnJvdyhyb3dTdGFydCwgcm93RW5kKTtcbiAgICB9XG59XG5cbi8qKlxuICogQSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBJUm93SGVhZGVyUmVuZGVyZXJgIHRoYXQgZGlzcGxheXMgMS1pbmRleGVkXG4gKiBudW1iZXJzIGZvciBlYWNoIHJvdy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRlZmF1bHRSb3dIZWFkZXIocm93SW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiA8Um93SGVhZGVyQ2VsbCBuYW1lPXtgJHtyb3dJbmRleCArIDF9YH0vPjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
