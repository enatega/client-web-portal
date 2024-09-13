import { DataTableProps } from '@/lib/utils/types/table';
import { Column } from 'primereact/column';
import {
  DataTable,
  DataTableSelectionMultipleChangeEvent,
} from 'primereact/datatable';
import classes from './table.module.css';

const Table = <T extends { id: number | string }>({
  data,
  selectedData,
  setSelectedData,
  columns,
}: DataTableProps<T>) => {
  const handleSelectionChange = (
    e: DataTableSelectionMultipleChangeEvent<T[]>
  ) => {
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
          field={col.propertyName}
          header={col.headerName}
          body={col.body}
        />
      ))}
    </DataTable>
  );
};

export default Table;
