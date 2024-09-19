import { DataTableFilterMeta } from 'primereact/datatable';
import { ITableColumn } from './global.interface';

export interface IGenericTableProps<T extends { _id: string }> {
  data: T[] | null | undefined;
  columns: ITableColumn<T>[];
  selection?: T[] | null;
  onSelectionChange?: (selectedItems: T[]) => void;
  loading: boolean;
  filters?: DataTableFilterMeta | undefined;
}
export interface IGenericTableExtends {
  _id: string;
}
