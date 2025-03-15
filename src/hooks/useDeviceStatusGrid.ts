import { useEffect, useRef, useState } from 'react';
import { DeviceStatusGridData } from '../config/DeviceStatusGridData';
import { DeviceStatusResponse } from '../domain/DeviceStatusResponse';
import { RowNode } from '../domain/GridDataType';
import { CheckboxStates } from '../domain/CheckboxStates';
import { DeviceStatus } from '../domain/DeviceStatus';

//custom hook to maintain logic for device status grid
export const useDeviceStatusGrid = () => {
    //Local state to maintain selected rows returned by datagrid
    const [selectedRows, setSelectedRows] = useState<RowNode<DeviceStatusResponse>[]>([]);
    //Local state to maintain states of select all checkbox
    const [selectAll, setSelectAll] = useState<CheckboxStates>(CheckboxStates.UNCHECKED);
    //Ref for checkbox to set intermediate state
    const checkboxRef = useRef<HTMLInputElement>(null);

    //It runs when selected rows changes to update the state of checkbox
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

    //It runs when checkbox state changes to set indeterminate for intermediate state
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

    //Callback function passed down to grid to get selected rows
    const onRowsSelected = (rowNodes: RowNode<DeviceStatusResponse>[]) => {
        setSelectedRows(rowNodes);
    }

    //Checks if checkbox is selected or not based on checkbox state
    const isChecked = selectAll === CheckboxStates.CHECKED ? true : false;

    //Sets the state of checkbox when user selects
    const onSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectAll(CheckboxStates.CHECKED);
        }
        else {
            setSelectAll(CheckboxStates.UNCHECKED);
        }
    }

    //checks if isDownload is enabled which happens if all selected rows have available status
    const isDownloadEnabled = selectedRows.length > 0 && selectedRows.every((row) => (row.status === DeviceStatus.AVAILABLE));

    //Prints selected rows in alert dialog on clicking download selected button
    const onDownloadClick = () => {
        let items = `Downloaded Items \n`;
        selectedRows.forEach((row) => {
            items += `Name: ${row.name} Device: ${row.device} Path: ${row.path} \n`
        })
        alert(items);
    }

    //displays no. of rows selected
    const checkboxLabel = selectedRows.length === 0 ? 'None Selected' : `${selectedRows.length} row${selectedRows.length > 1 ? 's' : ''} selected`;
    
    return {
        selectAll,
        checkboxRef,
        isChecked,
        isDownloadEnabled,
        checkboxLabel,
        onRowsSelected,
        onSelectAllChange,
        onDownloadClick,
    }
}