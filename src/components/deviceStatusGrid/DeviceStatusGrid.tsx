import { DeviceStatusGridColumns } from '../../config/DeviceStatusGridColumns';
import { DeviceStatusGridData } from '../../config/DeviceStatusGridData';
import { DataGrid } from '../dataGrid/DataGrid';
import './DeviceStatusGrid.scss';
import { useDeviceStatusGrid } from '../../hooks/useDeviceStatusGrid';

export const DeviceStatusGrid = () => {

    const {
        selectAll,
        checkboxRef,
        isChecked,
        isDownloadEnabled,
        checkboxLabel,
        onRowsSelected,
        onSelectAllChange,
        onDownloadClick,
    } = useDeviceStatusGrid();
   
    return (
        <div>
            <div className='grid-container'>
                <div>
                    <input ref={checkboxRef} checked={isChecked} onChange={onSelectAllChange} type='checkbox' id='select_all' />
                    <label htmlFor='select_all'>{checkboxLabel}</label>
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