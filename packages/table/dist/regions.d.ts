/**
 * `Region`s contain sets of cells. Additionally, a distinction is drawn, for
 * example, between all cells within a column and the whole column itself.
 * The `RegionCardinality` enum represents these distinct types of `Region`s.
 */
export declare enum RegionCardinality {
    /**
     * A region that contains a finite rectangular group of table cells
     */
    CELLS = 0,
    /**
     * A region that represents all cells within 1 or more rows.
     */
    FULL_ROWS = 1,
    /**
     * A region that represents all cells within 1 or more columns.
     */
    FULL_COLUMNS = 2,
    /**
     * A region that represents all cells in the table.
     */
    FULL_TABLE = 3,
}
/**
 * A convenience object for subsets of `RegionCardinality` that are commonly
 * used as the `selectionMode` prop of the `<Table>`.
 */
export declare const SelectionModes: {
    ALL: RegionCardinality[];
    COLUMNS_AND_CELLS: RegionCardinality[];
    COLUMNS_ONLY: RegionCardinality[];
    NONE: RegionCardinality[];
    ROWS_AND_CELLS: RegionCardinality[];
    ROWS_ONLY: RegionCardinality[];
};
export interface IStyledRegionGroup {
    className?: string;
    regions: IRegion[];
}
/**
 * An _inclusive_ interval of ZERO-indexed cell indices.
 */
export declare type ICellInterval = [number, number];
/**
 * Small datastructure for storing cell coordinates [row, column]
 */
export declare type ICellCoordinate = [number, number];
/**
 * A ZERO-indexed region of cells.
 *
 * @see `Regions.getRegionCardinality` for more about the format of this object.
 */
export interface IRegion {
    rows?: ICellInterval;
    cols?: ICellInterval;
}
export declare class Regions {
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
    static getRegionCardinality(region: IRegion): RegionCardinality;
    /**
     * Returns a region containing one or more cells.
     */
    static cell(row: number, col: number, row2?: number, col2?: number): IRegion;
    /**
     * Returns a region containing one or more full rows.
     */
    static row(row: number, row2?: number): IRegion;
    /**
     * Returns a region containing one or more full columns.
     */
    static column(col: number, col2?: number): IRegion;
    /**
     * Adds the region to the end of a cloned copy of the supplied region
     * array.
     */
    static add(regions: IRegion[], region: IRegion): IRegion[];
    /**
     * Replaces the region at the end of a cloned copy of the supplied region
     * array.
     */
    static update(regions: IRegion[], region: IRegion): IRegion[];
    /**
     * Returns true iff the specified region is equal to the last region in
     * the region list. This allows us to avoid immediate additive re-selection.
     */
    static lastRegionIsEqual(regions: IRegion[], region: IRegion): boolean;
    /**
     * Returns the index of the region that is equal to the supplied
     * parameter. Returns -1 if no such region is found.
     */
    static findMatchingRegion(regions: IRegion[], region: IRegion): number;
    /**
     * Returns true if the regions contain a region that has FULL_COLUMNS
     * cardinality and contains the specified column index.
     */
    static hasFullColumn(regions: IRegion[], col: number): boolean;
    /**
     * Returns true if the regions contain a region that has FULL_ROWS
     * cardinality and contains the specified row index.
     */
    static hasFullRow(regions: IRegion[], row: number): boolean;
    /**
     * Returns true if the regions contain the query region. The query region
     * may be a subset of the `regions` parameter.
     */
    static containsRegion(regions: IRegion[], query: IRegion): boolean;
    static eachUniqueFullColumn(regions: IRegion[], iteratee: (col: number) => void): void;
    /**
     * Using the supplied array of non-contiguous `IRegion`s, this method
     * returns an ordered array of every unique cell that exists in those
     * regions.
     */
    static enumerateUniqueCells(regions: IRegion[], numRows: number, numCols: number): ICellCoordinate[];
    /**
     * Maps a dense array of cell coordinates to a sparse 2-dimensional array
     * of cell values.
     *
     * We create a new 2-dimensional array representing the smallest single
     * contiguous `IRegion` that contains all cells in the supplied array. We
     * invoke the mapper callback only on the cells in the supplied coordinate
     * array and store the result. Returns the resulting 2-dimensional array.
     */
    static sparseMapCells<T>(cells: ICellCoordinate[], mapper: (row: number, col: number) => T): T[][];
    /**
     * Returns the smallest single contiguous `IRegion` that contains all cells in the
     * supplied array.
     */
    static getBoundingRegion(cells: ICellCoordinate[]): IRegion;
    static isValid(region: IRegion): boolean;
    static joinStyledRegionGroups(selectedRegions: IRegion[], otherRegions: IStyledRegionGroup[]): IStyledRegionGroup[];
    /**
     * Iterates over the cells within an `IRegion`, invoking the callback with
     * each cell's coordinates.
     */
    private static eachCellInRegion(region, numRows, numCols, iteratee);
    private static regionsEqual(regionA, regionB);
    private static intervalsEqual(ivalA, ivalB);
    private static intervalContainsIndex(interval, index);
    private static intervalOverlaps(ivalA, ivalB);
    private static rowFirstComparator(a, b);
    private static numericalComparator(a, b);
    private static normalizeInterval(coord, coord2?);
}
