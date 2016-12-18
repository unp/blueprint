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
var ReactDOM = require("react-dom");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var keys_1 = require("../../common/keys");
var position_1 = require("../../common/position");
var utils_1 = require("../../common/utils");
var overlay_1 = require("../overlay/overlay");
var toast_1 = require("./toast");
var Toaster = (function (_super) {
    __extends(Toaster, _super);
    function Toaster() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            toasts: [],
        };
        // auto-incrementing identifier for un-keyed toasts
        this.toastId = 0;
        this.getDismissHandler = function (toast) { return function (timeoutExpired) {
            _this.dismiss(toast.key, timeoutExpired);
        }; };
        this.handleClose = function (e) {
            // NOTE that `e` isn't always a KeyboardEvent but that's the only type we care about
            if (e.which === keys_1.ESCAPE) {
                _this.clear();
            }
        };
    }
    /**
     * Create a new `Toaster` instance that can be shared around your application.
     * The `Toaster` will be rendered into a new element appended to the given container.
     */
    Toaster.create = function (props, container) {
        if (container === void 0) { container = document.body; }
        var containerElement = document.createElement("div");
        container.appendChild(containerElement);
        return ReactDOM.render(React.createElement(Toaster, __assign({}, props)), containerElement);
    };
    Toaster.prototype.show = function (props) {
        var options = props;
        options.key = "toast-" + this.toastId++;
        this.setState(function (prevState) { return ({
            toasts: [options].concat(prevState.toasts),
        }); });
        return options.key;
    };
    Toaster.prototype.update = function (key, props) {
        var options = props;
        options.key = key;
        this.setState(function (prevState) { return ({
            toasts: prevState.toasts.map(function (t) { return t.key === key ? options : t; }),
        }); });
    };
    Toaster.prototype.dismiss = function (key, timeoutExpired) {
        if (timeoutExpired === void 0) { timeoutExpired = false; }
        this.setState(function (_a) {
            var toasts = _a.toasts;
            return ({
                toasts: toasts.filter(function (t) {
                    var matchesKey = t.key === key;
                    if (matchesKey) {
                        utils_1.safeInvoke(t.onDismiss, timeoutExpired);
                    }
                    return !matchesKey;
                }),
            });
        });
    };
    Toaster.prototype.clear = function () {
        this.state.toasts.map(function (t) { return utils_1.safeInvoke(t.onDismiss, false); });
        this.setState({ toasts: [] });
    };
    Toaster.prototype.getToasts = function () {
        return this.state.toasts;
    };
    Toaster.prototype.render = function () {
        // $pt-transition-duration * 3 + $pt-transition-duration / 2
        var classes = classNames(Classes.TOAST_CONTAINER, this.getPositionClasses(), this.props.className);
        return (React.createElement(overlay_1.Overlay, {autoFocus: this.props.autoFocus, canEscapeKeyClose: this.props.canEscapeKeyClear, canOutsideClickClose: false, className: classes, enforceFocus: false, hasBackdrop: false, inline: this.props.inline, isOpen: this.state.toasts.length > 0, onClose: this.handleClose, transitionDuration: 350, transitionName: "pt-toast"}, this.state.toasts.map(this.renderToast, this)));
    };
    Toaster.prototype.validateProps = function (props) {
        if (props.position === position_1.Position.LEFT || props.position === position_1.Position.RIGHT) {
            throw new Error("Toaster does not support LEFT or RIGHT positions.");
        }
    };
    Toaster.prototype.renderToast = function (toast) {
        return React.createElement(toast_1.Toast, __assign({}, toast, {onDismiss: this.getDismissHandler(toast)}));
    };
    Toaster.prototype.getPositionClasses = function () {
        var positions = position_1.Position[this.props.position].split("_");
        // NOTE that there is no -center class because that's the default style
        return positions.map(function (p) { return (Classes.TOAST_CONTAINER + "-" + p.toLowerCase()); });
    };
    Toaster.defaultProps = {
        autoFocus: false,
        canEscapeKeyClear: true,
        inline: false,
        position: position_1.Position.TOP,
    };
    Toaster = __decorate([
        PureRender
    ], Toaster);
    return Toaster;
}(abstractComponent_1.AbstractComponent));
exports.Toaster = Toaster;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RvYXN0L3RvYXN0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLElBQVksUUFBUSxXQUFNLFdBQVcsQ0FBQyxDQUFBO0FBRXRDLGtDQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQscUJBQXVCLG1CQUFtQixDQUFDLENBQUE7QUFDM0MseUJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFFakQsc0JBQTJCLG9CQUFvQixDQUFDLENBQUE7QUFDaEQsd0JBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFDN0Msc0JBQW1DLFNBQVMsQ0FBQyxDQUFBO0FBMkQ3QztJQUE2QiwyQkFBK0M7SUFBNUU7UUFBQSxpQkErR0M7UUEvRzRCLDhCQUErQztRQWtCakUsVUFBSyxHQUFHO1lBQ1gsTUFBTSxFQUFFLEVBQXFCO1NBQ2hDLENBQUM7UUFFRixtREFBbUQ7UUFDM0MsWUFBTyxHQUFHLENBQUMsQ0FBQztRQThFWixzQkFBaUIsR0FBRyxVQUFDLEtBQW9CLElBQUssT0FBQSxVQUFDLGNBQXVCO1lBQzFFLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM1QyxDQUFDLEVBRnFELENBRXJELENBQUE7UUFFTyxnQkFBVyxHQUFHLFVBQUMsQ0FBbUM7WUFDdEQsb0ZBQW9GO1lBQ3BGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssYUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLENB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LENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsdUVBQXVFO1FBQ3ZFLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBRyxPQUFPLENBQUMsZUFBZSxTQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBRSxFQUEvQyxDQUErQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQWxHYSxvQkFBWSxHQUFrQjtRQUN4QyxTQUFTLEVBQUUsS0FBSztRQUNoQixpQkFBaUIsRUFBRSxJQUFJO1FBQ3ZCLE1BQU0sRUFBRSxLQUFLO1FBQ2IsUUFBUSxFQUFFLG1CQUFRLENBQUMsR0FBRztLQUN6QixDQUFDO0lBUE47UUFBQyxVQUFVO2VBQUE7SUFnSFgsY0FBQztBQUFELENBL0dBLEFBK0dDLENBL0c0QixxQ0FBaUIsR0ErRzdDO0FBL0dZLGVBQU8sVUErR25CLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy90b2FzdC90b2FzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBQdXJlUmVuZGVyIGZyb20gXCJwdXJlLXJlbmRlci1kZWNvcmF0b3JcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuXG5pbXBvcnQgeyBBYnN0cmFjdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9jb21tb24vYWJzdHJhY3RDb21wb25lbnRcIjtcbmltcG9ydCAqIGFzIENsYXNzZXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbGFzc2VzXCI7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2tleXNcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wb3NpdGlvblwiO1xuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuaW1wb3J0IHsgc2FmZUludm9rZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdXRpbHNcIjtcbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tIFwiLi4vb3ZlcmxheS9vdmVybGF5XCI7XG5pbXBvcnQgeyBJVG9hc3RQcm9wcywgVG9hc3QgfSBmcm9tIFwiLi90b2FzdFwiO1xuXG5leHBvcnQgdHlwZSBJVG9hc3RPcHRpb25zID0gSVRvYXN0UHJvcHMgJiB7a2V5Pzogc3RyaW5nfTtcblxuZXhwb3J0IGludGVyZmFjZSBJVG9hc3RlciB7XG4gICAgLyoqIFNob3cgYSBuZXcgdG9hc3QgdG8gdGhlIHVzZXIuIFJldHVybnMgdGhlIHVuaXF1ZSBrZXkgb2YgdGhlIG5ldyB0b2FzdC4gKi9cbiAgICBzaG93KHByb3BzOiBJVG9hc3RQcm9wcyk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHRvYXN0IHdpdGggdGhlIGdpdmVuIGtleSB0byB1c2UgdGhlIG5ldyBwcm9wcy5cbiAgICAgKiBVcGRhdGluZyBhIGtleSB0aGF0IGRvZXMgbm90IGV4aXN0IGlzIGVmZmVjdGl2ZWx5IGEgbm8tb3AuXG4gICAgICovXG4gICAgdXBkYXRlKGtleTogc3RyaW5nLCBwcm9wczogSVRvYXN0UHJvcHMpOiB2b2lkO1xuXG4gICAgLyoqIERpc21pc3MgdGhlIGdpdmVuIHRvYXN0IGluc3RhbnRseS4gKi9cbiAgICBkaXNtaXNzKGtleTogc3RyaW5nKTogdm9pZDtcblxuICAgIC8qKiBEaXNtaXNzIGFsbCB0b2FzdHMgaW5zdGFudGx5LiAqL1xuICAgIGNsZWFyKCk6IHZvaWQ7XG5cbiAgICAvKiogUmV0dXJucyB0aGUgcHJvcHMgZm9yIGFsbCBjdXJyZW50IHRvYXN0cy4gKi9cbiAgICBnZXRUb2FzdHMoKTogSVRvYXN0T3B0aW9uc1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUb2FzdGVyUHJvcHMgZXh0ZW5kcyBJUHJvcHMge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgYSB0b2FzdCBzaG91bGQgYWNxdWlyZSBhcHBsaWNhdGlvbiBmb2N1cyB3aGVuIGl0IGZpcnN0IG9wZW5zLlxuICAgICAqIFRoaXMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdCBzbyB0aGF0IHRvYXN0cyBkbyBub3QgaW50ZXJydXB0IHRoZSB1c2VyJ3MgZmxvdy5cbiAgICAgKiBOb3RlIHRoYXQgYGVuZm9yY2VGb2N1c2AgaXMgYWx3YXlzIGRpc2FibGVkIGZvciBgVG9hc3RlcmBzLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgYXV0b0ZvY3VzPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgcHJlc3NpbmcgdGhlIGBlc2NgIGtleSBzaG91bGQgY2xlYXIgYWxsIGFjdGl2ZSB0b2FzdHMuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGNhbkVzY2FwZUtleUNsZWFyPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHRvYXN0ZXIgc2hvdWxkIGJlIHJlbmRlcmVkIGlubGluZSBvciBpbnRvIGEgbmV3IGVsZW1lbnQgb24gYGRvY3VtZW50LmJvZHlgLlxuICAgICAqIElmIGB0cnVlYCwgdGhlbiBwb3NpdGlvbmluZyB3aWxsIGJlIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGlubGluZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiBgVG9hc3RlcmAgd2l0aGluIGl0cyBjb250YWluZXIuIE5vdGUgdGhhdCBgTEVGVGAgYW5kIGBSSUdIVGAgYXJlIGRpc2FsbG93ZWRcbiAgICAgKiBiZWNhdXNlIFRvYXN0ZXIgb25seSBzdXBwb3J0cyB0aGUgdG9wIGFuZCBib3R0b20gZWRnZXMuXG4gICAgICogQGRlZmF1bHQgUG9zaXRpb24uVE9QXG4gICAgICovXG4gICAgcG9zaXRpb24/OiBQb3NpdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVG9hc3RlclN0YXRlIHtcbiAgICB0b2FzdHM6IElUb2FzdE9wdGlvbnNbXTtcbn1cblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBUb2FzdGVyIGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQ8SVRvYXN0ZXJQcm9wcywgSVRvYXN0ZXJTdGF0ZT4gaW1wbGVtZW50cyBJVG9hc3RlciB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElUb2FzdGVyUHJvcHMgPSB7XG4gICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXG4gICAgICAgIGNhbkVzY2FwZUtleUNsZWFyOiB0cnVlLFxuICAgICAgICBpbmxpbmU6IGZhbHNlLFxuICAgICAgICBwb3NpdGlvbjogUG9zaXRpb24uVE9QLFxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgYFRvYXN0ZXJgIGluc3RhbmNlIHRoYXQgY2FuIGJlIHNoYXJlZCBhcm91bmQgeW91ciBhcHBsaWNhdGlvbi5cbiAgICAgKiBUaGUgYFRvYXN0ZXJgIHdpbGwgYmUgcmVuZGVyZWQgaW50byBhIG5ldyBlbGVtZW50IGFwcGVuZGVkIHRvIHRoZSBnaXZlbiBjb250YWluZXIuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUocHJvcHM/OiBJVG9hc3RlclByb3BzLCBjb250YWluZXIgPSBkb2N1bWVudC5ib2R5KTogSVRvYXN0ZXIge1xuICAgICAgICBjb25zdCBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKDxUb2FzdGVyIHsuLi5wcm9wc30gLz4gLCBjb250YWluZXJFbGVtZW50KSBhcyBUb2FzdGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0ZSA9IHtcbiAgICAgICAgdG9hc3RzOiBbXSBhcyBJVG9hc3RPcHRpb25zW10sXG4gICAgfTtcblxuICAgIC8vIGF1dG8taW5jcmVtZW50aW5nIGlkZW50aWZpZXIgZm9yIHVuLWtleWVkIHRvYXN0c1xuICAgIHByaXZhdGUgdG9hc3RJZCA9IDA7XG5cbiAgICBwdWJsaWMgc2hvdyhwcm9wczogSVRvYXN0UHJvcHMpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHByb3BzIGFzIElUb2FzdE9wdGlvbnM7XG4gICAgICAgIG9wdGlvbnMua2V5ID0gYHRvYXN0LSR7dGhpcy50b2FzdElkKyt9YDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xuICAgICAgICAgICAgdG9hc3RzOiBbb3B0aW9ucywgLi4ucHJldlN0YXRlLnRvYXN0c10sXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMua2V5O1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoa2V5OiBzdHJpbmcsIHByb3BzOiBJVG9hc3RQcm9wcykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gcHJvcHMgYXMgSVRvYXN0T3B0aW9ucztcbiAgICAgICAgb3B0aW9ucy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAgIHRvYXN0czogcHJldlN0YXRlLnRvYXN0cy5tYXAoKHQpID0+IHQua2V5ID09PSBrZXkgPyBvcHRpb25zIDogdCksXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzbWlzcyhrZXk6IHN0cmluZywgdGltZW91dEV4cGlyZWQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKCh7IHRvYXN0cyB9KSA9PiAoe1xuICAgICAgICAgICAgdG9hc3RzOiB0b2FzdHMuZmlsdGVyKCh0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlc0tleSA9IHQua2V5ID09PSBrZXk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2FmZUludm9rZSh0Lm9uRGlzbWlzcywgdGltZW91dEV4cGlyZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIW1hdGNoZXNLZXk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS50b2FzdHMubWFwKCh0KSA9PiBzYWZlSW52b2tlKHQub25EaXNtaXNzLCBmYWxzZSkpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdG9hc3RzOiBbXSB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VG9hc3RzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS50b2FzdHM7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgLy8gJHB0LXRyYW5zaXRpb24tZHVyYXRpb24gKiAzICsgJHB0LXRyYW5zaXRpb24tZHVyYXRpb24gLyAyXG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWVzKENsYXNzZXMuVE9BU1RfQ09OVEFJTkVSLCB0aGlzLmdldFBvc2l0aW9uQ2xhc3NlcygpLCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8T3ZlcmxheVxuICAgICAgICAgICAgICAgIGF1dG9Gb2N1cz17dGhpcy5wcm9wcy5hdXRvRm9jdXN9XG4gICAgICAgICAgICAgICAgY2FuRXNjYXBlS2V5Q2xvc2U9e3RoaXMucHJvcHMuY2FuRXNjYXBlS2V5Q2xlYXJ9XG4gICAgICAgICAgICAgICAgY2FuT3V0c2lkZUNsaWNrQ2xvc2U9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlc31cbiAgICAgICAgICAgICAgICBlbmZvcmNlRm9jdXM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGhhc0JhY2tkcm9wPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBpbmxpbmU9e3RoaXMucHJvcHMuaW5saW5lfVxuICAgICAgICAgICAgICAgIGlzT3Blbj17dGhpcy5zdGF0ZS50b2FzdHMubGVuZ3RoID4gMH1cbiAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlfVxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbj17MzUwfVxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25OYW1lPVwicHQtdG9hc3RcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnRvYXN0cy5tYXAodGhpcy5yZW5kZXJUb2FzdCwgdGhpcyl9XG4gICAgICAgICAgICA8L092ZXJsYXk+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlUHJvcHMocHJvcHM6IElUb2FzdGVyUHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzLnBvc2l0aW9uID09PSBQb3NpdGlvbi5MRUZUIHx8IHByb3BzLnBvc2l0aW9uID09PSBQb3NpdGlvbi5SSUdIVCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVG9hc3RlciBkb2VzIG5vdCBzdXBwb3J0IExFRlQgb3IgUklHSFQgcG9zaXRpb25zLlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyVG9hc3QodG9hc3Q6IElUb2FzdE9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIDxUb2FzdCB7Li4udG9hc3R9IG9uRGlzbWlzcz17dGhpcy5nZXREaXNtaXNzSGFuZGxlcih0b2FzdCl9IC8+O1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb25DbGFzc2VzKCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBQb3NpdGlvblt0aGlzLnByb3BzLnBvc2l0aW9uXS5zcGxpdChcIl9cIik7XG4gICAgICAgIC8vIE5PVEUgdGhhdCB0aGVyZSBpcyBubyAtY2VudGVyIGNsYXNzIGJlY2F1c2UgdGhhdCdzIHRoZSBkZWZhdWx0IHN0eWxlXG4gICAgICAgIHJldHVybiBwb3NpdGlvbnMubWFwKChwKSA9PiBgJHtDbGFzc2VzLlRPQVNUX0NPTlRBSU5FUn0tJHtwLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREaXNtaXNzSGFuZGxlciA9ICh0b2FzdDogSVRvYXN0T3B0aW9ucykgPT4gKHRpbWVvdXRFeHBpcmVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHRoaXMuZGlzbWlzcyh0b2FzdC5rZXksIHRpbWVvdXRFeHBpcmVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUNsb3NlID0gKGU6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIC8vIE5PVEUgdGhhdCBgZWAgaXNuJ3QgYWx3YXlzIGEgS2V5Ym9hcmRFdmVudCBidXQgdGhhdCdzIHRoZSBvbmx5IHR5cGUgd2UgY2FyZSBhYm91dFxuICAgICAgICBpZiAoZS53aGljaCA9PT0gRVNDQVBFKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
