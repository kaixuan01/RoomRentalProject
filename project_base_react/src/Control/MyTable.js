import React, { useState, useEffect, useCallback } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
import '../CSS/MyTable.css'; // Import the CSS file
import { buildQueryString } from '../Common/Common';
import { Input } from 'reactstrap';
import { useFuncHTTPReq } from '../Hook/FuncHttpReq';
// Default filter UI for text columns
export const DefaultColumnFilter = ({
    column: { filterValue, setFilter, Header },
}) => (
    <Input
        value={filterValue || ''}
        onChange={e => {
            setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${Header}`}
        style={{
            width: '100%',
        }}
    />
);

const MyTable = ({ url, columns, defaultSortBy, rowStyle }) => {
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [itemQty, setItemQty] = useState(0);
    const { FuncHTTPReq } = useFuncHTTPReq();
    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { pageSize, sortBy, filters },
        setPageSize,
    } = useTable(
        {

            columns,
            data,
            defaultColumn,
            initialState: {
                pageSize: 10,
                sortBy: [defaultSortBy]
            },
            manualPagination: true,
            manualSortBy: true,
            manualFilters: true,
            rowCount: totalItems,
        },
        useFilters,
        useSortBy,
        usePagination
    );

    const fetchData = useCallback(async () => {
        try {
            const queryParams = {
                PageNumber: pageIndex,
                PageSize: pageSize,
                SortBy: sortBy[0] ? sortBy[0].id : '',
                SortDescending: sortBy[0] ? sortBy[0].desc : false,
                ...filters.reduce((acc, { id, value }) => ({ ...acc, [id]: value }), {}),
            };

            const queryString = buildQueryString(queryParams);
            const fullUrl = `${url}?${queryString}`;

            await FuncHTTPReq({
                url: fullUrl,
                method: 'GET',
                onSuccess: (data) => {
                    setData(data.items);
                    setTotalItems(data.totalCount);
                    setItemQty(data.items.length);
                },
                onError: (error) => {
                    console.error('Request failed with error:', error);
                },
            });
        } catch (error) {
            console.error('Error in fetchData:', error);
        }
    }, [pageIndex, pageSize, sortBy, filters, url, FuncHTTPReq]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const handlePageChange = (newPageIndex) => {
        if (newPageIndex >= 1 && newPageIndex <= Math.ceil(totalItems / pageSize)) {
            setPageIndex(newPageIndex);
        }
    };

    const totalPages = Math.ceil(totalItems / pageSize);
    const firstItemIndex = (pageIndex - 1) * pageSize + 1;
    const lastItemIndex = Math.min(pageIndex * pageSize, totalItems);

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageIndex(1);
    };

    return (
        <div className="table-container">
            <div className="scrollable-table-wrapper">
                <table {...getTableProps()} className="my-table">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <React.Fragment key={`header-group-${headerGroup.id}`}>
                                <tr {...headerGroup.getHeaderGroupProps()} key={`tile-group-${headerGroup.id}`}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            key={`header-${column.id}`}
                                        >
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                                <tr {...headerGroup.getHeaderGroupProps()} key={`filter-group-${headerGroup.id}`}>
                                    {headerGroup.headers.map(column => {
                                        return column.canFilter ? (
                                            <th key={`filter-${column.id}`}>
                                                {column.render('Filter')}
                                            </th>
                                        ) : <th key={`filter-${column.id}`}></th>;
                                    })}
                                </tr>

                            </React.Fragment>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            const customStyle = rowStyle ? rowStyle(row) : {};
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    key={`row-${row.id}`}
                                    style={customStyle}
                                >
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} key={`cell-${cell.column.id}`}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="pagination-controls">
                <span>Show Rows per page</span>
                <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    className="page-size-selector"
                >
                    {[1, 10, 20, 50].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
                <div className="pagination-buttons">
                    <div className="rows-info">
                        {firstItemIndex}-{lastItemIndex} of {totalItems}
                    </div>
                    <button
                        onClick={() => handlePageChange(pageIndex - 1)}
                        disabled={pageIndex === 1}
                        className="pagination-button"
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={() => handlePageChange(pageIndex + 1)}
                        disabled={(pageIndex) * pageSize >= totalItems}
                        className="pagination-button"
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyTable;
