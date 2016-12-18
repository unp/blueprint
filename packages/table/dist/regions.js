/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var utils_1 = require("./common/utils");
/**
 * `Region`s contain sets of cells. Additionally, a distinction is drawn, for
 * example, between all cells within a column and the whole column itself.
 * The `RegionCardinality` enum represents these distinct types of `Region`s.
 */
(function (RegionCardinality) {
    /**
     * A region that contains a finite rectangular group of table cells
     */
    RegionCardinality[RegionCardinality["CELLS"] = 0] = "CELLS";
    /**
     * A region that represents all cells within 1 or more rows.
     */
    RegionCardinality[RegionCardinality["FULL_ROWS"] = 1] = "FULL_ROWS";
    /**
     * A region that represents all cells within 1 or more columns.
     */
    RegionCardinality[RegionCardinality["FULL_COLUMNS"] = 2] = "FULL_COLUMNS";
    /**
     * A region that represents all cells in the table.
     */
    RegionCardinality[RegionCardinality["FULL_TABLE"] = 3] = "FULL_TABLE";
})(exports.RegionCardinality || (exports.RegionCardinality = {}));
var RegionCardinality = exports.RegionCardinality;
/**
 * A convenience object for subsets of `RegionCardinality` that are commonly
 * used as the `selectionMode` prop of the `<Table>`.
 */
