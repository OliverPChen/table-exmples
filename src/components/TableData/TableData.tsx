import React, { memo, ReactNode } from 'react';
import { Table } from 'react-bootstrap';
import { TableDataDTO, HeaderTitle } from './tableDataDTO';
import { TableHeaderCell } from './TableData.styled';

interface RowProps<T> {
    columns: HeaderTitle[];
    record: T;
    mainIndex: number;
    onRenderCell: (colKey: keyof T | string, record: T) => ReactNode | string;
}

function RowRender<T>({ columns, record, mainIndex, onRenderCell }: RowProps<T>) {
    return (
        <tr>
            {columns && columns.map((column) => <td key={column.key}>{onRenderCell(column.key, record)}</td>)}
            <td>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x-circle table-cancel"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </td>
        </tr>
    );
}

function TableData<T extends { id: string }>({ columns, tableData, onRenderCell }: TableDataDTO<T>) {
    return (
        <>
            <Table responsive="mb-4 mt-4" hover>
                {!!tableData ? (
                    <>
                        <thead>
                            <tr>
                                {columns &&
                                    columns.map((col) => (
                                        <TableHeaderCell key={col.key} cssWidth={col.width ?? ''}>
                                            {col.value}
                                        </TableHeaderCell>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((itemData: T, index: number) => (
                                <RowRender<T>
                                    key={itemData.id}
                                    columns={columns}
                                    mainIndex={index}
                                    onRenderCell={onRenderCell}
                                    record={itemData}
                                />
                            ))}
                        </tbody>
                    </>
                ) : (
                    'No Data'
                )}
            </Table>
        </>
    );
}

export default memo(TableData) as typeof TableData;
