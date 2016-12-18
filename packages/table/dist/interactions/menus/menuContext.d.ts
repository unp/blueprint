/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { ICellCoordinate, IRegion } from "../../regions";
export declare type IContextMenuRenderer = (context: IMenuContext) => JSX.Element;
export interface IMenuContext {
    /**
     * Returns an array of `IRegion`s that represent the user-intended context
     * of this menu. If the mouse click was on a selection, the array will
     * contain all selected regions. Otherwise it will have one `IRegion` that
     * represents the clicked cell (the same `IRegion` from `getTarget`).
     */
    getRegions: () => IRegion[];
    /**
     * Returns the list of selected `IRegion` in the table, regardless of
     * where the users clicked to launch the context menu. For the user-
     * intended regions for this context, use `getRegions` instead.
     */
    getSelectedRegions: () => IRegion[];
    /**
     * Returns a region containing the single cell that was clicked to launch
     * this context menu.
     */
    getTarget: () => IRegion;
    /**
     * Returns an array containing all of the unique, potentially non-
     * contiguous, cells contained in all the regions from `getRegions`. The
     * cell coordinates are sorted by rows then columns.
     */
    getUniqueCells: () => ICellCoordinate[];
}
export declare class MenuContext implements IMenuContext {
    private target;
    private selectedRegions;
    private numRows;
    private numCols;
    private regions;
    constructor(target: IRegion, selectedRegions: IRegion[], numRows: number, numCols: number);
    getTarget(): IRegion;
    getSelectedRegions(): IRegion[];
    getRegions(): IRegion[];
    getUniqueCells(): [number, number][];
}
