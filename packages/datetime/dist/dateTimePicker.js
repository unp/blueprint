/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
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
var classNames = require("classnames");
var React = require("react");
var core_1 = require("@blueprintjs/core");
var Classes = require("./common/classes");
var DateUtils = require("./common/dateUtils");
var datePicker_1 = require("./datePicker");
var timePicker_1 = require("./timePicker");
var DateTimePicker = (function (_super) {
    __extends(DateTimePicker, _super);
    function DateTimePicker(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.displayName = "Blueprint.DateTimePicker";
        this.handleDateChange = function (date, isUserChange) {
            var value = DateUtils.getDateTime(date, _this.state.value);
            if (_this.props.value === undefined) {
                _this.setState({ value: value });
            }
            core_1.Utils.safeInvoke(_this.props.onChange, value, isUserChange);
        };
        this.handleTimeChange = function (time) {
            var value = DateUtils.getDateTime(_this.state.value, time);
            if (_this.props.value === undefined) {
                _this.setState({ value: value });
            }
            core_1.Utils.safeInvoke(_this.props.onChange, value, true);
        };
        this.state = {
            value: (this.props.value != null) ? this.props.value : this.props.defaultValue,
        };
    }
    DateTimePicker.prototype.render = function () {
        return (React.createElement("div", {className: classNames(Classes.DATETIMEPICKER, this.props.className)}, 
            React.createElement(datePicker_1.DatePicker, __assign({}, this.props.datePickerProps, {onChange: this.handleDateChange, value: this.state.value})), 
            React.createElement(timePicker_1.TimePicker, __assign({}, this.props.timePickerProps, {onChange: this.handleTimeChange, value: this.state.value}))));
    };
    DateTimePicker.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.value != null) {
            this.setState({ value: nextProps.value });
        }
    };
    DateTimePicker.defaultProps = {
        defaultValue: new Date(),
    };
    return DateTimePicker;
}(core_1.AbstractComponent));
exports.DateTimePicker = DateTimePicker;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlVGltZVBpY2tlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLHFCQUFpRCxtQkFBbUIsQ0FBQyxDQUFBO0FBRXJFLElBQVksT0FBTyxXQUFNLGtCQUFrQixDQUFDLENBQUE7QUFDNUMsSUFBWSxTQUFTLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUNoRCwyQkFBNkMsY0FBYyxDQUFDLENBQUE7QUFDNUQsMkJBQTZDLGNBQWMsQ0FBQyxDQUFBO0FBcUM1RDtJQUFvQyxrQ0FBNkQ7SUFPN0Ysd0JBQW1CLEtBQTRCLEVBQUUsT0FBYTtRQVBsRSxpQkFxREM7UUE3Q08sa0JBQU0sS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBSG5CLGdCQUFXLEdBQUcsMEJBQTBCLENBQUM7UUFpQ3pDLHFCQUFnQixHQUFHLFVBQUMsSUFBVSxFQUFFLFlBQXFCO1lBQ3hELElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUQsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFlBQUssRUFBRSxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUNELFlBQUssQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQTtRQUVNLHFCQUFnQixHQUFHLFVBQUMsSUFBVTtZQUNqQyxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFDRCxZQUFLLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUE7UUExQ0csSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtTQUNqRixDQUFDO0lBQ04sQ0FBQztJQUVNLCtCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMsQ0FDSCxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFFO1lBQ3JFLG9CQUFDLHVCQUFVLGVBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWlCLEVBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQU0sR0FDMUI7WUFDRixvQkFBQyx1QkFBVSxlQUNILElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFpQixFQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFNLEdBQzFCLENBQ0EsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVNLGtEQUF5QixHQUFoQyxVQUFpQyxTQUEyQjtRQUN4RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM5QyxDQUFDO0lBQ0wsQ0FBQztJQW5DYSwyQkFBWSxHQUF5QjtRQUMvQyxZQUFZLEVBQUUsSUFBSSxJQUFJLEVBQUU7S0FDM0IsQ0FBQztJQWtETixxQkFBQztBQUFELENBckRBLEFBcURDLENBckRtQyx3QkFBaUIsR0FxRHBEO0FBckRZLHNCQUFjLGlCQXFEMUIsQ0FBQSIsImZpbGUiOiJkYXRlVGltZVBpY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50LCBJUHJvcHMsIFV0aWxzIH0gZnJvbSBcIkBibHVlcHJpbnRqcy9jb3JlXCI7XG5cbmltcG9ydCAqIGFzIENsYXNzZXMgZnJvbSBcIi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIERhdGVVdGlscyBmcm9tIFwiLi9jb21tb24vZGF0ZVV0aWxzXCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyLCBJRGF0ZVBpY2tlclByb3BzIH0gZnJvbSBcIi4vZGF0ZVBpY2tlclwiO1xuaW1wb3J0IHsgSVRpbWVQaWNrZXJQcm9wcywgVGltZVBpY2tlciB9IGZyb20gXCIuL3RpbWVQaWNrZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0ZVRpbWVQaWNrZXJQcm9wcyBleHRlbmRzIElQcm9wcyB7XG4gICAgLyoqXG4gICAgICogVGhlIGluaXRpYWwgZGF0ZSBhbmQgdGltZSB2YWx1ZSB0aGF0IHdpbGwgYmUgc2V0LlxuICAgICAqIFRoaXMgd2lsbCBiZSBpZ25vcmVkIGlmIGB2YWx1ZWAgaXMgc2V0LlxuICAgICAqIEBkZWZhdWx0IERhdGUubm93KClcbiAgICAgKi9cbiAgICBkZWZhdWx0VmFsdWU/OiBEYXRlO1xuXG4gICAgLyoqXG4gICAgICogQW55IHByb3BzIHRvIGJlIHBhc3NlZCBvbiB0byB0aGUgYERhdGVQaWNrZXJgIG90aGVyIHRoYW4gdGhlIGB2YWx1ZWAgYW5kIGBvbkNoYW5nZWAgcHJvcHMgYXMgdGhleSBjb21lIGRpcmVjdGx5XG4gICAgICogZnJvbSB0aGUgYERhdGVUaW1lUGlja2VyYCBwcm9wcy5cbiAgICAgKi9cbiAgICBkYXRlUGlja2VyUHJvcHM/OiBJRGF0ZVBpY2tlclByb3BzO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHRoZSB1c2VyIGNoYW5nZXMgdGhlIGRhdGUgb3IgdGltZS5cbiAgICAgKi9cbiAgICBvbkNoYW5nZT86IChzZWxlY3RlZERhdGU6IERhdGUsIGlzVXNlckNoYW5nZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEFueSBwcm9wcyB0byBiZSBwYXNzZWQgb24gdG8gdGhlIGBUaW1lUGlja2VyYCBvdGhlciB0aGFuIHRoZSBgdmFsdWVgIGFuZCBgb25DaGFuZ2VgIHByb3BzIGFzIHRoZXkgY29tZSBkaXJlY3RseVxuICAgICAqIGZyb20gdGhlIGBEYXRlVGltZVBpY2tlcmAgcHJvcHMuXG4gICAgICovXG4gICAgdGltZVBpY2tlclByb3BzPzogSVRpbWVQaWNrZXJQcm9wcztcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50bHkgc2V0IGRhdGUgYW5kIHRpbWUuIElmIHRoaXMgcHJvcCBpcyBwcmVzZW50LCB0aGUgY29tcG9uZW50IGFjdHMgaW4gYSBjb250cm9sbGVkIG1hbm5lci5cbiAgICAgKi9cbiAgICB2YWx1ZT86IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVUaW1lUGlja2VyU3RhdGUge1xuICAgIHZhbHVlPzogRGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyIGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQ8SURhdGVUaW1lUGlja2VyUHJvcHMsIElEYXRlVGltZVBpY2tlclN0YXRlPiB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElEYXRlVGltZVBpY2tlclByb3BzID0ge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IG5ldyBEYXRlKCksXG4gICAgfTtcblxuICAgIHB1YmxpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LkRhdGVUaW1lUGlja2VyXCI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJvcHM/OiBJRGF0ZVRpbWVQaWNrZXJQcm9wcywgY29udGV4dD86IGFueSkge1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiAodGhpcy5wcm9wcy52YWx1ZSAhPSBudWxsKSA/IHRoaXMucHJvcHMudmFsdWUgOiB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5EQVRFVElNRVBJQ0tFUiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfT5cbiAgICAgICAgICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wcy5kYXRlUGlja2VyUHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZURhdGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFRpbWVQaWNrZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMudGltZVBpY2tlclByb3BzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVUaW1lQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBJRGF0ZVBpY2tlclByb3BzKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBuZXh0UHJvcHMudmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlRGF0ZUNoYW5nZSA9IChkYXRlOiBEYXRlLCBpc1VzZXJDaGFuZ2U6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBEYXRlVXRpbHMuZ2V0RGF0ZVRpbWUoZGF0ZSwgdGhpcy5zdGF0ZS52YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBVdGlscy5zYWZlSW52b2tlKHRoaXMucHJvcHMub25DaGFuZ2UsIHZhbHVlLCBpc1VzZXJDaGFuZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVUaW1lQ2hhbmdlID0gKHRpbWU6IERhdGUpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBEYXRlVXRpbHMuZ2V0RGF0ZVRpbWUodGhpcy5zdGF0ZS52YWx1ZSwgdGltZSk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBVdGlscy5zYWZlSW52b2tlKHRoaXMucHJvcHMub25DaGFuZ2UsIHZhbHVlLCB0cnVlKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
