// Interface and Types
import {
  IDataTableProps,
  ITableExtends,
} from '@/lib/utils/interfaces/table.interface';

// Prime React
import { Column } from 'primereact/column';
import {
  DataTable,
  DataTableSelectionMultipleChangeEvent,
} from 'primereact/datatable';

const Table = <T extends ITableExtends>({
  header,
  data,
  selectedData,
  setSelectedData,
  columns,
  filters,
}: IDataTableProps<T>) => {
  //For checkbox selection of column
  const handleSelectionChange = (
    e: DataTableSelectionMultipleChangeEvent<T[]>
  ) => {
    setSelectedData(e.value);
  };

  return (
    <DataTable
      header={header}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      value={data}
      size={'normal'}
      selection={selectedData}
      onSelectionChange={handleSelectionChange}
      dataKey="id"
      tableStyle={{ minWidth: '50rem' }}
      selectionMode="multiple"
      filters={filters}
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
