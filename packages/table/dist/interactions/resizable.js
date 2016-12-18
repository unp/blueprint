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
var index_1 = require("../common/index");
var resizeHandle_1 = require("./resizeHandle");
var Resizable = (function (_super) {
    __extends(Resizable, _super);
    function Resizable(props, context) {
        _super.call(this, props, context);
        var size = props.size;
        this.state = {
            size: size,
            unclampedSize: size,
        };
    }
    Resizable.prototype.componentWillReceiveProps = function (nextProps) {
        var size = nextProps.size;
        this.setState({
            size: size,
            unclampedSize: size,
        });
    };
    Resizable.prototype.render = function () {
        var child = React.Children.only(this.props.children);
        var style = Object.assign({}, child.props.style, this.getStyle());
        if (this.props.isResizable === false) {
            return React.cloneElement(child, { style: style });
        }
        var resizeHandle = this.renderResizeHandle();
        return React.cloneElement(child, { style: style, resizeHandle: resizeHandle });
    };
    Resizable.prototype.renderResizeHandle = function () {
        var _this = this;
        var _a = this.props, onLayoutLock = _a.onLayoutLock, onDoubleClick = _a.onDoubleClick, orientation = _a.orientation;
        var onResizeMove = function (_offset, delta) {
            _this.offsetSize(delta);
            if (_this.props.onSizeChanged != null) {
                _this.props.onSizeChanged(_this.state.size);
            }
        };
        var onResizeEnd = function (_offset) {
            // reset "unclamped" size on end
            _this.setState({ unclampedSize: _this.state.size });
            if (_this.props.onResizeEnd != null) {
                _this.props.onResizeEnd(_this.state.size);
            }
        };
        return (React.createElement(resizeHandle_1.ResizeHandle, {key: "resize-handle", onDoubleClick: onDoubleClick, onLayoutLock: onLayoutLock, onResizeEnd: onResizeEnd, onResizeMove: onResizeMove, orientation: orientation}));
    };
    /**
     * Returns the CSS style to apply to the child element given the state's
     * size value.
     */
    Resizable.prototype.getStyle = function () {
        if (this.props.orientation === resizeHandle_1.Orientation.VERTICAL) {
            return {
                flexBasis: this.state.size + "px",
                minWidth: "0px",
                width: this.state.size + "px",
            };
        }
        else {
            return {
                flexBasis: this.state.size + "px",
                height: this.state.size + "px",
                minHeight: "0px",
            };
        }
    };
    Resizable.prototype.offsetSize = function (offset) {
        var unclampedSize = this.state.unclampedSize + offset;
        this.setState({
            size: index_1.Utils.clamp(unclampedSize, this.props.minSize, this.props.maxSize),
            unclampedSize: unclampedSize,
        });
    };
    Resizable.defaultProps = {
        isResizable: true,
        minSize: 0,
    };
    return Resizable;
}(React.Component));
exports.Resizable = Resizable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmFjdGlvbnMvcmVzaXphYmxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7OztBQUdILElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLHNCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDZCQUEyRCxnQkFBZ0IsQ0FBQyxDQUFBO0FBa0U1RTtJQUF3Qyw2QkFBa0Q7SUFNdEYsbUJBQW1CLEtBQXNCLEVBQUUsT0FBYTtRQUNwRCxrQkFBTSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDZCxxQkFBSSxDQUFXO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxVQUFJO1lBQ0osYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQztJQUNOLENBQUM7SUFFTSw2Q0FBeUIsR0FBaEMsVUFBaUMsU0FBMEI7UUFDL0MseUJBQUksQ0FBZTtRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsVUFBSTtZQUNKLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSwwQkFBTSxHQUFiO1FBQ0ksSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUVwRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLFlBQUssRUFBRSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELElBQU0sWUFBWSxHQUFHLElBQUksQ0FB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cmVzaXphYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIkBibHVlcHJpbnRqcy9jb3JlXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uL2NvbW1vbi9pbmRleFwiO1xuaW1wb3J0IHsgSUxvY2thYmxlTGF5b3V0LCBPcmllbnRhdGlvbiwgUmVzaXplSGFuZGxlIH0gZnJvbSBcIi4vcmVzaXplSGFuZGxlXCI7XG5cbmV4cG9ydCB0eXBlIElJbmRleGVkUmVzaXplQ2FsbGJhY2sgPSAoaW5kZXg6IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZXNpemFibGVQcm9wcyBleHRlbmRzIElQcm9wcywgSUxvY2thYmxlTGF5b3V0IHtcbiAgICAvKipcbiAgICAgKiBFbmFibGVzL2Rpc2FibGVzIHRoZSByZXNpemUgaW50ZXJhY3Rpb24gZm9yIHRoZSBjb2x1bW4uXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGlzUmVzaXphYmxlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcHRpb25hbCBtYXhpbXVtIHdpZHRoIG9mIHRoZSBjb2x1bW4uXG4gICAgICovXG4gICAgbWF4U2l6ZT86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcHRpb25hbCBtaW5pbXVtIHdpZHRoIG9mIHRoZSBjb2x1bW4uXG4gICAgICovXG4gICAgbWluU2l6ZT86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hpbGUgdGhlIHVzZXIgaXMgZHJhZ2dpbmcgdGhlIHJlc2l6ZVxuICAgICAqIGhhbmRsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzaXplIGlzIHRoZSByZXNpemVkIHNpemVcbiAgICAgKi9cbiAgICBvblNpemVDaGFuZ2VkPzogKHNpemU6IG51bWJlcikgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBpcyBkb25lIGRyYWdnaW5nIHRoZSByZXNpemVcbiAgICAgKiBoYW5kbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2l6ZSBpcyB0aGUgZmluYWwgcmVzaXplZCBzaXplXG4gICAgICovXG4gICAgb25SZXNpemVFbmQ/OiAoc2l6ZTogbnVtYmVyKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZSBjbGlja3MgdGhlIHJlc2l6ZSBoYW5kbGVcbiAgICAgKi9cbiAgICBvbkRvdWJsZUNsaWNrPzogKCkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaG93IHRoZSByZXNpemUgaGFuZGxlIGlzIG9yaWVudGVkIGluIHRoZSByZXNpemFibGUgY2hpbGQuXG4gICAgICovXG4gICAgb3JpZW50YXRpb246IE9yaWVudGF0aW9uO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGluaXRpYWwgZGltZW5zaW9uYWwgc2l6ZS5cbiAgICAgKi9cbiAgICBzaXplOiBudW1iZXI7XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVzaXplYWJsZVN0YXRlIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGltZW5zaW9uYWwgc2l6ZSwgcmVzcGVjdGluZyBtaW5pbXVtIGFuZCBtYXhpbXVtIGNvbnN0cmFpbnRzLlxuICAgICAqL1xuICAgIHNpemU/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGltZW5zaW9uYWwgc2l6ZSwgaWdub3JpbmcgbWluaW11bSBhbmQgbWF4aW11bSBjb25zdHJhaW50cy5cbiAgICAgKi9cbiAgICB1bmNsYW1wZWRTaXplPzogbnVtYmVyO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVzaXphYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElSZXNpemFibGVQcm9wcywgSVJlc2l6ZWFibGVTdGF0ZT4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpc1Jlc2l6YWJsZTogdHJ1ZSxcbiAgICAgICAgbWluU2l6ZTogMCxcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByb3BzOiBJUmVzaXphYmxlUHJvcHMsIGNvbnRleHQ/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICBjb25zdCB7IHNpemUgfSA9IHByb3BzO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgIHVuY2xhbXBlZFNpemU6IHNpemUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBJUmVzaXphYmxlUHJvcHMpIHtcbiAgICAgICAgY29uc3QgeyBzaXplIH0gPSBuZXh0UHJvcHM7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgIHVuY2xhbXBlZFNpemU6IHNpemUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBPYmplY3QuYXNzaWduKHt9LCBjaGlsZC5wcm9wcy5zdHlsZSwgdGhpcy5nZXRTdHlsZSgpKTtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc1Jlc2l6YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHsgc3R5bGUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNpemVIYW5kbGUgPSB0aGlzLnJlbmRlclJlc2l6ZUhhbmRsZSgpO1xuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7IHN0eWxlLCByZXNpemVIYW5kbGUgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJSZXNpemVIYW5kbGUoKSB7XG4gICAgICAgIGNvbnN0IHsgb25MYXlvdXRMb2NrLCBvbkRvdWJsZUNsaWNrLCBvcmllbnRhdGlvbiB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBjb25zdCBvblJlc2l6ZU1vdmUgPSAoX29mZnNldDogbnVtYmVyLCBkZWx0YTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldFNpemUoZGVsdGEpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25TaXplQ2hhbmdlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNpemVDaGFuZ2VkKHRoaXMuc3RhdGUuc2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9uUmVzaXplRW5kID0gKF9vZmZzZXQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgLy8gcmVzZXQgXCJ1bmNsYW1wZWRcIiBzaXplIG9uIGVuZFxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dW5jbGFtcGVkU2l6ZTogdGhpcy5zdGF0ZS5zaXplfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uUmVzaXplRW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uUmVzaXplRW5kKHRoaXMuc3RhdGUuc2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZXNpemVIYW5kbGVcbiAgICAgICAgICAgICAgICBrZXk9XCJyZXNpemUtaGFuZGxlXCJcbiAgICAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXtvbkRvdWJsZUNsaWNrfVxuICAgICAgICAgICAgICAgIG9uTGF5b3V0TG9jaz17b25MYXlvdXRMb2NrfVxuICAgICAgICAgICAgICAgIG9uUmVzaXplRW5kPXtvblJlc2l6ZUVuZH1cbiAgICAgICAgICAgICAgICBvblJlc2l6ZU1vdmU9e29uUmVzaXplTW92ZX1cbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbj17b3JpZW50YXRpb259XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIENTUyBzdHlsZSB0byBhcHBseSB0byB0aGUgY2hpbGQgZWxlbWVudCBnaXZlbiB0aGUgc3RhdGUnc1xuICAgICAqIHNpemUgdmFsdWUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTdHlsZSgpOiBSZWFjdC5DU1NQcm9wZXJ0aWVzIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub3JpZW50YXRpb24gPT09IE9yaWVudGF0aW9uLlZFUlRJQ0FMKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZsZXhCYXNpczogYCR7dGhpcy5zdGF0ZS5zaXplfXB4YCxcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogXCIwcHhcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5zdGF0ZS5zaXplfXB4YCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGZsZXhCYXNpczogYCR7dGhpcy5zdGF0ZS5zaXplfXB4YCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3RoaXMuc3RhdGUuc2l6ZX1weGAsXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiBcIjBweFwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb2Zmc2V0U2l6ZShvZmZzZXQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCB1bmNsYW1wZWRTaXplID0gdGhpcy5zdGF0ZS51bmNsYW1wZWRTaXplICsgb2Zmc2V0O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNpemUgOiBVdGlscy5jbGFtcCh1bmNsYW1wZWRTaXplLCB0aGlzLnByb3BzLm1pblNpemUsIHRoaXMucHJvcHMubWF4U2l6ZSksXG4gICAgICAgICAgICB1bmNsYW1wZWRTaXplLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
