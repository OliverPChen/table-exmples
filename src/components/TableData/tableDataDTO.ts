import {ReactNode} from "react";
import {ConditionProps} from '../../pages/tableDTBasic.api'
export type HeaderTitle={
  key:string;
  value:string;
  width?:string;
}

export interface TableDataDTO<T> {
  columns:HeaderTitle[];
  tableData:T[]|undefined;
  onRenderCell:(colKey: keyof T | string, record: T) =>  ReactNode | string;
}