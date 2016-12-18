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
var core_1 = require("@blueprintjs/core");
var React = require("react");
var clipboard_1 = require("../../common/clipboard");
var regions_1 = require("../../regions");
var CopyCellsMenuItem = (function (_super) {
    __extends(CopyCellsMenuItem, _super);
    function CopyCellsMenuItem() {
        var _this = this;
        _super.apply(this, arguments);
        this.handleClick = function () {
            var _a = _this.props, context = _a.context, getCellData = _a.getCellData, onCopy = _a.onCopy;
            var cells = context.getUniqueCells();
            var sparse = regions_1.Regions.sparseMapCells(cells, getCellData);
            var success = clipboard_1.Clipboard.copyCells(sparse);
            if (onCopy != null) {
                onCopy(success);
            }
        };
    }
    CopyCellsMenuItem.prototype.render = function () {
        return React.createElement(core_1.MenuItem, __assign({}, this.props, {onClick: this.handleClick}));
    };
    return CopyCellsMenuItem;
}(React.Component));
exports.CopyCellsMenuItem = CopyCellsMenuItem;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmFjdGlvbnMvbWVudXMvY29weUNlbGxzTWVudUl0ZW0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7QUFFSCxxQkFBeUMsbUJBQW1CLENBQUMsQ0FBQTtBQUM3RCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQiwwQkFBMEIsd0JBQXdCLENBQUMsQ0FBQTtBQUNuRCx3QkFBd0IsZUFBZSxDQUFDLENBQUE7QUE0QnhDO0lBQXVDLHFDQUE0QztJQUFuRjtRQUFBLGlCQWNDO1FBZHNDLDhCQUE0QztRQUt2RSxnQkFBVyxHQUFHO1lBQ2xCLElBQUEsZ0JBQW1ELEVBQTNDLG9CQUFPLEVBQUUsNEJBQVcsRUFBRSxrQkFBTSxDQUFnQjtZQUNwRCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkMsSUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzFELElBQU0sT0FBTyxHQUFHLHFCQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFiVSxrQ0FBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLG9CQUFDLGVBQVEsZUFBSyxJQUFJLENBQUMsS0FBSyxHQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBWSxHQUFHLENBQUM7SUFDbkUsQ0FBQztJQVdMLHdCQUFDO0FBQUQsQ0FkQSxBQWNDLENBZHNDLEtBQUssQ0FBQyxTQUFTLEdBY3JEO0FBZFkseUJBQWlCLG9CQWM3QixDQUFBIiwiZmlsZSI6ImludGVyYWN0aW9ucy9tZW51cy9jb3B5Q2VsbHNNZW51SXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCB7IElNZW51SXRlbVByb3BzLCBNZW51SXRlbSB9IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gXCIuLi8uLi9jb21tb24vY2xpcGJvYXJkXCI7XG5pbXBvcnQgeyBSZWdpb25zIH0gZnJvbSBcIi4uLy4uL3JlZ2lvbnNcIjtcbmltcG9ydCB7IElNZW51Q29udGV4dCB9IGZyb20gXCIuL21lbnVDb250ZXh0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvcHlDZWxsc01lbnVJdGVtUHJvcHMgZXh0ZW5kcyBJTWVudUl0ZW1Qcm9wcyB7XG4gICAgLyoqXG4gICAgICogVGhlIGBJTWVudUNvbnRleHRgIHRoYXQgbGF1bmNoZWQgdGhlIG1lbnUuXG4gICAgICovXG4gICAgY29udGV4dDogSU1lbnVDb250ZXh0O1xuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayB0aGF0IHJldHVybnMgdGhlIGRhdGEgZm9yIGEgc3BlY2lmaWMgY2VsbC4gVGhpcyBuZWVkIG5vdFxuICAgICAqIG1hdGNoIHRoZSB2YWx1ZSBkaXNwbGF5ZWQgaW4gdGhlIGA8Q2VsbD5gIGNvbXBvbmVudC4gVGhlIHZhbHVlIHdpbGwgYmVcbiAgICAgKiBpbnZpc2libHkgYWRkZWQgYXMgYHRleHRDb250ZW50YCBpbnRvIHRoZSBET00gYmVmb3JlIGNvcHlpbmcuXG4gICAgICovXG4gICAgZ2V0Q2VsbERhdGE6IChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpID0+IGFueTtcblxuICAgIC8qKlxuICAgICAqIElmIHlvdSB3YW50IHRvIGRvIHNvbWV0aGluZyBhZnRlciB0aGUgY29weSBvciBpZiB5b3Ugd2FudCB0byBub3RpZnkgdGhlXG4gICAgICogdXNlciBpZiBhIGNvcHkgZmFpbHMsIHlvdSBtYXkgcHJvdmlkZSB0aGlzIG9wdGlvbmFsIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogRHVlIHRvIGJyb3dzZXIgbGltaXRhdGlvbnMsIHRoZSBjb3B5IGNhbiBmYWlsLiBUaGlzIHVzdWFsbHkgb2NjdXJzIGlmXG4gICAgICogdGhlIHNlbGVjdGlvbiBpcyB0b28gbGFyZ2UsIGxpa2UgMjAsMDAwKyBjZWxscy4gVGhlIGNvcHkgd2lsbCBhbHNvIGZhaWxcbiAgICAgKiBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBjb3B5IG1ldGhvZCAoc2VlXG4gICAgICogYENsaXBib2FyZC5pc0NvcHlTdXBwb3J0ZWRgKS5cbiAgICAgKi9cbiAgICBvbkNvcHk/OiAoc3VjY2VzczogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIENvcHlDZWxsc01lbnVJdGVtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElDb3B5Q2VsbHNNZW51SXRlbVByb3BzLCB7fT4ge1xuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8TWVudUl0ZW0gey4uLnRoaXMucHJvcHN9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+O1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29udGV4dCwgZ2V0Q2VsbERhdGEsIG9uQ29weSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgY2VsbHMgPSBjb250ZXh0LmdldFVuaXF1ZUNlbGxzKCk7XG4gICAgICAgIGNvbnN0IHNwYXJzZSA9IFJlZ2lvbnMuc3BhcnNlTWFwQ2VsbHMoY2VsbHMsIGdldENlbGxEYXRhKTtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IENsaXBib2FyZC5jb3B5Q2VsbHMoc3BhcnNlKTtcbiAgICAgICAgaWYgKG9uQ29weSAhPSBudWxsKSB7XG4gICAgICAgICAgICBvbkNvcHkoc3VjY2Vzcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
