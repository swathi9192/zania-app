
type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | Array<JSONValue>;

export interface JSONObject {
    [key: string]: JSONValue;
}

export type RowNode<TData> = TData & { rowId: number };