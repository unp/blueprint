/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import * as React from "react";
/**
 * A React component that measures and rounds the size of its only child. This
 * is necessary due to a Chrome bug that prevents scrolling when the size is
 * changed to a fractional value. See this JSFiddle for a repro of the issue:
 * https://jsfiddle.net/2rmz7p1d/5/
 */
export declare class RoundSize extends React.Component<{}, {}> {
    private internalElement;
    private containerElement;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private copyRoundedSize();
    private setInternalRef;
    private setContainerRef;
}
