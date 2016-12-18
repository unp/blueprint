/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
/**
 * Efficiently detect when an HTMLElement is resized.
 *
 * Attaches an invisible "resize-sensor" div to the element. Then it checks
 * the element's offsetWidth and offsetHeight whenever a scroll event is
 * triggered on the "resize-sensor" children. These events are further
 * debounced using requestAnimationFrame.
 *
 * Inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
 */
var ResizeSensor = (function () {
    function ResizeSensor() {
    }
    ResizeSensor.attach = function (element, callback) {
        var lifecycle = ResizeSensor.debounce(callback);
        var resizeSensor = document.createElement("div");
        resizeSensor.className = "bp-table-resize-sensor";
        resizeSensor.style.cssText = ResizeSensor.RESIZE_SENSOR_STYLE;
        resizeSensor.innerHTML = ResizeSensor.RESIZE_SENSOR_HTML;
        element.appendChild(resizeSensor);
        if (getComputedStyle(element, null).getPropertyValue("position") === "static") {
            element.style.position = "relative";
        }
        var expand = resizeSensor.childNodes[0];
        var expandChild = expand.childNodes[0];
        var shrink = resizeSensor.childNodes[1];
        var reset = function () {
            expandChild.style.width = "100000px";
            expandChild.style.height = "100000px";
            expand.scrollLeft = 100000;
            expand.scrollTop = 100000;
            shrink.scrollLeft = 100000;
            shrink.scrollTop = 100000;
        };
        reset();
        var lastWidth;
        var lastHeight;
        var onScroll = function () {
            var currentWidth = element.offsetWidth;
            var currentHeight = element.offsetHeight;
            if (currentWidth !== lastWidth || currentHeight !== lastHeight) {
                lastWidth = currentWidth;
                lastHeight = currentHeight;
                lifecycle.trigger();
            }
            reset();
        };
        expand.addEventListener("scroll", onScroll);
        shrink.addEventListener("scroll", onScroll);
        return function () {
            element.removeChild(resizeSensor);
            lifecycle.cancelled = true;
        };
    };
    ResizeSensor.debounce = function (callback) {
        var scope = {
            cancelled: false,
            trigger: function () {
                if (scope.triggered || scope.cancelled) {
                    return;
                }
                scope.triggered = true;
                requestAnimationFrame(function () {
                    scope.triggered = false;
                    if (!scope.cancelled) {
                        callback();
                    }
                });
            },
            triggered: false,
        };
        return scope;
    };
    ResizeSensor.RESIZE_SENSOR_STYLE = "position: absolute; left: 0; top: 0; right: 0; " +
        "bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;";
    ResizeSensor.RESIZE_SENSOR_HTML = "<div class=\"bp-table-resize-sensor-expand\"\n        style=\"" + ResizeSensor.RESIZE_SENSOR_STYLE + "\"><div style=\"position: absolute; left: 0; top: 0; transition: 0s;\"\n        ></div></div><div class=\"bp-table-resize-sensor-shrink\" style=\"" + ResizeSensor.RESIZE_SENSOR_STYLE + "\"\n        ><div style=\"position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%;\"></div></div>";
    return ResizeSensor;
}());
exports.ResizeSensor = ResizeSensor;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmFjdGlvbnMvcmVzaXplU2Vuc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUVIOzs7Ozs7Ozs7R0FTRztBQUNIO0lBQUE7SUE2RUEsQ0FBQztJQTVFaUIsbUJBQU0sR0FBcEIsVUFBcUIsT0FBb0IsRUFBRSxRQUFvQjtRQUMzRCxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWxELElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFnQixDQUFDO1FBQ2xFLFlBQVksQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7UUFDbEQsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLG1CQUFtQixDQUFDO1FBQzlELFlBQVksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1FBRXpELE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3hDLENBQUM7UUFFRCxJQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUN6RCxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUN4RCxJQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUV6RCxJQUFNLEtBQUssR0FBRztZQUNWLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFJLFVBQVUsQ0FBQztZQUN0QyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDdEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDM0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDMUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDM0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDOUIsQ0FBQyxDQUFDO1FBQ0YsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxVQUFrQixDQUFDO1FBQ3ZCLElBQU0sUUFBUSxHQUFHO1lBQ2IsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUN6QyxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxTQUFTLElBQUksYUFBYSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELFNBQVMsR0FBRyxZQUFZLENBQUM7Z0JBQ3pCLFVBQVUsR0FBRyxhQUFhLENBQUM7Z0JBQzNCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QixDQUFDO1lBQ0QsS0FBSyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUM7UUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFNUMsTUFBTSxDQUFDO1lBQ0gsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUM7SUFDTixDQUFDO0lBVWMscUJBQVEsR0FBdkIsVUFBd0IsUUFBb0I7UUFDeEMsSUFBTSxLQUFLLEdBQUc7WUFDVixTQUFTLEVBQUUsS0FBSztZQUNoQixPQUFPLEVBQUU7Z0JBQ0wsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDckMsTUFBTSxDQUFDO2dCQUNYLENBQUM7Z0JBQ0QsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLHFCQUFxQixDQUFDO29CQUNsQixLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsUUFBUSxFQUFFLENBQUM7b0JBQ2YsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBMUJjLGdDQUFtQixHQUFHLGlEQUFpRDtRQUNsRiwrREFBK0QsQ0FBQztJQUVyRCwrQkFBa0IsR0FBRyxtRUFDdkIsWUFBWSxDQUFDLG1CQUFtQiwwSkFDd0IsWUFBWSxDQUFDLG1CQUFtQiw2SEFDVSxDQUFDO0lBcUJwSCxtQkFBQztBQUFELENBN0VBLEFBNkVDLElBQUE7QUE3RVksb0JBQVksZUE2RXhCLENBQUEiLCJmaWxlIjoiaW50ZXJhY3Rpb25zL3Jlc2l6ZVNlbnNvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbi8qKlxuICogRWZmaWNpZW50bHkgZGV0ZWN0IHdoZW4gYW4gSFRNTEVsZW1lbnQgaXMgcmVzaXplZC5cbiAqXG4gKiBBdHRhY2hlcyBhbiBpbnZpc2libGUgXCJyZXNpemUtc2Vuc29yXCIgZGl2IHRvIHRoZSBlbGVtZW50LiBUaGVuIGl0IGNoZWNrc1xuICogdGhlIGVsZW1lbnQncyBvZmZzZXRXaWR0aCBhbmQgb2Zmc2V0SGVpZ2h0IHdoZW5ldmVyIGEgc2Nyb2xsIGV2ZW50IGlzXG4gKiB0cmlnZ2VyZWQgb24gdGhlIFwicmVzaXplLXNlbnNvclwiIGNoaWxkcmVuLiBUaGVzZSBldmVudHMgYXJlIGZ1cnRoZXJcbiAqIGRlYm91bmNlZCB1c2luZyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXG4gKlxuICogSW5zcGlyZWQgYnk6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjai9jc3MtZWxlbWVudC1xdWVyaWVzL2Jsb2IvbWFzdGVyL3NyYy9SZXNpemVTZW5zb3IuanNcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc2l6ZVNlbnNvciB7XG4gICAgcHVibGljIHN0YXRpYyBhdHRhY2goZWxlbWVudDogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIGNvbnN0IGxpZmVjeWNsZSA9IFJlc2l6ZVNlbnNvci5kZWJvdW5jZShjYWxsYmFjayk7XG5cbiAgICAgICAgY29uc3QgcmVzaXplU2Vuc29yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgcmVzaXplU2Vuc29yLmNsYXNzTmFtZSA9IFwiYnAtdGFibGUtcmVzaXplLXNlbnNvclwiO1xuICAgICAgICByZXNpemVTZW5zb3Iuc3R5bGUuY3NzVGV4dCA9IFJlc2l6ZVNlbnNvci5SRVNJWkVfU0VOU09SX1NUWUxFO1xuICAgICAgICByZXNpemVTZW5zb3IuaW5uZXJIVE1MID0gUmVzaXplU2Vuc29yLlJFU0laRV9TRU5TT1JfSFRNTDtcblxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHJlc2l6ZVNlbnNvcik7XG5cbiAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShcInBvc2l0aW9uXCIpID09PSBcInN0YXRpY1wiKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXhwYW5kID0gcmVzaXplU2Vuc29yLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGV4cGFuZENoaWxkID0gZXhwYW5kLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNocmluayA9IHJlc2l6ZVNlbnNvci5jaGlsZE5vZGVzWzFdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgICAgICAgICAgZXhwYW5kQ2hpbGQuc3R5bGUud2lkdGggID0gXCIxMDAwMDBweFwiO1xuICAgICAgICAgICAgZXhwYW5kQ2hpbGQuc3R5bGUuaGVpZ2h0ID0gXCIxMDAwMDBweFwiO1xuICAgICAgICAgICAgZXhwYW5kLnNjcm9sbExlZnQgPSAxMDAwMDA7XG4gICAgICAgICAgICBleHBhbmQuc2Nyb2xsVG9wID0gMTAwMDAwO1xuICAgICAgICAgICAgc2hyaW5rLnNjcm9sbExlZnQgPSAxMDAwMDA7XG4gICAgICAgICAgICBzaHJpbmsuc2Nyb2xsVG9wID0gMTAwMDAwO1xuICAgICAgICB9O1xuICAgICAgICByZXNldCgpO1xuXG4gICAgICAgIGxldCBsYXN0V2lkdGg6IG51bWJlcjtcbiAgICAgICAgbGV0IGxhc3RIZWlnaHQ6IG51bWJlcjtcbiAgICAgICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50V2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRXaWR0aCAhPT0gbGFzdFdpZHRoIHx8IGN1cnJlbnRIZWlnaHQgIT09IGxhc3RIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBsYXN0V2lkdGggPSBjdXJyZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgbGFzdEhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgbGlmZWN5Y2xlLnRyaWdnZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH07XG4gICAgICAgIGV4cGFuZC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcbiAgICAgICAgc2hyaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKHJlc2l6ZVNlbnNvcik7XG4gICAgICAgICAgICBsaWZlY3ljbGUuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBSRVNJWkVfU0VOU09SX1NUWUxFID0gXCJwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDA7IHRvcDogMDsgcmlnaHQ6IDA7IFwiICtcbiAgICAgICAgXCJib3R0b206IDA7IG92ZXJmbG93OiBoaWRkZW47IHotaW5kZXg6IC0xOyB2aXNpYmlsaXR5OiBoaWRkZW47XCI7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBSRVNJWkVfU0VOU09SX0hUTUwgPSBgPGRpdiBjbGFzcz1cImJwLXRhYmxlLXJlc2l6ZS1zZW5zb3ItZXhwYW5kXCJcbiAgICAgICAgc3R5bGU9XCIke1Jlc2l6ZVNlbnNvci5SRVNJWkVfU0VOU09SX1NUWUxFfVwiPjxkaXYgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDA7IHRvcDogMDsgdHJhbnNpdGlvbjogMHM7XCJcbiAgICAgICAgPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJicC10YWJsZS1yZXNpemUtc2Vuc29yLXNocmlua1wiIHN0eWxlPVwiJHtSZXNpemVTZW5zb3IuUkVTSVpFX1NFTlNPUl9TVFlMRX1cIlxuICAgICAgICA+PGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogMDsgdG9wOiAwOyB0cmFuc2l0aW9uOiAwczsgd2lkdGg6IDIwMCU7IGhlaWdodDogMjAwJTtcIj48L2Rpdj48L2Rpdj5gO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGVib3VuY2UoY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgY29uc3Qgc2NvcGUgPSB7XG4gICAgICAgICAgICBjYW5jZWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdHJpZ2dlcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzY29wZS50cmlnZ2VyZWQgfHwgc2NvcGUuY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUudHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS50cmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzY29wZS5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmlnZ2VyZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc2NvcGU7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
