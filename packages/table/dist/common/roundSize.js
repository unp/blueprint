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
var React = require("react");
/**
 * A React component that measures and rounds the size of its only child. This
 * is necessary due to a Chrome bug that prevents scrolling when the size is
 * changed to a fractional value. See this JSFiddle for a repro of the issue:
 * https://jsfiddle.net/2rmz7p1d/5/
 */
var RoundSize = (function (_super) {
    __extends(RoundSize, _super);
    function RoundSize() {
        var _this = this;
        _super.apply(this, arguments);
        this.setInternalRef = function (ref) { return _this.internalElement = ref; };
        this.setContainerRef = function (ref) { return _this.containerElement = ref; };
    }
    RoundSize.prototype.render = function () {
        return (React.createElement("div", {className: "bp-table-rounded-layout", ref: this.setContainerRef}, 
            React.createElement("div", {className: "bp-table-no-layout", ref: this.setInternalRef}, React.Children.only(this.props.children))
        ));
    };
    RoundSize.prototype.componentDidMount = function () {
        this.copyRoundedSize();
    };
    RoundSize.prototype.componentDidUpdate = function () {
        this.copyRoundedSize();
    };
    RoundSize.prototype.copyRoundedSize = function () {
        if (this.internalElement == null || this.containerElement == null) {
            return;
        }
        // measure the size of the internal children
        var width = Math.round(this.internalElement.clientWidth) + "px";
        var height = Math.round(this.internalElement.clientHeight) + "px";
        // set the size of the container element with rounded values
        this.containerElement.style.width = width;
        this.containerElement.style.height = height;
    };
    return RoundSize;
}(React.Component));
exports.RoundSize = RoundSize;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vcm91bmRTaXplLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7OztBQUVILElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9COzs7OztHQUtHO0FBQ0g7SUFBK0IsNkJBQXVCO0lBQXREO1FBQUEsaUJBc0NDO1FBdEM4Qiw4QkFBdUI7UUFvQzFDLG1CQUFjLEdBQUcsVUFBQyxHQUFnQixJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLEVBQTFCLENBQTBCLENBQUM7UUFDbEUsb0JBQWUsR0FBRyxVQUFDLEdBQWdCLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxFQUEzQixDQUEyQixDQUFDO0lBQ2hGLENBQUM7SUFsQ1UsMEJBQU0sR0FBYjtRQUNJLE1BQU0sQ0FBQyxDQUNILHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUMseUJBQXlCLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFnQjtZQUMvRCxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFDLG9CQUFvQixFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBZSxHQUN4RCxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUN4QztTQUNKLENBQ1QsQ0FBQztJQUNOLENBQUM7SUFFTSxxQ0FBaUIsR0FBeEI7UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLHNDQUFrQixHQUF6QjtRQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sbUNBQWUsR0FBdkI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsNENBQTRDO1FBQzVDLElBQU0sS0FBSyxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBSSxDQUFDO1FBQ2xFLElBQU0sTUFBTSxHQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsT0FBSSxDQUFDO1FBRXBFLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2hELENBQUM7SUFJTCxnQkFBQztBQUFELENBdENBLEFBc0NDLENBdEM4QixLQUFLLENBQUMsU0FBUyxHQXNDN0M7QUF0Q1ksaUJBQVMsWUFzQ3JCLENBQUEiLCJmaWxlIjoiY29tbW9uL3JvdW5kU2l6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG4vKipcbiAqIEEgUmVhY3QgY29tcG9uZW50IHRoYXQgbWVhc3VyZXMgYW5kIHJvdW5kcyB0aGUgc2l6ZSBvZiBpdHMgb25seSBjaGlsZC4gVGhpc1xuICogaXMgbmVjZXNzYXJ5IGR1ZSB0byBhIENocm9tZSBidWcgdGhhdCBwcmV2ZW50cyBzY3JvbGxpbmcgd2hlbiB0aGUgc2l6ZSBpc1xuICogY2hhbmdlZCB0byBhIGZyYWN0aW9uYWwgdmFsdWUuIFNlZSB0aGlzIEpTRmlkZGxlIGZvciBhIHJlcHJvIG9mIHRoZSBpc3N1ZTpcbiAqIGh0dHBzOi8vanNmaWRkbGUubmV0LzJybXo3cDFkLzUvXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3VuZFNpemUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XG4gICAgcHJpdmF0ZSBpbnRlcm5hbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJicC10YWJsZS1yb3VuZGVkLWxheW91dFwiIHJlZj17dGhpcy5zZXRDb250YWluZXJSZWZ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnAtdGFibGUtbm8tbGF5b3V0XCIgcmVmPXt0aGlzLnNldEludGVybmFsUmVmfT5cbiAgICAgICAgICAgICAgICAgICAge1JlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY29weVJvdW5kZWRTaXplKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jb3B5Um91bmRlZFNpemUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvcHlSb3VuZGVkU2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJuYWxFbGVtZW50ID09IG51bGwgfHwgdGhpcy5jb250YWluZXJFbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1lYXN1cmUgdGhlIHNpemUgb2YgdGhlIGludGVybmFsIGNoaWxkcmVuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gYCR7TWF0aC5yb3VuZCh0aGlzLmludGVybmFsRWxlbWVudC5jbGllbnRXaWR0aCl9cHhgO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSBgJHtNYXRoLnJvdW5kKHRoaXMuaW50ZXJuYWxFbGVtZW50LmNsaWVudEhlaWdodCl9cHhgO1xuXG4gICAgICAgIC8vIHNldCB0aGUgc2l6ZSBvZiB0aGUgY29udGFpbmVyIGVsZW1lbnQgd2l0aCByb3VuZGVkIHZhbHVlc1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jb250YWluZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEludGVybmFsUmVmID0gKHJlZjogSFRNTEVsZW1lbnQpID0+IHRoaXMuaW50ZXJuYWxFbGVtZW50ID0gcmVmO1xuICAgIHByaXZhdGUgc2V0Q29udGFpbmVyUmVmID0gKHJlZjogSFRNTEVsZW1lbnQpID0+IHRoaXMuY29udGFpbmVyRWxlbWVudCA9IHJlZjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
