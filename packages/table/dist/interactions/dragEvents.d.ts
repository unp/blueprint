/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { IDragHandler } from "./draggable";
export declare class DragEvents {
    static DOUBLE_CLICK_TIMEOUT_MSEC: number;
    static isAdditive(event: MouseEvent): boolean;
    private handler;
    private element;
    private activationCoordinates;
    private doubleClickTimeoutToken;
    private isActivated;
    private isDragging;
    private lastCoordinates;
    attach(element: HTMLElement, handler: IDragHandler): this;
    detach(): void;
    private isValidDragHandler(handler);
    private attachDocumentEventListeners();
    private detachDocumentEventListeners();
    private initCoordinateData(event);
    private updateCoordinateData(event);
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
}
