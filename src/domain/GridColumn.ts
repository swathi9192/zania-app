// Type for grid column in datagrid
export interface GridColumn {
    colId: string;
    name: string;
    isCheckbox?: boolean;
    cellRenderer?: React.FC<{value: string}>
}