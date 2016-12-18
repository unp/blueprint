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
var PureRender = require("pure-render-decorator");
var React = require("react");
var dragEvents_1 = require("../interactions/dragEvents");
var draggable_1 = require("../interactions/draggable");
var regions_1 = require("../regions");
var DragSelectable = (function (_super) {
    __extends(DragSelectable, _super);
    function DragSelectable() {
        var _this = this;
        _super.apply(this, arguments);
        this.handleActivate = function (event) {
            if (!DragSelectable.isLeftClick(event)) {
                return false;
            }
            var region = _this.props.locateClick(event);
            if (!regions_1.Regions.isValid(region)) {
                return false;
            }
            if (_this.props.selectedRegionTransform != null) {
                region = _this.props.selectedRegionTransform(region, event);
            }
            var foundIndex = regions_1.Regions.findMatchingRegion(_this.props.selectedRegions, region);
            if (foundIndex !== -1) {
                // If re-clicking on an existing region, we either carefully
                // remove it if the meta key is used or otherwise we clear the
                // selection entirely.
                if (dragEvents_1.DragEvents.isAdditive(event)) {
                    var newSelectedRegions = _this.props.selectedRegions.slice();
                    newSelectedRegions.splice(foundIndex, 1);
                    _this.props.onSelection(newSelectedRegions);
                }
                else {
                    _this.props.onSelection([]);
                }
                return false;
            }
            if (dragEvents_1.DragEvents.isAdditive(event) && _this.props.allowMultipleSelection) {
                _this.props.onSelection(regions_1.Regions.add(_this.props.selectedRegions, region));
            }
            else {
                _this.props.onSelection([region]);
            }
            return true;
        };
        this.handleDragMove = function (event, coords) {
            var region = (_this.props.allowMultipleSelection) ?
                _this.props.locateDrag(event, coords) :
                _this.props.locateClick(event);
            if (!regions_1.Regions.isValid(region)) {
                return;
            }
            if (_this.props.selectedRegionTransform != null) {
                region = _this.props.selectedRegionTransform(region, event, coords);
            }
            _this.props.onSelection(regions_1.Regions.update(_this.props.selectedRegions, region));
        };
        this.handleClick = function (event) {
            if (!DragSelectable.isLeftClick(event)) {
                return false;
            }
            var region = _this.props.locateClick(event);
            if (!regions_1.Regions.isValid(region)) {
                _this.props.onSelection([]);
                return false;
            }
            if (_this.props.selectedRegionTransform != null) {
                region = _this.props.selectedRegionTransform(region, event);
            }
            if (_this.props.selectedRegions.length > 0) {
                _this.props.onSelection(regions_1.Regions.update(_this.props.selectedRegions, region));
            }
            else {
                _this.props.onSelection([region]);
            }
            return false;
        };
    }
    DragSelectable.isLeftClick = function (event) {
        return event.button === 0;
    };
    DragSelectable.prototype.render = function () {
        var draggableProps = this.getDraggableProps();
        return (React.createElement(draggable_1.Draggable, __assign({}, draggableProps), this.props.children));
    };
    DragSelectable.prototype.getDraggableProps = function () {
        return this.props.onSelection == null ? {} : {
            onActivate: this.handleActivate,
            onClick: this.handleClick,
            onDragMove: this.handleDragMove,
        };
    };
    DragSelectable = __decorate([
        PureRender
    ], DragSelectable);
    return DragSelectable;
}(React.Component));
exports.DragSelectable = DragSelectable;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmFjdGlvbnMvc2VsZWN0YWJsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFDL0IsMkJBQTJCLDRCQUE0QixDQUFDLENBQUE7QUFDeEQsMEJBQTRELDJCQUEyQixDQUFDLENBQUE7QUFDeEYsd0JBQWlDLFlBQVksQ0FBQyxDQUFBO0FBb0Q5QztJQUFvQyxrQ0FBeUM7SUFBN0U7UUFBQSxpQkFxR0M7UUFyR21DLDhCQUF5QztRQXNCakUsbUJBQWMsR0FBRyxVQUFDLEtBQWlCO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUVELElBQUksTUFBTSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUJBQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvRCxDQUFDO1lBRUQsSUFBTSxVQUFVLEdBQUcsaUJBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsRixFQUFF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bEMsQ0FBQztJQUNOLENBQUM7SUFyQkw7UUFBQyxVQUFVO3NCQUFBO0lBc0dYLHFCQUFDO0FBQUQsQ0FyR0EsQUFxR0MsQ0FyR21DLEtBQUssQ0FBQyxTQUFTLEdBcUdsRDtBQXJHWSxzQkFBYyxpQkFxRzFCLENBQUEiLCJmaWxlIjoiaW50ZXJhY3Rpb25zL3NlbGVjdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBQdXJlUmVuZGVyIGZyb20gXCJwdXJlLXJlbmRlci1kZWNvcmF0b3JcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRHJhZ0V2ZW50cyB9IGZyb20gXCIuLi9pbnRlcmFjdGlvbnMvZHJhZ0V2ZW50c1wiO1xuaW1wb3J0IHsgRHJhZ2dhYmxlLCBJQ29vcmRpbmF0ZURhdGEsIElEcmFnZ2FibGVQcm9wcyB9IGZyb20gXCIuLi9pbnRlcmFjdGlvbnMvZHJhZ2dhYmxlXCI7XG5pbXBvcnQgeyBJUmVnaW9uLCBSZWdpb25zIH0gZnJvbSBcIi4uL3JlZ2lvbnNcIjtcblxuZXhwb3J0IHR5cGUgSVNlbGVjdGVkUmVnaW9uVHJhbnNmb3JtID0gKHJlZ2lvbjogSVJlZ2lvbiwgZXZlbnQ6IE1vdXNlRXZlbnQsIGNvb3Jkcz86IElDb29yZGluYXRlRGF0YSkgPT4gSVJlZ2lvbjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2VsZWN0YWJsZVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBJZiBgZmFsc2VgLCBvbmx5IGEgc2luZ2xlIHJlZ2lvbiBvZiBhIHNpbmdsZSBjb2x1bW4vcm93L2NlbGwgbWF5IGJlXG4gICAgICogc2VsZWN0ZWQgYXQgb25lIHRpbWUuIFVzaW5nIDxrYmQgY2xhc3M9XCJwdC1rZXlcIj5jdHJsPC9rYmQ+IG9yXG4gICAgICogPGtiZCBjbGFzcz1cInB0LWtleVwiPm1ldGE8L2tiZD4ga2V5IHdpbGwgaGF2ZSBubyBlZmZlY3QsXG4gICAgICogYW5kIGEgbW91c2UgZHJhZyB3aWxsIHNlbGVjdCB0aGUgY3VycmVudCBjb2x1bW4vcm93L2NlbGwgb25seS5cbiAgICAgKi9cbiAgICBhbGxvd011bHRpcGxlU2VsZWN0aW9uOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgdXNlciBzZWxlY3RzIHNvbWV0aGluZywgdGhpcyBjYWxsYmFjayBpcyBjYWxsZWQgd2l0aCBhIG5ld1xuICAgICAqIGFycmF5IG9mIFJlZ2lvbnMuIFRoaXMgYXJyYXkgc2hvdWxkIGJlIGNvbnNpZGVyZWQgdGhlIG5ldyBzZWxlY3Rpb25cbiAgICAgKiBzdGF0ZSBmb3IgdGhlIGVudGlyZSB0YWJsZS5cbiAgICAgKi9cbiAgICBvblNlbGVjdGlvbjogKHJlZ2lvbnM6IElSZWdpb25bXSkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHRhYmxlJ3Mgc2VsZWN0aW9uIFJlZ2lvbnMuXG4gICAgICovXG4gICAgc2VsZWN0ZWRSZWdpb25zOiBJUmVnaW9uW107XG5cbiAgICAvKipcbiAgICAgKiBBbiBvcHRpb25hbCB0cmFuc2Zvcm0gZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGxvY2F0ZWRcbiAgICAgKiBgUmVnaW9uYC5cbiAgICAgKlxuICAgICAqIFRoaXMgYWxsb3dzIHlvdSB0bywgZm9yIGV4YW1wbGUsIGNvbnZlcnQgY2VsbCBgUmVnaW9uYHMgaW50byByb3dcbiAgICAgKiBgUmVnaW9uYHMgd2hpbGUgbWFpbnRhaW5pbmcgdGhlIGV4aXN0aW5nIG11bHRpLXNlbGVjdCBhbmQgbWV0YS1jbGlja1xuICAgICAqIGZ1bmN0aW9uYWxpdHkuXG4gICAgICovXG4gICAgc2VsZWN0ZWRSZWdpb25UcmFuc2Zvcm0/OiBJU2VsZWN0ZWRSZWdpb25UcmFuc2Zvcm07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURyYWdTZWxlY3RhYmxlUHJvcHMgZXh0ZW5kcyBJU2VsZWN0YWJsZVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIHRoYXQgZGV0ZXJtaW5lcyBhIGBSZWdpb25gIGZvciB0aGUgc2luZ2xlIGBNb3VzZUV2ZW50YC4gSWZcbiAgICAgKiBubyB2YWxpZCByZWdpb24gY2FuIGJlIGZvdW5kLCBgbnVsbGAgbWF5IGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIGxvY2F0ZUNsaWNrOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IElSZWdpb247XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIHRoYXQgZGV0ZXJtaW5lcyBhIGBSZWdpb25gIGZvciB0aGUgYE1vdXNlRXZlbnRgIGFuZFxuICAgICAqIGNvb3JkaW5hdGUgZGF0YSByZXByZXNlbnRpbmcgYSBkcmFnLiBJZiBubyB2YWxpZCByZWdpb24gY2FuIGJlIGZvdW5kLFxuICAgICAqIGBudWxsYCBtYXkgYmUgcmV0dXJuZWQuXG4gICAgICovXG4gICAgbG9jYXRlRHJhZzogKGV2ZW50OiBNb3VzZUV2ZW50LCBjb29yZHM6IElDb29yZGluYXRlRGF0YSkgPT4gSVJlZ2lvbjtcbn1cblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBEcmFnU2VsZWN0YWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJRHJhZ1NlbGVjdGFibGVQcm9wcywge30+IHtcbiAgICBwdWJsaWMgc3RhdGljIGlzTGVmdENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC5idXR0b24gPT09IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlUHJvcHMgPSB0aGlzLmdldERyYWdnYWJsZVByb3BzKCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RHJhZ2dhYmxlIHsuLi5kcmFnZ2FibGVQcm9wc30+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERyYWdnYWJsZVByb3BzKCk6IElEcmFnZ2FibGVQcm9wcyB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uU2VsZWN0aW9uID09IG51bGwgPyB7fSA6IHtcbiAgICAgICAgICAgIG9uQWN0aXZhdGU6IHRoaXMuaGFuZGxlQWN0aXZhdGUsXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLFxuICAgICAgICAgICAgb25EcmFnTW92ZTogdGhpcy5oYW5kbGVEcmFnTW92ZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUFjdGl2YXRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghRHJhZ1NlbGVjdGFibGUuaXNMZWZ0Q2xpY2soZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVnaW9uID0gdGhpcy5wcm9wcy5sb2NhdGVDbGljayhldmVudCk7XG5cbiAgICAgICAgaWYgKCFSZWdpb25zLmlzVmFsaWQocmVnaW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRSZWdpb25UcmFuc2Zvcm0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVnaW9uID0gdGhpcy5wcm9wcy5zZWxlY3RlZFJlZ2lvblRyYW5zZm9ybShyZWdpb24sIGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvdW5kSW5kZXggPSBSZWdpb25zLmZpbmRNYXRjaGluZ1JlZ2lvbih0aGlzLnByb3BzLnNlbGVjdGVkUmVnaW9ucywgcmVnaW9uKTtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAvLyBJZiByZS1jbGlja2luZyBvbiBhbiBleGlzdGluZyByZWdpb24sIHdlIGVpdGhlciBjYXJlZnVsbHlcbiAgICAgICAgICAgIC8vIHJlbW92ZSBpdCBpZiB0aGUgbWV0YSBrZXkgaXMgdXNlZCBvciBvdGhlcndpc2Ugd2UgY2xlYXIgdGhlXG4gICAgICAgICAgICAvLyBzZWxlY3Rpb24gZW50aXJlbHkuXG4gICAgICAgICAgICBpZiAoRHJhZ0V2ZW50cy5pc0FkZGl0aXZlKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NlbGVjdGVkUmVnaW9ucyA9IHRoaXMucHJvcHMuc2VsZWN0ZWRSZWdpb25zLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgbmV3U2VsZWN0ZWRSZWdpb25zLnNwbGljZShmb3VuZEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0aW9uKG5ld1NlbGVjdGVkUmVnaW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3Rpb24oW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKERyYWdFdmVudHMuaXNBZGRpdGl2ZShldmVudCkgJiYgdGhpcy5wcm9wcy5hbGxvd011bHRpcGxlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0aW9uKFJlZ2lvbnMuYWRkKHRoaXMucHJvcHMuc2VsZWN0ZWRSZWdpb25zLCByZWdpb24pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3Rpb24oW3JlZ2lvbl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVEcmFnTW92ZSA9IChldmVudDogTW91c2VFdmVudCwgY29vcmRzOiBJQ29vcmRpbmF0ZURhdGEpID0+IHtcbiAgICAgICAgbGV0IHJlZ2lvbiA9ICh0aGlzLnByb3BzLmFsbG93TXVsdGlwbGVTZWxlY3Rpb24pID9cbiAgICAgICAgICAgIHRoaXMucHJvcHMubG9jYXRlRHJhZyhldmVudCwgY29vcmRzKSA6XG4gICAgICAgICAgICB0aGlzLnByb3BzLmxvY2F0ZUNsaWNrKGV2ZW50KTtcblxuICAgICAgICBpZiAoIVJlZ2lvbnMuaXNWYWxpZChyZWdpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFJlZ2lvblRyYW5zZm9ybSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZWdpb24gPSB0aGlzLnByb3BzLnNlbGVjdGVkUmVnaW9uVHJhbnNmb3JtKHJlZ2lvbiwgZXZlbnQsIGNvb3Jkcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0aW9uKFJlZ2lvbnMudXBkYXRlKHRoaXMucHJvcHMuc2VsZWN0ZWRSZWdpb25zLCByZWdpb24pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghRHJhZ1NlbGVjdGFibGUuaXNMZWZ0Q2xpY2soZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVnaW9uID0gdGhpcy5wcm9wcy5sb2NhdGVDbGljayhldmVudCk7XG5cbiAgICAgICAgaWYgKCFSZWdpb25zLmlzVmFsaWQocmVnaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGlvbihbXSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZFJlZ2lvblRyYW5zZm9ybSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZWdpb24gPSB0aGlzLnByb3BzLnNlbGVjdGVkUmVnaW9uVHJhbnNmb3JtKHJlZ2lvbiwgZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWRSZWdpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25TZWxlY3Rpb24oUmVnaW9ucy51cGRhdGUodGhpcy5wcm9wcy5zZWxlY3RlZFJlZ2lvbnMsIHJlZ2lvbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGlvbihbcmVnaW9uXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
