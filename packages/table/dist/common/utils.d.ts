/// <reference types="dom4" />
/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { IProps } from "@blueprintjs/core";
import * as React from "react";
/**
 * Re-declare matching types from the classnames library;
 */
export declare type ClassValue = string | number | ClassDictionary | ClassArray;
export interface ClassDictionary {
    [id: string]: boolean;
}
export interface ClassArray extends Array<ClassValue> {
}
export declare const Utils: {
    assignClasses<P extends IProps>(elem: React.ReactElement<P>, ...extendedClasses: ClassValue[]): React.ReactElement<P>;
    times<T>(n: number, callback: (i: number) => T): T[];
    accumulate(numbers: number[]): number[];
    toBase26Alpha(num: number): string;
    binarySearch(value: number, high: number, lookup: (index: number) => number): number;
    arrayOfLength<T>(array: T[], length: number, fillValue: T): T[];
    assignSparseValues<T>(defaults: T[], sparseOverrides: T[]): T[];
    measureElementTextContent(element: Element): TextMetrics;
    clamp(value: number, min?: number, max?: number): number;
};
