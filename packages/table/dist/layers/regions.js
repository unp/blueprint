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
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var RegionLayer = (function (_super) {
    __extends(RegionLayer, _super);
    function RegionLayer() {
        var _this = this;
        _super.apply(this, arguments);
        this.renderRegion = function (region, index) {
            var _a = _this.props, className = _a.className, getRegionStyle = _a.getRegionStyle;
            return (React.createElement("div", {className: classNames("bp-table-overlay bp-table-region", className), key: index, style: getRegionStyle(region)}));
        };
    }
    RegionLayer.prototype.render = function () {
        return React.createElement("div", {className: "bp-table-overlay-layer"}, this.renderRegionChildren());
    };
    RegionLayer.prototype.renderRegionChildren = function () {
        var regions = this.props.regions;
        if (regions == null) {
            return undefined;
        }
        return regions.map(this.renderRegion);
    };
    RegionLayer = __decorate([
        PureRender
    ], RegionLayer);
    return RegionLayer;
}(React.Component));
exports.RegionLayer = RegionLayer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sYXllcnMvcmVnaW9ucy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7QUFHSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBb0IvQjtJQUFpQywrQkFBc0M7SUFBdkU7UUFBQSxpQkF1QkM7UUF2QmdDLDhCQUFzQztRQWEzRCxpQkFBWSxHQUFHLFVBQUMsTUFBZSxFQUFFLEtBQWE7WUFDbEQsSUFBQSxnQkFBZ0QsRUFBeEMsd0JBQVMsRUFBRSxrQ0FBYyxDQUFnQjtZQUNqRCxNQUFNLENBQUMsQ0FDSCxxQkFBQyxHQUFHLElBQ0EsU0FBUyxFQUFFLFVBQVUsQ0FBQyxrQ0FBa0MsRUFBRSxTQUFTLENBQUUsRUFDckUsR0FBRyxFQUFFLEtBQU0sRUFDWCxLQUFLLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBRSxFQUNoQyxDQUNMLENBQUM7UUFDTixDQUFDLENBQUE7SUFDTCxDQUFDO0lBdEJVLDRCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMscUJBQUMsR0FBRyxJQUFDLFNBQVMsRUFBQyx3QkFBd0IsR0FBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUcsQ0FBTSxDQUFDO0lBQ3ZGLENBQUM7SUFFTywwQ0FBb0IsR0FBNUI7UUFDWSxnQ0FBTyxDQUFnQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQVpMO1FBQUMsVUFBVTttQkFBQTtJQXdCWCxrQkFBQztBQUFELENBdkJBLEFBdUJDLENBdkJnQyxLQUFLLENBQUMsU0FBUyxHQXVCL0M7QUF2QlksbUJBQVcsY0F1QnZCLENBQUEiLCJmaWxlIjoibGF5ZXJzL3JlZ2lvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgeyBJUHJvcHMgfSBmcm9tIFwiQGJsdWVwcmludGpzL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFB1cmVSZW5kZXIgZnJvbSBcInB1cmUtcmVuZGVyLWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBJUmVnaW9uIH0gZnJvbSBcIi4uL3JlZ2lvbnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJUmVnaW9uU3R5bGVyIHtcbiAgICAocmVnaW9uOiBJUmVnaW9uKTogUmVhY3QuQ1NTUHJvcGVydGllcztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmVnaW9uTGF5ZXJQcm9wcyBleHRlbmRzIElQcm9wcyB7XG4gICAgLyoqXG4gICAgICogVGhlIGFycmF5IG9mIHJlZ2lvbnMgdG8gcmVuZGVyLlxuICAgICAqL1xuICAgIHJlZ2lvbnM/OiBJUmVnaW9uW107XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGludGVyZmFjZSBmb3IgYXBwbHlpbmcgQ1NTIHN0eWxlcyB0byB0aGUgcmVnaW9ucy5cbiAgICAgKi9cbiAgICBnZXRSZWdpb25TdHlsZTogSVJlZ2lvblN0eWxlcjtcbn1cblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBSZWdpb25MYXllciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJUmVnaW9uTGF5ZXJQcm9wcywge30+IHtcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJicC10YWJsZS1vdmVybGF5LWxheWVyXCI+e3RoaXMucmVuZGVyUmVnaW9uQ2hpbGRyZW4oKX08L2Rpdj47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJSZWdpb25DaGlsZHJlbigpIHtcbiAgICAgICAgY29uc3QgeyByZWdpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBpZiAocmVnaW9ucyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWdpb25zLm1hcCh0aGlzLnJlbmRlclJlZ2lvbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJSZWdpb24gPSAocmVnaW9uOiBJUmVnaW9uLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBnZXRSZWdpb25TdHlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJicC10YWJsZS1vdmVybGF5IGJwLXRhYmxlLXJlZ2lvblwiLCBjbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgc3R5bGU9e2dldFJlZ2lvblN0eWxlKHJlZ2lvbil9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
