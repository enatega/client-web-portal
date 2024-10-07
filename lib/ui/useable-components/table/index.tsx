// Interface and Types
import {
  IDataTableProps,
  ITableExtends,
} from '@/lib/utils/interfaces/table.interface';

// Prime React
import { Column } from 'primereact/column';
import {
  DataTable,
  DataTableRowClickEvent,
  DataTableSelectionMultipleChangeEvent,
} from 'primereact/datatable';
import DataTableColumnSkeleton from '../custom-skeletons/datatable.column.skeleton';
import { DataTablePageEvent } from 'primereact/datatable';
import { useState } from 'react';
import OrderDetailModal from '../popup-menu/order-details-modal';
import { IExtendedOrder } from '@/lib/utils/interfaces';

const Table = <T extends ITableExtends>({
  header,
  data,
  selectedData,
  setSelectedData,
  columns,
  filters,
  size = 'small',
  loading,
  isSelectable = false,
  onPageChange,
  useServerPagination = false,
  rowsPerPage=10
}: IDataTableProps<T>) => {
  const handleSelectionChange = (
    e: DataTableSelectionMultipleChangeEvent<T[]>
  ) => {
    setSelectedData(e.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<IExtendedOrder | null>(null);

  const handleRowClick = (event: DataTableRowClickEvent & { data: IExtendedOrder }) => {
    setSelectedRestaurant(event?.data); // Pass the selected restaurant data
    setIsModalOpen(true);
  };

  const handlePageChange = (event: DataTablePageEvent) => {
   
    if (onPageChange) {
      const currentPage = event.page !== undefined ? event.page : 0; 
      const rowsPerPage = event.rows !== undefined ? event.rows : 10
      onPageChange(currentPage, rowsPerPage);
    }
  };

   const rowClassName = (data: T) => {
    return data?.orderStatus === 'ASSIGNED' ? 'row-assigned' : '';
  };

  console.log("🚀 ~ rowClassName ~ data:", data)

  return (
    <>
    <DataTable
      header={header}
      paginator
      rows={rowsPerPage ? rowsPerPage : 10}
      rowsPerPageOptions={[10, 15, 25, 50]}
      value={data}
      size={size}
      selection={selectedData}
      onSelectionChange={handleSelectionChange}
      dataKey="_id"
      tableStyle={{
        minWidth: '50rem',
        minHeight: 'auto',
        maxHeight: '480px',
      }}
      selectionMode={isSelectable ? 'checkbox' : null}
      filters={filters}
      scrollable={true}
      scrollHeight="480px"
      removableSort
      lazy={useServerPagination}
      onPage={useServerPagination ? handlePageChange : ()=>{}} 
      totalRecords={useServerPagination ? data.length : undefined} 
      rowClassName={rowClassName}
      onRowClick={useServerPagination ? handleRowClick : ()=>{}}
    >
      {isSelectable && (
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '3rem' }}
        ></Column>
      )}
      {columns.map((col, index) => (
        <Column
        key={index}
          field={col.propertyName}
          header={col.headerName}
          sortable={!col.propertyName.includes('action')}
          bodyClassName="selectable-column"
          body={loading ? <DataTableColumnSkeleton /> : col.body}
          />
        ))}
    </DataTable>
    <OrderDetailModal
        visible={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        restaurantData={selectedRestaurant}
      />
        </>
  );
};



export default Table;
