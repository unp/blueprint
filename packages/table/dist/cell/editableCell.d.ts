import * as React from "react";
import { ICellProps } from "./cell";
export interface IEditableCellProps extends ICellProps {
    /**
     * The value displayed in the text box. Be sure to update this value when
     * rendering this component after a confirmed change.
     */
    value?: string;
    /**
     * A listener that is triggered if the user cancels the edit. This is
     * important to listen to if you are doing anything with onChange events,
     * since you'll likely want to revert whatever changes you made.
     */
    onCancel?: (value: string) => void;
    /**
     * A listener that is triggered as soon as the editable name is modified.
     * This can be due, for example, to keyboard input or the clipboard.
     */
    onChange?: (value: string) => void;
    /**
     * A listener that is triggered once the editing is confirmed. This is
     * usually due to the <kbd class="pt-key">return</kbd> (or
     * <kbd class="pt-key">enter</kbd>) key press.
     */
    onConfirm?: (value: string) => void;
}
export declare class EditableCell extends React.Component<IEditableCellProps, {}> {
    private cellElement;
    render(): JSX.Element;
    private handleCellRef;
    private handleCellDoubleClick;
}
