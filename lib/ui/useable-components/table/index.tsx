import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import classes from './table.module.css';
import { DataTableProps } from '@/lib/utils/types/table';

const Table = <T extends { id: number | string }>({
  header,
  data,
  selectedData,
  setSelectedData,
  columns,
  filters,
}: DataTableProps<T>) => {
  const handleSelectionChange = (e: any) => {
    setSelectedData(e.value);
  };

  return (
    <DataTable
      paginator
      rows={5}
      header={header}
      rowsPerPageOptions={[5, 10, 25, 50]}
      value={data}
      selection={selectedData}
      onSelectionChange={handleSelectionChange}
      dataKey="id"
      tableStyle={{ minWidth: '50rem' }}
      className={`${classes.table}`}
      selectionMode="multiple"
      filters={filters} // Apply filters here
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
