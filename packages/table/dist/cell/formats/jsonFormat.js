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
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var truncatedFormat_1 = require("./truncatedFormat");
var JSONFormat = (function (_super) {
    __extends(JSONFormat, _super);
    function JSONFormat() {
        _super.apply(this, arguments);
    }
    JSONFormat.prototype.render = function () {
        var _a = this.props, children = _a.children, omitQuotesOnStrings = _a.omitQuotesOnStrings, stringify = _a.stringify;
        var isNully = children == null;
        var showPopover = isNully ? truncatedFormat_1.TruncatedPopoverMode.NEVER : truncatedFormat_1.TruncatedPopoverMode.ALWAYS;
        var className = classNames(this.props.className, {
            "bp-table-null": isNully,
        });
        var displayValue = "";
        if (omitQuotesOnStrings && typeof children === "string") {
            displayValue = children;
        }
        else {
            displayValue = stringify(children);
        }
        return (React.createElement(truncatedFormat_1.TruncatedFormat, __assign({}, this.props, {className: className, showPopover: showPopover}), displayValue));
    };
    JSONFormat.defaultProps = {
        omitQuotesOnStrings: true,
        stringify: function (obj) { return (JSON.stringify(obj, null, 2)); },
    };
    JSONFormat = __decorate([
        PureRender
    ], JSONFormat);
    return JSONFormat;
}(React.Component));
exports.JSONFormat = JSONFormat;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jZWxsL2Zvcm1hdHMvanNvbkZvcm1hdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksVUFBVSxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFDL0IsZ0NBQTZFLG1CQUFtQixDQUFDLENBQUE7QUFzQmpHO0lBQWdDLDhCQUFxQztJQUFyRTtRQUFnQyw4QkFBcUM7SUFnQ3JFLENBQUM7SUExQlUsMkJBQU0sR0FBYjtRQUNJLElBQUEsZUFBK0QsRUFBdkQsc0JBQVEsRUFBRSw0Q0FBbUIsRUFBRSx3QkFBUyxDQUFnQjtRQUVoRSxJQUFNLE9BQU8sR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDO1FBQ2pDLElBQU0sV0FBVyxHQUFHLE9BQU8sR0FBRyxzQ0FBb0IsQ0FBQyxLQUFLLEdBQUcsc0NBQW9CLENBQUMsTUFBTSxDQUFDO1FBQ3ZGLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNqRCxlQUFlLEVBQUUsT0FBTztTQUN6QixDQUFDLENBQUM7UUFFSCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsbUJBQW1CLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN0RCxZQUFZLEdBQUcsUUFBUSxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUNILG9CQUFDLGlDQUFlLGVBQ1IsSUFBSSxDQUFDLEtBQUssR0FDZCxTQUFTLEVBQUUsU0FBVSxFQUNyQixXQUFXLEVBQUUsV0FBWSxJQUV4QixZQUFhLENBQ0EsQ0FDckIsQ0FBQztJQUNOLENBQUM7SUE5QmEsdUJBQVksR0FBcUI7UUFDM0MsbUJBQW1CLEVBQUUsSUFBSTtRQUN6QixTQUFTLEVBQUUsVUFBQyxHQUFRLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUE5QixDQUE4QjtLQUMxRCxDQUFDO0lBTE47UUFBQyxVQUFVO2tCQUFBO0lBaUNYLGlCQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsQ0FoQytCLEtBQUssQ0FBQyxTQUFTLEdBZ0M5QztBQWhDWSxrQkFBVSxhQWdDdEIsQ0FBQSIsImZpbGUiOiJjZWxsL2Zvcm1hdHMvanNvbkZvcm1hdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFB1cmVSZW5kZXIgZnJvbSBcInB1cmUtcmVuZGVyLWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBJVHJ1bmNhdGVkRm9ybWF0UHJvcHMsIFRydW5jYXRlZEZvcm1hdCwgVHJ1bmNhdGVkUG9wb3Zlck1vZGUgfSBmcm9tIFwiLi90cnVuY2F0ZWRGb3JtYXRcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUpTT05Gb3JtYXRQcm9wcyBleHRlbmRzIElUcnVuY2F0ZWRGb3JtYXRQcm9wcyB7XG4gICAgY2hpbGRyZW4/OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBCeSBkZWZhdWx0IHdlIG9taXQgc3RyaW5naWZ5aW5nIG5hdGl2ZSBqYXZhc2NyaXB0IHN0cmluZ3Mgc2luY2VcbiAgICAgKiBgSlNPTi5zdHJpbmdpZnlgIGF3a3dhcmRseSBhZGRzIGRvdWJsZS1xdW90ZXMgdG8gdGhlIGRpc3BsYXkgdmFsdWUuXG4gICAgICogVGhpcyBiZWhhdmlvciBjYW4gYmUgdHVybmVkIG9mZiBieSBzZXR0aW5nIHRoaXMgYm9vbGVhbiB0byBmYWxzZS5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgb21pdFF1b3Rlc09uU3RyaW5ncz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25hbGx5IHNwZWNpZnkgdGhlIHN0cmluZ2lmeSBtZXRob2QuIERlZmF1bHQgaXMgYEpTT04uc3RyaW5naWZ5YFxuICAgICAqIHdpdGggMiBzcGFjZSBpbmRlbnRhdGlvbi5cbiAgICAgKi9cbiAgICBzdHJpbmdpZnk/OiAob2JqOiBhbnkpID0+IHN0cmluZztcbn1cblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBKU09ORm9ybWF0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElKU09ORm9ybWF0UHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElKU09ORm9ybWF0UHJvcHMgPSB7XG4gICAgICAgIG9taXRRdW90ZXNPblN0cmluZ3M6IHRydWUsXG4gICAgICAgIHN0cmluZ2lmeTogKG9iajogYW55KSA9PiAoSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKSksXG4gICAgfTtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIG9taXRRdW90ZXNPblN0cmluZ3MsIHN0cmluZ2lmeSB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBjb25zdCBpc051bGx5ID0gY2hpbGRyZW4gPT0gbnVsbDtcbiAgICAgICAgY29uc3Qgc2hvd1BvcG92ZXIgPSBpc051bGx5ID8gVHJ1bmNhdGVkUG9wb3Zlck1vZGUuTkVWRVIgOiBUcnVuY2F0ZWRQb3BvdmVyTW9kZS5BTFdBWVM7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXModGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcbiAgICAgICAgICBcImJwLXRhYmxlLW51bGxcIjogaXNOdWxseSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGRpc3BsYXlWYWx1ZSA9IFwiXCI7XG4gICAgICAgIGlmIChvbWl0UXVvdGVzT25TdHJpbmdzICYmIHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZGlzcGxheVZhbHVlID0gY2hpbGRyZW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwbGF5VmFsdWUgPSBzdHJpbmdpZnkoY2hpbGRyZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUcnVuY2F0ZWRGb3JtYXRcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICBzaG93UG9wb3Zlcj17c2hvd1BvcG92ZXJ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2Rpc3BsYXlWYWx1ZX1cbiAgICAgICAgICAgIDwvVHJ1bmNhdGVkRm9ybWF0PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
