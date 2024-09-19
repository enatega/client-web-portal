import Loader from '@/lib/ui/screen-components/loader/Loader';
import { ITableColumn } from '@/lib/utils/interfaces';
import { Column } from 'primereact/column';
import {
  DataTable,
  DataTableSelectionMultipleChangeEvent,
} from 'primereact/datatable';

interface IGenericTableProps<T extends { _id: string }> {
  data: T[];
  columns: ITableColumn<T>[];
  selection?: T[] | null;
  onSelectionChange?: (selectedItems: T[]) => void;
  loading: boolean;
}
const GenericTable = <T extends { _id: string }>({
  data,
  columns,
  selection,
  onSelectionChange,
  loading,
}: IGenericTableProps<T>) => {
  if (loading) return <Loader />;
  return (
    <DataTable
      value={data}
      paginator
      rows={5}
      selection={selection ?? []}
      onSelectionChange={(e: DataTableSelectionMultipleChangeEvent<T[]>) => {
        onSelectionChange && onSelectionChange(e.value);
      }}
      dataKey="_id"
      selectionMode="checkbox"
      className="w-full"
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
  );
};
export default GenericTable;
