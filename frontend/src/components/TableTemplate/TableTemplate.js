import React from 'react';
import IsLoading from '../IsLoading/IsLoading';

const TableTemplate = ({ theadData, tbodyData, isLoading = false, limit = null }) => {
    let displayData = tbodyData;

    if (limit !== null) {
        displayData = tbodyData.slice(0, limit);
    }

    return (
        <table className="table table-striped table-hover table-bordered" style={{ textAlign: "center", verticalAlign: "middle" }}>
            <thead>
                <tr>
                    {theadData.map((column, index) => (
                        <th key={index} style={{ backgroundColor: "rgb(71, 101, 118)", color: "white", display: column.column_hidden ? 'none' : 'table-cell' }}>
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {isLoading && <tr>
                    <td colSpan={theadData.length}>
                        <IsLoading />
                    </td>
                </tr>}
                {!isLoading && displayData.map((rowData, rowIndex) => (
                    <tr key={rowIndex}>
                        {theadData.map((column, cellIndex) => (
                            <td key={cellIndex} style={{ display: column.column_hidden ? 'none' : 'table-cell' }}>
                                {column.render
                                    ? column.render(rowData[column.key], rowData, rowIndex)
                                    : rowData[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
                {(!isLoading && displayData.length === 0) &&
                    <tr>
                        <td colSpan={theadData.length}>Pas de données à afficher</td>
                    </tr>
                }
            </tbody>
        </table>
    );
};

export default TableTemplate;