exports.SelectionModes = {
    ALL: [
        RegionCardinality.FULL_COLUMNS,
        RegionCardinality.FULL_ROWS,
        RegionCardinality.CELLS,
    ],
    COLUMNS_AND_CELLS: [
        RegionCardinality.FULL_COLUMNS,
        RegionCardinality.CELLS,
    ],
    COLUMNS_ONLY: [
        RegionCardinality.FULL_COLUMNS,
    ],
    NONE: [],
    ROWS_AND_CELLS: [
        RegionCardinality.FULL_ROWS,
        RegionCardinality.CELLS,
    ],
    ROWS_ONLY: [
        RegionCardinality.FULL_ROWS,
    ],
};
var Regions = (function () {
    function Regions() {
    }
    /**
     * Determines the cardinality of a region. We use null values to indicate
     * an unbounded interval. Therefore, an example of a region containing the
     * second and third columns would be:
     *
     *     {
     *         rows: null,
     *         cols: [1, 2]
     *     }
     *
     * In this case, this method would return RegionCardinality.FULL_COLUMNS.
     * An example of a region containing a single cell in the table would be:
     *
     *     {
     *         rows: [5, 5],
     *         cols: [2, 2]
     *     }
     *
     * In this case, this method would return RegionCardinality.CELLS.
     */
    Regions.getRegionCardinality = function (region) {
        if (region.cols != null && region.rows != null) {
            return RegionCardinality.CELLS;
        }
        else if (region.cols != null) {
            return RegionCardinality.FULL_COLUMNS;
        }
        else if (region.rows != null) {
            return RegionCardinality.FULL_ROWS;
        }
        else {
            return RegionCardinality.FULL_TABLE;
        }
    };
    /**
     * Returns a region containing one or more cells.
     */
    Regions.cell = function (row, col, row2, col2) {
        return {
            cols: this.normalizeInterval(col, col2),
            rows: this.normalizeInterval(row, row2),
        };
    };
    /**
     * Returns a region containing one or more full rows.
     */
    Regions.row = function (row, row2) {
        return { rows: this.normalizeInterval(row, row2) };
    };
    /**
     * Returns a region containing one or more full columns.
     */
    Regions.column = function (col, col2) {
        return { cols: this.normalizeInterval(col, col2) };
    };
    /**
     * Adds the region to the end of a cloned copy of the supplied region
     * array.
     */
    Regions.add = function (regions, region) {
        var copy = regions.slice();
        copy.push(region);
        return copy;
    };
    /**
     * Replaces the region at the end of a cloned copy of the supplied region
     * array.
     */
    Regions.update = function (regions, region) {
        var copy = regions.slice();
        copy.pop();
        copy.push(region);
        return copy;
    };
    /**
     * Returns true iff the specified region is equal to the last region in
     * the region list. This allows us to avoid immediate additive re-selection.
     */
    Regions.lastRegionIsEqual = function (regions, region) {
        if (regions == null || regions.length === 0) {
            return false;
        }
        var lastRegion = regions[regions.length - 1];
        return Regions.regionsEqual(lastRegion, region);
    };
    /**
     * Returns the index of the region that is equal to the supplied
     * parameter. Returns -1 if no such region is found.
     */
    Regions.findMatchingRegion = function (regions, region) {
        if (regions == null) {
            return -1;
        }
        for (var i = 0; i < regions.length; i++) {
            if (Regions.regionsEqual(regions[i], region)) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Returns true if the regions contain a region that has FULL_COLUMNS
     * cardinality and contains the specified column index.
     */
    Regions.hasFullColumn = function (regions, col) {
        if (regions == null) {
            return false;
        }
        for (var _i = 0, regions_1 = regions; _i < regions_1.length; _i++) {
            var region = regions_1[_i];
            var cardinality = Regions.getRegionCardinality(region);
            if (cardinality === RegionCardinality.FULL_TABLE) {
                return true;
            }
            if (cardinality === RegionCardinality.FULL_COLUMNS && Regions.intervalContainsIndex(region.cols, col)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Returns true if the regions contain a region that has FULL_ROWS
     * cardinality and contains the specified row index.
     */
    Regions.hasFullRow = function (regions, row) {
        if (regions == null) {
            return false;
        }
        for (var _i = 0, regions_2 = regions; _i < regions_2.length; _i++) {
            var region = regions_2[_i];
            var cardinality = Regions.getRegionCardinality(region);
            if (cardinality === RegionCardinality.FULL_TABLE) {
                return true;
            }
            if (cardinality === RegionCardinality.FULL_ROWS && Regions.intervalContainsIndex(region.rows, row)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Returns true if the regions contain the query region. The query region
     * may be a subset of the `regions` parameter.
     */
    Regions.containsRegion = function (regions, query) {
        if (regions == null || query == null) {
            return false;
        }
        for (var _i = 0, regions_3 = regions; _i < regions_3.length; _i++) {
            var region = regions_3[_i];
            var cardinality = Regions.getRegionCardinality(region);
            switch (cardinality) {
                case RegionCardinality.FULL_TABLE:
                    return true;
                case RegionCardinality.FULL_COLUMNS:
                    if (Regions.intervalOverlaps(region.cols, query.cols)) {
                        return true;
                    }
                    continue;
                case RegionCardinality.FULL_ROWS:
                    if (Regions.intervalOverlaps(region.rows, query.rows)) {
                        return true;
                    }
                    continue;
                case RegionCardinality.CELLS:
                    if (Regions.intervalOverlaps(region.cols, query.cols)
                        && Regions.intervalOverlaps(region.rows, query.rows)) {
                        return true;
                    }
                    continue;
                default:
                    break;
            }
        }
        return false;
    };
    Regions.eachUniqueFullColumn = function (regions, iteratee) {
        if (regions == null || regions.length === 0 || iteratee == null) {
            return;
        }
        var seen = {};
        regions.forEach(function (region) {
            if (Regions.getRegionCardinality(region) === RegionCardinality.FULL_COLUMNS) {
                var _a = region.cols, start = _a[0], end = _a[1];
                for (var col = start; col <= end; col++) {
                    if (!seen[col]) {
                        seen[col] = true;
                        iteratee(col);
                    }
                }
            }
        });
    };
    /**
     * Using the supplied array of non-contiguous `IRegion`s, this method
     * returns an ordered array of every unique cell that exists in those
     * regions.
     */
    Regions.enumerateUniqueCells = function (regions, numRows, numCols) {
        if (regions == null || regions.length === 0) {
            return [];
        }
        var seen = {};
        var list = [];
        for (var _i = 0, regions_4 = regions; _i < regions_4.length; _i++) {
            var region = regions_4[_i];
            Regions.eachCellInRegion(region, numRows, numCols, function (row, col) {
                // add to list if not seen
                var key = row + "-" + col;
                if (seen[key] !== true) {
                    seen[key] = true;
                    list.push([row, col]);
                }
            });
        }
        // sort list by rows then columns
        list.sort(Regions.rowFirstComparator);
        return list;
    };
    /**
     * Maps a dense array of cell coordinates to a sparse 2-dimensional array
     * of cell values.
     *
     * We create a new 2-dimensional array representing the smallest single
     * contiguous `IRegion` that contains all cells in the supplied array. We
     * invoke the mapper callback only on the cells in the supplied coordinate
     * array and store the result. Returns the resulting 2-dimensional array.
     */
    Regions.sparseMapCells = function (cells, mapper) {
        var bounds = Regions.getBoundingRegion(cells);
        if (bounds == null) {
            return null;
        }
        var numRows = bounds.rows[1] + 1 - bounds.rows[0];
        var numCols = bounds.cols[1] + 1 - bounds.cols[0];
        var result = utils_1.Utils.times(numRows, function () { return new Array(numCols); });
        cells.forEach(function (_a) {
            var row = _a[0], col = _a[1];
            result[row - bounds.rows[0]][col - bounds.cols[0]] = mapper(row, col);
        });
        return result;
    };
    /**
     * Returns the smallest single contiguous `IRegion` that contains all cells in the
     * supplied array.
     */
    Regions.getBoundingRegion = function (cells) {
        var minRow;
        var maxRow;
        var minCol;
        var maxCol;
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var _a = cells_1[_i], row = _a[0], col = _a[1];
            minRow = (minRow == null || row < minRow) ? row : minRow;
            maxRow = (maxRow == null || row > maxRow) ? row : maxRow;
            minCol = (minCol == null || col < minCol) ? col : minCol;
            maxCol = (maxCol == null || col > maxCol) ? col : maxCol;
        }
        if (minRow == null) {
            return null;
        }
        return {
            cols: [minCol, maxCol],
            rows: [minRow, maxRow],
        };
    };
    Regions.isValid = function (region) {
        if (region == null) {
            return false;
        }
        if ((region.rows != null) && (region.rows[0] < 0 || region.rows[1] < 0)) {
            return false;
        }
        if ((region.cols != null) && (region.cols[0] < 0 || region.cols[1] < 0)) {
            return false;
        }
        return true;
    };
    Regions.joinStyledRegionGroups = function (selectedRegions, otherRegions) {
        var regionGroups = [];
        if (otherRegions != null) {
            regionGroups = regionGroups.concat(otherRegions);
        }
        if (selectedRegions != null && selectedRegions.length > 0) {
            regionGroups.push({
                className: "bp-table-selection-region",
                regions: selectedRegions,
            });
        }
        return regionGroups;
    };
    /**
     * Iterates over the cells within an `IRegion`, invoking the callback with
     * each cell's coordinates.
     */
    Regions.eachCellInRegion = function (region, numRows, numCols, iteratee) {
        var cardinality = Regions.getRegionCardinality(region);
        switch (cardinality) {
            case RegionCardinality.FULL_TABLE:
                for (var row = 0; row < numRows; row++) {
                    for (var col = 0; col < numCols; col++) {
                        iteratee(row, col);
                    }
                }
                break;
            case RegionCardinality.FULL_COLUMNS:
                for (var row = 0; row < numRows; row++) {
                    for (var col = region.cols[0]; col <= region.cols[1]; col++) {
                        iteratee(row, col);
                    }
                }
                break;
            case RegionCardinality.FULL_ROWS:
                for (var row = region.rows[0]; row <= region.rows[1]; row++) {
                    for (var col = 0; col < numCols; col++) {
                        iteratee(row, col);
                    }
                }
                break;
            case RegionCardinality.CELLS:
                for (var row = region.rows[0]; row <= region.rows[1]; row++) {
                    for (var col = region.cols[0]; col <= region.cols[1]; col++) {
                        iteratee(row, col);
                    }
                }
                break;
            default:
                break;
        }
    };
    Regions.regionsEqual = function (regionA, regionB) {
        return Regions.intervalsEqual(regionA.rows, regionB.rows)
            && Regions.intervalsEqual(regionA.cols, regionB.cols);
    };
    Regions.intervalsEqual = function (ivalA, ivalB) {
        if (ivalA == null) {
            return ivalB == null;
        }
        else if (ivalB == null) {
            return false;
        }
        else {
            return ivalA[0] === ivalB[0] && ivalA[1] === ivalB[1];
        }
    };
    Regions.intervalContainsIndex = function (interval, index) {
        if (interval == null) {
            return false;
        }
        return interval[0] <= index && interval[1] >= index;
    };
    Regions.intervalOverlaps = function (ivalA, ivalB) {
        if (ivalA == null || ivalB == null) {
            return false;
        }
        if (ivalA[1] < ivalB[0] || ivalA[0] > ivalB[1]) {
            return false;
        }
        return true;
    };
    Regions.rowFirstComparator = function (a, b) {
        var rowDiff = a[0] - b[0];
        return rowDiff === 0 ? a[1] - b[1] : rowDiff;
    };
    Regions.numericalComparator = function (a, b) {
        return a - b;
    };
    Regions.normalizeInterval = function (coord, coord2) {
        if (coord2 == null) {
            coord2 = coord;
        }
        var interval = [coord, coord2];
        interval.sort(Regions.numericalComparator);
        return interval;
    };
    return Regions;
}());
exports.Regions = Regions;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWdpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUVILHNCQUFzQixnQkFBZ0IsQ0FBQyxDQUFBO0FBRXZDOzs7O0dBSUc7QUFDSCxXQUFZLGlCQUFpQjtJQUN6Qjs7T0FFRztJQUNILDJEQUFLLENBQUE7SUFFTDs7T0FFRztJQUNILG1FQUFTLENBQUE7SUFFVDs7T0FFRztJQUNILHlFQUFZLENBQUE7SUFFWjs7T0FFRztJQUNILHFFQUFVLENBQUE7QUFDZCxDQUFDLEVBcEJXLHlCQUFpQixLQUFqQix5QkFBaUIsUUFvQjVCO0FBcEJELElBQVksaUJBQWlCLEdBQWpCLHlCQW9CWCxDQUFBO0FBRUQ7OztHQUdHO0FBQ1Usc0JBQWMsR0FBRztJQUMxQixHQUFHLEVBQUU7UUFDRCxpQkFBaUIsQ0FBQyxZQUFZO1FBQzlCLGlCQUFpQixDQUFDLFNBQVM7UUFDM0IsaUJBQWlCLENBQUMsS0FBSztLQUMxQjtJQUNELGlCQUFpQixFQUFFO1FBQ2YsaUJBQWlCLENBQUMsWUFBWTtRQUM5QixpQkFBaUIsQ0FBQyxLQUFLO0tBQzFCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsaUJBQWlCLENBQUMsWUFBWTtLQUNqQztJQUNELElBQUksRUFBRSxFQUF5QjtJQUMvQixjQUFjLEVBQUU7UUFDWixpQkFBaUIsQ0FBQyxTQUFTO1FBQzNCLGlCQUFpQixDQUFDLEtBQUs7S0FDMUI7SUFDRCxTQUFTLEVBQUU7UUFDUCxpQkFBaUIsQ0FBQyxTQUFTO0tBQzlCO0NBQ0osQ0FBQztBQTJCRjtJQUFBO0lBOFpBLENBQUM7SUE3Wkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDVyw0QkFBb0IsR0FBbEMsVUFBbUMsTUFBZTtRQUM5QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO1FBQzFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7UUFDdkMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztRQUN4QyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ1csWUFBSSxHQUFsQixVQUFtQixHQUFXLEVBQUUsR0FBVyxFQUFFLElBQWEsRUFBRSxJQUFhO1FBQ3JFLE1BQU0sQ0FBQztZQUNILElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztZQUN2QyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDMUMsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNXLFdBQUcsR0FBakIsVUFBa0IsR0FBVyxFQUFFLElBQWE7UUFDeEMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7O09BRUc7SUFDVyxjQUFNLEdBQXBCLFVBQXFCLEdBQVcsRUFBRSxJQUFhO1FBQzNDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNXLFdBQUcsR0FBakIsVUFBa0IsT0FBa0IsRUFBRSxNQUFlO1FBQ2pELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNXLGNBQU0sR0FBcEIsVUFBcUIsT0FBa0IsRUFBRSxNQUFlO1FBQ3BELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNXLHlCQUFpQixHQUEvQixVQUFnQyxPQUFrQixFQUFFLE1BQWU7UUFDL0QsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7O09BR0c7SUFDVywwQkFBa0IsR0FBaEMsVUFBaUMsT0FBa0IsRUFBRSxNQUFlO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLENBQUM7UUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDVyxxQkFBYSxHQUEzQixVQUE0QixPQUFrQixFQUFFLEdBQVc7UUFDdkQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBRUQsR0FBRyxDQUFDLENBQWlCLFVBQU8sRUFBUCxtQkFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTyxDQUFDO1lBQXhCLElBQU0sTUFBTSxnQkFBQTtZQUNiLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RCxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLGlCQUFpQixDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztTQUNKO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ1csa0JBQVUsR0FBeEIsVUFBeUIsT0FBa0IsRUFBRSxHQUFXO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELEdBQUcsQ0FBQyxDQUFpQixVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU8sQ0FBQztZQUF4QixJQUFNLE1BQU0sZ0JBQUE7WUFDYixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxpQkFBaUIsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7U0FDSjtRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNXLHNCQUFjLEdBQTVCLFVBQTZCLE9BQWtCLEVBQUUsS0FBYztRQUMzRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELEdBQUcsQ0FBQyxDQUFpQixVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU8sQ0FBQztZQUF4QixJQUFNLE1BQU0sZ0JBQUE7WUFDYixJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsS0FBSyxpQkFBaUIsQ0FBQyxVQUFVO29CQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixLQUFLLGlCQUFpQixDQUFDLFlBQVk7b0JBQy9CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7b0JBQ0QsUUFBUSxDQUFDO2dCQUNiLEtBQUssaUJBQWlCLENBQUMsU0FBUztvQkFDNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDaEIsQ0FBQztvQkFDRCxRQUFRLENBQUM7Z0JBQ2IsS0FBSyxpQkFBaUIsQ0FBQyxLQUFLO29CQUN4QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzJCQUM5QyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQixDQUFDO29CQUNELFFBQVEsQ0FBQztnQkFDYjtvQkFDSSxLQUFLLENBQUM7WUFDZCxDQUFDO1NBQ0o7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFYSw0QkFBb0IsR0FBbEMsVUFBbUMsT0FBa0IsRUFBRSxRQUErQjtRQUNsRixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlELE1BQU0sQ0FBQztRQUNYLENBQUM7UUFFRCxJQUFNLElBQUksR0FBNkIsRUFBRSxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFlO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxJQUFBLGdCQUFrQyxFQUExQixhQUFLLEVBQUUsV0FBRyxDQUFpQjtnQkFDbkMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztvQkFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ2pCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEIsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyw0QkFBb0IsR0FBbEMsVUFDSSxPQUFrQixFQUNsQixPQUFlLEVBQ2YsT0FBZTtRQUdmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBTSxJQUFJLEdBQTZCLEVBQUUsQ0FBQztRQUMxQyxJQUFNLElBQUksR0FBc0IsRUFBRSxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxDQUFpQixVQUFPLEVBQVAsbUJBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU8sQ0FBQztZQUF4QixJQUFNLE1BQU0sZ0JBQUE7WUFDYixPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBQyxHQUFXLEVBQUUsR0FBVztnQkFDeEUsMEJBQTBCO2dCQUMxQixJQUFNLEdBQUcsR0FBTSxHQUFHLFNBQUksR0FBSyxDQUFDO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELGlDQUFpQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ1csc0JBQWMsR0FBNUIsVUFDSSxLQUF3QixFQUN4QixNQUF1QztRQUV2QyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQU0sTUFBTSxHQUFHLGFBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLGNBQU0sT0FBQSxJQUFJLEtBQUssQ0FBSSxPQUFPLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO1FBQ2pFLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFVO2dCQUFULFdBQUcsRUFBRSxXQUFHO1lBQ3BCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7T0FHRztJQUNXLHlCQUFpQixHQUEvQixVQUFnQyxLQUF3QjtRQUNwRCxJQUFJLE1BQWMsQ0FBQztRQUNuQixJQUFJLE1BQWMsQ0FBQztRQUNuQixJQUFJLE1BQWMsQ0FBQztRQUNuQixJQUFJLE1BQWMsQ0FBQztRQUNuQixHQUFHLENBQUMsQ0FBcUIsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUssQ0FBQztZQUExQixvQkFBZ0IsRUFBVCxXQUFHLEVBQUUsV0FBRztZQUNoQixNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ3pELE1BQU0sR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDekQsTUFBTSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUN6RCxNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1NBQzVEO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTSxDQUFDO1lBQ0gsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1NBQ3pCLENBQUM7SUFDTixDQUFDO0lBRWEsZUFBTyxHQUFyQixVQUFzQixNQUFlO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVhLDhCQUFzQixHQUFwQyxVQUFxQyxlQUEwQixFQUFFLFlBQWtDO1FBQy9GLElBQUksWUFBWSxHQUF5QixFQUFFLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkIsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGVBQWUsSUFBSSxJQUFJLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsU0FBUyxFQUFFLDJCQUEyQjtnQkFDdEMsT0FBTyxFQUFFLGVBQWU7YUFDM0IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNZLHdCQUFnQixHQUEvQixVQUNJLE1BQWUsRUFDZixPQUFlLEVBQ2YsT0FBZSxFQUNmLFFBQTRDO1FBRTVDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEtBQUssaUJBQWlCLENBQUMsVUFBVTtnQkFDN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztvQkFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQzt3QkFDckMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdkIsQ0FBQztnQkFDTCxDQUFDO2dCQUNELEtBQUssQ0FBQztZQUNWLEtBQUssaUJBQWlCLENBQUMsWUFBWTtnQkFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztvQkFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUMxRCxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxpQkFBaUIsQ0FBQyxTQUFTO2dCQUM1QixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7b0JBQzFELEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7d0JBQ3JDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxLQUFLLENBQUM7WUFDVixLQUFLLGlCQUFpQixDQUFDLEtBQUs7Z0JBQ3hCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztvQkFDMUQsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUMxRCxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFYyxvQkFBWSxHQUEzQixVQUE0QixPQUFnQixFQUFFLE9BQWdCO1FBQzFELE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQztlQUNsRCxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFYyxzQkFBYyxHQUE3QixVQUE4QixLQUFvQixFQUFFLEtBQW9CO1FBQ3BFLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7SUFDTCxDQUFDO0lBRWMsNkJBQXFCLEdBQXBDLFVBQXFDLFFBQXVCLEVBQUUsS0FBYTtRQUN2RSxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDO0lBQ3hELENBQUM7SUFFYyx3QkFBZ0IsR0FBL0IsVUFBZ0MsS0FBb0IsRUFBRSxLQUFvQjtRQUN0RSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRWMsMEJBQWtCLEdBQWpDLFVBQWtDLENBQWtCLEVBQUUsQ0FBa0I7UUFDcEUsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNqRCxDQUFDO0lBRWMsMkJBQW1CLEdBQWxDLFVBQW1DLENBQVMsRUFBRSxDQUFTO1FBQ25ELE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFYyx5QkFBaUIsR0FBaEMsVUFBaUMsS0FBYSxFQUFFLE1BQWU7UUFDM0QsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixDQUFDO1FBRUQsSUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsUUFBeUIsQ0FBQztJQUNyQyxDQUFDO0lBQ0wsY0FBQztBQUFELENBOVpBLEFBOFpDLElBQUE7QUE5WlksZUFBTyxVQThabkIsQ0FBQSIsImZpbGUiOiJyZWdpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9jb21tb24vdXRpbHNcIjtcblxuLyoqXG4gKiBgUmVnaW9uYHMgY29udGFpbiBzZXRzIG9mIGNlbGxzLiBBZGRpdGlvbmFsbHksIGEgZGlzdGluY3Rpb24gaXMgZHJhd24sIGZvclxuICogZXhhbXBsZSwgYmV0d2VlbiBhbGwgY2VsbHMgd2l0aGluIGEgY29sdW1uIGFuZCB0aGUgd2hvbGUgY29sdW1uIGl0c2VsZi5cbiAqIFRoZSBgUmVnaW9uQ2FyZGluYWxpdHlgIGVudW0gcmVwcmVzZW50cyB0aGVzZSBkaXN0aW5jdCB0eXBlcyBvZiBgUmVnaW9uYHMuXG4gKi9cbmV4cG9ydCBlbnVtIFJlZ2lvbkNhcmRpbmFsaXR5IHtcbiAgICAvKipcbiAgICAgKiBBIHJlZ2lvbiB0aGF0IGNvbnRhaW5zIGEgZmluaXRlIHJlY3Rhbmd1bGFyIGdyb3VwIG9mIHRhYmxlIGNlbGxzXG4gICAgICovXG4gICAgQ0VMTFMsXG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2lvbiB0aGF0IHJlcHJlc2VudHMgYWxsIGNlbGxzIHdpdGhpbiAxIG9yIG1vcmUgcm93cy5cbiAgICAgKi9cbiAgICBGVUxMX1JPV1MsXG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2lvbiB0aGF0IHJlcHJlc2VudHMgYWxsIGNlbGxzIHdpdGhpbiAxIG9yIG1vcmUgY29sdW1ucy5cbiAgICAgKi9cbiAgICBGVUxMX0NPTFVNTlMsXG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2lvbiB0aGF0IHJlcHJlc2VudHMgYWxsIGNlbGxzIGluIHRoZSB0YWJsZS5cbiAgICAgKi9cbiAgICBGVUxMX1RBQkxFLFxufVxuXG4vKipcbiAqIEEgY29udmVuaWVuY2Ugb2JqZWN0IGZvciBzdWJzZXRzIG9mIGBSZWdpb25DYXJkaW5hbGl0eWAgdGhhdCBhcmUgY29tbW9ubHlcbiAqIHVzZWQgYXMgdGhlIGBzZWxlY3Rpb25Nb2RlYCBwcm9wIG9mIHRoZSBgPFRhYmxlPmAuXG4gKi9cbmV4cG9ydCBjb25zdCBTZWxlY3Rpb25Nb2RlcyA9IHtcbiAgICBBTEw6IFtcbiAgICAgICAgUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9DT0xVTU5TLFxuICAgICAgICBSZWdpb25DYXJkaW5hbGl0eS5GVUxMX1JPV1MsXG4gICAgICAgIFJlZ2lvbkNhcmRpbmFsaXR5LkNFTExTLFxuICAgIF0sXG4gICAgQ09MVU1OU19BTkRfQ0VMTFM6IFtcbiAgICAgICAgUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9DT0xVTU5TLFxuICAgICAgICBSZWdpb25DYXJkaW5hbGl0eS5DRUxMUyxcbiAgICBdLFxuICAgIENPTFVNTlNfT05MWTogW1xuICAgICAgICBSZWdpb25DYXJkaW5hbGl0eS5GVUxMX0NPTFVNTlMsXG4gICAgXSxcbiAgICBOT05FOiBbXSBhcyBSZWdpb25DYXJkaW5hbGl0eVtdLFxuICAgIFJPV1NfQU5EX0NFTExTOiBbXG4gICAgICAgIFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfUk9XUyxcbiAgICAgICAgUmVnaW9uQ2FyZGluYWxpdHkuQ0VMTFMsXG4gICAgXSxcbiAgICBST1dTX09OTFk6IFtcbiAgICAgICAgUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9ST1dTLFxuICAgIF0sXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdHlsZWRSZWdpb25Hcm91cCB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgIHJlZ2lvbnM6IElSZWdpb25bXTtcbn1cblxuLyoqXG4gKiBBbiBfaW5jbHVzaXZlXyBpbnRlcnZhbCBvZiBaRVJPLWluZGV4ZWQgY2VsbCBpbmRpY2VzLlxuICovXG5leHBvcnQgdHlwZSBJQ2VsbEludGVydmFsID0gW251bWJlciwgbnVtYmVyXTtcblxuLyoqXG4gKiBTbWFsbCBkYXRhc3RydWN0dXJlIGZvciBzdG9yaW5nIGNlbGwgY29vcmRpbmF0ZXMgW3JvdywgY29sdW1uXVxuICovXG5leHBvcnQgdHlwZSBJQ2VsbENvb3JkaW5hdGUgPSBbbnVtYmVyLCBudW1iZXJdO1xuXG4vKipcbiAqIEEgWkVSTy1pbmRleGVkIHJlZ2lvbiBvZiBjZWxscy5cbiAqXG4gKiBAc2VlIGBSZWdpb25zLmdldFJlZ2lvbkNhcmRpbmFsaXR5YCBmb3IgbW9yZSBhYm91dCB0aGUgZm9ybWF0IG9mIHRoaXMgb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElSZWdpb24ge1xuICAgIHJvd3M/OiBJQ2VsbEludGVydmFsO1xuICAgIGNvbHM/OiBJQ2VsbEludGVydmFsO1xufVxuXG5leHBvcnQgY2xhc3MgUmVnaW9ucyB7XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB0aGUgY2FyZGluYWxpdHkgb2YgYSByZWdpb24uIFdlIHVzZSBudWxsIHZhbHVlcyB0byBpbmRpY2F0ZVxuICAgICAqIGFuIHVuYm91bmRlZCBpbnRlcnZhbC4gVGhlcmVmb3JlLCBhbiBleGFtcGxlIG9mIGEgcmVnaW9uIGNvbnRhaW5pbmcgdGhlXG4gICAgICogc2Vjb25kIGFuZCB0aGlyZCBjb2x1bW5zIHdvdWxkIGJlOlxuICAgICAqXG4gICAgICogICAgIHtcbiAgICAgKiAgICAgICAgIHJvd3M6IG51bGwsXG4gICAgICogICAgICAgICBjb2xzOiBbMSwgMl1cbiAgICAgKiAgICAgfVxuICAgICAqXG4gICAgICogSW4gdGhpcyBjYXNlLCB0aGlzIG1ldGhvZCB3b3VsZCByZXR1cm4gUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9DT0xVTU5TLlxuICAgICAqIEFuIGV4YW1wbGUgb2YgYSByZWdpb24gY29udGFpbmluZyBhIHNpbmdsZSBjZWxsIGluIHRoZSB0YWJsZSB3b3VsZCBiZTpcbiAgICAgKlxuICAgICAqICAgICB7XG4gICAgICogICAgICAgICByb3dzOiBbNSwgNV0sXG4gICAgICogICAgICAgICBjb2xzOiBbMiwgMl1cbiAgICAgKiAgICAgfVxuICAgICAqXG4gICAgICogSW4gdGhpcyBjYXNlLCB0aGlzIG1ldGhvZCB3b3VsZCByZXR1cm4gUmVnaW9uQ2FyZGluYWxpdHkuQ0VMTFMuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZWdpb25DYXJkaW5hbGl0eShyZWdpb246IElSZWdpb24pIHtcbiAgICAgICAgaWYgKHJlZ2lvbi5jb2xzICE9IG51bGwgJiYgcmVnaW9uLnJvd3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlZ2lvbkNhcmRpbmFsaXR5LkNFTExTO1xuICAgICAgICB9IGVsc2UgaWYgKHJlZ2lvbi5jb2xzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWdpb25DYXJkaW5hbGl0eS5GVUxMX0NPTFVNTlM7XG4gICAgICAgIH0gZWxzZSBpZiAocmVnaW9uLnJvd3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfUk9XUztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBSZWdpb25DYXJkaW5hbGl0eS5GVUxMX1RBQkxFO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJlZ2lvbiBjb250YWluaW5nIG9uZSBvciBtb3JlIGNlbGxzLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2VsbChyb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHJvdzI/OiBudW1iZXIsIGNvbDI/OiBudW1iZXIpOiBJUmVnaW9uIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbHM6IHRoaXMubm9ybWFsaXplSW50ZXJ2YWwoY29sLCBjb2wyKSxcbiAgICAgICAgICAgIHJvd3M6IHRoaXMubm9ybWFsaXplSW50ZXJ2YWwocm93LCByb3cyKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmVnaW9uIGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgZnVsbCByb3dzLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcm93KHJvdzogbnVtYmVyLCByb3cyPzogbnVtYmVyKTogSVJlZ2lvbiAge1xuICAgICAgICByZXR1cm4geyByb3dzOiB0aGlzLm5vcm1hbGl6ZUludGVydmFsKHJvdywgcm93MikgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcmVnaW9uIGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgZnVsbCBjb2x1bW5zLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29sdW1uKGNvbDogbnVtYmVyLCBjb2wyPzogbnVtYmVyKTogSVJlZ2lvbiAge1xuICAgICAgICByZXR1cm4geyBjb2xzOiB0aGlzLm5vcm1hbGl6ZUludGVydmFsKGNvbCwgY29sMikgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSByZWdpb24gdG8gdGhlIGVuZCBvZiBhIGNsb25lZCBjb3B5IG9mIHRoZSBzdXBwbGllZCByZWdpb25cbiAgICAgKiBhcnJheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZChyZWdpb25zOiBJUmVnaW9uW10sIHJlZ2lvbjogSVJlZ2lvbikge1xuICAgICAgICBsZXQgY29weSA9IHJlZ2lvbnMuc2xpY2UoKTtcbiAgICAgICAgY29weS5wdXNoKHJlZ2lvbik7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIHRoZSByZWdpb24gYXQgdGhlIGVuZCBvZiBhIGNsb25lZCBjb3B5IG9mIHRoZSBzdXBwbGllZCByZWdpb25cbiAgICAgKiBhcnJheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZShyZWdpb25zOiBJUmVnaW9uW10sIHJlZ2lvbjogSVJlZ2lvbikge1xuICAgICAgICBsZXQgY29weSA9IHJlZ2lvbnMuc2xpY2UoKTtcbiAgICAgICAgY29weS5wb3AoKTtcbiAgICAgICAgY29weS5wdXNoKHJlZ2lvbik7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZmYgdGhlIHNwZWNpZmllZCByZWdpb24gaXMgZXF1YWwgdG8gdGhlIGxhc3QgcmVnaW9uIGluXG4gICAgICogdGhlIHJlZ2lvbiBsaXN0LiBUaGlzIGFsbG93cyB1cyB0byBhdm9pZCBpbW1lZGlhdGUgYWRkaXRpdmUgcmUtc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGFzdFJlZ2lvbklzRXF1YWwocmVnaW9uczogSVJlZ2lvbltdLCByZWdpb246IElSZWdpb24pIHtcbiAgICAgICAgaWYgKHJlZ2lvbnMgPT0gbnVsbCB8fCByZWdpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3RSZWdpb24gPSByZWdpb25zW3JlZ2lvbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIHJldHVybiBSZWdpb25zLnJlZ2lvbnNFcXVhbChsYXN0UmVnaW9uLCByZWdpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSByZWdpb24gdGhhdCBpcyBlcXVhbCB0byB0aGUgc3VwcGxpZWRcbiAgICAgKiBwYXJhbWV0ZXIuIFJldHVybnMgLTEgaWYgbm8gc3VjaCByZWdpb24gaXMgZm91bmQuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmaW5kTWF0Y2hpbmdSZWdpb24ocmVnaW9uczogSVJlZ2lvbltdLCByZWdpb246IElSZWdpb24pIHtcbiAgICAgICAgaWYgKHJlZ2lvbnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWdpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoUmVnaW9ucy5yZWdpb25zRXF1YWwocmVnaW9uc1tpXSwgcmVnaW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJlZ2lvbnMgY29udGFpbiBhIHJlZ2lvbiB0aGF0IGhhcyBGVUxMX0NPTFVNTlNcbiAgICAgKiBjYXJkaW5hbGl0eSBhbmQgY29udGFpbnMgdGhlIHNwZWNpZmllZCBjb2x1bW4gaW5kZXguXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBoYXNGdWxsQ29sdW1uKHJlZ2lvbnM6IElSZWdpb25bXSwgY29sOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHJlZ2lvbnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCByZWdpb24gb2YgcmVnaW9ucykge1xuICAgICAgICAgICAgY29uc3QgY2FyZGluYWxpdHkgPSBSZWdpb25zLmdldFJlZ2lvbkNhcmRpbmFsaXR5KHJlZ2lvbik7XG4gICAgICAgICAgICBpZiAoY2FyZGluYWxpdHkgPT09IFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfVEFCTEUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYXJkaW5hbGl0eSA9PT0gUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9DT0xVTU5TICYmIFJlZ2lvbnMuaW50ZXJ2YWxDb250YWluc0luZGV4KHJlZ2lvbi5jb2xzLCBjb2wpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSByZWdpb25zIGNvbnRhaW4gYSByZWdpb24gdGhhdCBoYXMgRlVMTF9ST1dTXG4gICAgICogY2FyZGluYWxpdHkgYW5kIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgcm93IGluZGV4LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzRnVsbFJvdyhyZWdpb25zOiBJUmVnaW9uW10sIHJvdzogbnVtYmVyKSB7XG4gICAgICAgIGlmIChyZWdpb25zID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgcmVnaW9uIG9mIHJlZ2lvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRpbmFsaXR5ID0gUmVnaW9ucy5nZXRSZWdpb25DYXJkaW5hbGl0eShyZWdpb24pO1xuICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ID09PSBSZWdpb25DYXJkaW5hbGl0eS5GVUxMX1RBQkxFKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FyZGluYWxpdHkgPT09IFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfUk9XUyAmJiBSZWdpb25zLmludGVydmFsQ29udGFpbnNJbmRleChyZWdpb24ucm93cywgcm93KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVnaW9ucyBjb250YWluIHRoZSBxdWVyeSByZWdpb24uIFRoZSBxdWVyeSByZWdpb25cbiAgICAgKiBtYXkgYmUgYSBzdWJzZXQgb2YgdGhlIGByZWdpb25zYCBwYXJhbWV0ZXIuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb250YWluc1JlZ2lvbihyZWdpb25zOiBJUmVnaW9uW10sIHF1ZXJ5OiBJUmVnaW9uKSB7XG4gICAgICAgIGlmIChyZWdpb25zID09IG51bGwgfHwgcXVlcnkgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCByZWdpb24gb2YgcmVnaW9ucykge1xuICAgICAgICAgICAgY29uc3QgY2FyZGluYWxpdHkgPSBSZWdpb25zLmdldFJlZ2lvbkNhcmRpbmFsaXR5KHJlZ2lvbik7XG4gICAgICAgICAgICBzd2l0Y2ggKGNhcmRpbmFsaXR5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBSZWdpb25DYXJkaW5hbGl0eS5GVUxMX1RBQkxFOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfQ09MVU1OUzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKFJlZ2lvbnMuaW50ZXJ2YWxPdmVybGFwcyhyZWdpb24uY29scywgcXVlcnkuY29scykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9ST1dTOlxuICAgICAgICAgICAgICAgICAgICBpZiAoUmVnaW9ucy5pbnRlcnZhbE92ZXJsYXBzKHJlZ2lvbi5yb3dzLCBxdWVyeS5yb3dzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSBSZWdpb25DYXJkaW5hbGl0eS5DRUxMUzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKFJlZ2lvbnMuaW50ZXJ2YWxPdmVybGFwcyhyZWdpb24uY29scywgcXVlcnkuY29scylcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIFJlZ2lvbnMuaW50ZXJ2YWxPdmVybGFwcyhyZWdpb24ucm93cywgcXVlcnkucm93cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZWFjaFVuaXF1ZUZ1bGxDb2x1bW4ocmVnaW9uczogSVJlZ2lvbltdLCBpdGVyYXRlZTogKGNvbDogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgICAgIGlmIChyZWdpb25zID09IG51bGwgfHwgcmVnaW9ucy5sZW5ndGggPT09IDAgfHwgaXRlcmF0ZWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vlbjoge1tjb2w6IG51bWJlcl06IGJvb2xlYW59ID0ge307XG4gICAgICAgIHJlZ2lvbnMuZm9yRWFjaCgocmVnaW9uOiBJUmVnaW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAoUmVnaW9ucy5nZXRSZWdpb25DYXJkaW5hbGl0eShyZWdpb24pID09PSBSZWdpb25DYXJkaW5hbGl0eS5GVUxMX0NPTFVNTlMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbIHN0YXJ0LCBlbmQgXSA9IHJlZ2lvbi5jb2xzO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IHN0YXJ0OyBjb2wgPD0gZW5kOyBjb2wrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZW5bY29sXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vlbltjb2xdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGVlKGNvbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzaW5nIHRoZSBzdXBwbGllZCBhcnJheSBvZiBub24tY29udGlndW91cyBgSVJlZ2lvbmBzLCB0aGlzIG1ldGhvZFxuICAgICAqIHJldHVybnMgYW4gb3JkZXJlZCBhcnJheSBvZiBldmVyeSB1bmlxdWUgY2VsbCB0aGF0IGV4aXN0cyBpbiB0aG9zZVxuICAgICAqIHJlZ2lvbnMuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBlbnVtZXJhdGVVbmlxdWVDZWxscyhcbiAgICAgICAgcmVnaW9uczogSVJlZ2lvbltdLFxuICAgICAgICBudW1Sb3dzOiBudW1iZXIsXG4gICAgICAgIG51bUNvbHM6IG51bWJlcixcbiAgICApOiBJQ2VsbENvb3JkaW5hdGVbXSB7XG5cbiAgICAgICAgaWYgKHJlZ2lvbnMgPT0gbnVsbCB8fCByZWdpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Vlbjoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge307XG4gICAgICAgIGNvbnN0IGxpc3Q6IElDZWxsQ29vcmRpbmF0ZVtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcmVnaW9uIG9mIHJlZ2lvbnMpIHtcbiAgICAgICAgICAgIFJlZ2lvbnMuZWFjaENlbGxJblJlZ2lvbihyZWdpb24sIG51bVJvd3MsIG51bUNvbHMsIChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgdG8gbGlzdCBpZiBub3Qgc2VlblxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3Jvd30tJHtjb2x9YDtcbiAgICAgICAgICAgICAgICBpZiAoc2VlbltrZXldICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZW5ba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChbcm93LCBjb2xdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNvcnQgbGlzdCBieSByb3dzIHRoZW4gY29sdW1uc1xuICAgICAgICBsaXN0LnNvcnQoUmVnaW9ucy5yb3dGaXJzdENvbXBhcmF0b3IpO1xuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIGEgZGVuc2UgYXJyYXkgb2YgY2VsbCBjb29yZGluYXRlcyB0byBhIHNwYXJzZSAyLWRpbWVuc2lvbmFsIGFycmF5XG4gICAgICogb2YgY2VsbCB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiBXZSBjcmVhdGUgYSBuZXcgMi1kaW1lbnNpb25hbCBhcnJheSByZXByZXNlbnRpbmcgdGhlIHNtYWxsZXN0IHNpbmdsZVxuICAgICAqIGNvbnRpZ3VvdXMgYElSZWdpb25gIHRoYXQgY29udGFpbnMgYWxsIGNlbGxzIGluIHRoZSBzdXBwbGllZCBhcnJheS4gV2VcbiAgICAgKiBpbnZva2UgdGhlIG1hcHBlciBjYWxsYmFjayBvbmx5IG9uIHRoZSBjZWxscyBpbiB0aGUgc3VwcGxpZWQgY29vcmRpbmF0ZVxuICAgICAqIGFycmF5IGFuZCBzdG9yZSB0aGUgcmVzdWx0LiBSZXR1cm5zIHRoZSByZXN1bHRpbmcgMi1kaW1lbnNpb25hbCBhcnJheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNwYXJzZU1hcENlbGxzPFQ+KFxuICAgICAgICBjZWxsczogSUNlbGxDb29yZGluYXRlW10sXG4gICAgICAgIG1hcHBlcjogKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcikgPT4gVCxcbiAgICApOiBUW11bXSB7XG4gICAgICAgIGNvbnN0IGJvdW5kcyA9IFJlZ2lvbnMuZ2V0Qm91bmRpbmdSZWdpb24oY2VsbHMpO1xuICAgICAgICBpZiAoYm91bmRzID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbnVtUm93cyA9IGJvdW5kcy5yb3dzWzFdICsgMSAtIGJvdW5kcy5yb3dzWzBdO1xuICAgICAgICBjb25zdCBudW1Db2xzID0gYm91bmRzLmNvbHNbMV0gKyAxIC0gYm91bmRzLmNvbHNbMF07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFV0aWxzLnRpbWVzKG51bVJvd3MsICgpID0+IG5ldyBBcnJheTxUPihudW1Db2xzKSk7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKFtyb3csIGNvbF0pID0+IHtcbiAgICAgICAgICAgIHJlc3VsdFtyb3cgLSBib3VuZHMucm93c1swXV1bY29sIC0gYm91bmRzLmNvbHNbMF1dID0gbWFwcGVyKHJvdywgY29sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc21hbGxlc3Qgc2luZ2xlIGNvbnRpZ3VvdXMgYElSZWdpb25gIHRoYXQgY29udGFpbnMgYWxsIGNlbGxzIGluIHRoZVxuICAgICAqIHN1cHBsaWVkIGFycmF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Qm91bmRpbmdSZWdpb24oY2VsbHM6IElDZWxsQ29vcmRpbmF0ZVtdKTogSVJlZ2lvbiB7XG4gICAgICAgIGxldCBtaW5Sb3c6IG51bWJlcjtcbiAgICAgICAgbGV0IG1heFJvdzogbnVtYmVyO1xuICAgICAgICBsZXQgbWluQ29sOiBudW1iZXI7XG4gICAgICAgIGxldCBtYXhDb2w6IG51bWJlcjtcbiAgICAgICAgZm9yIChjb25zdCBbcm93LCBjb2xdIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICBtaW5Sb3cgPSAobWluUm93ID09IG51bGwgfHwgcm93IDwgbWluUm93KSA/IHJvdyA6IG1pblJvdztcbiAgICAgICAgICAgIG1heFJvdyA9IChtYXhSb3cgPT0gbnVsbCB8fCByb3cgPiBtYXhSb3cpID8gcm93IDogbWF4Um93O1xuICAgICAgICAgICAgbWluQ29sID0gKG1pbkNvbCA9PSBudWxsIHx8IGNvbCA8IG1pbkNvbCkgPyBjb2wgOiBtaW5Db2w7XG4gICAgICAgICAgICBtYXhDb2wgPSAobWF4Q29sID09IG51bGwgfHwgY29sID4gbWF4Q29sKSA/IGNvbCA6IG1heENvbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWluUm93ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xzOiBbbWluQ29sLCBtYXhDb2xdLFxuICAgICAgICAgICAgcm93czogW21pblJvdywgbWF4Um93XSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzVmFsaWQocmVnaW9uOiBJUmVnaW9uKSB7XG4gICAgICAgIGlmIChyZWdpb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgocmVnaW9uLnJvd3MgIT0gbnVsbCkgJiYgKHJlZ2lvbi5yb3dzWzBdIDwgMCB8fCByZWdpb24ucm93c1sxXSA8IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChyZWdpb24uY29scyAhPSBudWxsKSAmJiAocmVnaW9uLmNvbHNbMF0gPCAwIHx8IHJlZ2lvbi5jb2xzWzFdIDwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGpvaW5TdHlsZWRSZWdpb25Hcm91cHMoc2VsZWN0ZWRSZWdpb25zOiBJUmVnaW9uW10sIG90aGVyUmVnaW9uczogSVN0eWxlZFJlZ2lvbkdyb3VwW10pIHtcbiAgICAgICAgbGV0IHJlZ2lvbkdyb3VwczogSVN0eWxlZFJlZ2lvbkdyb3VwW10gPSBbXTtcbiAgICAgICAgaWYgKG90aGVyUmVnaW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZWdpb25Hcm91cHMgPSByZWdpb25Hcm91cHMuY29uY2F0KG90aGVyUmVnaW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGVjdGVkUmVnaW9ucyAhPSBudWxsICYmIHNlbGVjdGVkUmVnaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZWdpb25Hcm91cHMucHVzaCh7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJwLXRhYmxlLXNlbGVjdGlvbi1yZWdpb25cIixcbiAgICAgICAgICAgICAgICByZWdpb25zOiBzZWxlY3RlZFJlZ2lvbnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVnaW9uR3JvdXBzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIG92ZXIgdGhlIGNlbGxzIHdpdGhpbiBhbiBgSVJlZ2lvbmAsIGludm9raW5nIHRoZSBjYWxsYmFjayB3aXRoXG4gICAgICogZWFjaCBjZWxsJ3MgY29vcmRpbmF0ZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgZWFjaENlbGxJblJlZ2lvbihcbiAgICAgICAgcmVnaW9uOiBJUmVnaW9uLFxuICAgICAgICBudW1Sb3dzOiBudW1iZXIsXG4gICAgICAgIG51bUNvbHM6IG51bWJlcixcbiAgICAgICAgaXRlcmF0ZWU6IChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpID0+IHZvaWQsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGNhcmRpbmFsaXR5ID0gUmVnaW9ucy5nZXRSZWdpb25DYXJkaW5hbGl0eShyZWdpb24pO1xuICAgICAgICBzd2l0Y2ggKGNhcmRpbmFsaXR5KSB7XG4gICAgICAgICAgICBjYXNlIFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfVEFCTEU6XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbnVtUm93czsgcm93KyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgbnVtQ29sczsgY29sKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGVlKHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUmVnaW9uQ2FyZGluYWxpdHkuRlVMTF9DT0xVTU5TOlxuICAgICAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG51bVJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IHJlZ2lvbi5jb2xzWzBdOyBjb2wgPD0gcmVnaW9uLmNvbHNbMV07IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVyYXRlZShyb3csIGNvbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJlZ2lvbkNhcmRpbmFsaXR5LkZVTExfUk9XUzpcbiAgICAgICAgICAgICAgICBmb3IgKGxldCByb3cgPSByZWdpb24ucm93c1swXTsgcm93IDw9IHJlZ2lvbi5yb3dzWzFdOyByb3crKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBudW1Db2xzOyBjb2wrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZWUocm93LCBjb2wpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSZWdpb25DYXJkaW5hbGl0eS5DRUxMUzpcbiAgICAgICAgICAgICAgICBmb3IgKGxldCByb3cgPSByZWdpb24ucm93c1swXTsgcm93IDw9IHJlZ2lvbi5yb3dzWzFdOyByb3crKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSByZWdpb24uY29sc1swXTsgY29sIDw9IHJlZ2lvbi5jb2xzWzFdOyBjb2wrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZWUocm93LCBjb2wpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHJlZ2lvbnNFcXVhbChyZWdpb25BOiBJUmVnaW9uLCByZWdpb25COiBJUmVnaW9uKSB7XG4gICAgICAgIHJldHVybiBSZWdpb25zLmludGVydmFsc0VxdWFsKHJlZ2lvbkEucm93cywgcmVnaW9uQi5yb3dzKVxuICAgICAgICAgICAgJiYgUmVnaW9ucy5pbnRlcnZhbHNFcXVhbChyZWdpb25BLmNvbHMsIHJlZ2lvbkIuY29scyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW50ZXJ2YWxzRXF1YWwoaXZhbEE6IElDZWxsSW50ZXJ2YWwsIGl2YWxCOiBJQ2VsbEludGVydmFsKSB7XG4gICAgICAgIGlmIChpdmFsQSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gaXZhbEIgPT0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChpdmFsQiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXZhbEFbMF0gPT09IGl2YWxCWzBdICYmIGl2YWxBWzFdID09PSBpdmFsQlsxXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGludGVydmFsQ29udGFpbnNJbmRleChpbnRlcnZhbDogSUNlbGxJbnRlcnZhbCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoaW50ZXJ2YWwgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnRlcnZhbFswXSA8PSBpbmRleCAmJiBpbnRlcnZhbFsxXSA+PSBpbmRleDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnRlcnZhbE92ZXJsYXBzKGl2YWxBOiBJQ2VsbEludGVydmFsLCBpdmFsQjogSUNlbGxJbnRlcnZhbCkge1xuICAgICAgICBpZiAoaXZhbEEgPT0gbnVsbCB8fCBpdmFsQiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl2YWxBWzFdIDwgaXZhbEJbMF0gfHwgaXZhbEFbMF0gPiBpdmFsQlsxXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHJvd0ZpcnN0Q29tcGFyYXRvcihhOiBJQ2VsbENvb3JkaW5hdGUsIGI6IElDZWxsQ29vcmRpbmF0ZSkge1xuICAgICAgICBjb25zdCByb3dEaWZmID0gYVswXSAtIGJbMF07XG4gICAgICAgIHJldHVybiByb3dEaWZmID09PSAwID8gYVsxXSAtIGJbMV0gOiByb3dEaWZmO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIG51bWVyaWNhbENvbXBhcmF0b3IoYTogbnVtYmVyLCBiOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIG5vcm1hbGl6ZUludGVydmFsKGNvb3JkOiBudW1iZXIsIGNvb3JkMj86IG51bWJlcikge1xuICAgICAgICBpZiAoY29vcmQyID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvb3JkMiA9IGNvb3JkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBbY29vcmQsIGNvb3JkMl07XG4gICAgICAgIGludGVydmFsLnNvcnQoUmVnaW9ucy5udW1lcmljYWxDb21wYXJhdG9yKTtcbiAgICAgICAgcmV0dXJuIGludGVydmFsIGFzIElDZWxsSW50ZXJ2YWw7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
