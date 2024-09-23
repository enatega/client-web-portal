import {
  IGenericTableExtends,
  IGenericTableProps,
} from '@/lib/utils/interfaces/global-table.interface';
import { Column } from 'primereact/column';
import {
  DataTable,
  DataTableSelectionMultipleChangeEvent,
} from 'primereact/datatable';
import CustomLoader from '../custom-progress-indicator';

const GenericTable = <T extends IGenericTableExtends>({
  data,
  columns,
  selection,
  onSelectionChange,
  loading,
  filters,
}: IGenericTableProps<T>) => {
  if (loading) return <CustomLoader />;
  return (
    <>
      <DataTable
        value={data ?? []}
        paginator
        rows={5}
        selection={selection ?? []}
        onSelectionChange={(e: DataTableSelectionMultipleChangeEvent<T[]>) => {
          onSelectionChange && onSelectionChange(e.value);
        }}
        scrollable={true}
        scrollHeight="200px"
        dataKey="_id"
        selectionMode="checkbox"
        className="w-full"
        filters={filters}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '3rem' }}
          rowEditor={false}
        />
        {columns.map((col, index) => (
          <Column
            key={index}
            field={col.field as string}
            header={col.header}
            body={col.body}
          />
        ))}
      </DataTable>
    </>
  );
};
export default GenericTable;
