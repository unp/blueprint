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
var draggable_1 = require("./draggable");
(function (Orientation) {
    Orientation[Orientation["HORIZONTAL"] = 1] = "HORIZONTAL";
    Orientation[Orientation["VERTICAL"] = 0] = "VERTICAL";
})(exports.Orientation || (exports.Orientation = {}));
var Orientation = exports.Orientation;
var ResizeHandle = (function (_super) {
    __extends(ResizeHandle, _super);
    function ResizeHandle() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            isDragging: false,
        };
        this.handleActivate = function (event) {
            _this.setState({ isDragging: true });
            _this.props.onLayoutLock(true);
            event.stopPropagation();
            event.stopImmediatePropagation();
            return true;
        };
        this.handleDragMove = function (_event, coords) {
            var orientationIndex = _this.props.orientation;
            if (_this.props.onResizeMove != null) {
                _this.props.onResizeMove(coords.offset[orientationIndex], coords.delta[orientationIndex]);
            }
        };
        this.handleDragEnd = function (_event, coords) {
            var orientationIndex = _this.props.orientation;
            _this.setState({ isDragging: false });
            _this.props.onLayoutLock(false);
            if (_this.props.onResizeMove != null) {
                _this.props.onResizeMove(coords.offset[orientationIndex], coords.delta[orientationIndex]);
            }
            if (_this.props.onResizeEnd != null) {
                _this.props.onResizeEnd(coords.offset[orientationIndex]);
            }
        };
        this.handleClick = function (_event) {
            _this.setState({ isDragging: false });
            _this.props.onLayoutLock(false);
        };
        this.handleDoubleClick = function (_event) {
            _this.setState({ isDragging: false });
            _this.props.onLayoutLock(false);
            if (_this.props.onDoubleClick != null) {
                _this.props.onDoubleClick();
            }
        };
    }
    ResizeHandle.prototype.render = function () {
        var _a = this.props, onResizeMove = _a.onResizeMove, onResizeEnd = _a.onResizeEnd, onDoubleClick = _a.onDoubleClick, orientation = _a.orientation;
        if (onResizeMove == null && onResizeEnd == null && onDoubleClick == null) {
            return undefined;
        }
        var targetClasses = classNames("bp-table-resize-handle-target", {
            "bp-table-dragging": this.state.isDragging,
            "bp-table-resize-horizontal": orientation === Orientation.HORIZONTAL,
            "bp-table-resize-vertical": orientation === Orientation.VERTICAL,
        });
        var handleClasses = classNames("bp-table-resize-handle", {
            "bp-table-dragging": this.state.isDragging,
        });
        return (React.createElement(draggable_1.Draggable, {onActivate: this.handleActivate, onClick: this.handleClick, onDoubleClick: this.handleDoubleClick, onDragEnd: this.handleDragEnd, onDragMove: this.handleDragMove}, 
            React.createElement("div", {className: targetClasses}, 
                React.createElement("div", {className: handleClasses})
            )
        ));
    };
    return ResizeHandle;
}(React.Component));
exports.ResizeHandle = ResizeHandle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmFjdGlvbnMvcmVzaXplSGFuZGxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7OztBQUdILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLDBCQUEyQyxhQUFhLENBQUMsQ0FBQTtBQUV6RCxXQUFZLFdBQVc7SUFDbkIseURBQWMsQ0FBQTtJQUNkLHFEQUFZLENBQUE7QUFDaEIsQ0FBQyxFQUhXLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7QUFIRCxJQUFZLFdBQVcsR0FBWCxtQkFHWCxDQUFBO0FBMENEO0lBQWtDLGdDQUF1RDtJQUF6RjtRQUFBLGlCQThFQztRQTlFaUMsOEJBQXVEO1FBQzlFLFVBQUssR0FBdUI7WUFDL0IsVUFBVSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztRQWlDTSxtQkFBYyxHQUFHLFVBQUMsS0FBaUI7WUFDdkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTlCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQUVPLG1CQUFjLEdBQUcsVUFBQyxNQUFrQixFQUFFLE1BQXVCO1lBQ2pFLElBQU0sZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFxQixDQUFDO1lBQzFELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUM3RixDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRU8sa0JBQWEsR0FBRyxVQUFDLE1BQWtCLEVBQUUsTUFBdUI7WUFDaEUsSUFBTSxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQXFCLENBQUM7WUFDMUQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9CLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUM3RixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakMsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDNUQsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVPLGdCQUFXLEdBQUcsVUFBQyxNQUFrQjtZQUNyQyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFBO1FBRU8sc0JBQWlCLEdBQUcsVUFBQyxNQUFrQjtZQUMzQyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFL0IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMvQixDQUFDO1FBQ0wsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQXpFVSw2QkFBTSxHQUFiO1FBQ0ksSUFBQSxlQUE0RSxFQUFwRSw4QkFBWSxFQUFFLDRCQUFXLEVBQUUsZ0NBQWEsRUFBRSw0QkFBVyxDQUFnQjtRQUM3RSxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkUsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLCtCQUErQixFQUFFO1lBQzlELG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtZQUMxQyw0QkFBNEIsRUFBRyxXQUFXLEtBQUssV0FBVyxDQUFDLFVBQVU7WUFDckUsMEJBQTBCLEVBQUcsV0FBVyxLQUFLLFdBQVcsQ0FBQyxRQUFRO1NBQ3BFLENBQUMsQ0FBQztRQUVILElBQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRTtZQUN2RCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7U0FDN0MsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLENBQ0gsb0JBQUMscUJBQVMsR0FDTixVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWUsRUFDaEMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFZLEVBQzFCLGFBQWEsRUFBRSxJQUFJLENBQUMsaUJBQWtCLEVBQ3RDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYyxFQUM5QixVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWU7WUFFaEMscUJBQUMsR0FBRyxJQUFDLFNBQVMsRUFBRSxhQUFjO2dCQUMxQixxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLGFBQWMsRUFBRzthQUMvQjtTQUNFLENBQ2YsQ0FBQztJQUNOLENBQUM7SUE0Q0wsbUJBQUM7QUFBRCxDQTlFQSxBQThFQyxDQTlFaUMsS0FBSyxDQUFDLFNBQVMsR0E4RWhEO0FBOUVZLG9CQUFZLGVBOEV4QixDQUFBIiwiZmlsZSI6ImludGVyYWN0aW9ucy9yZXNpemVIYW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgeyBJUHJvcHMgfSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBEcmFnZ2FibGUsIElDb29yZGluYXRlRGF0YSB9IGZyb20gXCIuL2RyYWdnYWJsZVwiO1xuXG5leHBvcnQgZW51bSBPcmllbnRhdGlvbiB7XG4gICAgSE9SSVpPTlRBTCA9IDEsXG4gICAgVkVSVElDQUwgPSAwLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElMb2NrYWJsZUxheW91dCB7XG4gICAgb25MYXlvdXRMb2NrOiAoaXNMYXlvdXRMb2NrZWQ/OiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElSZXNpemVIYW5kbGVQcm9wcyBleHRlbmRzIElQcm9wcywgSUxvY2thYmxlTGF5b3V0IHtcbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoaWxlIHRoZSB1c2VyIGlzIGRyYWdnaW5nIHRoZSByZXNpemVcbiAgICAgKiBoYW5kbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IGlzIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGluaXRpYWwgYW5kIGN1cnJlbnQgY29vcmRpbmF0ZXNcbiAgICAgKiBAcGFyYW0gZGVsdGEgaXMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIGFuZCB0aGUgcHJldmlvdXMgb2Zmc2V0XG4gICAgICovXG4gICAgb25SZXNpemVNb3ZlPzogKG9mZnNldDogbnVtYmVyLCBkZWx0YTogbnVtYmVyKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGlzIGRvbmUgZHJhZ2dpbmcgdGhlIHJlc2l6ZVxuICAgICAqIGhhbmRsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvZmZzZXQgaXMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgaW5pdGlhbCBhbmQgZmluYWwgY29vcmRpbmF0ZXNcbiAgICAgKi9cbiAgICBvblJlc2l6ZUVuZD86IChvZmZzZXQ6IG51bWJlcikgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBkb3VibGUgY2xpY2tzIHRoZSByZXNpemUgaGFuZGxlXG4gICAgICovXG4gICAgb25Eb3VibGVDbGljaz86ICgpID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBBbiBlbnVtIHZhbHVlIHRvIGluZGljYXRlIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgcmVzaXplIGhhbmRsZS5cbiAgICAgKi9cbiAgICBvcmllbnRhdGlvbjogT3JpZW50YXRpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlc2l6ZUhhbmRsZVN0YXRlIHtcbiAgICAvKipcbiAgICAgKiBBIGJvb2xlYW4gdGhhdCBpcyB0cnVlIHdoaWxlIHRoZSB1c2VyIGlzIGRyYWdnaW5nIHRoZSByZXNpemUgaGFuZGxlXG4gICAgICovXG4gICAgaXNEcmFnZ2luZzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFJlc2l6ZUhhbmRsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJUmVzaXplSGFuZGxlUHJvcHMsIElSZXNpemVIYW5kbGVTdGF0ZT4ge1xuICAgIHB1YmxpYyBzdGF0ZTogSVJlc2l6ZUhhbmRsZVN0YXRlID0ge1xuICAgICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBvblJlc2l6ZU1vdmUsIG9uUmVzaXplRW5kLCBvbkRvdWJsZUNsaWNrLCBvcmllbnRhdGlvbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKG9uUmVzaXplTW92ZSA9PSBudWxsICYmIG9uUmVzaXplRW5kID09IG51bGwgJiYgb25Eb3VibGVDbGljayA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3NlcyA9IGNsYXNzTmFtZXMoXCJicC10YWJsZS1yZXNpemUtaGFuZGxlLXRhcmdldFwiLCB7XG4gICAgICAgICAgICBcImJwLXRhYmxlLWRyYWdnaW5nXCI6IHRoaXMuc3RhdGUuaXNEcmFnZ2luZyxcbiAgICAgICAgICAgIFwiYnAtdGFibGUtcmVzaXplLWhvcml6b250YWxcIiA6IG9yaWVudGF0aW9uID09PSBPcmllbnRhdGlvbi5IT1JJWk9OVEFMLFxuICAgICAgICAgICAgXCJicC10YWJsZS1yZXNpemUtdmVydGljYWxcIiA6IG9yaWVudGF0aW9uID09PSBPcmllbnRhdGlvbi5WRVJUSUNBTCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgaGFuZGxlQ2xhc3NlcyA9IGNsYXNzTmFtZXMoXCJicC10YWJsZS1yZXNpemUtaGFuZGxlXCIsIHtcbiAgICAgICAgICAgIFwiYnAtdGFibGUtZHJhZ2dpbmdcIjogdGhpcy5zdGF0ZS5pc0RyYWdnaW5nLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERyYWdnYWJsZVxuICAgICAgICAgICAgICAgIG9uQWN0aXZhdGU9e3RoaXMuaGFuZGxlQWN0aXZhdGV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXt0aGlzLmhhbmRsZURvdWJsZUNsaWNrfVxuICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17dGhpcy5oYW5kbGVEcmFnRW5kfVxuICAgICAgICAgICAgICAgIG9uRHJhZ01vdmU9e3RoaXMuaGFuZGxlRHJhZ01vdmV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RhcmdldENsYXNzZXN9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17aGFuZGxlQ2xhc3Nlc30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQWN0aXZhdGUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNEcmFnZ2luZzogdHJ1ZX0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uTGF5b3V0TG9jayh0cnVlKTtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlRHJhZ01vdmUgPSAoX2V2ZW50OiBNb3VzZUV2ZW50LCBjb29yZHM6IElDb29yZGluYXRlRGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBvcmllbnRhdGlvbkluZGV4ID0gdGhpcy5wcm9wcy5vcmllbnRhdGlvbiBhcyBudW1iZXI7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uUmVzaXplTW92ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUmVzaXplTW92ZShjb29yZHMub2Zmc2V0W29yaWVudGF0aW9uSW5kZXhdLCBjb29yZHMuZGVsdGFbb3JpZW50YXRpb25JbmRleF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVEcmFnRW5kID0gKF9ldmVudDogTW91c2VFdmVudCwgY29vcmRzOiBJQ29vcmRpbmF0ZURhdGEpID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb25JbmRleCA9IHRoaXMucHJvcHMub3JpZW50YXRpb24gYXMgbnVtYmVyO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0RyYWdnaW5nOiBmYWxzZX0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uTGF5b3V0TG9jayhmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25SZXNpemVNb3ZlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25SZXNpemVNb3ZlKGNvb3Jkcy5vZmZzZXRbb3JpZW50YXRpb25JbmRleF0sIGNvb3Jkcy5kZWx0YVtvcmllbnRhdGlvbkluZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25SZXNpemVFbmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblJlc2l6ZUVuZChjb29yZHMub2Zmc2V0W29yaWVudGF0aW9uSW5kZXhdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xpY2sgPSAoX2V2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRHJhZ2dpbmc6IGZhbHNlfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25MYXlvdXRMb2NrKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZURvdWJsZUNsaWNrID0gKF9ldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0RyYWdnaW5nOiBmYWxzZX0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uTGF5b3V0TG9jayhmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25Eb3VibGVDbGljayAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRG91YmxlQ2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
