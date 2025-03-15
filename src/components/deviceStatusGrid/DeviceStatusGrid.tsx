import { useEffect, useRef, useState } from "react"
import { DeviceStatusGridColumns } from "../../config/DeviceStatusGridColumns"
import { DeviceStatusGridData } from "../../config/DeviceStatusGridData"
import { DeviceStatusResponse } from "../../domain/DeviceStatusResponse"
import { DataGrid, RowNode } from "../dataGrid/DataGrid"
import { CheckboxStates } from "../../domain/CheckboxStates"
import { DeviceStatus } from "../../domain/DeviceStatus"
import './DeviceStatusGrid.scss'

export const DeviceStatusGrid = () => {

    const [selectedRows, setSelectedRows] = useState<RowNode<DeviceStatusResponse>[]>([])
    const [selectAll, setSelectAll] = useState<CheckboxStates>(CheckboxStates.UNCHECKED);
    const checkboxRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (selectedRows.length === 0) {
            setSelectAll(CheckboxStates.UNCHECKED);
        }
        else if (selectedRows.length === DeviceStatusGridData.length) {
            setSelectAll(CheckboxStates.CHECKED);
        }
        else {
            setSelectAll(CheckboxStates.INTERMEDIATE);
        }
    }, [selectedRows]);

    useEffect(() => {
        if (checkboxRef?.current) {
            if (selectAll === CheckboxStates.INTERMEDIATE) {
                checkboxRef.current.indeterminate = true;
            }
            else {
                checkboxRef.current.indeterminate = false;
            }
        }
    }, [checkboxRef, selectAll]);

    const onRowsSelected = (rowNodes: RowNode<DeviceStatusResponse>[]) => {
        setSelectedRows(rowNodes);
    }

    const isChecked = selectAll === CheckboxStates.CHECKED ? true : false;
    const onSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectAll(CheckboxStates.CHECKED);
        }
        else {
            setSelectAll(CheckboxStates.UNCHECKED);
        }
    }

    const isDownloadEnabled = selectedRows.length>0 && selectedRows.every((row) => (row.status === DeviceStatus.AVAILABLE));
    const onDownloadClick = () => {
        let items = `Downloaded Items \n`;
        selectedRows.forEach((row) => {
            items += `Name: ${row.name} Device: ${row.device} Path: ${row.path} \n`
        })
        alert(items);
    }
    return (
        <div>
            <div className="grid-container">
                <div>
                    <input ref={checkboxRef} checked={isChecked} onChange={onSelectAllChange} type="checkbox" id="select_all" />
                    <label htmlFor="select_all">{selectedRows.length === 0 ? 'None Selected' : `${selectedRows.length} rows selected`}</label>
                </div>
                <div>
                    <button 
                    type='button' 
                    disabled={!isDownloadEnabled} 
                    onClick={onDownloadClick} 
                    >
                    Download Selected</button>
                </div>
            </div>
            <DataGrid
                columns={DeviceStatusGridColumns}
                rowData={DeviceStatusGridData}
                onRowsSelected={onRowsSelected}
                selectAllRows={selectAll}
            />
        </div>
    )
}