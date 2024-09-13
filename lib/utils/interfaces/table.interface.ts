import { FilterMatchMode } from 'primereact/api';
import { IGlobalComponentProps } from './global.interface';

export interface IFilterType {
  [key: string]: {
    value: string | string[] | null;
    matchMode: FilterMatchMode;
  };
}

export interface IColumnConfig<T> extends IGlobalComponentProps {
  propertyName: string;
  headerName: string;
  body?: (rowData: T) => React.ReactNode;
}

export interface IDataTableProps<T> extends IGlobalComponentProps {
  header?: React.ReactNode;
  data: T[];
  selectedData: T[];
  setSelectedData: React.Dispatch<React.SetStateAction<T[]>>;
  columns: IColumnConfig<T>[];
  filters?: IFilterType;
}

export interface ITableExtends extends IGlobalComponentProps {
  id: number | string;
}