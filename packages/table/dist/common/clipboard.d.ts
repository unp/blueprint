/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
export declare const Clipboard: {
    applySelectableStyles(elem: HTMLElement): HTMLElement;
    copyCells(cells: string[][]): boolean;
    copyString(value: string): boolean;
    copyElement(elem: HTMLElement, plaintext?: string): boolean;
    isCopySupported(): boolean;
};
