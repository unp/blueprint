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
var PureRender = require("pure-render-decorator");
var React = require("react");
(function (TruncatedPopoverMode) {
    TruncatedPopoverMode[TruncatedPopoverMode["ALWAYS"] = 0] = "ALWAYS";
    TruncatedPopoverMode[TruncatedPopoverMode["NEVER"] = 1] = "NEVER";
    TruncatedPopoverMode[TruncatedPopoverMode["WHEN_TRUNCATED"] = 2] = "WHEN_TRUNCATED";
})(exports.TruncatedPopoverMode || (exports.TruncatedPopoverMode = {}));
var TruncatedPopoverMode = exports.TruncatedPopoverMode;
var TruncatedFormat = (function (_super) {
    __extends(TruncatedFormat, _super);
    function TruncatedFormat() {
        _super.apply(this, arguments);
    }
    TruncatedFormat.prototype.render = function () {
        var _a = this.props, children = _a.children, preformatted = _a.preformatted, truncateLength = _a.truncateLength, truncationSuffix = _a.truncationSuffix;
        var content = "" + children;
        var cellContent = content;
        if (truncateLength > 0 && cellContent.length > truncateLength) {
            cellContent = cellContent.substring(0, truncateLength) + truncationSuffix;
        }
        if (this.shouldShowPopover(content)) {
            var popoverClasses = classNames("bp-table-truncated-popover", preformatted ? "bp-table-popover-whitespace-pre" : "bp-table-popover-whitespace-normal");
            var popoverContent = React.createElement("div", {className: popoverClasses}, children);
            var className = classNames(this.props.className, "bp-table-truncated-format");
            var constraints = [{
                    attachment: "together",
                    pin: true,
                    to: "window",
                }];
            return (React.createElement("div", {className: className}, 
                React.createElement("div", {className: "bp-table-truncated-value"}, cellContent), 
                React.createElement(core_1.Popover, {className: "bp-table-truncated-popover-target", constraints: constraints, content: popoverContent, position: core_1.Position.BOTTOM, useSmartArrowPositioning: true}, 
                    React.createElement("span", {className: "pt-icon-standard pt-icon-more"})
                )));
        }
        else {
            var className = classNames(this.props.className, "bp-table-truncated-text");
            return React.createElement("div", {className: className}, cellContent);
        }
    };
    TruncatedFormat.prototype.shouldShowPopover = function (content) {
        var _a = this.props, showPopover = _a.showPopover, truncateLength = _a.truncateLength;
        switch (showPopover) {
            case TruncatedPopoverMode.ALWAYS:
                return true;
            case TruncatedPopoverMode.NEVER:
                return false;
            case TruncatedPopoverMode.WHEN_TRUNCATED:
                return (truncateLength > 0 && content.length > truncateLength);
            default:
                return false;
        }
    };
    TruncatedFormat.defaultProps = {
        preformatted: true,
        showPopover: TruncatedPopoverMode.ALWAYS,
        truncateLength: 80,
        truncationSuffix: "...",
    };
    TruncatedFormat = __decorate([
        PureRender
    ], TruncatedFormat);
    return TruncatedFormat;
}(React.Component));
exports.TruncatedFormat = TruncatedFormat;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jZWxsL2Zvcm1hdHMvdHJ1bmNhdGVkRm9ybWF0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7OztBQUVILHFCQUEwQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQzlELElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksVUFBVSxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFFL0IsV0FBWSxvQkFBb0I7SUFDNUIsbUVBQU0sQ0FBQTtJQUNOLGlFQUFLLENBQUE7SUFDTCxtRkFBYyxDQUFBO0FBQ2xCLENBQUMsRUFKVyw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBSS9CO0FBSkQsSUFBWSxvQkFBb0IsR0FBcEIsNEJBSVgsQ0FBQTtBQXFDRDtJQUFxQyxtQ0FBMEM7SUFBL0U7UUFBcUMsOEJBQTBDO0lBK0QvRSxDQUFDO0lBdkRVLGdDQUFNLEdBQWI7UUFDSSxJQUFBLGVBQStFLEVBQXZFLHNCQUFRLEVBQUUsOEJBQVksRUFBRSxrQ0FBYyxFQUFFLHNDQUFnQixDQUFnQjtRQUNoRixJQUFNLE9BQU8sR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDO1FBRTlCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM1RCxXQUFXLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7UUFDOUUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUM3Qiw0QkFBNEIsRUFDNUIsWUFBWSxHQUFHLGlDQUFpQyxHQUFHLG9DQUFvQyxDQUMxRixDQUFDO1lBQ0YsSUFBTSxjQUFjLEdBQUcscUJBQUMsR0FBRyxJQUFDLFNBQVMsRUFBRSxjQUFlLEdBQUUsUUFBUyxDQUFNLENBQUM7WUFDeEUsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLDJCQUEyQixDQUFDLENBQUM7WUFDaEYsSUFBTSxXQUFXLEdBQUcsQ0FBQztvQkFDakIsVUFBVSxFQUFFLFVBQVU7b0JBQ3RCLEdBQUcsRUFBRSxJQUFJO29CQUNULEVBQUUsRUFBRSxRQUFRO2lCQUNmLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxDQUNILHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsU0FBVTtnQkFDdEIscUJBQUMsR0FBRyxJQUFDLFNBQVMsRUFBQywwQkFBMEIsR0FBRSxXQUFZLENBQU07Z0JBQzdELG9CQUFDLGNBQU8sR0FDSixTQUFTLEVBQUMsbUNBQW1DLEVBQzdDLFdBQVcsRUFBRSxXQUFZLEVBQ3pCLE9BQU8sRUFBRSxjQUFlLEVBQ3hCLFFBQVEsRUFBRSxlQUFRLENBQUMsTUFBTyxFQUMxQix3QkFBd0IsRUFBRSxJQUFLO29CQUUvQixxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFDLCtCQUErQixFQUFFO2lCQUMzQyxDQUNSLENBQ1QsQ0FBQztRQUNOLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBQzlFLE1BQU0sQ0FBQyxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLFNBQVUsR0FBRSxXQUFZLENBQU0sQ0FBQztRQUMxRCxDQUFDO0lBQ0wsQ0FBQztJQUVPLDJDQUFpQixHQUF6QixVQUEwQixPQUFlO1FBQ3JDLElBQUEsZUFBa0QsRUFBMUMsNEJBQVcsRUFBRSxrQ0FBYyxDQUFnQjtRQUVuRCxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEtBQUssb0JBQW9CLENBQUMsTUFBTTtnQkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixLQUFLLG9CQUFvQixDQUFDLEtBQUs7Z0JBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsS0FBSyxvQkFBb0IsQ0FBQyxjQUFjO2dCQUNwQyxNQUFNLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLENBQUM7WUFDbkU7Z0JBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQTdEYSw0QkFBWSxHQUEwQjtRQUNoRCxZQUFZLEVBQUUsSUFBSTtRQUNsQixXQUFXLEVBQUUsb0JBQW9CLENBQUMsTUFBTTtRQUN4QyxjQUFjLEVBQUUsRUFBRTtRQUNsQixnQkFBZ0IsRUFBRSxLQUFLO0tBQzFCLENBQUM7SUFQTjtRQUFDLFVBQVU7dUJBQUE7SUFnRVgsc0JBQUM7QUFBRCxDQS9EQSxBQStEQyxDQS9Eb0MsS0FBSyxDQUFDLFNBQVMsR0ErRG5EO0FBL0RZLHVCQUFlLGtCQStEM0IsQ0FBQSIsImZpbGUiOiJjZWxsL2Zvcm1hdHMvdHJ1bmNhdGVkRm9ybWF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0IHsgSVByb3BzLCBQb3BvdmVyLCBQb3NpdGlvbiB9IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGVudW0gVHJ1bmNhdGVkUG9wb3Zlck1vZGUge1xuICAgIEFMV0FZUyxcbiAgICBORVZFUixcbiAgICBXSEVOX1RSVU5DQVRFRCxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVHJ1bmNhdGVkRm9ybWF0UHJvcHMgZXh0ZW5kcyBJUHJvcHMge1xuICAgIGNoaWxkcmVuPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9wb3ZlciBjb250ZW50IHN0eWxlIHRvIGB3aGl0ZS1zcGFjZTogcHJlYCBpZiBgdHJ1ZWAgb3JcbiAgICAgKiBgd2hpdGUtc3BhY2U6IG5vcm1hbGAgaWYgYGZhbHNlYC5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcHJlZm9ybWF0dGVkPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIENvbmZpZ3VyZXMgd2hlbiB0aGUgcG9wb3ZlciBpcyBzaG93biB3aXRoIHRoZSBgVHJ1bmNhdGVkUG9wb3Zlck1vZGVgIGVudW0uXG4gICAgICpcbiAgICAgKiBUaGUgZW51bSB2YWx1ZXMgYXJlOlxuICAgICAqIC0gYEFMV0FZU2AgLSBzaG93IHRoZSBwb3BvdmVyIChkZWZhdWx0KS5cbiAgICAgKiAtIGBORVZFUmAgLSBkb24ndCBzaG93IHRoZSBwb3BvdmVyLlxuICAgICAqIC0gYFdIRU5fVFJVTkNBVEVEYCAtIHNob3cgdGhlIHBvcG92ZXIgb25seSB3aGVuIHRoZSB0ZXh0IGlzIHRydW5jYXRlZC5cbiAgICAgKi9cbiAgICBzaG93UG9wb3Zlcj86IFRydW5jYXRlZFBvcG92ZXJNb2RlO1xuXG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBhcmUgZGlzcGxheWVkIGJlZm9yZSBiZWluZyB0cnVuY2F0ZWQgYW5kIGFwcGVuZGVkIHdpdGhcbiAgICAgKiB0aGUgYHRydW5jYXRpb25TdWZmaXhgIHByb3AuIEEgdmFsdWUgb2YgMCB3aWxsIGRpc2FibGUgdHJ1bmNhdGlvbi5cbiAgICAgKiBAZGVmYXVsdCA4MFxuICAgICAqL1xuICAgIHRydW5jYXRlTGVuZ3RoPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHN0cmluZyB0aGF0IGlzIGFwcGVuZGVkIHRvIHRoZSBkaXNwbGF5IHN0cmluZyBpZiBpdCBpcyB0cnVuY2F0ZWQuXG4gICAgICogQGRlZmF1bHQgXCIuLi5cIlxuICAgICAqL1xuICAgIHRydW5jYXRpb25TdWZmaXg/OiBzdHJpbmc7XG59XG5cbkBQdXJlUmVuZGVyXG5leHBvcnQgY2xhc3MgVHJ1bmNhdGVkRm9ybWF0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElUcnVuY2F0ZWRGb3JtYXRQcm9wcywge30+IHtcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogSVRydW5jYXRlZEZvcm1hdFByb3BzID0ge1xuICAgICAgICBwcmVmb3JtYXR0ZWQ6IHRydWUsXG4gICAgICAgIHNob3dQb3BvdmVyOiBUcnVuY2F0ZWRQb3BvdmVyTW9kZS5BTFdBWVMsXG4gICAgICAgIHRydW5jYXRlTGVuZ3RoOiA4MCxcbiAgICAgICAgdHJ1bmNhdGlvblN1ZmZpeDogXCIuLi5cIixcbiAgICB9O1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgcHJlZm9ybWF0dGVkLCB0cnVuY2F0ZUxlbmd0aCwgdHJ1bmNhdGlvblN1ZmZpeCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgY29udGVudCA9IFwiXCIgKyBjaGlsZHJlbjtcblxuICAgICAgICBsZXQgY2VsbENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICBpZiAodHJ1bmNhdGVMZW5ndGggPiAwICYmIGNlbGxDb250ZW50Lmxlbmd0aCA+IHRydW5jYXRlTGVuZ3RoKSB7XG4gICAgICAgICAgICBjZWxsQ29udGVudCA9IGNlbGxDb250ZW50LnN1YnN0cmluZygwLCB0cnVuY2F0ZUxlbmd0aCkgKyB0cnVuY2F0aW9uU3VmZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkU2hvd1BvcG92ZXIoY29udGVudCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcG92ZXJDbGFzc2VzID0gY2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICBcImJwLXRhYmxlLXRydW5jYXRlZC1wb3BvdmVyXCIsXG4gICAgICAgICAgICAgICAgcHJlZm9ybWF0dGVkID8gXCJicC10YWJsZS1wb3BvdmVyLXdoaXRlc3BhY2UtcHJlXCIgOiBcImJwLXRhYmxlLXBvcG92ZXItd2hpdGVzcGFjZS1ub3JtYWxcIixcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyQ29udGVudCA9IDxkaXYgY2xhc3NOYW1lPXtwb3BvdmVyQ2xhc3Nlc30+e2NoaWxkcmVufTwvZGl2PjtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXModGhpcy5wcm9wcy5jbGFzc05hbWUsIFwiYnAtdGFibGUtdHJ1bmNhdGVkLWZvcm1hdFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gW3tcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50OiBcInRvZ2V0aGVyXCIsXG4gICAgICAgICAgICAgICAgcGluOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRvOiBcIndpbmRvd1wiLFxuICAgICAgICAgICAgfV07XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJwLXRhYmxlLXRydW5jYXRlZC12YWx1ZVwiPntjZWxsQ29udGVudH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPFBvcG92ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJwLXRhYmxlLXRydW5jYXRlZC1wb3BvdmVyLXRhcmdldFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50cz17Y29uc3RyYWludHN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtwb3BvdmVyQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPXtQb3NpdGlvbi5CT1RUT019XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VTbWFydEFycm93UG9zaXRpb25pbmc9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB0LWljb24tc3RhbmRhcmQgcHQtaWNvbi1tb3JlXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L1BvcG92ZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lcyh0aGlzLnByb3BzLmNsYXNzTmFtZSwgXCJicC10YWJsZS10cnVuY2F0ZWQtdGV4dFwiKTtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT57Y2VsbENvbnRlbnR9PC9kaXY+O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG91bGRTaG93UG9wb3Zlcihjb250ZW50OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgeyBzaG93UG9wb3ZlciwgdHJ1bmNhdGVMZW5ndGggfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgc3dpdGNoIChzaG93UG9wb3Zlcikge1xuICAgICAgICAgICAgY2FzZSBUcnVuY2F0ZWRQb3BvdmVyTW9kZS5BTFdBWVM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjYXNlIFRydW5jYXRlZFBvcG92ZXJNb2RlLk5FVkVSOlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgVHJ1bmNhdGVkUG9wb3Zlck1vZGUuV0hFTl9UUlVOQ0FURUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0cnVuY2F0ZUxlbmd0aCA+IDAgJiYgY29udGVudC5sZW5ndGggPiB0cnVuY2F0ZUxlbmd0aCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
