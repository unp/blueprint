/*
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
var core_1 = require("@blueprintjs/core");
var classNames = require("classnames");
var React = require("react");
var DayPicker = require("react-day-picker");
var DateClasses = require("./common/classes");
var DateUtils = require("./common/dateUtils");
var Errors = require("./common/errors");
var datePickerCaption_1 = require("./datePickerCaption");
var datePickerCore_1 = require("./datePickerCore");
var DateRangePicker = (function (_super) {
    __extends(DateRangePicker, _super);
    function DateRangePicker(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.displayName = "Blueprint.DateRangePicker";
        // these will get merged with the user's own
        this.modifiers = (_a = {},
            _a[datePickerCore_1.SELECTED_RANGE_MODIFIER] = function (day) {
                var value = _this.state.value;
                return value[0] != null && value[1] != null && DateUtils.isDayInRange(day, value, true);
            },
            _a[datePickerCore_1.SELECTED_RANGE_MODIFIER + "-start"] = function (day) { return DateUtils.areSameDay(_this.state.value[0], day); },
            _a[datePickerCore_1.SELECTED_RANGE_MODIFIER + "-end"] = function (day) { return DateUtils.areSameDay(_this.state.value[1], day); },
            _a
        );
        // these will get passed directly to DayPicker
        this.states = {
            disabledDays: function (day) { return !DateUtils.isDayInRange(day, [_this.props.minDate, _this.props.maxDate]); },
            selectedDays: function (day) {
                var _a = _this.state.value, start = _a[0], end = _a[1];
                return DateUtils.areSameDay(start, day) || DateUtils.areSameDay(end, day);
            },
        };
        this.handleDayClick = function (_e, day, modifiers) {
            if (modifiers.disabled) {
                // rerender base component to get around bug where you can navigate past bounds by clicking days
                _this.forceUpdate();
                return;
            }
            var _a = _this.state.value, start = _a[0], end = _a[1];
            var nextValue;
            if (start == null && end == null) {
                nextValue = [day, null];
            }
            else if (start != null && end == null) {
                nextValue = _this.createRange(day, start);
            }
            else if (start == null && end != null) {
                nextValue = _this.createRange(day, end);
            }
            else {
                var isStart = DateUtils.areSameDay(start, day);
                var isEnd = DateUtils.areSameDay(end, day);
                if (isStart && isEnd) {
                    nextValue = [null, null];
                }
                else if (isStart) {
                    nextValue = [null, end];
                }
                else if (isEnd) {
                    nextValue = [start, null];
                }
                else {
                    nextValue = [day, null];
                }
            }
            _this.handleNextState(nextValue);
        };
        this.handleMonthChange = function (newDate) {
            var displayMonth = newDate.getMonth();
            var displayYear = newDate.getFullYear();
            _this.setState({ displayMonth: displayMonth, displayYear: displayYear });
        };
        this.handleMonthSelectChange = function (displayMonth) {
            _this.setState({ displayMonth: displayMonth });
        };
        this.handleYearSelectChange = function (displayYear) {
            var _a = _this.props, minDate = _a.minDate, maxDate = _a.maxDate;
            // we display two months, so we want our display max date to be one month earlier than our real max date
            var adjustedMaxDate = DateUtils.clone(maxDate);
            adjustedMaxDate.setMonth(adjustedMaxDate.getMonth() - 1);
            var minYear = minDate.getFullYear();
            var maxYear = adjustedMaxDate.getFullYear();
            var minMonth = minDate.getMonth();
            var maxMonth = adjustedMaxDate.getMonth();
            var displayMonth = _this.state.displayMonth;
            if (displayYear === minYear && displayMonth < minMonth) {
                displayMonth = minMonth;
            }
            else if (displayYear === maxYear && displayMonth > maxMonth) {
                displayMonth = maxMonth;
            }
            _this.setState({ displayMonth: displayMonth, displayYear: displayYear });
        };
        var value = [null, null];
        if (props.value != null) {
            value = props.value;
        }
        else if (props.defaultValue != null) {
            value = props.defaultValue;
        }
        var initialMonth;
        var today = new Date();
        if (props.initialMonth != null) {
            initialMonth = props.initialMonth;
        }
        else if (value[0] != null) {
            initialMonth = value[0];
        }
        else if (DateUtils.isDayInRange(today, [props.minDate, props.maxDate])) {
            initialMonth = today;
        }
        else {
            initialMonth = DateUtils.getDateBetween([props.minDate, props.maxDate]);
        }
        // if the initial month is the last month of the picker's
        // allowable range, the react-day-picker library will show
        // the max month on the left and the *min* month on the right.
        // subtracting one avoids that weird, wraparound state (#289).
        var initialMonthEqualsMinMonth = initialMonth.getMonth() === props.minDate.getMonth();
        var initalMonthEqualsMaxMonth = initialMonth.getMonth() === props.maxDate.getMonth();
        if (!initialMonthEqualsMinMonth && initalMonthEqualsMaxMonth) {
            initialMonth.setMonth(initialMonth.getMonth() - 1);
        }
        this.state = {
            displayMonth: initialMonth.getMonth(),
            displayYear: initialMonth.getFullYear(),
            value: value,
        };
        var _a;
    }
    DateRangePicker.prototype.render = function () {
        var modifiers = datePickerCore_1.combineModifiers(this.modifiers, this.props.modifiers);
        var _a = this.props, className = _a.className, locale = _a.locale, localeUtils = _a.localeUtils, maxDate = _a.maxDate, minDate = _a.minDate;
        var _b = this.state, displayMonth = _b.displayMonth, displayYear = _b.displayYear;
        var isShowingOneMonth = DateUtils.areSameMonth(this.props.minDate, this.props.maxDate);
        return (React.createElement("div", {className: classNames(DateClasses.DATEPICKER, DateClasses.DATERANGEPICKER, className)}, 
            this.maybeRenderShortcuts(), 
            React.createElement(DayPicker, {canChangeMonth: true, captionElement: this.renderCaption(), disabledDays: this.states.disabledDays, enableOutsideDays: true, fromMonth: minDate, initialMonth: new Date(displayYear, displayMonth), locale: locale, localeUtils: localeUtils, modifiers: modifiers, numberOfMonths: isShowingOneMonth ? 1 : 2, onDayClick: this.handleDayClick, onMonthChange: this.handleMonthChange, selectedDays: this.states.selectedDays, toMonth: maxDate})));
    };
    DateRangePicker.prototype.componentWillReceiveProps = function (nextProps) {
        _super.prototype.componentWillReceiveProps.call(this, nextProps);
        var _a = this.state, displayMonth = _a.displayMonth, displayYear = _a.displayYear;
        var nextState = getStateChange(this.props.value, nextProps.value, displayMonth, displayYear);
        this.setState(nextState);
    };
    DateRangePicker.prototype.validateProps = function (props) {
        var defaultValue = props.defaultValue, initialMonth = props.initialMonth, maxDate = props.maxDate, minDate = props.minDate, value = props.value;
        var dateRange = [minDate, maxDate];
        if (defaultValue != null && !DateUtils.isDayRangeInRange(defaultValue, dateRange)) {
            throw new Error(Errors.DATERANGEPICKER_DEFAULT_VALUE_INVALID);
        }
        if (initialMonth != null && !DateUtils.isMonthInRange(initialMonth, dateRange)) {
            throw new Error(Errors.DATERANGEPICKER_INITIAL_MONTH_INVALID);
        }
        if (defaultValue != null && defaultValue[0] == null && defaultValue[1] != null
            || value != null && value[0] == null && value[1] != null) {
            throw new Error(Errors.DATERANGEPICKER_INVALID_DATE_RANGE);
        }
        if (maxDate != null
            && minDate != null
            && maxDate < minDate
            && !DateUtils.areSameDay(maxDate, minDate)) {
            throw new Error(Errors.DATERANGEPICKER_MAX_DATE_INVALID);
        }
        if (value != null && !DateUtils.isDayRangeInRange(value, dateRange)) {
            throw new Error(Errors.DATERANGEPICKER_VALUE_INVALID);
        }
    };
    DateRangePicker.prototype.maybeRenderShortcuts = function () {
        var _this = this;
        var propsShortcuts = this.props.shortcuts;
        if (propsShortcuts == null || propsShortcuts === false) {
            return undefined;
        }
        var shortcuts = typeof propsShortcuts === "boolean" ? createDefaultShortcuts() : propsShortcuts;
        var shortcutElements = shortcuts.map(function (s, i) { return (React.createElement(core_1.MenuItem, {className: core_1.Classes.POPOVER_DISMISS_OVERRIDE, key: i, onClick: _this.getShorcutClickHandler(s.dateRange), text: s.label})); });
        return (React.createElement(core_1.Menu, {className: DateClasses.DATERANGEPICKER_SHORTCUTS}, shortcutElements));
    };
    DateRangePicker.prototype.renderCaption = function () {
        var _a = this.props, maxDate = _a.maxDate, minDate = _a.minDate;
        return (React.createElement(datePickerCaption_1.DatePickerCaption, {maxDate: maxDate, minDate: minDate, onMonthChange: this.handleMonthSelectChange, onYearChange: this.handleYearSelectChange}));
    };
    DateRangePicker.prototype.createRange = function (a, b) {
        // clicking the same date again will clear it
        if (!this.props.allowSingleDayRange && DateUtils.areSameDay(a, b)) {
            return [null, null];
        }
        return a < b ? [a, b] : [b, a];
    };
    DateRangePicker.prototype.getShorcutClickHandler = function (nextValue) {
        var _this = this;
        return function () { return _this.handleNextState(nextValue); };
    };
    DateRangePicker.prototype.handleNextState = function (nextValue) {
        var _a = this.state, displayMonth = _a.displayMonth, displayYear = _a.displayYear, value = _a.value;
        var nextState = getStateChange(value, nextValue, displayMonth, displayYear);
        if (this.props.value == null) {
            this.setState(nextState);
        }
        core_1.Utils.safeInvoke(this.props.onChange, nextValue);
    };
    DateRangePicker.defaultProps = {
        allowSingleDayRange: false,
        maxDate: datePickerCore_1.getDefaultMaxDate(),
        minDate: datePickerCore_1.getDefaultMinDate(),
        shortcuts: true,
    };
    return DateRangePicker;
}(core_1.AbstractComponent));
exports.DateRangePicker = DateRangePicker;
function getStateChange(value, nextValue, currMonth, currYear) {
    var returnVal;
    if (value != null && nextValue == null) {
        returnVal = { value: [null, null] };
    }
    else if (value == null && nextValue != null) {
        // calendar displays first month of the new start date if provided
        if (nextValue[0] != null) {
            returnVal = {
                displayMonth: nextValue[0].getMonth(),
                displayYear: nextValue[0].getFullYear(),
                value: nextValue,
            };
        }
        else {
            returnVal = { value: nextValue };
        }
    }
    else if (value != null && nextValue != null) {
        var valueStart = value[0], valueEnd = value[1];
        var nextValueStart = nextValue[0], nextValueEnd = nextValue[1];
        if (nextValueStart == null) {
            returnVal = { value: nextValue };
        }
        else {
            var hasEndDateChanged = !DateUtils.areSameDay(valueEnd, nextValueEnd);
            var isStartDateNowEndDate = DateUtils.areSameDay(valueStart, nextValueEnd);
            var newDate = hasEndDateChanged && !isStartDateNowEndDate && nextValueEnd != null ?
                nextValueEnd :
                nextValueStart;
            returnVal = {
                displayMonth: newDate.getMonth(),
                displayYear: newDate.getFullYear(),
                value: nextValue,
            };
        }
    }
    else {
        returnVal = {};
    }
    // adjust calendar display month as little as possible
    var displayMonth = returnVal.displayMonth, displayYear = returnVal.displayYear;
    if (displayMonth != null && displayYear != null) {
        var nextMonth = getNextMonth([currMonth, currYear]);
        var monthToDisplay = [displayMonth, displayYear];
        if (areSameMonth(nextMonth, monthToDisplay)) {
            returnVal.displayMonth = currMonth;
            returnVal.displayYear = currYear;
        }
        else if (areSameMonth(getNextMonth(nextMonth), monthToDisplay)) {
            returnVal.displayMonth = nextMonth[0];
            returnVal.displayYear = nextMonth[1];
        }
    }
    return returnVal;
}
function getNextMonth(_a) {
    var month = _a[0], year = _a[1];
    return month === 12 ? [0, year + 1] : [month + 1, year];
}
function areSameMonth(_a, _b) {
    var month = _a[0], year = _a[1];
    var month2 = _b[0], year2 = _b[1];
    return month === month2 && year === year2;
}
function createShortcut(label, dateRange) {
    return { dateRange: dateRange, label: label };
}
function createDefaultShortcuts() {
    var today = new Date();
    var makeDate = function (action) {
        var returnVal = DateUtils.clone(today);
        action(returnVal);
        returnVal.setDate(returnVal.getDate() + 1);
        return returnVal;
    };
    var oneWeekAgo = makeDate(function (d) { return d.setDate(d.getDate() - 7); });
    var oneMonthAgo = makeDate(function (d) { return d.setMonth(d.getMonth() - 1); });
    var threeMonthsAgo = makeDate(function (d) { return d.setMonth(d.getMonth() - 3); });
    var sixMonthsAgo = makeDate(function (d) { return d.setMonth(d.getMonth() - 6); });
    var oneYearAgo = makeDate(function (d) { return d.setFullYear(d.getFullYear() - 1); });
    var twoYearsAgo = makeDate(function (d) { return d.setFullYear(d.getFullYear() - 2); });
    return [
        createShortcut("Past Week", [oneWeekAgo, today]),
        createShortcut("Past Month", [oneMonthAgo, today]),
        createShortcut("Past 3 Months", [threeMonthsAgo, today]),
        createShortcut("Past 6 Months", [sixMonthsAgo, today]),
        createShortcut("Past Year", [oneYearAgo, today]),
        createShortcut("Past 2 Years", [twoYearsAgo, today]),
    ];
}
exports.DateRangePickerFactory = React.createFactory(DateRangePicker);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlUmFuZ2VQaWNrZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7O0FBRUgscUJBQTBFLG1CQUFtQixDQUFDLENBQUE7QUFDOUYsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFDL0IsSUFBWSxTQUFTLFdBQU0sa0JBQWtCLENBQUMsQ0FBQTtBQUU5QyxJQUFZLFdBQVcsV0FBTSxrQkFBa0IsQ0FBQyxDQUFBO0FBQ2hELElBQVksU0FBUyxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUFFaEQsSUFBWSxNQUFNLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUUxQyxrQ0FBa0MscUJBQXFCLENBQUMsQ0FBQTtBQUN4RCwrQkFRTyxrQkFBa0IsQ0FBQyxDQUFBO0FBb0QxQjtJQUNZLG1DQUErRDtJQThCdkUseUJBQW1CLEtBQTZCLEVBQUUsT0FBYTtRQS9CbkUsaUJBbVFDO1FBbk9PLGtCQUFNLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQXRCbkIsZ0JBQVcsR0FBRywyQkFBMkIsQ0FBQztRQUVqRCw0Q0FBNEM7UUFDcEMsY0FBUyxHQUF5QjtZQUN0QyxHQUFDLHdDQUF1QixDQUFDLEdBQUUsVUFBQyxHQUFHO2dCQUNuQiw2QkFBSyxDQUFnQjtnQkFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUYsQ0FBQztZQUNELEdBQUksd0NBQXVCLFdBQVEsQ0FBQyxHQUFFLFVBQUMsR0FBRyxJQUFLLE9BQUEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFH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RyxRQUFRLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO0lBRXhFLE1BQU0sQ0FBQztRQUNILGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEQsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxjQUFjLENBQUMsZUFBZSxFQUFFLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELGNBQWMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEQsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRCxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3ZELENBQUM7QUFDTixDQUFDO0FBRVksOEJBQXNCLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyIsImZpbGUiOiJkYXRlUmFuZ2VQaWNrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50LCBDbGFzc2VzLCBJUHJvcHMsIE1lbnUsIE1lbnVJdGVtLCBVdGlscyB9IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBEYXlQaWNrZXIgZnJvbSBcInJlYWN0LWRheS1waWNrZXJcIjtcblxuaW1wb3J0ICogYXMgRGF0ZUNsYXNzZXMgZnJvbSBcIi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIERhdGVVdGlscyBmcm9tIFwiLi9jb21tb24vZGF0ZVV0aWxzXCI7XG5pbXBvcnQgeyBEYXRlUmFuZ2UgfSBmcm9tIFwiLi9jb21tb24vZGF0ZVV0aWxzXCI7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSBcIi4vY29tbW9uL2Vycm9yc1wiO1xuXG5pbXBvcnQgeyBEYXRlUGlja2VyQ2FwdGlvbiB9IGZyb20gXCIuL2RhdGVQaWNrZXJDYXB0aW9uXCI7XG5pbXBvcnQge1xuICAgIGNvbWJpbmVNb2RpZmllcnMsXG4gICAgZ2V0RGVmYXVsdE1heERhdGUsXG4gICAgZ2V0RGVmYXVsdE1pbkRhdGUsXG4gICAgSURhdGVQaWNrZXJCYXNlUHJvcHMsXG4gICAgSURhdGVQaWNrZXJEYXlNb2RpZmllcnMsXG4gICAgSURhdGVQaWNrZXJNb2RpZmllcnMsXG4gICAgU0VMRUNURURfUkFOR0VfTU9ESUZJRVIsXG59IGZyb20gXCIuL2RhdGVQaWNrZXJDb3JlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVSYW5nZVNob3J0Y3V0IHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGRhdGVSYW5nZTogRGF0ZVJhbmdlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRlUmFuZ2VQaWNrZXJQcm9wcyBleHRlbmRzIElEYXRlUGlja2VyQmFzZVByb3BzLCBJUHJvcHMge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHN0YXJ0IGFuZCBlbmQgZGF0ZXMgb2YgdGhlIHJhbmdlIGNhbiBiZSB0aGUgc2FtZSBkYXkuXG4gICAgICogSWYgYHRydWVgLCBjbGlja2luZyBhIHNlbGVjdGVkIGRhdGUgd2lsbCBjcmVhdGUgYSBvbmUtZGF5IHJhbmdlLlxuICAgICAqIElmIGBmYWxzZWAsIGNsaWNraW5nIGEgc2VsZWN0ZWQgZGF0ZSB3aWxsIGNsZWFyIHRoZSBzZWxlY3Rpb24uXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBhbGxvd1NpbmdsZURheVJhbmdlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWwgRGF0ZVJhbmdlIHRoZSBjYWxlbmRhciB3aWxsIGRpc3BsYXkgYXMgc2VsZWN0ZWQuXG4gICAgICogVGhpcyBzaG91bGQgbm90IGJlIHNldCBpZiBgdmFsdWVgIGlzIHNldC5cbiAgICAgKi9cbiAgICBkZWZhdWx0VmFsdWU/OiBEYXRlUmFuZ2U7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF5LlxuICAgICAqIElmIG5vIGRheXMgYXJlIHNlbGVjdGVkLCBpdCB3aWxsIHBhc3MgYFtudWxsLCBudWxsXWAuXG4gICAgICogSWYgYSBzdGFydCBkYXRlIGlzIHNlbGVjdGVkIGJ1dCBub3QgYW4gZW5kIGRhdGUsIGl0IHdpbGwgcGFzcyBgW3NlbGVjdGVkRGF0ZSwgbnVsbF1gLlxuICAgICAqIElmIGJvdGggYSBzdGFydCBhbmQgZW5kIGRhdGUgYXJlIHNlbGVjdGVkLCBpdCB3aWxsIHBhc3MgYFtzdGFydERhdGUsIGVuZERhdGVdYC5cbiAgICAgKi9cbiAgICBvbkNoYW5nZT86IChzZWxlY3RlZERhdGVzOiBEYXRlUmFuZ2UpID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHNob3J0Y3V0cyB0byBxdWlja2x5IHNlbGVjdCBhIHJhbmdlIG9mIGRhdGVzIGFyZSBkaXNwbGF5ZWQgb3Igbm90LlxuICAgICAqIElmIGB0cnVlYCwgcHJlc2V0IHNob3J0Y3V0cyB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICAgKiBJZiBgZmFsc2VgLCBubyBzaG9ydGN1dHMgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gICAgICogSWYgYW4gYXJyYXksIHRoZSBjdXN0b20gc2hvcnRjdXRzIHByb3ZpZGVkIHdpbGwgYmUgZGlzcGxheWVkLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBzaG9ydGN1dHM/OiBib29sZWFuIHwgSURhdGVSYW5nZVNob3J0Y3V0W107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIERhdGVSYW5nZS5cbiAgICAgKiBJZiB0aGlzIHByb3AgaXMgcHJlc2VudCwgdGhlIGNvbXBvbmVudCBhY3RzIGluIGEgY29udHJvbGxlZCBtYW5uZXIuXG4gICAgICovXG4gICAgdmFsdWU/OiBEYXRlUmFuZ2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGVSYW5nZVBpY2tlclN0YXRlIHtcbiAgICBkaXNwbGF5TW9udGg/OiBudW1iZXI7XG4gICAgZGlzcGxheVllYXI/OiBudW1iZXI7XG4gICAgdmFsdWU/OiBEYXRlUmFuZ2U7XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRlUmFuZ2VQaWNrZXJcbiAgICBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PElEYXRlUmFuZ2VQaWNrZXJQcm9wcywgSURhdGVSYW5nZVBpY2tlclN0YXRlPiB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogSURhdGVSYW5nZVBpY2tlclByb3BzID0ge1xuICAgICAgICBhbGxvd1NpbmdsZURheVJhbmdlOiBmYWxzZSxcbiAgICAgICAgbWF4RGF0ZTogZ2V0RGVmYXVsdE1heERhdGUoKSxcbiAgICAgICAgbWluRGF0ZTogZ2V0RGVmYXVsdE1pbkRhdGUoKSxcbiAgICAgICAgc2hvcnRjdXRzOiB0cnVlLFxuICAgIH07XG5cbiAgICBwdWJsaWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5EYXRlUmFuZ2VQaWNrZXJcIjtcblxuICAgIC8vIHRoZXNlIHdpbGwgZ2V0IG1lcmdlZCB3aXRoIHRoZSB1c2VyJ3Mgb3duXG4gICAgcHJpdmF0ZSBtb2RpZmllcnM6IElEYXRlUGlja2VyTW9kaWZpZXJzID0ge1xuICAgICAgICBbU0VMRUNURURfUkFOR0VfTU9ESUZJRVJdOiAoZGF5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlWzBdICE9IG51bGwgJiYgdmFsdWVbMV0gIT0gbnVsbCAmJiBEYXRlVXRpbHMuaXNEYXlJblJhbmdlKGRheSwgdmFsdWUsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBbYCR7U0VMRUNURURfUkFOR0VfTU9ESUZJRVJ9LXN0YXJ0YF06IChkYXkpID0+IERhdGVVdGlscy5hcmVTYW1lRGF5KHRoaXMuc3RhdGUudmFsdWVbMF0sIGRheSksXG4gICAgICAgIFtgJHtTRUxFQ1RFRF9SQU5HRV9NT0RJRklFUn0tZW5kYF06IChkYXkpID0+IERhdGVVdGlscy5hcmVTYW1lRGF5KHRoaXMuc3RhdGUudmFsdWVbMV0sIGRheSksXG4gICAgfTtcblxuICAgIC8vIHRoZXNlIHdpbGwgZ2V0IHBhc3NlZCBkaXJlY3RseSB0byBEYXlQaWNrZXJcbiAgICBwcml2YXRlIHN0YXRlcyA9IHtcbiAgICAgICAgZGlzYWJsZWREYXlzOiAoZGF5OiBEYXRlKSA9PiAhRGF0ZVV0aWxzLmlzRGF5SW5SYW5nZShkYXksIFt0aGlzLnByb3BzLm1pbkRhdGUsIHRoaXMucHJvcHMubWF4RGF0ZV0pLFxuICAgICAgICBzZWxlY3RlZERheXM6IChkYXk6IERhdGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gRGF0ZVV0aWxzLmFyZVNhbWVEYXkoc3RhcnQsIGRheSkgfHwgRGF0ZVV0aWxzLmFyZVNhbWVEYXkoZW5kLCBkYXkpO1xuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJvcHM/OiBJRGF0ZVJhbmdlUGlja2VyUHJvcHMsIGNvbnRleHQ/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIGxldCB2YWx1ZTogRGF0ZVJhbmdlID0gW251bGwsIG51bGxdO1xuICAgICAgICBpZiAocHJvcHMudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFsdWUgPSBwcm9wcy52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wcy5kZWZhdWx0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFsdWUgPSBwcm9wcy5kZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5pdGlhbE1vbnRoOiBEYXRlO1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgaWYgKHByb3BzLmluaXRpYWxNb250aCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpbml0aWFsTW9udGggPSBwcm9wcy5pbml0aWFsTW9udGg7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWVbMF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaW5pdGlhbE1vbnRoID0gdmFsdWVbMF07XG4gICAgICAgIH0gZWxzZSBpZiAoRGF0ZVV0aWxzLmlzRGF5SW5SYW5nZSh0b2RheSwgW3Byb3BzLm1pbkRhdGUsIHByb3BzLm1heERhdGVdKSkge1xuICAgICAgICAgICAgaW5pdGlhbE1vbnRoID0gdG9kYXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbml0aWFsTW9udGggPSBEYXRlVXRpbHMuZ2V0RGF0ZUJldHdlZW4oW3Byb3BzLm1pbkRhdGUsIHByb3BzLm1heERhdGVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBpbml0aWFsIG1vbnRoIGlzIHRoZSBsYXN0IG1vbnRoIG9mIHRoZSBwaWNrZXInc1xuICAgICAgICAvLyBhbGxvd2FibGUgcmFuZ2UsIHRoZSByZWFjdC1kYXktcGlja2VyIGxpYnJhcnkgd2lsbCBzaG93XG4gICAgICAgIC8vIHRoZSBtYXggbW9udGggb24gdGhlIGxlZnQgYW5kIHRoZSAqbWluKiBtb250aCBvbiB0aGUgcmlnaHQuXG4gICAgICAgIC8vIHN1YnRyYWN0aW5nIG9uZSBhdm9pZHMgdGhhdCB3ZWlyZCwgd3JhcGFyb3VuZCBzdGF0ZSAoIzI4OSkuXG4gICAgICAgIGNvbnN0IGluaXRpYWxNb250aEVxdWFsc01pbk1vbnRoID0gaW5pdGlhbE1vbnRoLmdldE1vbnRoKCkgPT09IHByb3BzLm1pbkRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgY29uc3QgaW5pdGFsTW9udGhFcXVhbHNNYXhNb250aCA9IGluaXRpYWxNb250aC5nZXRNb250aCgpID09PSBwcm9wcy5tYXhEYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIGlmICghaW5pdGlhbE1vbnRoRXF1YWxzTWluTW9udGggJiYgaW5pdGFsTW9udGhFcXVhbHNNYXhNb250aCkge1xuICAgICAgICAgICAgaW5pdGlhbE1vbnRoLnNldE1vbnRoKGluaXRpYWxNb250aC5nZXRNb250aCgpIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZGlzcGxheU1vbnRoOiBpbml0aWFsTW9udGguZ2V0TW9udGgoKSxcbiAgICAgICAgICAgIGRpc3BsYXlZZWFyOiBpbml0aWFsTW9udGguZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IG1vZGlmaWVycyA9IGNvbWJpbmVNb2RpZmllcnModGhpcy5tb2RpZmllcnMsIHRoaXMucHJvcHMubW9kaWZpZXJzKTtcbiAgICAgICAgY29uc3QgeyBjbGFzc05hbWUsIGxvY2FsZSwgbG9jYWxlVXRpbHMsIG1heERhdGUsIG1pbkRhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgZGlzcGxheU1vbnRoLCBkaXNwbGF5WWVhciB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaXNTaG93aW5nT25lTW9udGggPSBEYXRlVXRpbHMuYXJlU2FtZU1vbnRoKHRoaXMucHJvcHMubWluRGF0ZSwgdGhpcy5wcm9wcy5tYXhEYXRlKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoRGF0ZUNsYXNzZXMuREFURVBJQ0tFUiwgRGF0ZUNsYXNzZXMuREFURVJBTkdFUElDS0VSLCBjbGFzc05hbWUpfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlclNob3J0Y3V0cygpfVxuICAgICAgICAgICAgICAgIDxEYXlQaWNrZXJcbiAgICAgICAgICAgICAgICAgICAgY2FuQ2hhbmdlTW9udGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25FbGVtZW50PXt0aGlzLnJlbmRlckNhcHRpb24oKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWREYXlzPXt0aGlzLnN0YXRlcy5kaXNhYmxlZERheXN9XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZU91dHNpZGVEYXlzPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBmcm9tTW9udGg9e21pbkRhdGV9XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxNb250aD17bmV3IERhdGUoZGlzcGxheVllYXIsIGRpc3BsYXlNb250aCl9XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZT17bG9jYWxlfVxuICAgICAgICAgICAgICAgICAgICBsb2NhbGVVdGlscz17bG9jYWxlVXRpbHN9XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVycz17bW9kaWZpZXJzfVxuICAgICAgICAgICAgICAgICAgICBudW1iZXJPZk1vbnRocz17aXNTaG93aW5nT25lTW9udGggPyAxIDogMn1cbiAgICAgICAgICAgICAgICAgICAgb25EYXlDbGljaz17dGhpcy5oYW5kbGVEYXlDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25Nb250aENoYW5nZT17dGhpcy5oYW5kbGVNb250aENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREYXlzPXt0aGlzLnN0YXRlcy5zZWxlY3RlZERheXN9XG4gICAgICAgICAgICAgICAgICAgIHRvTW9udGg9e21heERhdGV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogSURhdGVSYW5nZVBpY2tlclByb3BzKSB7XG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTtcblxuICAgICAgICBjb25zdCB7IGRpc3BsYXlNb250aCwgZGlzcGxheVllYXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IGdldFN0YXRlQ2hhbmdlKHRoaXMucHJvcHMudmFsdWUsIG5leHRQcm9wcy52YWx1ZSwgZGlzcGxheU1vbnRoLCBkaXNwbGF5WWVhcik7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVQcm9wcyhwcm9wczogSURhdGVSYW5nZVBpY2tlclByb3BzKSB7XG4gICAgICAgIGNvbnN0IHsgZGVmYXVsdFZhbHVlLCBpbml0aWFsTW9udGgsIG1heERhdGUsIG1pbkRhdGUsIHZhbHVlIH0gPSBwcm9wcztcbiAgICAgICAgY29uc3QgZGF0ZVJhbmdlOiBEYXRlUmFuZ2UgPSBbbWluRGF0ZSwgbWF4RGF0ZV07XG5cbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSAhPSBudWxsICYmICFEYXRlVXRpbHMuaXNEYXlSYW5nZUluUmFuZ2UoZGVmYXVsdFZhbHVlLCBkYXRlUmFuZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRXJyb3JzLkRBVEVSQU5HRVBJQ0tFUl9ERUZBVUxUX1ZBTFVFX0lOVkFMSUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluaXRpYWxNb250aCAhPSBudWxsICYmICFEYXRlVXRpbHMuaXNNb250aEluUmFuZ2UoaW5pdGlhbE1vbnRoLCBkYXRlUmFuZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRXJyb3JzLkRBVEVSQU5HRVBJQ0tFUl9JTklUSUFMX01PTlRIX0lOVkFMSUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSAhPSBudWxsICYmIGRlZmF1bHRWYWx1ZVswXSA9PSBudWxsICYmIGRlZmF1bHRWYWx1ZVsxXSAhPSBudWxsXG4gICAgICAgICAgICB8fCB2YWx1ZSAhPSBudWxsICYmIHZhbHVlWzBdID09IG51bGwgJiYgdmFsdWVbMV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVycm9ycy5EQVRFUkFOR0VQSUNLRVJfSU5WQUxJRF9EQVRFX1JBTkdFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXhEYXRlICE9IG51bGxcbiAgICAgICAgICAgICAgICAmJiBtaW5EYXRlICE9IG51bGxcbiAgICAgICAgICAgICAgICAmJiBtYXhEYXRlIDwgbWluRGF0ZVxuICAgICAgICAgICAgICAgICYmICFEYXRlVXRpbHMuYXJlU2FtZURheShtYXhEYXRlLCBtaW5EYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVycm9ycy5EQVRFUkFOR0VQSUNLRVJfTUFYX0RBVEVfSU5WQUxJRCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiAhRGF0ZVV0aWxzLmlzRGF5UmFuZ2VJblJhbmdlKHZhbHVlLCBkYXRlUmFuZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRXJyb3JzLkRBVEVSQU5HRVBJQ0tFUl9WQUxVRV9JTlZBTElEKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJTaG9ydGN1dHMoKSB7XG4gICAgICAgIGNvbnN0IHByb3BzU2hvcnRjdXRzID0gdGhpcy5wcm9wcy5zaG9ydGN1dHM7XG4gICAgICAgIGlmIChwcm9wc1Nob3J0Y3V0cyA9PSBudWxsIHx8IHByb3BzU2hvcnRjdXRzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNob3J0Y3V0cyA9IHR5cGVvZiBwcm9wc1Nob3J0Y3V0cyA9PT0gXCJib29sZWFuXCIgPyBjcmVhdGVEZWZhdWx0U2hvcnRjdXRzKCkgOiBwcm9wc1Nob3J0Y3V0cztcbiAgICAgICAgY29uc3Qgc2hvcnRjdXRFbGVtZW50cyA9IHNob3J0Y3V0cy5tYXAoKHMsIGkpID0+IChcbiAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Q2xhc3Nlcy5QT1BPVkVSX0RJU01JU1NfT1ZFUlJJREV9XG4gICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZ2V0U2hvcmN1dENsaWNrSGFuZGxlcihzLmRhdGVSYW5nZSl9XG4gICAgICAgICAgICAgICAgdGV4dD17cy5sYWJlbH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICkpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TWVudSBjbGFzc05hbWU9e0RhdGVDbGFzc2VzLkRBVEVSQU5HRVBJQ0tFUl9TSE9SVENVVFN9PlxuICAgICAgICAgICAgICAgIHtzaG9ydGN1dEVsZW1lbnRzfVxuICAgICAgICAgICAgPC9NZW51PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyQ2FwdGlvbigpIHtcbiAgICAgICAgY29uc3QgeyBtYXhEYXRlLCBtaW5EYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERhdGVQaWNrZXJDYXB0aW9uXG4gICAgICAgICAgICAgICAgbWF4RGF0ZT17bWF4RGF0ZX1cbiAgICAgICAgICAgICAgICBtaW5EYXRlPXttaW5EYXRlfVxuICAgICAgICAgICAgICAgIG9uTW9udGhDaGFuZ2U9e3RoaXMuaGFuZGxlTW9udGhTZWxlY3RDaGFuZ2V9XG4gICAgICAgICAgICAgICAgb25ZZWFyQ2hhbmdlPXt0aGlzLmhhbmRsZVllYXJTZWxlY3RDaGFuZ2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlRGF5Q2xpY2sgPSAoX2U6IFJlYWN0LlN5bnRoZXRpY0V2ZW50PEhUTUxFbGVtZW50PiwgZGF5OiBEYXRlLCBtb2RpZmllcnM6IElEYXRlUGlja2VyRGF5TW9kaWZpZXJzKSA9PiB7XG4gICAgICAgIGlmIChtb2RpZmllcnMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIHJlcmVuZGVyIGJhc2UgY29tcG9uZW50IHRvIGdldCBhcm91bmQgYnVnIHdoZXJlIHlvdSBjYW4gbmF2aWdhdGUgcGFzdCBib3VuZHMgYnkgY2xpY2tpbmcgZGF5c1xuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gdGhpcy5zdGF0ZS52YWx1ZTtcbiAgICAgICAgbGV0IG5leHRWYWx1ZTogRGF0ZVJhbmdlO1xuXG4gICAgICAgIGlmIChzdGFydCA9PSBudWxsICYmIGVuZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXh0VmFsdWUgPSBbZGF5LCBudWxsXTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydCAhPSBudWxsICYmIGVuZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBuZXh0VmFsdWUgPSB0aGlzLmNyZWF0ZVJhbmdlKGRheSwgc3RhcnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0ID09IG51bGwgJiYgZW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5leHRWYWx1ZSA9IHRoaXMuY3JlYXRlUmFuZ2UoZGF5LCBlbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaXNTdGFydCA9IERhdGVVdGlscy5hcmVTYW1lRGF5KHN0YXJ0LCBkYXkpO1xuICAgICAgICAgICAgY29uc3QgaXNFbmQgPSBEYXRlVXRpbHMuYXJlU2FtZURheShlbmQsIGRheSk7XG4gICAgICAgICAgICBpZiAoaXNTdGFydCAmJiBpc0VuZCkge1xuICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IFtudWxsLCBudWxsXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdGFydCkge1xuICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IFtudWxsLCBlbmRdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0VuZCkge1xuICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IFtzdGFydCwgbnVsbF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IFtkYXksIG51bGxdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVOZXh0U3RhdGUobmV4dFZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVJhbmdlKGE6IERhdGUsIGI6IERhdGUpOiBEYXRlUmFuZ2Uge1xuICAgICAgICAvLyBjbGlja2luZyB0aGUgc2FtZSBkYXRlIGFnYWluIHdpbGwgY2xlYXIgaXRcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmFsbG93U2luZ2xlRGF5UmFuZ2UgJiYgRGF0ZVV0aWxzLmFyZVNhbWVEYXkoYSwgYikpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEgPCBiID8gW2EsIGJdIDogW2IsIGFdO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2hvcmN1dENsaWNrSGFuZGxlcihuZXh0VmFsdWU6IERhdGVSYW5nZSkge1xuICAgICAgICByZXR1cm4gKCkgPT4gdGhpcy5oYW5kbGVOZXh0U3RhdGUobmV4dFZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU5leHRTdGF0ZShuZXh0VmFsdWU6IERhdGVSYW5nZSkge1xuICAgICAgICBjb25zdCB7IGRpc3BsYXlNb250aCwgZGlzcGxheVllYXIsIHZhbHVlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSBnZXRTdGF0ZUNoYW5nZSh2YWx1ZSwgbmV4dFZhbHVlLCBkaXNwbGF5TW9udGgsIGRpc3BsYXlZZWFyKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKG5leHRTdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBVdGlscy5zYWZlSW52b2tlKHRoaXMucHJvcHMub25DaGFuZ2UsIG5leHRWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVNb250aENoYW5nZSA9IChuZXdEYXRlOiBEYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXlNb250aCA9IG5ld0RhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgY29uc3QgZGlzcGxheVllYXIgPSBuZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkaXNwbGF5TW9udGgsIGRpc3BsYXlZZWFyIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTW9udGhTZWxlY3RDaGFuZ2UgPSAoZGlzcGxheU1vbnRoOiBudW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRpc3BsYXlNb250aCB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVllYXJTZWxlY3RDaGFuZ2UgPSAoZGlzcGxheVllYXI6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCB7IG1pbkRhdGUsIG1heERhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIC8vIHdlIGRpc3BsYXkgdHdvIG1vbnRocywgc28gd2Ugd2FudCBvdXIgZGlzcGxheSBtYXggZGF0ZSB0byBiZSBvbmUgbW9udGggZWFybGllciB0aGFuIG91ciByZWFsIG1heCBkYXRlXG4gICAgICAgIGNvbnN0IGFkanVzdGVkTWF4RGF0ZSA9IERhdGVVdGlscy5jbG9uZShtYXhEYXRlKTtcbiAgICAgICAgYWRqdXN0ZWRNYXhEYXRlLnNldE1vbnRoKGFkanVzdGVkTWF4RGF0ZS5nZXRNb250aCgpIC0gMSk7XG5cbiAgICAgICAgY29uc3QgbWluWWVhciA9IG1pbkRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgY29uc3QgbWF4WWVhciA9IGFkanVzdGVkTWF4RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBjb25zdCBtaW5Nb250aCA9IG1pbkRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgY29uc3QgbWF4TW9udGggPSBhZGp1c3RlZE1heERhdGUuZ2V0TW9udGgoKTtcblxuICAgICAgICBsZXQgeyBkaXNwbGF5TW9udGggfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYgKGRpc3BsYXlZZWFyID09PSBtaW5ZZWFyICYmIGRpc3BsYXlNb250aCA8IG1pbk1vbnRoKSB7XG4gICAgICAgICAgICBkaXNwbGF5TW9udGggPSBtaW5Nb250aDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXNwbGF5WWVhciA9PT0gbWF4WWVhciAmJiBkaXNwbGF5TW9udGggPiBtYXhNb250aCkge1xuICAgICAgICAgICAgZGlzcGxheU1vbnRoID0gbWF4TW9udGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGlzcGxheU1vbnRoLCBkaXNwbGF5WWVhciB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFN0YXRlQ2hhbmdlKHZhbHVlOiBEYXRlUmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0VmFsdWU6IERhdGVSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJNb250aDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyclllYXI6IG51bWJlcik6IElEYXRlUmFuZ2VQaWNrZXJTdGF0ZSB7XG4gICAgbGV0IHJldHVyblZhbDogSURhdGVSYW5nZVBpY2tlclN0YXRlO1xuXG4gICAgaWYgKHZhbHVlICE9IG51bGwgJiYgbmV4dFZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuVmFsID0geyB2YWx1ZTogW251bGwsIG51bGxdIH07XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBudWxsICYmIG5leHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIC8vIGNhbGVuZGFyIGRpc3BsYXlzIGZpcnN0IG1vbnRoIG9mIHRoZSBuZXcgc3RhcnQgZGF0ZSBpZiBwcm92aWRlZFxuICAgICAgICBpZiAobmV4dFZhbHVlWzBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVyblZhbCA9IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5TW9udGg6IG5leHRWYWx1ZVswXS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlZZWFyOiBuZXh0VmFsdWVbMF0uZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmV4dFZhbHVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVyblZhbCA9IHsgdmFsdWU6IG5leHRWYWx1ZSB9O1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsICYmIG5leHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IFt2YWx1ZVN0YXJ0LCB2YWx1ZUVuZF0gPSB2YWx1ZTtcbiAgICAgICAgY29uc3QgW25leHRWYWx1ZVN0YXJ0LCBuZXh0VmFsdWVFbmRdID0gbmV4dFZhbHVlO1xuXG4gICAgICAgIGlmIChuZXh0VmFsdWVTdGFydCA9PSBudWxsKSB7XG4gICAgICAgICAgIHJldHVyblZhbCA9IHsgdmFsdWU6IG5leHRWYWx1ZSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaGFzRW5kRGF0ZUNoYW5nZWQgPSAhRGF0ZVV0aWxzLmFyZVNhbWVEYXkodmFsdWVFbmQsIG5leHRWYWx1ZUVuZCk7XG4gICAgICAgICAgICBjb25zdCBpc1N0YXJ0RGF0ZU5vd0VuZERhdGUgPSBEYXRlVXRpbHMuYXJlU2FtZURheSh2YWx1ZVN0YXJ0LCBuZXh0VmFsdWVFbmQpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdEYXRlID0gaGFzRW5kRGF0ZUNoYW5nZWQgJiYgIWlzU3RhcnREYXRlTm93RW5kRGF0ZSAmJiBuZXh0VmFsdWVFbmQgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlRW5kIDpcbiAgICAgICAgICAgICAgICBuZXh0VmFsdWVTdGFydDtcbiAgICAgICAgICAgIHJldHVyblZhbCA9IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5TW9udGg6IG5ld0RhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBkaXNwbGF5WWVhcjogbmV3RGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBuZXh0VmFsdWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuVmFsID0ge307XG4gICAgfVxuXG4gICAgLy8gYWRqdXN0IGNhbGVuZGFyIGRpc3BsYXkgbW9udGggYXMgbGl0dGxlIGFzIHBvc3NpYmxlXG4gICAgY29uc3QgeyBkaXNwbGF5TW9udGgsIGRpc3BsYXlZZWFyIH0gPSByZXR1cm5WYWw7XG4gICAgaWYgKGRpc3BsYXlNb250aCAhPSBudWxsICYmIGRpc3BsYXlZZWFyICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgbmV4dE1vbnRoID0gZ2V0TmV4dE1vbnRoKFtjdXJyTW9udGgsIGN1cnJZZWFyXSk7XG4gICAgICAgIGNvbnN0IG1vbnRoVG9EaXNwbGF5OiBEaXNwbGF5TW9udGggPSBbZGlzcGxheU1vbnRoLCBkaXNwbGF5WWVhcl07XG4gICAgICAgIGlmIChhcmVTYW1lTW9udGgobmV4dE1vbnRoLCBtb250aFRvRGlzcGxheSkpIHtcbiAgICAgICAgICAgIHJldHVyblZhbC5kaXNwbGF5TW9udGggPSBjdXJyTW9udGg7XG4gICAgICAgICAgICByZXR1cm5WYWwuZGlzcGxheVllYXIgPSBjdXJyWWVhcjtcbiAgICAgICAgfSBlbHNlIGlmIChhcmVTYW1lTW9udGgoZ2V0TmV4dE1vbnRoKG5leHRNb250aCksIG1vbnRoVG9EaXNwbGF5KSkge1xuICAgICAgICAgICByZXR1cm5WYWwuZGlzcGxheU1vbnRoID0gbmV4dE1vbnRoWzBdO1xuICAgICAgICAgICByZXR1cm5WYWwuZGlzcGxheVllYXIgPSBuZXh0TW9udGhbMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsO1xufVxuXG50eXBlIERpc3BsYXlNb250aCA9IFtudW1iZXIsIG51bWJlcl07XG5cbmZ1bmN0aW9uIGdldE5leHRNb250aChbbW9udGgsIHllYXJdOiBEaXNwbGF5TW9udGgpOiBEaXNwbGF5TW9udGgge1xuICAgIHJldHVybiBtb250aCA9PT0gMTIgPyBbMCwgeWVhciArIDFdIDogW21vbnRoICsgMSwgeWVhcl07XG59XG5cbmZ1bmN0aW9uIGFyZVNhbWVNb250aChbbW9udGgsIHllYXJdOiBEaXNwbGF5TW9udGgsIFttb250aDIsIHllYXIyXTogRGlzcGxheU1vbnRoKSB7XG4gICAgcmV0dXJuIG1vbnRoID09PSBtb250aDIgJiYgeWVhciA9PT0geWVhcjI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNob3J0Y3V0KGxhYmVsOiBzdHJpbmcsIGRhdGVSYW5nZTogRGF0ZVJhbmdlKTogSURhdGVSYW5nZVNob3J0Y3V0IHtcbiAgICByZXR1cm4geyBkYXRlUmFuZ2UsIGxhYmVsIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRTaG9ydGN1dHMoKSB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG1ha2VEYXRlID0gKGFjdGlvbjogKGQ6IERhdGUpID0+IHZvaWQpID0+IHtcbiAgICAgICAgY29uc3QgcmV0dXJuVmFsID0gRGF0ZVV0aWxzLmNsb25lKHRvZGF5KTtcbiAgICAgICAgYWN0aW9uKHJldHVyblZhbCk7XG4gICAgICAgIHJldHVyblZhbC5zZXREYXRlKHJldHVyblZhbC5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25lV2Vla0FnbyA9IG1ha2VEYXRlKChkKSA9PiBkLnNldERhdGUoZC5nZXREYXRlKCkgLSA3KSk7XG4gICAgY29uc3Qgb25lTW9udGhBZ28gPSBtYWtlRGF0ZSgoZCkgPT4gZC5zZXRNb250aChkLmdldE1vbnRoKCkgLSAxKSk7XG4gICAgY29uc3QgdGhyZWVNb250aHNBZ28gPSBtYWtlRGF0ZSgoZCkgPT4gZC5zZXRNb250aChkLmdldE1vbnRoKCkgLSAzKSk7XG4gICAgY29uc3Qgc2l4TW9udGhzQWdvID0gbWFrZURhdGUoKGQpID0+IGQuc2V0TW9udGgoZC5nZXRNb250aCgpIC0gNikpO1xuICAgIGNvbnN0IG9uZVllYXJBZ28gPSBtYWtlRGF0ZSgoZCkgPT4gZC5zZXRGdWxsWWVhcihkLmdldEZ1bGxZZWFyKCkgLSAxKSk7XG4gICAgY29uc3QgdHdvWWVhcnNBZ28gPSBtYWtlRGF0ZSgoZCkgPT4gZC5zZXRGdWxsWWVhcihkLmdldEZ1bGxZZWFyKCkgLSAyKSk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgICBjcmVhdGVTaG9ydGN1dChcIlBhc3QgV2Vla1wiLCBbb25lV2Vla0FnbywgdG9kYXldKSxcbiAgICAgICAgY3JlYXRlU2hvcnRjdXQoXCJQYXN0IE1vbnRoXCIsIFtvbmVNb250aEFnbywgdG9kYXldKSxcbiAgICAgICAgY3JlYXRlU2hvcnRjdXQoXCJQYXN0IDMgTW9udGhzXCIsIFt0aHJlZU1vbnRoc0FnbywgdG9kYXldKSxcbiAgICAgICAgY3JlYXRlU2hvcnRjdXQoXCJQYXN0IDYgTW9udGhzXCIsIFtzaXhNb250aHNBZ28sIHRvZGF5XSksXG4gICAgICAgIGNyZWF0ZVNob3J0Y3V0KFwiUGFzdCBZZWFyXCIsIFtvbmVZZWFyQWdvLCB0b2RheV0pLFxuICAgICAgICBjcmVhdGVTaG9ydGN1dChcIlBhc3QgMiBZZWFyc1wiLCBbdHdvWWVhcnNBZ28sIHRvZGF5XSksXG4gICAgXTtcbn1cblxuZXhwb3J0IGNvbnN0IERhdGVSYW5nZVBpY2tlckZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KERhdGVSYW5nZVBpY2tlcik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
