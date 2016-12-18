/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
/* istanbul ignore next */
exports.Clipboard = {
    /**
     * Overrides the inherited CSS of the element to make sure it is
     * selectable. This method also makes the element pseudo-invisible.
     */
    applySelectableStyles: function (elem) {
        elem.style.overflow = "hidden";
        elem.style.height = "0px";
        elem.style.setProperty("-webkit-user-select", "all");
        elem.style.setProperty("-moz-user-select", "all");
        elem.style.setProperty("-ms-user-select", "all");
        elem.style.setProperty("user-select", "all");
        return elem;
    },
    /**
     * Copies table cells to the clipboard. The parameter is a row-major
     * 2-dimensional `Array` of strings and can contain nulls. We assume all
     * rows are the same length. If not, the cells will still be copied, but
     * the columns may not align. Returns a boolean indicating whether the
     * copy succeeded.
     *
     * See `Clipboard.copy`
     */
    copyCells: function (cells) {
        var table = document.createElement("table");
        exports.Clipboard.applySelectableStyles(table);
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var row = cells_1[_i];
            var tr = table.appendChild(document.createElement("tr"));
            for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
                var cell = row_1[_a];
                var td = tr.appendChild(document.createElement("td"));
                td.textContent = cell;
            }
        }
        var tsv = cells.map(function (row) { return row.join("\t"); }).join("\n");
        return exports.Clipboard.copyElement(table, tsv);
    },
    /**
     * Copies the text to the clipboard. Returns a boolean
     * indicating whether the copy succeeded.
     *
     * See `Clipboard.copy`
     */
    copyString: function (value) {
        var text = document.createElement("textarea");
        exports.Clipboard.applySelectableStyles(text);
        text.value = value;
        return exports.Clipboard.copyElement(text, value);
    },
    /**
     * Copies the element and its children to the clipboard. Returns a boolean
     * indicating whether the copy succeeded.
     *
     * If a plaintext argument is supplied, we add both the text/html and
     * text/plain mime types to the clipboard. This preserves the built in
     * semantics of copying elements to the clipboard while allowing custom
     * plaintext output for programs that can't cope with HTML data in the
     * clipboard.
     *
     * Verified on Firefox 47, Chrome 51.
     *
     * Note: Sometimes the copy does not succeed. Presumably, in order to
     * prevent memory issues, browsers will limit the total amount of data you
     * can copy to the clipboard. Based on ad hoc testing, we found an
     * inconsistent limit at about 300KB or 40,000 cells. Depending on the on
     * the content of cells, your limits may vary.
     */
    copyElement: function (elem, plaintext) {
        if (!exports.Clipboard.isCopySupported()) {
            return false;
        }
        // must be document.body instead of document.documentElement for firefox
        document.body.appendChild(elem);
        try {
            window.getSelection().selectAllChildren(elem);
            if (plaintext != null) {
                // add plaintext fallback
                // http://stackoverflow.com/questions/23211018/copy-to-clipboard-with-jquery-js-in-chrome
                elem.addEventListener("copy", function (e) {
                    e.preventDefault();
                    var clipboardData = e.clipboardData || window.clipboardData;
                    if (clipboardData != null) {
                        clipboardData.setData("text/html", elem.outerHTML);
                        clipboardData.setData("text/plain", plaintext);
                    }
                });
            }
            return document.execCommand("copy");
        }
        catch (err) {
            return false;
        }
        finally {
            document.body.removeChild(elem);
        }
    },
    /**
     * Returns a boolean indicating whether the current browser nominally
     * supports the `copy` operation using the `execCommand` API.
     */
    isCopySupported: function () {
        return document.queryCommandSupported != null && document.queryCommandSupported("copy");
    },
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vY2xpcGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUVILDBCQUEwQjtBQUViLGlCQUFTLEdBQUc7SUFDckI7OztPQUdHO0lBQ0gscUJBQXFCLFlBQUMsSUFBaUI7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxTQUFTLFlBQUMsS0FBaUI7UUFDdkIsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxpQkFBUyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxDQUFjLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLLENBQUM7WUFBbkIsSUFBTSxHQUFHLGNBQUE7WUFDVixJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRCxHQUFHLENBQUMsQ0FBZSxVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRyxDQUFDO2dCQUFsQixJQUFNLElBQUksWUFBQTtnQkFDWCxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDekI7U0FDSjtRQUVELElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsaUJBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFVBQVUsWUFBQyxLQUFhO1FBQ3BCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsaUJBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixNQUFNLENBQUMsaUJBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxXQUFXLFlBQUMsSUFBaUIsRUFBRSxTQUFrQjtRQUM3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFTLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELHdFQUF3RTtRQUN4RSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUM7WUFDRCxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFOUMsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLHlCQUF5QjtnQkFDekIseUZBQXlGO2dCQUN6RixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQUMsQ0FBVTtvQkFDckMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQixJQUFNLGFBQWEsR0FBSSxDQUFTLENBQUMsYUFBYSxJQUFLLE1BQWMsQ0FBQyxhQUFhLENBQUM7b0JBQ2hGLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ25ELGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO2dCQUFTLENBQUM7WUFDUCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILGVBQWU7UUFDWCxNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixJQUFJLElBQUksSUFBSSxRQUFRLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUYsQ0FBQztDQUNKLENBQUMiLCJmaWxlIjoiY29tbW9uL2NsaXBib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cbmV4cG9ydCBjb25zdCBDbGlwYm9hcmQgPSB7XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGVzIHRoZSBpbmhlcml0ZWQgQ1NTIG9mIHRoZSBlbGVtZW50IHRvIG1ha2Ugc3VyZSBpdCBpc1xuICAgICAqIHNlbGVjdGFibGUuIFRoaXMgbWV0aG9kIGFsc28gbWFrZXMgdGhlIGVsZW1lbnQgcHNldWRvLWludmlzaWJsZS5cbiAgICAgKi9cbiAgICBhcHBseVNlbGVjdGFibGVTdHlsZXMoZWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgZWxlbS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgIGVsZW0uc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcbiAgICAgICAgZWxlbS5zdHlsZS5zZXRQcm9wZXJ0eShcIi13ZWJraXQtdXNlci1zZWxlY3RcIiwgXCJhbGxcIik7XG4gICAgICAgIGVsZW0uc3R5bGUuc2V0UHJvcGVydHkoXCItbW96LXVzZXItc2VsZWN0XCIsIFwiYWxsXCIpO1xuICAgICAgICBlbGVtLnN0eWxlLnNldFByb3BlcnR5KFwiLW1zLXVzZXItc2VsZWN0XCIsIFwiYWxsXCIpO1xuICAgICAgICBlbGVtLnN0eWxlLnNldFByb3BlcnR5KFwidXNlci1zZWxlY3RcIiwgXCJhbGxcIik7XG4gICAgICAgIHJldHVybiBlbGVtO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgdGFibGUgY2VsbHMgdG8gdGhlIGNsaXBib2FyZC4gVGhlIHBhcmFtZXRlciBpcyBhIHJvdy1tYWpvclxuICAgICAqIDItZGltZW5zaW9uYWwgYEFycmF5YCBvZiBzdHJpbmdzIGFuZCBjYW4gY29udGFpbiBudWxscy4gV2UgYXNzdW1lIGFsbFxuICAgICAqIHJvd3MgYXJlIHRoZSBzYW1lIGxlbmd0aC4gSWYgbm90LCB0aGUgY2VsbHMgd2lsbCBzdGlsbCBiZSBjb3BpZWQsIGJ1dFxuICAgICAqIHRoZSBjb2x1bW5zIG1heSBub3QgYWxpZ24uIFJldHVybnMgYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGVcbiAgICAgKiBjb3B5IHN1Y2NlZWRlZC5cbiAgICAgKlxuICAgICAqIFNlZSBgQ2xpcGJvYXJkLmNvcHlgXG4gICAgICovXG4gICAgY29weUNlbGxzKGNlbGxzOiBzdHJpbmdbXVtdKSB7XG4gICAgICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICAgICAgICBDbGlwYm9hcmQuYXBwbHlTZWxlY3RhYmxlU3R5bGVzKHRhYmxlKTtcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgY2VsbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyID0gdGFibGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2VsbCBvZiByb3cpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZCA9IHRyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKSk7XG4gICAgICAgICAgICAgICAgdGQudGV4dENvbnRlbnQgPSBjZWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHN2ID0gY2VsbHMubWFwKChyb3cpID0+IHJvdy5qb2luKFwiXFx0XCIpKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICByZXR1cm4gQ2xpcGJvYXJkLmNvcHlFbGVtZW50KHRhYmxlLCB0c3YpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgdGhlIHRleHQgdG8gdGhlIGNsaXBib2FyZC4gUmV0dXJucyBhIGJvb2xlYW5cbiAgICAgKiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGNvcHkgc3VjY2VlZGVkLlxuICAgICAqXG4gICAgICogU2VlIGBDbGlwYm9hcmQuY29weWBcbiAgICAgKi9cbiAgICBjb3B5U3RyaW5nKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgQ2xpcGJvYXJkLmFwcGx5U2VsZWN0YWJsZVN0eWxlcyh0ZXh0KTtcbiAgICAgICAgdGV4dC52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIHJldHVybiBDbGlwYm9hcmQuY29weUVsZW1lbnQodGV4dCwgdmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgdGhlIGVsZW1lbnQgYW5kIGl0cyBjaGlsZHJlbiB0byB0aGUgY2xpcGJvYXJkLiBSZXR1cm5zIGEgYm9vbGVhblxuICAgICAqIGluZGljYXRpbmcgd2hldGhlciB0aGUgY29weSBzdWNjZWVkZWQuXG4gICAgICpcbiAgICAgKiBJZiBhIHBsYWludGV4dCBhcmd1bWVudCBpcyBzdXBwbGllZCwgd2UgYWRkIGJvdGggdGhlIHRleHQvaHRtbCBhbmRcbiAgICAgKiB0ZXh0L3BsYWluIG1pbWUgdHlwZXMgdG8gdGhlIGNsaXBib2FyZC4gVGhpcyBwcmVzZXJ2ZXMgdGhlIGJ1aWx0IGluXG4gICAgICogc2VtYW50aWNzIG9mIGNvcHlpbmcgZWxlbWVudHMgdG8gdGhlIGNsaXBib2FyZCB3aGlsZSBhbGxvd2luZyBjdXN0b21cbiAgICAgKiBwbGFpbnRleHQgb3V0cHV0IGZvciBwcm9ncmFtcyB0aGF0IGNhbid0IGNvcGUgd2l0aCBIVE1MIGRhdGEgaW4gdGhlXG4gICAgICogY2xpcGJvYXJkLlxuICAgICAqXG4gICAgICogVmVyaWZpZWQgb24gRmlyZWZveCA0NywgQ2hyb21lIDUxLlxuICAgICAqXG4gICAgICogTm90ZTogU29tZXRpbWVzIHRoZSBjb3B5IGRvZXMgbm90IHN1Y2NlZWQuIFByZXN1bWFibHksIGluIG9yZGVyIHRvXG4gICAgICogcHJldmVudCBtZW1vcnkgaXNzdWVzLCBicm93c2VycyB3aWxsIGxpbWl0IHRoZSB0b3RhbCBhbW91bnQgb2YgZGF0YSB5b3VcbiAgICAgKiBjYW4gY29weSB0byB0aGUgY2xpcGJvYXJkLiBCYXNlZCBvbiBhZCBob2MgdGVzdGluZywgd2UgZm91bmQgYW5cbiAgICAgKiBpbmNvbnNpc3RlbnQgbGltaXQgYXQgYWJvdXQgMzAwS0Igb3IgNDAsMDAwIGNlbGxzLiBEZXBlbmRpbmcgb24gdGhlIG9uXG4gICAgICogdGhlIGNvbnRlbnQgb2YgY2VsbHMsIHlvdXIgbGltaXRzIG1heSB2YXJ5LlxuICAgICAqL1xuICAgIGNvcHlFbGVtZW50KGVsZW06IEhUTUxFbGVtZW50LCBwbGFpbnRleHQ/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFDbGlwYm9hcmQuaXNDb3B5U3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG11c3QgYmUgZG9jdW1lbnQuYm9keSBpbnN0ZWFkIG9mIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCBmb3IgZmlyZWZveFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnNlbGVjdEFsbENoaWxkcmVuKGVsZW0pO1xuXG4gICAgICAgICAgICBpZiAocGxhaW50ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgcGxhaW50ZXh0IGZhbGxiYWNrXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMzIxMTAxOC9jb3B5LXRvLWNsaXBib2FyZC13aXRoLWpxdWVyeS1qcy1pbi1jaHJvbWVcbiAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIChlOiBVSUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IChlIGFzIGFueSkuY2xpcGJvYXJkRGF0YSB8fCAod2luZG93IGFzIGFueSkuY2xpcGJvYXJkRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaXBib2FyZERhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpcGJvYXJkRGF0YS5zZXREYXRhKFwidGV4dC9odG1sXCIsIGVsZW0ub3V0ZXJIVE1MKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaXBib2FyZERhdGEuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgcGxhaW50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgbm9taW5hbGx5XG4gICAgICogc3VwcG9ydHMgdGhlIGBjb3B5YCBvcGVyYXRpb24gdXNpbmcgdGhlIGBleGVjQ29tbWFuZGAgQVBJLlxuICAgICAqL1xuICAgIGlzQ29weVN1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCAhPSBudWxsICYmIGRvY3VtZW50LnF1ZXJ5Q29tbWFuZFN1cHBvcnRlZChcImNvcHlcIik7XG4gICAgfSxcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
