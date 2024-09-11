import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';
import classes from './table.module.css';

type ColumnConfig<T> = {
  propertyName: keyof T;
  headerName: string;
  body?: (rowData: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  selectedData: T[];
  setSelectedData: React.Dispatch<React.SetStateAction<T[]>>;
  columns: ColumnConfig<T>[];
};

const Table = <T extends { id: number }>({
  data,
  selectedData,
  setSelectedData,
  columns,
}: DataTableProps<T>) => {
  const handleSelectionChange = (e: any) => {
    setSelectedData(e.value);
  };

  return (
    <DataTable
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      value={data}
      selection={selectedData}
      onSelectionChange={handleSelectionChange}
      dataKey="id"
      tableStyle={{ minWidth: '50rem' }}
      className={`${classes.table}`}
      selectionMode="multiple"
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
      {columns.map((col, index) => (
        <Column
          key={index}
          field={col.propertyName as string}
          header={col.headerName}
          body={col.body}
        />
      ))}
    </DataTable>
  );
};

export default Table;
