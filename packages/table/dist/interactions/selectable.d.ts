import * as React from "react";
import { ICoordinateData } from "../interactions/draggable";
import { IRegion } from "../regions";
export declare type ISelectedRegionTransform = (region: IRegion, event: MouseEvent, coords?: ICoordinateData) => IRegion;
export interface ISelectableProps {
    /**
     * If `false`, only a single region of a single column/row/cell may be
     * selected at one time. Using <kbd class="pt-key">ctrl</kbd> or
     * <kbd class="pt-key">meta</kbd> key will have no effect,
     * and a mouse drag will select the current column/row/cell only.
     */
    allowMultipleSelection: boolean;
    /**
     * When the user selects something, this callback is called with a new
     * array of Regions. This array should be considered the new selection
     * state for the entire table.
     */
    onSelection: (regions: IRegion[]) => void;
    /**
     * An array containing the table's selection Regions.
     */
    selectedRegions: IRegion[];
    /**
     * An optional transform function that will be applied to the located
     * `Region`.
     *
     * This allows you to, for example, convert cell `Region`s into row
     * `Region`s while maintaining the existing multi-select and meta-click
     * functionality.
     */
    selectedRegionTransform?: ISelectedRegionTransform;
}
export interface IDragSelectableProps extends ISelectableProps {
    /**
     * A callback that determines a `Region` for the single `MouseEvent`. If
     * no valid region can be found, `null` may be returned.
     */
    locateClick: (event: MouseEvent) => IRegion;
    /**
     * A callback that determines a `Region` for the `MouseEvent` and
     * coordinate data representing a drag. If no valid region can be found,
     * `null` may be returned.
     */
    locateDrag: (event: MouseEvent, coords: ICoordinateData) => IRegion;
}
export declare class DragSelectable extends React.Component<IDragSelectableProps, {}> {
    static isLeftClick(event: MouseEvent): boolean;
    render(): JSX.Element;
    private getDraggableProps();
    private handleActivate;
    private handleDragMove;
    private handleClick;
}
