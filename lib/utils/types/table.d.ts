import { FilterMatchMode } from 'primereact/api';

export type FilterType = {
  [key: string]: {
    value: string | null;
    matchMode: FilterMatchMode;
  };
};
export type ColumnConfig<T> = {
  propertyName: string;
  headerName: string;
  body?: (rowData: T) => React.ReactNode;
};

export type DataTableProps<T> = {
  header?: React.ReactNode;
  data: T[];
  selectedData: T[];
  setSelectedData: React.Dispatch<React.SetStateAction<T[]>>;
  columns: ColumnConfig<T>[];
  filters?: FilterType;
};
