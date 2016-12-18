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
var classNames = require("classnames");
var React = require("react");
var RowHeaderCell = (function (_super) {
    __extends(RowHeaderCell, _super);
    function RowHeaderCell() {
        _super.apply(this, arguments);
        this.state = {
            isActive: false,
        };
    }
    RowHeaderCell.prototype.render = function () {
        var _a = this.props, className = _a.className, isActive = _a.isActive, isRowSelected = _a.isRowSelected, name = _a.name, resizeHandle = _a.resizeHandle, style = _a.style;
        var classes = classNames(className, "bp-table-header", {
            "bp-table-header-active": isActive || this.state.isActive,
            "bp-table-header-selected": isRowSelected,
        });
        return (React.createElement("div", {className: classes, style: style}, 
            React.createElement("div", {className: "bp-table-row-name"}, 
                React.createElement("div", {className: "bp-table-row-name-text bp-table-truncated-text"}, name)
            ), 
            this.props.children, 
            resizeHandle));
    };
    RowHeaderCell.prototype.renderContextMenu = function (_event) {
        return this.props.menu;
    };
    RowHeaderCell = __decorate([
        core_1.ContextMenuTarget
    ], RowHeaderCell);
    return RowHeaderCell;
}(React.Component));
exports.RowHeaderCell = RowHeaderCell;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWFkZXJzL3Jvd0hlYWRlckNlbGwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7O0FBRUgscUJBQTBDLG1CQUFtQixDQUFDLENBQUE7QUFDOUQsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUEyQy9CO0lBQW1DLGlDQUFxRDtJQUF4RjtRQUFtQyw4QkFBcUQ7UUFDN0UsVUFBSyxHQUFHO1lBQ1gsUUFBUSxFQUFFLEtBQUs7U0FDbEIsQ0FBQztJQXlCTixDQUFDO0lBdkJVLDhCQUFNLEdBQWI7UUFDSSxJQUFBLGVBQW9GLEVBQTVFLHdCQUFTLEVBQUUsc0JBQVEsRUFBRSxnQ0FBYSxFQUFFLGNBQUksRUFBRSw4QkFBWSxFQUFFLGdCQUFLLENBQWdCO1FBQ3JGLElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUU7WUFDckQsd0JBQXdCLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUN6RCwwQkFBMEIsRUFBRSxhQUFhO1NBQzVDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxDQUNILHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsT0FBUSxFQUFDLEtBQUssRUFBRSxLQUFNO1lBQ2xDLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUMsbUJBQW1CO2dCQUM5QixxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFDLGdEQUFnRCxHQUMxRCxJQUFLLENBQ0o7YUFDSjtZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUztZQUNwQixZQUFhLENBQ1osQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVNLHlDQUFpQixHQUF4QixVQUF5QixNQUFxQztRQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQTVCTDtRQUFDLHdCQUFpQjtxQkFBQTtJQTZCbEIsb0JBQUM7QUFBRCxDQTVCQSxBQTRCQyxDQTVCa0MsS0FBSyxDQUFDLFNBQVMsR0E0QmpEO0FBNUJZLHFCQUFhLGdCQTRCekIsQ0FBQSIsImZpbGUiOiJoZWFkZXJzL3Jvd0hlYWRlckNlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgeyBDb250ZXh0TWVudVRhcmdldCwgSVByb3BzIH0gZnJvbSBcIkBibHVlcHJpbnRqcy9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlc2l6ZUhhbmRsZSB9IGZyb20gXCIuLi9pbnRlcmFjdGlvbnMvcmVzaXplSGFuZGxlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJvd0hlYWRlckNlbGxQcm9wcyBleHRlbmRzIElQcm9wcyB7XG4gICAgLyoqXG4gICAgICogSWYgdHJ1ZSwgd2lsbCBhcHBseSB0aGUgYWN0aXZlIGNsYXNzIHRvIHRoZSBoZWFkZXIgdG8gaW5kaWNhdGUgaXQgaXNcbiAgICAgKiBwYXJ0IG9mIGFuIGV4dGVybmFsIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBpc0FjdGl2ZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgZnVsbCBjb2x1bW4gaXMgcGFydCBvZiBhIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICBpc1Jvd1NlbGVjdGVkPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIGRpc3BsYXllZCBpbiB0aGUgaGVhZGVyIG9mIHRoZSBjb2x1bW4uXG4gICAgICovXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEFuIGVsZW1lbnQsIGxpa2UgYSBgPE1lbnU+YCwgdGhpcyBpcyBkaXNwbGF5ZWQgYnkgcmlnaHQtY2xpY2tpbmdcbiAgICAgKiBhbnl3aGVyZSBpbiB0aGUgaGVhZGVyLlxuICAgICAqL1xuICAgIG1lbnU/OiBKU1guRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEEgYFJlc2l6ZUhhbmRsZWAgUmVhY3QgY29tcG9uZW50IHRoYXQgYWxsb3dzIHVzZXJzIHRvIGRyYWctcmVzaXplIHRoZVxuICAgICAqIGhlYWRlci5cbiAgICAgKi9cbiAgICByZXNpemVIYW5kbGU/OiBSZXNpemVIYW5kbGU7XG5cbiAgICAvKipcbiAgICAgKiBDU1Mgc3R5bGVzIGZvciB0aGUgdG9wIGxldmVsIGVsZW1lbnQuXG4gICAgICovXG4gICAgc3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElSb3dIZWFkZXJTdGF0ZSB7XG4gICAgaXNBY3RpdmU6IGJvb2xlYW47XG59XG5cbkBDb250ZXh0TWVudVRhcmdldFxuZXhwb3J0IGNsYXNzIFJvd0hlYWRlckNlbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SVJvd0hlYWRlckNlbGxQcm9wcywgSVJvd0hlYWRlclN0YXRlPiB7XG4gICAgcHVibGljIHN0YXRlID0ge1xuICAgICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgfTtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBpc0FjdGl2ZSwgaXNSb3dTZWxlY3RlZCwgbmFtZSwgcmVzaXplSGFuZGxlLCBzdHlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCBcImJwLXRhYmxlLWhlYWRlclwiLCB7XG4gICAgICAgICAgICBcImJwLXRhYmxlLWhlYWRlci1hY3RpdmVcIjogaXNBY3RpdmUgfHwgdGhpcy5zdGF0ZS5pc0FjdGl2ZSxcbiAgICAgICAgICAgIFwiYnAtdGFibGUtaGVhZGVyLXNlbGVjdGVkXCI6IGlzUm93U2VsZWN0ZWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30gc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJwLXRhYmxlLXJvdy1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnAtdGFibGUtcm93LW5hbWUtdGV4dCBicC10YWJsZS10cnVuY2F0ZWQtdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge25hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIHtyZXNpemVIYW5kbGV9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyQ29udGV4dE1lbnUoX2V2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50Pikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5tZW51O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
