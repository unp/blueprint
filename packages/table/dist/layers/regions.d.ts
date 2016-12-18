/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { IProps } from "@blueprintjs/core";
import * as React from "react";
import { IRegion } from "../regions";
export interface IRegionStyler {
    (region: IRegion): React.CSSProperties;
}
export interface IRegionLayerProps extends IProps {
    /**
     * The array of regions to render.
     */
    regions?: IRegion[];
    /**
     * A callback interface for applying CSS styles to the regions.
     */
    getRegionStyle: IRegionStyler;
}
export declare class RegionLayer extends React.Component<IRegionLayerProps, {}> {
    render(): JSX.Element;
    private renderRegionChildren();
    private renderRegion;
}
