/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var classNames = require("classnames");
var React = require("react");
;
// tslint:enable
/**
 * Since Firefox doesn't provide a computed "font" property, we manually
 * construct it using the ordered properties that can be specifed in CSS.
 */
var CSS_FONT_PROPERTIES = [
    "font-style",
    "font-variant",
    "font-weight",
    "font-size",
    "font-family",
];
exports.Utils = {
    /**
     * Returns a clone of the ReactElement with a className that includes the
     * element's original className and any other classes passed in with variadic
     * arguments matching the `classNames` api.
     */
    assignClasses: function (elem) {
        var extendedClasses = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extendedClasses[_i - 1] = arguments[_i];
        }
        var classes = classNames.apply(void 0, [elem.props.className].concat(extendedClasses));
        return React.cloneElement(elem, { className: classes });
    },
    /**
     * Invokes the callback `n` times, collecting the results in an array, which
     * is the return value. Similar to _.times
     */
    times: function (n, callback) {
        return Array.apply(null, Array(n)).map(function (_none, index) { return callback(index); });
    },
    /**
     * Takes an array of numbers, returns an array of numbers of the same length in which each
     * value is the sum of current and previous values in the input array.
     *
     * Example input:  [10, 20, 50]
     *         output: [10, 30, 80]
     */
    accumulate: function (numbers) {
        var result = [];
        var sum = 0;
        for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
            var num = numbers_1[_i];
            sum += num;
            result.push(sum);
        }
        return result;
    },
    /**
     * Returns traditional spreadsheet-style column names
     * e.g. (A, B, ..., Z, AA, AB, ..., ZZ, AAA, AAB, ...).
     *
     * Note that this isn't technically mathematically equivalent to base 26 since
     * there is no zero element.
     */
    toBase26Alpha: function (num) {
        var str = "";
        while (true) {
            var letter = num % 26;
            str = String.fromCharCode(65 + letter) + str;
            num = num - letter;
            if (num <= 0) {
                return str;
            }
            num = (num / 26) - 1;
        }
    },
    /**
     * Performs the binary search algorithm to find the index of the `value`
     * parameter in a sorted list of numbers. If `value` is not in the list, the
     * index where `value` can be inserted to maintain the sort is returned.
     *
     * Unlike a typical binary search implementation, we use a `lookup`
     * callback to access the sorted list of numbers instead of an array. This
     * avoids additional storage overhead.
     *
     * We use this to, for example, find the index of a row/col given its client
     * coordinate.
     *
     * Adapted from lodash https://github.com/lodash/lodash/blob/4.11.2/lodash.js#L3579
     *
     * @param value - the query value
     * @param high - the length of the sorted list of numbers
     * @param lookup - returns the number from the list at the supplied index
     */
    binarySearch: function (value, high, lookup) {
        var low = 0;
        while (low < high) {
            var mid = Math.floor((low + high) / 2.0);
            var computed = lookup(mid);
            if (computed < value) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        return high;
    },
    /**
     * Returns a copy of the array that will have a length of the supplied parameter.
     * If the array is too long, it will be truncated. If it is too short, it will be
     * filled with the suppleid `fillValue` argument.
     *
     * @param array - the `Array` to copy and adjust
     * @param length - the target length of the array
     * @param fillValue - the value to add to the array if it is too short
     */
    arrayOfLength: function (array, length, fillValue) {
        if (array.length > length) {
            return array.slice(0, length);
        }
        array = array.slice();
        while (array.length < length) {
            array.push(fillValue);
        }
        return array;
    },
    /**
     * Takes in one full array of values and one sparse array of the same
     * length and type. Returns a copy of the `defaults` array, where each
     * value is replaced with the corresponding non-null value at the same
     * index in `sparseOverrides`.
     *
     * @param defaults - the full array of default values
     * @param sparseOverrides - the sparse array of override values
     */
    assignSparseValues: function (defaults, sparseOverrides) {
        if (sparseOverrides == null || defaults.length !== sparseOverrides.length) {
            return defaults;
        }
        defaults = defaults.slice();
        for (var i = 0; i < defaults.length; i++) {
            var override = sparseOverrides[i];
            if (override != null) {
                defaults[i] = override;
            }
        }
        return defaults;
    },
    /**
     * Measures the bounds of supplied element's textContent.
     *
     * We use the computed font from the supplied element and a non-DOM canvas
     * context to measure the text.
     *
     * Returns a `TextMetrics` object.
     */
    measureElementTextContent: function (element) {
        var context = document.createElement("canvas").getContext("2d");
        var style = getComputedStyle(element, null);
        context.font = CSS_FONT_PROPERTIES.map(function (prop) { return style.getPropertyValue(prop); }).join(" ");
        return context.measureText(element.textContent);
    },
    /**
     * Given a number, returns a value that is clamped within a
     * minimum/maximum bounded range. The minimum and maximum are optional. If
     * either is missing, that extrema limit is not applied.
     *
     * Assumes max >= min.
     */
    clamp: function (value, min, max) {
        if (min != null && value < min) {
            value = min;
        }
        if (max != null && value > max) {
            value = max;
        }
        return value;
    },
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7O0FBR0gsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFZMEIsQ0FBQztBQUMxRCxnQkFBZ0I7QUFFaEI7OztHQUdHO0FBQ0gsSUFBTSxtQkFBbUIsR0FBRztJQUN4QixZQUFZO0lBQ1osY0FBYztJQUNkLGFBQWE7SUFDYixXQUFXO0lBQ1gsYUFBYTtDQUNoQixDQUFDO0FBRVcsYUFBSyxHQUFHO0lBQ2pCOzs7O09BSUc7SUFDSCxhQUFhLFlBQW1CLElBQTJCO1FBQUUseUJBQWdDO2FBQWhDLFdBQWdDLENBQWhDLHNCQUFnQyxDQUFoQyxJQUFnQztZQUFoQyx3Q0FBZ0M7O1FBQ3pGLElBQU0sT0FBTyxHQUFHLFVBQVUsZ0JBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLFNBQUssZUFBZSxFQUFDLENBQUM7UUFDckUsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFHLE9BQU8sRUFBVyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssWUFBSSxDQUFTLEVBQUUsUUFBMEI7UUFDMUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQVUsRUFBRSxLQUFhLElBQUssT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFVBQVUsWUFBQyxPQUFpQjtRQUN4QixJQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDNUIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxDQUFDLENBQWMsVUFBTyxFQUFQ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Q0FBQztnQkFDbkIsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUMzQixDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCx5QkFBeUIsWUFBQyxPQUFnQjtRQUN0QyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLFlBQUMsS0FBYSxFQUFFLEdBQVksRUFBRSxHQUFZO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0IsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNoQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3QixLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFDIiwiZmlsZSI6ImNvbW1vbi91dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCB7IElQcm9wcyB9IGZyb20gXCJAYmx1ZXByaW50anMvY29yZVwiO1xuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbi8qKlxuICogUmUtZGVjbGFyZSBtYXRjaGluZyB0eXBlcyBmcm9tIHRoZSBjbGFzc25hbWVzIGxpYnJhcnk7XG4gKi9cbmV4cG9ydCB0eXBlIENsYXNzVmFsdWUgPSBzdHJpbmcgfCBudW1iZXIgfCBDbGFzc0RpY3Rpb25hcnkgfCBDbGFzc0FycmF5O1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZSBpbnRlcmZhY2UtbmFtZVxuZXhwb3J0IGludGVyZmFjZSBDbGFzc0RpY3Rpb25hcnkge1xuICAgIFtpZDogc3RyaW5nXTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbGFzc0FycmF5IGV4dGVuZHMgQXJyYXk8Q2xhc3NWYWx1ZT4geyB9O1xuLy8gdHNsaW50OmVuYWJsZVxuXG4vKipcbiAqIFNpbmNlIEZpcmVmb3ggZG9lc24ndCBwcm92aWRlIGEgY29tcHV0ZWQgXCJmb250XCIgcHJvcGVydHksIHdlIG1hbnVhbGx5XG4gKiBjb25zdHJ1Y3QgaXQgdXNpbmcgdGhlIG9yZGVyZWQgcHJvcGVydGllcyB0aGF0IGNhbiBiZSBzcGVjaWZlZCBpbiBDU1MuXG4gKi9cbmNvbnN0IENTU19GT05UX1BST1BFUlRJRVMgPSBbXG4gICAgXCJmb250LXN0eWxlXCIsXG4gICAgXCJmb250LXZhcmlhbnRcIixcbiAgICBcImZvbnQtd2VpZ2h0XCIsXG4gICAgXCJmb250LXNpemVcIixcbiAgICBcImZvbnQtZmFtaWx5XCIsXG5dO1xuXG5leHBvcnQgY29uc3QgVXRpbHMgPSB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNsb25lIG9mIHRoZSBSZWFjdEVsZW1lbnQgd2l0aCBhIGNsYXNzTmFtZSB0aGF0IGluY2x1ZGVzIHRoZVxuICAgICAqIGVsZW1lbnQncyBvcmlnaW5hbCBjbGFzc05hbWUgYW5kIGFueSBvdGhlciBjbGFzc2VzIHBhc3NlZCBpbiB3aXRoIHZhcmlhZGljXG4gICAgICogYXJndW1lbnRzIG1hdGNoaW5nIHRoZSBgY2xhc3NOYW1lc2AgYXBpLlxuICAgICAqL1xuICAgIGFzc2lnbkNsYXNzZXM8UCBleHRlbmRzIElQcm9wcz4oZWxlbTogUmVhY3QuUmVhY3RFbGVtZW50PFA+LCAuLi5leHRlbmRlZENsYXNzZXM6IENsYXNzVmFsdWVbXSkge1xuICAgICAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NOYW1lcyhlbGVtLnByb3BzLmNsYXNzTmFtZSwgLi4uZXh0ZW5kZWRDbGFzc2VzKTtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChlbGVtLCB7Y2xhc3NOYW1lIDogY2xhc3Nlc30gYXMgSVByb3BzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSW52b2tlcyB0aGUgY2FsbGJhY2sgYG5gIHRpbWVzLCBjb2xsZWN0aW5nIHRoZSByZXN1bHRzIGluIGFuIGFycmF5LCB3aGljaFxuICAgICAqIGlzIHRoZSByZXR1cm4gdmFsdWUuIFNpbWlsYXIgdG8gXy50aW1lc1xuICAgICAqL1xuICAgIHRpbWVzPFQ+KG46IG51bWJlciwgY2FsbGJhY2s6IChpOiBudW1iZXIpID0+IFQpOiBUW10ge1xuICAgICAgICByZXR1cm4gQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkobikpLm1hcCgoX25vbmU6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gY2FsbGJhY2soaW5kZXgpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYW4gYXJyYXkgb2YgbnVtYmVycywgcmV0dXJucyBhbiBhcnJheSBvZiBudW1iZXJzIG9mIHRoZSBzYW1lIGxlbmd0aCBpbiB3aGljaCBlYWNoXG4gICAgICogdmFsdWUgaXMgdGhlIHN1bSBvZiBjdXJyZW50IGFuZCBwcmV2aW91cyB2YWx1ZXMgaW4gdGhlIGlucHV0IGFycmF5LlxuICAgICAqXG4gICAgICogRXhhbXBsZSBpbnB1dDogIFsxMCwgMjAsIDUwXVxuICAgICAqICAgICAgICAgb3V0cHV0OiBbMTAsIDMwLCA4MF1cbiAgICAgKi9cbiAgICBhY2N1bXVsYXRlKG51bWJlcnM6IG51bWJlcltdKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgbnVtIG9mIG51bWJlcnMpIHtcbiAgICAgICAgICAgIHN1bSArPSBudW07XG4gICAgICAgICAgICByZXN1bHQucHVzaChzdW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJhZGl0aW9uYWwgc3ByZWFkc2hlZXQtc3R5bGUgY29sdW1uIG5hbWVzXG4gICAgICogZS5nLiAoQSwgQiwgLi4uLCBaLCBBQSwgQUIsIC4uLiwgWlosIEFBQSwgQUFCLCAuLi4pLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHRoaXMgaXNuJ3QgdGVjaG5pY2FsbHkgbWF0aGVtYXRpY2FsbHkgZXF1aXZhbGVudCB0byBiYXNlIDI2IHNpbmNlXG4gICAgICogdGhlcmUgaXMgbm8gemVybyBlbGVtZW50LlxuICAgICAqL1xuICAgIHRvQmFzZTI2QWxwaGEobnVtOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHN0ciA9IFwiXCI7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBsZXQgbGV0dGVyID0gbnVtICUgMjY7XG4gICAgICAgICAgICBzdHIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgbGV0dGVyKSArIHN0cjtcbiAgICAgICAgICAgIG51bSA9IG51bSAtIGxldHRlcjtcbiAgICAgICAgICAgIGlmIChudW0gPD0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBudW0gPSAobnVtIC8gMjYpIC0gMTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyB0aGUgYmluYXJ5IHNlYXJjaCBhbGdvcml0aG0gdG8gZmluZCB0aGUgaW5kZXggb2YgdGhlIGB2YWx1ZWBcbiAgICAgKiBwYXJhbWV0ZXIgaW4gYSBzb3J0ZWQgbGlzdCBvZiBudW1iZXJzLiBJZiBgdmFsdWVgIGlzIG5vdCBpbiB0aGUgbGlzdCwgdGhlXG4gICAgICogaW5kZXggd2hlcmUgYHZhbHVlYCBjYW4gYmUgaW5zZXJ0ZWQgdG8gbWFpbnRhaW4gdGhlIHNvcnQgaXMgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBVbmxpa2UgYSB0eXBpY2FsIGJpbmFyeSBzZWFyY2ggaW1wbGVtZW50YXRpb24sIHdlIHVzZSBhIGBsb29rdXBgXG4gICAgICogY2FsbGJhY2sgdG8gYWNjZXNzIHRoZSBzb3J0ZWQgbGlzdCBvZiBudW1iZXJzIGluc3RlYWQgb2YgYW4gYXJyYXkuIFRoaXNcbiAgICAgKiBhdm9pZHMgYWRkaXRpb25hbCBzdG9yYWdlIG92ZXJoZWFkLlxuICAgICAqXG4gICAgICogV2UgdXNlIHRoaXMgdG8sIGZvciBleGFtcGxlLCBmaW5kIHRoZSBpbmRleCBvZiBhIHJvdy9jb2wgZ2l2ZW4gaXRzIGNsaWVudFxuICAgICAqIGNvb3JkaW5hdGUuXG4gICAgICpcbiAgICAgKiBBZGFwdGVkIGZyb20gbG9kYXNoIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvNC4xMS4yL2xvZGFzaC5qcyNMMzU3OVxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIC0gdGhlIHF1ZXJ5IHZhbHVlXG4gICAgICogQHBhcmFtIGhpZ2ggLSB0aGUgbGVuZ3RoIG9mIHRoZSBzb3J0ZWQgbGlzdCBvZiBudW1iZXJzXG4gICAgICogQHBhcmFtIGxvb2t1cCAtIHJldHVybnMgdGhlIG51bWJlciBmcm9tIHRoZSBsaXN0IGF0IHRoZSBzdXBwbGllZCBpbmRleFxuICAgICAqL1xuICAgIGJpbmFyeVNlYXJjaCh2YWx1ZTogbnVtYmVyLCBoaWdoOiBudW1iZXIsIGxvb2t1cDogKGluZGV4OiBudW1iZXIpID0+IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCBsb3cgPSAwO1xuICAgICAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgICAgICAgY29uc3QgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyLjApO1xuICAgICAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBsb29rdXAobWlkKTtcbiAgICAgICAgICAgIGlmIChjb21wdXRlZCA8IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbG93ID0gbWlkICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGlnaDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIGFycmF5IHRoYXQgd2lsbCBoYXZlIGEgbGVuZ3RoIG9mIHRoZSBzdXBwbGllZCBwYXJhbWV0ZXIuXG4gICAgICogSWYgdGhlIGFycmF5IGlzIHRvbyBsb25nLCBpdCB3aWxsIGJlIHRydW5jYXRlZC4gSWYgaXQgaXMgdG9vIHNob3J0LCBpdCB3aWxsIGJlXG4gICAgICogZmlsbGVkIHdpdGggdGhlIHN1cHBsZWlkIGBmaWxsVmFsdWVgIGFyZ3VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIGFycmF5IC0gdGhlIGBBcnJheWAgdG8gY29weSBhbmQgYWRqdXN0XG4gICAgICogQHBhcmFtIGxlbmd0aCAtIHRoZSB0YXJnZXQgbGVuZ3RoIG9mIHRoZSBhcnJheVxuICAgICAqIEBwYXJhbSBmaWxsVmFsdWUgLSB0aGUgdmFsdWUgdG8gYWRkIHRvIHRoZSBhcnJheSBpZiBpdCBpcyB0b28gc2hvcnRcbiAgICAgKi9cbiAgICBhcnJheU9mTGVuZ3RoPFQ+KGFycmF5OiBUW10sIGxlbmd0aDogbnVtYmVyLCBmaWxsVmFsdWU6IFQpOiBUW10ge1xuICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuc2xpY2UoMCwgbGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFycmF5ID0gYXJyYXkuc2xpY2UoKTtcbiAgICAgICAgd2hpbGUgKGFycmF5Lmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChmaWxsVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgaW4gb25lIGZ1bGwgYXJyYXkgb2YgdmFsdWVzIGFuZCBvbmUgc3BhcnNlIGFycmF5IG9mIHRoZSBzYW1lXG4gICAgICogbGVuZ3RoIGFuZCB0eXBlLiBSZXR1cm5zIGEgY29weSBvZiB0aGUgYGRlZmF1bHRzYCBhcnJheSwgd2hlcmUgZWFjaFxuICAgICAqIHZhbHVlIGlzIHJlcGxhY2VkIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgbm9uLW51bGwgdmFsdWUgYXQgdGhlIHNhbWVcbiAgICAgKiBpbmRleCBpbiBgc3BhcnNlT3ZlcnJpZGVzYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkZWZhdWx0cyAtIHRoZSBmdWxsIGFycmF5IG9mIGRlZmF1bHQgdmFsdWVzXG4gICAgICogQHBhcmFtIHNwYXJzZU92ZXJyaWRlcyAtIHRoZSBzcGFyc2UgYXJyYXkgb2Ygb3ZlcnJpZGUgdmFsdWVzXG4gICAgICovXG4gICAgYXNzaWduU3BhcnNlVmFsdWVzPFQ+KGRlZmF1bHRzOiBUW10sIHNwYXJzZU92ZXJyaWRlczogVFtdKSB7XG4gICAgICAgIGlmIChzcGFyc2VPdmVycmlkZXMgPT0gbnVsbCB8fCBkZWZhdWx0cy5sZW5ndGggIT09IHNwYXJzZU92ZXJyaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHRzID0gZGVmYXVsdHMuc2xpY2UoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZhdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb3ZlcnJpZGUgPSBzcGFyc2VPdmVycmlkZXNbaV07XG4gICAgICAgICAgICBpZiAob3ZlcnJpZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRzW2ldID0gb3ZlcnJpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZWFzdXJlcyB0aGUgYm91bmRzIG9mIHN1cHBsaWVkIGVsZW1lbnQncyB0ZXh0Q29udGVudC5cbiAgICAgKlxuICAgICAqIFdlIHVzZSB0aGUgY29tcHV0ZWQgZm9udCBmcm9tIHRoZSBzdXBwbGllZCBlbGVtZW50IGFuZCBhIG5vbi1ET00gY2FudmFzXG4gICAgICogY29udGV4dCB0byBtZWFzdXJlIHRoZSB0ZXh0LlxuICAgICAqXG4gICAgICogUmV0dXJucyBhIGBUZXh0TWV0cmljc2Agb2JqZWN0LlxuICAgICAqL1xuICAgIG1lYXN1cmVFbGVtZW50VGV4dENvbnRlbnQoZWxlbWVudDogRWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKTtcbiAgICAgICAgY29udGV4dC5mb250ID0gQ1NTX0ZPTlRfUFJPUEVSVElFUy5tYXAoKHByb3ApID0+IHN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkpLmpvaW4oXCIgXCIpO1xuICAgICAgICByZXR1cm4gY29udGV4dC5tZWFzdXJlVGV4dChlbGVtZW50LnRleHRDb250ZW50KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBudW1iZXIsIHJldHVybnMgYSB2YWx1ZSB0aGF0IGlzIGNsYW1wZWQgd2l0aGluIGFcbiAgICAgKiBtaW5pbXVtL21heGltdW0gYm91bmRlZCByYW5nZS4gVGhlIG1pbmltdW0gYW5kIG1heGltdW0gYXJlIG9wdGlvbmFsLiBJZlxuICAgICAqIGVpdGhlciBpcyBtaXNzaW5nLCB0aGF0IGV4dHJlbWEgbGltaXQgaXMgbm90IGFwcGxpZWQuXG4gICAgICpcbiAgICAgKiBBc3N1bWVzIG1heCA+PSBtaW4uXG4gICAgICovXG4gICAgY2xhbXAodmFsdWU6IG51bWJlciwgbWluPzogbnVtYmVyLCBtYXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKG1pbiAhPSBudWxsICYmIHZhbHVlIDwgbWluKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4ICE9IG51bGwgJiYgdmFsdWUgPiBtYXgpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbWF4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
