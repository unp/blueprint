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
var classNames = require("classnames");
var React = require("react");
var GuideLayer = (function (_super) {
    __extends(GuideLayer, _super);
    function GuideLayer() {
        _super.apply(this, arguments);
        this.renderVerticalGuide = function (offset, index) {
            var style = {
                left: offset + "px",
            };
            return (React.createElement("div", {className: "bp-table-overlay bp-table-vertical-guide", key: index, style: style}));
        };
        this.renderHorizontalGuide = function (offset, index) {
            var style = {
                top: offset + "px",
            };
            return (React.createElement("div", {className: "bp-table-overlay bp-table-horizontal-guide", key: index, style: style}));
        };
    }
    GuideLayer.prototype.render = function () {
        var _a = this.props, verticalGuides = _a.verticalGuides, horizontalGuides = _a.horizontalGuides, className = _a.className;
        var verticals = (verticalGuides == null) ? undefined : verticalGuides.map(this.renderVerticalGuide);
        var horizontals = (horizontalGuides == null) ? undefined : horizontalGuides.map(this.renderHorizontalGuide);
        return (React.createElement("div", {className: classNames(className, "bp-table-overlay-layer")}, 
            verticals, 
            horizontals));
    };
    return GuideLayer;
}(React.Component));
exports.GuideLayer = GuideLayer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sYXllcnMvZ3VpZGVzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7OztBQUdILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBYy9CO0lBQWdDLDhCQUFxQztJQUFyRTtRQUFnQyw4QkFBcUM7UUFhekQsd0JBQW1CLEdBQUcsVUFBQyxNQUFjLEVBQUUsS0FBYTtZQUN4RCxJQUFNLEtBQUssR0FBRztnQkFDVixJQUFJLEVBQUssTUFBTSxPQUFJO2FBQ0MsQ0FBQztZQUN6QixNQUFNLENBQUMsQ0FDSCxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFDLDBDQUEwQyxFQUFDLEdBQUcsRUFBRSxLQUFNLEVBQUMsS0FBSyxFQUFFLEtBQU0sRUFBRyxDQUN6RixDQUFDO1FBQ04sQ0FBQyxDQUFBO1FBRU8sMEJBQXFCLEdBQUcsVUFBQyxNQUFjLEVBQUUsS0FBYTtZQUMxRCxJQUFNLEtBQUssR0FBRztnQkFDVixHQUFHLEVBQUssTUFBTSxPQUFJO2FBQ0UsQ0FBQztZQUN6QixNQUFNLENBQUMsQ0FDSCxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFDLDRDQUE0QyxFQUFDLEdBQUcsRUFBRSxLQUFNLEVBQUMsS0FBSyxFQUFFLEtBQU0sRUFBRyxDQUMzRixDQUFDO1FBQ04sQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQTdCVSwyQkFBTSxHQUFiO1FBQ0ksSUFBQSxlQUFrRSxFQUExRCxrQ0FBYyxFQUFFLHNDQUFnQixFQUFFLHdCQUFTLENBQWdCO1FBQ25FLElBQU0sU0FBUyxHQUFHLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3RHLElBQU0sV0FBVyxHQUFHLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM5RyxNQUFNLENBQUMsQ0FDSCxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsd0JBQXdCLENBQUU7WUFDM0QsU0FBVTtZQUNWLFdBQVksQ0FDWCxDQUNULENBQUM7SUFDTixDQUFDO0lBbUJMLGlCQUFDO0FBQUQsQ0E5QkEsQUE4QkMsQ0E5QitCLEtBQUssQ0FBQyxTQUFTLEdBOEI5QztBQTlCWSxrQkFBVSxhQThCdEIsQ0FBQSIsImZpbGUiOiJsYXllcnMvZ3VpZGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIkBibHVlcHJpbnRqcy9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJR3VpZGVMYXllclByb3BzIGV4dGVuZHMgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiAgVGhlIGxlZnQtb2Zmc2V0IGxvY2F0aW9uIG9mIHRoZSB2ZXJ0aWNhbCBndWlkZXNcbiAgICAgKi9cbiAgICB2ZXJ0aWNhbEd1aWRlcz86IG51bWJlcltdO1xuXG4gICAgLyoqXG4gICAgICogIFRoZSB0b3Atb2Zmc2V0IGxvY2F0aW9uIG9mIHRoZSBob3Jpem9udGFsIGd1aWRlc1xuICAgICAqL1xuICAgIGhvcml6b250YWxHdWlkZXM/OiBudW1iZXJbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEd1aWRlTGF5ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SUd1aWRlTGF5ZXJQcm9wcywge30+IHtcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHZlcnRpY2FsR3VpZGVzLCBob3Jpem9udGFsR3VpZGVzLCBjbGFzc05hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHZlcnRpY2FscyA9ICh2ZXJ0aWNhbEd1aWRlcyA9PSBudWxsKSA/IHVuZGVmaW5lZCA6IHZlcnRpY2FsR3VpZGVzLm1hcCh0aGlzLnJlbmRlclZlcnRpY2FsR3VpZGUpO1xuICAgICAgICBjb25zdCBob3Jpem9udGFscyA9IChob3Jpem9udGFsR3VpZGVzID09IG51bGwpID8gdW5kZWZpbmVkIDogaG9yaXpvbnRhbEd1aWRlcy5tYXAodGhpcy5yZW5kZXJIb3Jpem9udGFsR3VpZGUpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoY2xhc3NOYW1lLCBcImJwLXRhYmxlLW92ZXJsYXktbGF5ZXJcIil9PlxuICAgICAgICAgICAgICAgIHt2ZXJ0aWNhbHN9XG4gICAgICAgICAgICAgICAge2hvcml6b250YWxzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJWZXJ0aWNhbEd1aWRlID0gKG9mZnNldDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogYCR7b2Zmc2V0fXB4YCxcbiAgICAgICAgfSBhcyBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJicC10YWJsZS1vdmVybGF5IGJwLXRhYmxlLXZlcnRpY2FsLWd1aWRlXCIga2V5PXtpbmRleH0gc3R5bGU9e3N0eWxlfSAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVySG9yaXpvbnRhbEd1aWRlID0gKG9mZnNldDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiBgJHtvZmZzZXR9cHhgLFxuICAgICAgICB9IGFzIFJlYWN0LkNTU1Byb3BlcnRpZXM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJwLXRhYmxlLW92ZXJsYXkgYnAtdGFibGUtaG9yaXpvbnRhbC1ndWlkZVwiIGtleT17aW5kZXh9IHN0eWxlPXtzdHlsZX0gLz5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
