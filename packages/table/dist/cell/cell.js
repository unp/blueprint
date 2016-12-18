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
var core_1 = require("@blueprintjs/core");
exports.emptyCellRenderer = function (_rowIndex, _columnIndex) { return React.createElement(Cell, null); };
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell() {
        _super.apply(this, arguments);
    }
    Cell.prototype.render = function () {
        var _a = this.props, style = _a.style, tooltip = _a.tooltip, className = _a.className;
        var content = (React.createElement("div", {className: "bp-table-truncated-text"}, this.props.children));
        var classes = classNames("bp-table-cell", className, core_1.Classes.intentClass(this.props.intent));
        return (React.createElement("div", {className: classes, style: style, title: tooltip}, content));
    };
    Cell = __decorate([
        PureRender
    ], Cell);
    return Cell;
}(React.Component));
exports.Cell = Cell;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jZWxsL2NlbGwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7O0FBRUgsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxVQUFVLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQUNwRCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixxQkFBOEMsbUJBQW1CLENBQUMsQ0FBQTtBQWVyRCx5QkFBaUIsR0FBRyxVQUFDLFNBQWlCLEVBQUUsWUFBb0IsSUFBSyxPQUFBLG9CQUFDLElBQUksT0FBRyxFQUFSLENBQVEsQ0FBQztBQUd2RjtJQUEwQix3QkFBK0I7SUFBekQ7UUFBMEIsOEJBQStCO0lBT3pELENBQUM7SUFOVSxxQkFBTSxHQUFiO1FBQ0ksSUFBQSxlQUFnRCxFQUF4QyxnQkFBSyxFQUFFLG9CQUFPLEVBQUUsd0JBQVMsQ0FBZ0I7UUFDakQsSUFBTSxPQUFPLEdBQUcsQ0FBQyxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFDLHlCQUF5QixHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUFNLENBQUMsQ0FBQztRQUN2RixJQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxjQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvRixNQUFNLENBQUMsQ0FBQyxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLE9BQVEsRUFBQyxLQUFLLEVBQUUsS0FBTSxFQUFDLEtBQUssRUFBRSxPQUFRLEdBQUUsT0FBUSxDQUFNLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBUEw7UUFBQyxVQUFVO1lBQUE7SUFRWCxXQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHlCLEtBQUssQ0FBQyxTQUFTLEdBT3hDO0FBUFksWUFBSSxPQU9oQixDQUFBIiwiZmlsZSI6ImNlbGwvY2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFB1cmVSZW5kZXIgZnJvbSBcInB1cmUtcmVuZGVyLWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IENsYXNzZXMsIElJbnRlbnRQcm9wcywgSVByb3BzIH0gZnJvbSBcIkBibHVlcHJpbnRqcy9jb3JlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNlbGxQcm9wcyBleHRlbmRzIElJbnRlbnRQcm9wcywgSVByb3BzIHtcbiAgICBrZXk/OiBzdHJpbmc7XG5cbiAgICBzdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG5cbiAgICAvKipcbiAgICAgKiBBbiBvcHRpb25hbCBuYXRpdmUgdG9vbHRpcCB0aGF0IGlzIGRpc3BsYXllZCBvbiBob3ZlclxuICAgICAqL1xuICAgIHRvb2x0aXA/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElDZWxsUmVuZGVyZXIgPSAocm93SW5kZXg6IG51bWJlciwgY29sdW1uSW5kZXg6IG51bWJlcikgPT4gUmVhY3QuUmVhY3RFbGVtZW50PElDZWxsUHJvcHM+O1xuXG5leHBvcnQgY29uc3QgZW1wdHlDZWxsUmVuZGVyZXIgPSAoX3Jvd0luZGV4OiBudW1iZXIsIF9jb2x1bW5JbmRleDogbnVtYmVyKSA9PiA8Q2VsbCAvPjtcblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBDZWxsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElDZWxsUHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBzdHlsZSwgdG9vbHRpcCwgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gKDxkaXYgY2xhc3NOYW1lPVwiYnAtdGFibGUtdHJ1bmNhdGVkLXRleHRcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj4pO1xuICAgICAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NOYW1lcyhcImJwLXRhYmxlLWNlbGxcIiwgY2xhc3NOYW1lLCBDbGFzc2VzLmludGVudENsYXNzKHRoaXMucHJvcHMuaW50ZW50KSk7XG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9IHN0eWxlPXtzdHlsZX0gdGl0bGU9e3Rvb2x0aXB9Pntjb250ZW50fTwvZGl2Pik7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
