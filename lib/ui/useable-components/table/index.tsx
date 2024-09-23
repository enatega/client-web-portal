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
import DataTableColumnSkeleton from '../custom-skeletons/datatable.column.skeleton';

const Table = <T extends ITableExtends>({
  header,
  data,
  selectedData,
  setSelectedData,
  columns,
  filters,
  size = 'small',
  loading,
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
      rows={10}
      rowsPerPageOptions={[10, 15, 25, 50]}
      value={data}
      size={size}
      selection={selectedData}
      onSelectionChange={handleSelectionChange}
      dataKey="_id"
      tableStyle={{
        minWidth: '50rem',
        minHeight: 'auto',
        maxHeight: '500px',
      }}
      selectionMode="checkbox"
      filters={filters}
      scrollable={true}
      scrollHeight="500px"
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
      {columns.map((col, index) => (
        <Column
          key={index}
          field={col.propertyName}
          header={col.headerName}
          body={loading ? <DataTableColumnSkeleton /> : col.body}
        />
      ))}
    </DataTable>
  );
};

export default Table;
