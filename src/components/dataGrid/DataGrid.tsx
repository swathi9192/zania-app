import { useEffect, useState } from 'react';
import { GridColumn } from '../../domain/GridColumn';
import { CheckboxStates } from '../../domain/CheckboxStates';
import { RowNode, JSONObject } from '../../domain/GridDataType';
import './DataGrid.scss';

interface DataGridProps<T> {
    columns: GridColumn[];
    rowData: T[];
    selectAllRows?: CheckboxStates;
    onRowsSelected?: (rows: RowNode<T>[]) => void;
}

export const DataGrid = <TData extends JSONObject>(props: DataGridProps<TData>) => {
    // Adding rowId to each row of data for internal use of datagrid
    const rowNodes: RowNode<TData>[] = props.rowData.map((row, index) => {
        return ({ ...row, rowId: index });
    });

    // Local state to maintain selected rows
    const [rowsSelected, setRowsSelected] = useState<Map<number, RowNode<TData>>>(new Map());

    //It runs if user selects parent checkbox to select all or unselect all rows 
    useEffect(() => {
        if (props.selectAllRows === CheckboxStates.CHECKED) {
            const selectAllMap = new Map(rowNodes.map(node => [node.rowId, node]));
            setRowsSelected(selectAllMap);
        }
        else if (props.selectAllRows === CheckboxStates.UNCHECKED) {
            setRowsSelected(new Map());
        }
    }, [props.selectAllRows]);

    //Callback function when a user selects checkbox in a row
    const onRowSelected = (row: RowNode<TData>) => {
        const rowNode = rowsSelected.get(row.rowId);
        if (rowNode) {
            rowsSelected.delete(row.rowId);
            setRowsSelected(rowsSelected);
            if (props.onRowsSelected)
                props.onRowsSelected(Array.from(rowsSelected.values()));
        }
        else {
            const updatedRows = rowsSelected.set(row.rowId, row);
            setRowsSelected(updatedRows);
            if (props.onRowsSelected)
                props.onRowsSelected(Array.from(updatedRows.values()));
        }
    };

    //Checks if row is checked from rowsSelected map
    const isRowChecked = (rowNode: RowNode<TData>) => rowsSelected.get(rowNode.rowId) ? true : false;

    return (
        <div>
            <table>
                <tr>
                    {props.columns.map((column) => <th>{column.name}</th>)}
                </tr>
                {
                    rowNodes.map((rowNode) => {
                        return (
                            <tr>
                                {props.columns.map((column) => {
                                    return column.isCheckbox ?
                                        <td>
                                            <input type="checkbox" checked={isRowChecked(rowNode)} onChange={() => onRowSelected(rowNode)} />
                                        </td> :
                                        column.cellRenderer ?
                                            <td>
                                                <column.cellRenderer value={(rowNode[column.colId] ?? '') as string} />
                                            </td> :
                                            <td>{(rowNode[column.colId] ?? '') as string}</td>
                                }
                                )}
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}