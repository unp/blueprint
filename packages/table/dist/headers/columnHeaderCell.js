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
var HEADER_CLASSNAME = "bp-table-header";
var HEADER_COLUMN_NAME_CLASSNAME = "bp-table-column-name";
var HEADER_CONTENT_CLASSNAME = "bp-table-header-content";
var HEADER_COLUMN_NAME_TEXT_CLASSNAME = "bp-table-column-name-text";
var HEADER_INTERACTION_BAR_CLASSNAME = "bp-table-interaction-bar";
function HorizontalCellDivider() {
    return React.createElement("div", {className: "bp-table-horizontal-cell-divider"});
}
exports.HorizontalCellDivider = HorizontalCellDivider;
var ColumnHeaderCell = (function (_super) {
    __extends(ColumnHeaderCell, _super);
    function ColumnHeaderCell() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            isActive: false,
        };
        this.getPopoverStateChangeHandler = function (isActive) { return function () {
            _this.setState({ isActive: isActive });
        }; };
    }
    /**
     * This method determines if a MouseEvent was triggered on a target that
     * should be used as the header click/drag target. This enables users of
     * this component to render full interactive components in their header
     * cells without worry of selection or resize operations from capturing
     * their mouse events.
     */
    ColumnHeaderCell.isHeaderMouseTarget = function (target) {
        return target.classList.contains(HEADER_CLASSNAME)
            || target.classList.contains(HEADER_COLUMN_NAME_CLASSNAME)
            || target.classList.contains(HEADER_INTERACTION_BAR_CLASSNAME)
            || target.classList.contains(HEADER_CONTENT_CLASSNAME);
    };
    ColumnHeaderCell.prototype.render = function () {
        var _a = this.props, className = _a.className, isActive = _a.isActive, isColumnSelected = _a.isColumnSelected, resizeHandle = _a.resizeHandle, style = _a.style;
        var classes = classNames(HEADER_CLASSNAME, {
            "bp-table-header-active": isActive || this.state.isActive,
            "bp-table-header-selected": isColumnSelected,
        }, className);
        return (React.createElement("div", {className: classes, style: style}, 
            this.renderName(), 
            this.maybeRenderContent(), 
            resizeHandle));
    };
    ColumnHeaderCell.prototype.renderContextMenu = function (_event) {
        return this.props.menu;
    };
    ColumnHeaderCell.prototype.renderName = function () {
        var _a = this.props, useInteractionBar = _a.useInteractionBar, name = _a.name, renderName = _a.renderName;
        var dropdownMenu = this.maybeRenderDropdownMenu();
        var defaultName = (React.createElement("div", {className: "bp-table-truncated-text"}, name));
        var nameComponent = (renderName == null) ? defaultName : renderName(name);
        if (useInteractionBar) {
            return (React.createElement("div", {className: HEADER_COLUMN_NAME_CLASSNAME, title: name}, 
                React.createElement("div", {className: HEADER_INTERACTION_BAR_CLASSNAME}, dropdownMenu), 
                React.createElement(HorizontalCellDivider, null), 
                React.createElement("div", {className: HEADER_COLUMN_NAME_TEXT_CLASSNAME}, nameComponent)));
        }
        else {
            return (React.createElement("div", {className: HEADER_COLUMN_NAME_CLASSNAME, title: name}, 
                dropdownMenu, 
                React.createElement("div", {className: HEADER_COLUMN_NAME_TEXT_CLASSNAME}, nameComponent)));
        }
    };
    ColumnHeaderCell.prototype.maybeRenderContent = function () {
        if (this.props.children === null) {
            return undefined;
        }
        return (React.createElement("div", {className: HEADER_CONTENT_CLASSNAME}, this.props.children));
    };
    ColumnHeaderCell.prototype.maybeRenderDropdownMenu = function () {
        var _a = this.props, menu = _a.menu, menuIconName = _a.menuIconName;
        if (menu == null) {
            return undefined;
        }
        var popoverTargetClasses = classNames("pt-icon-standard", core_1.Classes.iconClass(menuIconName));
        var constraints = [{
                attachment: "together",
                pin: true,
                to: "window",
            }];
        return (React.createElement(core_1.Popover, {constraints: constraints, content: menu, position: core_1.Position.BOTTOM, className: "bp-table-th-menu", popoverDidOpen: this.getPopoverStateChangeHandler(true), popoverWillClose: this.getPopoverStateChangeHandler(false), useSmartArrowPositioning: true}, 
            React.createElement("span", {className: popoverTargetClasses})
        ));
    };
    ColumnHeaderCell.defaultProps = {
        isActive: false,
        menuIconName: "more",
        useInteractionBar: false,
    };
    ColumnHeaderCell = __decorate([
        core_1.ContextMenuTarget
    ], ColumnHeaderCell);
    return ColumnHeaderCell;
}(React.Component));
exports.ColumnHeaderCell = ColumnHeaderCell;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWFkZXJzL2NvbHVtbkhlYWRlckNlbGwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7O0FBRUgscUJBQXNFLG1CQUFtQixDQUFDLENBQUE7QUFDMUYsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFpRi9CLElBQU0sZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7QUFDM0MsSUFBTSw0QkFBNEIsR0FBRyxzQkFBc0IsQ0FBQztBQUM1RCxJQUFNLHdCQUF3QixHQUFHLHlCQUF5QixDQUFDO0FBQzNELElBQU0saUNBQWlDLEdBQUcsMkJBQTJCLENBQUM7QUFDdEUsSUFBTSxnQ0FBZ0MsR0FBRywwQkFBMEIsQ0FBQztBQUVwRTtJQUNJLE1BQU0sQ0FBQyxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFDLGtDQUFrQyxFQUFHLENBQUM7QUFDaEUsQ0FBQztBQUZlLDZCQUFxQix3QkFFcEMsQ0FBQTtBQUdEO0lBQXNDLG9DQUEyRDtJQUFqRztRQUFBLGlCQWdIQztRQWhIcUMsOEJBQTJEO1FBcUJ0RixVQUFLLEdBQUc7WUFDWCxRQUFRLEVBQUUsS0FBSztTQUNsQixDQUFDO1FBc0ZNLGlDQUE0QixHQUFHLFVBQUMsUUFBaUIsSUFBSyxPQUFBO1lBQzFELEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxrQkFBUSxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBRjZELENBRTdELENBQUE7SUFDTCxDQUFDO0lBekdHOzs7Ozs7T0FNRztJQUNXLG9DQUFtQixHQUFqQyxVQUFrQyxNQUFtQjtRQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7ZUFDM0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUM7ZUFDdkQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENB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O1FBQzdGLElBQU0sV0FBVyxHQUFHLENBQUM7Z0JBQ2pCLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixHQUFHLEVBQUUsSUFBSTtnQkFDVCxFQUFFLEVBQUUsUUFBUTthQUNmLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxDQUNILG9CQUFDLGNBQU8sR0FDSixXQUFXLEVBQUUsV0FBWSxFQUN6QixPQUFPLEVBQUUsSUFBSyxFQUNkLFFBQVEsRUFBRSxlQUFRLENBQUMsTUFBTyxFQUMxQixTQUFTLEVBQUMsa0JBQWtCLEVBQzVCLGNBQWMsRUFBRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFFLEVBQ3hELGdCQUFnQixFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUUsRUFDM0Qsd0JBQXdCLEVBQUUsSUFBSztZQUUvQixxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFFLG9CQUFxQixFQUFFO1NBQ2xDLENBQ2IsQ0FBQztJQUNOLENBQUM7SUExR2EsNkJBQVksR0FBMkI7UUFDakQsUUFBUSxFQUFFLEtBQUs7UUFDZixZQUFZLEVBQUUsTUFBTTtRQUNwQixpQkFBaUIsRUFBRSxLQUFLO0tBQzNCLENBQUM7SUFOTjtRQUFDLHdCQUFpQjt3QkFBQTtJQWlIbEIsdUJBQUM7QUFBRCxDQWhIQSxBQWdIQyxDQWhIcUMsS0FBSyxDQUFDLFNBQVMsR0FnSHBEO0FBaEhZLHdCQUFnQixtQkFnSDVCLENBQUEiLCJmaWxlIjoiaGVhZGVycy9jb2x1bW5IZWFkZXJDZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0IHsgQ2xhc3NlcywgQ29udGV4dE1lbnVUYXJnZXQsIElQcm9wcywgUG9wb3ZlciwgUG9zaXRpb24gfSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVzaXplSGFuZGxlIH0gZnJvbSBcIi4uL2ludGVyYWN0aW9ucy9yZXNpemVIYW5kbGVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJQ29sdW1uSGVhZGVyUmVuZGVyZXIge1xuICAgIChjb2x1bW5JbmRleDogbnVtYmVyKTogUmVhY3QuUmVhY3RFbGVtZW50PElDb2x1bW5IZWFkZXJDZWxsUHJvcHM+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb2x1bW5OYW1lUHJvcHMge1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIGRpc3BsYXllZCBpbiB0aGUgaGVhZGVyIG9mIHRoZSBjb2x1bW4uXG4gICAgICovXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgbmFtZSByZW5kZXJpbmcgYmVoYXZpb3IuIFRoZSBkZWZhdWx0XG4gICAgICogYmVoYXZpb3IgaXMgdG8gc2ltcGx5IHVzZSB0aGUgYENvbHVtbkhlYWRlckNlbGxgcyBuYW1lIHByb3AuXG4gICAgICpcbiAgICAgKiBUaGlzIHJlbmRlciBjYWxsYmFjayBjYW4gYmUgdXNlZCwgZm9yIGV4YW1wbGUsIHRvIHByb3ZpZGUgYVxuICAgICAqIGBFZGl0YWJsZU5hbWVgIGNvbXBvbmVudCBmb3IgZWRpdGluZyBjb2x1bW4gbmFtZXMuXG4gICAgICpcbiAgICAgKiBJZiB5b3UgZGVmaW5lIHRoaXMgY2FsbGJhY2ssIHdlIHJlY29tbWVuZCB5b3UgYWxzbyBzZXRcbiAgICAgKiBgdXNlSW50ZXJhY3Rpb25CYXJgIHRvIHRydWUsIHRvIGF2b2lkIGlzc3VlcyB3aXRoIG1lbnVzIG9yIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICByZW5kZXJOYW1lPzogKG5hbWU6IHN0cmluZykgPT4gUmVhY3QuUmVhY3RFbGVtZW50PElQcm9wcz47XG5cbiAgICAvKipcbiAgICAgKiBJZiB0cnVlLCBhZGRzIGFuIGludGVyYWN0aW9uIGJhciBvbiB0b3Agb2YgdGhlIGNvbHVtbiBoZWFkZXIgY2VsbCBhbmRcbiAgICAgKiBtb3ZlcyB0aGUgbWVudSBhbmQgc2VsZWN0aW9uIGludGVyYWN0aW9ucyB0byBpdC5cbiAgICAgKlxuICAgICAqIFRoaXMgYWxsb3dzIHlvdSB0byBvdmVycmlkZSB0aGUgcmVuZGVyaW5nIG9mIGNvbHVtbiBuYW1lIHdpdGhvdXQgd29ycnlcbiAgICAgKiBvZiBjbG9iYmVyaW5nIHRoZSBtZW51IG9yIG90aGVyIGludGVyYWN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgdXNlSW50ZXJhY3Rpb25CYXI/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb2x1bW5IZWFkZXJDZWxsUHJvcHMgZXh0ZW5kcyBJQ29sdW1uTmFtZVByb3BzLCBJUHJvcHMge1xuICAgIC8qKlxuICAgICAqIElmIHRydWUsIHdpbGwgYXBwbHkgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgaGVhZGVyIHRvIGluZGljYXRlIGl0IGlzXG4gICAgICogcGFydCBvZiBhbiBleHRlcm5hbCBvcGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGlzQWN0aXZlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyBpZiB0aGUgZnVsbCBjb2x1bW4gaXMgcGFydCBvZiBhIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICBpc0NvbHVtblNlbGVjdGVkPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEFuIGVsZW1lbnQsIGxpa2UgYSBgPE1lbnU+YCwgdGhhdCBpcyBkaXNwbGF5ZWQgYnkgY2xpY2tpbmcgdGhlIGJ1dHRvblxuICAgICAqIHRvIHRoZSByaWdodCBvZiB0aGUgaGVhZGVyIG5hbWUsIG9yIGJ5IHJpZ2h0LWNsaWNraW5nIGFueXdoZXJlIGluIHRoZVxuICAgICAqIGhlYWRlci5cbiAgICAgKi9cbiAgICBtZW51PzogSlNYLkVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaWNvbiBuYW1lIGZvciB0aGUgaGVhZGVyJ3MgbWVudSBidXR0b24uXG4gICAgICogQGRlZmF1bHQgJ21vcmUnXG4gICAgICovXG4gICAgbWVudUljb25OYW1lPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ1NTIHN0eWxlcyBmb3IgdGhlIHRvcCBsZXZlbCBlbGVtZW50XG4gICAgICovXG4gICAgc3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xuXG4gICAgLyoqXG4gICAgICogQSBgUmVzaXplSGFuZGxlYCBSZWFjdCBjb21wb25lbnQgdGhhdCBhbGxvd3MgdXNlcnMgdG8gZHJhZy1yZXNpemUgdGhlXG4gICAgICogaGVhZGVyLiBJZiB5b3UgYXJlIHdyYXBwaW5nIHlvdXIgYENvbHVtbkhlYWRlckNlbGxgIGluIHlvdXIgb3duXG4gICAgICogY29tcG9uZW50LCB5b3UnbGwgbmVlZCB0byBwYXNzIHRoaXMgdGhyb3VnaCBmb3IgcmVzaXppbmcgdG8gd29yay5cbiAgICAgKi9cbiAgICByZXNpemVIYW5kbGU/OiBSZXNpemVIYW5kbGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbHVtbkhlYWRlclN0YXRlIHtcbiAgICBpc0FjdGl2ZTogYm9vbGVhbjtcbn1cblxuY29uc3QgSEVBREVSX0NMQVNTTkFNRSA9IFwiYnAtdGFibGUtaGVhZGVyXCI7XG5jb25zdCBIRUFERVJfQ09MVU1OX05BTUVfQ0xBU1NOQU1FID0gXCJicC10YWJsZS1jb2x1bW4tbmFtZVwiO1xuY29uc3QgSEVBREVSX0NPTlRFTlRfQ0xBU1NOQU1FID0gXCJicC10YWJsZS1oZWFkZXItY29udGVudFwiO1xuY29uc3QgSEVBREVSX0NPTFVNTl9OQU1FX1RFWFRfQ0xBU1NOQU1FID0gXCJicC10YWJsZS1jb2x1bW4tbmFtZS10ZXh0XCI7XG5jb25zdCBIRUFERVJfSU5URVJBQ1RJT05fQkFSX0NMQVNTTkFNRSA9IFwiYnAtdGFibGUtaW50ZXJhY3Rpb24tYmFyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBIb3Jpem9udGFsQ2VsbERpdmlkZXIoKTogSlNYLkVsZW1lbnQge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImJwLXRhYmxlLWhvcml6b250YWwtY2VsbC1kaXZpZGVyXCIgLz47XG59XG5cbkBDb250ZXh0TWVudVRhcmdldFxuZXhwb3J0IGNsYXNzIENvbHVtbkhlYWRlckNlbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SUNvbHVtbkhlYWRlckNlbGxQcm9wcywgSUNvbHVtbkhlYWRlclN0YXRlPiB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElDb2x1bW5IZWFkZXJDZWxsUHJvcHMgPSB7XG4gICAgICAgIGlzQWN0aXZlOiBmYWxzZSxcbiAgICAgICAgbWVudUljb25OYW1lOiBcIm1vcmVcIixcbiAgICAgICAgdXNlSW50ZXJhY3Rpb25CYXI6IGZhbHNlLFxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBkZXRlcm1pbmVzIGlmIGEgTW91c2VFdmVudCB3YXMgdHJpZ2dlcmVkIG9uIGEgdGFyZ2V0IHRoYXRcbiAgICAgKiBzaG91bGQgYmUgdXNlZCBhcyB0aGUgaGVhZGVyIGNsaWNrL2RyYWcgdGFyZ2V0LiBUaGlzIGVuYWJsZXMgdXNlcnMgb2ZcbiAgICAgKiB0aGlzIGNvbXBvbmVudCB0byByZW5kZXIgZnVsbCBpbnRlcmFjdGl2ZSBjb21wb25lbnRzIGluIHRoZWlyIGhlYWRlclxuICAgICAqIGNlbGxzIHdpdGhvdXQgd29ycnkgb2Ygc2VsZWN0aW9uIG9yIHJlc2l6ZSBvcGVyYXRpb25zIGZyb20gY2FwdHVyaW5nXG4gICAgICogdGhlaXIgbW91c2UgZXZlbnRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNIZWFkZXJNb3VzZVRhcmdldCh0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKEhFQURFUl9DTEFTU05BTUUpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKEhFQURFUl9DT0xVTU5fTkFNRV9DTEFTU05BTUUpXG4gICAgICAgICAgICB8fCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKEhFQURFUl9JTlRFUkFDVElPTl9CQVJfQ0xBU1NOQU1FKVxuICAgICAgICAgICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhIRUFERVJfQ09OVEVOVF9DTEFTU05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0ZSA9IHtcbiAgICAgICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgIH07XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNsYXNzTmFtZSwgaXNBY3RpdmUsIGlzQ29sdW1uU2VsZWN0ZWQsIHJlc2l6ZUhhbmRsZSwgc3R5bGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoSEVBREVSX0NMQVNTTkFNRSwge1xuICAgICAgICAgICAgXCJicC10YWJsZS1oZWFkZXItYWN0aXZlXCI6IGlzQWN0aXZlIHx8IHRoaXMuc3RhdGUuaXNBY3RpdmUsXG4gICAgICAgICAgICBcImJwLXRhYmxlLWhlYWRlci1zZWxlY3RlZFwiOiBpc0NvbHVtblNlbGVjdGVkLFxuICAgICAgICB9LCBjbGFzc05hbWUpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9IHN0eWxlPXtzdHlsZX0+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyTmFtZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLm1heWJlUmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgICAgIHtyZXNpemVIYW5kbGV9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyQ29udGV4dE1lbnUoX2V2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50Pikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5tZW51O1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyTmFtZSgpIHtcbiAgICAgICAgY29uc3QgeyB1c2VJbnRlcmFjdGlvbkJhciwgbmFtZSwgcmVuZGVyTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgZHJvcGRvd25NZW51ID0gdGhpcy5tYXliZVJlbmRlckRyb3Bkb3duTWVudSgpO1xuICAgICAgICBjb25zdCBkZWZhdWx0TmFtZSA9ICg8ZGl2IGNsYXNzTmFtZT1cImJwLXRhYmxlLXRydW5jYXRlZC10ZXh0XCI+e25hbWV9PC9kaXY+KTtcbiAgICAgICAgY29uc3QgbmFtZUNvbXBvbmVudCA9IChyZW5kZXJOYW1lID09IG51bGwpID8gZGVmYXVsdE5hbWUgOiByZW5kZXJOYW1lKG5hbWUpO1xuICAgICAgICBpZiAodXNlSW50ZXJhY3Rpb25CYXIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e0hFQURFUl9DT0xVTU5fTkFNRV9DTEFTU05BTUV9IHRpdGxlPXtuYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e0hFQURFUl9JTlRFUkFDVElPTl9CQVJfQ0xBU1NOQU1FfT57ZHJvcGRvd25NZW51fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8SG9yaXpvbnRhbENlbGxEaXZpZGVyIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtIRUFERVJfQ09MVU1OX05BTUVfVEVYVF9DTEFTU05BTUV9PntuYW1lQ29tcG9uZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e0hFQURFUl9DT0xVTU5fTkFNRV9DTEFTU05BTUV9IHRpdGxlPXtuYW1lfT5cbiAgICAgICAgICAgICAgICAgICAge2Ryb3Bkb3duTWVudX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e0hFQURFUl9DT0xVTU5fTkFNRV9URVhUX0NMQVNTTkFNRX0+e25hbWVDb21wb25lbnR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtIRUFERVJfQ09OVEVOVF9DTEFTU05BTUV9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlckRyb3Bkb3duTWVudSgpIHtcbiAgICAgICAgY29uc3QgeyBtZW51LCBtZW51SWNvbk5hbWUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKG1lbnUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvcG92ZXJUYXJnZXRDbGFzc2VzID0gY2xhc3NOYW1lcyhcInB0LWljb24tc3RhbmRhcmRcIiwgQ2xhc3Nlcy5pY29uQ2xhc3MobWVudUljb25OYW1lKSk7XG4gICAgICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gW3tcbiAgICAgICAgICAgIGF0dGFjaG1lbnQ6IFwidG9nZXRoZXJcIixcbiAgICAgICAgICAgIHBpbjogdHJ1ZSxcbiAgICAgICAgICAgIHRvOiBcIndpbmRvd1wiLFxuICAgICAgICB9XTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFBvcG92ZXJcbiAgICAgICAgICAgICAgICBjb25zdHJhaW50cz17Y29uc3RyYWludHN9XG4gICAgICAgICAgICAgICAgY29udGVudD17bWVudX1cbiAgICAgICAgICAgICAgICBwb3NpdGlvbj17UG9zaXRpb24uQk9UVE9NfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJwLXRhYmxlLXRoLW1lbnVcIlxuICAgICAgICAgICAgICAgIHBvcG92ZXJEaWRPcGVuPXt0aGlzLmdldFBvcG92ZXJTdGF0ZUNoYW5nZUhhbmRsZXIodHJ1ZSl9XG4gICAgICAgICAgICAgICAgcG9wb3ZlcldpbGxDbG9zZT17dGhpcy5nZXRQb3BvdmVyU3RhdGVDaGFuZ2VIYW5kbGVyKGZhbHNlKX1cbiAgICAgICAgICAgICAgICB1c2VTbWFydEFycm93UG9zaXRpb25pbmc9e3RydWV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtwb3BvdmVyVGFyZ2V0Q2xhc3Nlc30vPlxuICAgICAgICAgICAgPC9Qb3BvdmVyPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UG9wb3ZlclN0YXRlQ2hhbmdlSGFuZGxlciA9IChpc0FjdGl2ZTogYm9vbGVhbikgPT4gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNBY3RpdmUgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
