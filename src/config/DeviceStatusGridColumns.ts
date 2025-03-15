import { StatusCellRenderer } from "../components/statusCellRenderer/StatusCellRenderer";
import { DeviceStatusColIds } from "../domain/DeviceStatusColIds";
import { GridColumn } from "../domain/GridColumn";

export const DeviceStatusGridColumns: GridColumn[] = [
    {
        colId: 'checkbox',
        name: '',
        isCheckbox: true
    },
    {
        colId: DeviceStatusColIds.NAME,
        name: 'Name'
    },
    {
        colId: DeviceStatusColIds.DEVICE,
        name: 'Device'
    },
    {
        colId: DeviceStatusColIds.PATH,
        name: 'Path'
    },
    {
        colId: DeviceStatusColIds.STATUS,
        name: 'Status',
        cellRenderer: StatusCellRenderer
    }
]

