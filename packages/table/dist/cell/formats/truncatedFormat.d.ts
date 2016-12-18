/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
import { IProps } from "@blueprintjs/core";
import * as React from "react";
export declare enum TruncatedPopoverMode {
    ALWAYS = 0,
    NEVER = 1,
    WHEN_TRUNCATED = 2,
}
export interface ITruncatedFormatProps extends IProps {
    children?: string;
    /**
     * Sets the popover content style to `white-space: pre` if `true` or
     * `white-space: normal` if `false`.
     * @default true
     */
    preformatted?: boolean;
    /**
     * Configures when the popover is shown with the `TruncatedPopoverMode` enum.
     *
     * The enum values are:
     * - `ALWAYS` - show the popover (default).
     * - `NEVER` - don't show the popover.
     * - `WHEN_TRUNCATED` - show the popover only when the text is truncated.
     */
    showPopover?: TruncatedPopoverMode;
    /**
     * Number of characters that are displayed before being truncated and appended with
     * the `truncationSuffix` prop. A value of 0 will disable truncation.
     * @default 80
     */
    truncateLength?: number;
    /**
     * The string that is appended to the display string if it is truncated.
     * @default "..."
     */
    truncationSuffix?: string;
}
export declare class TruncatedFormat extends React.Component<ITruncatedFormatProps, {}> {
    static defaultProps: ITruncatedFormatProps;
    render(): JSX.Element;
    private shouldShowPopover(content);
}
