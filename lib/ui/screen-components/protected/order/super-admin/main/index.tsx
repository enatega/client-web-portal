import React, { useState, useMemo } from 'react';
import Table from '@/lib/ui/useable-components/table';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { IQueryResult } from '@/lib/utils/interfaces';
import { ORDER_COLUMNS } from '@/lib/ui/useable-components/table/columns/order-vendor-columns';
import OrderTableSkeleton from '@/lib/ui/useable-components/custom-skeletons/orders.vendor.row.skeleton';
import { IOrder, IExtendedOrder } from '@/lib/utils/interfaces';
import { TOrderRowData } from '@/lib/utils/types';
import { GET_ORDERS } from '@/lib/api/graphql';
import OrderSuperAdminTableHeader from '../header/table-header';



export default function OrderSuperAdminMain() {
  const [selectedData, setSelectedData] = useState<IExtendedOrder[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const { data, error, loading } = useQueryGQL(
    GET_ORDERS,
    {
      page: page,
    },
    {
      fetchPolicy: 'network-only',
    }
  ) as IQueryResult<{ allOrders: IOrder[] } | undefined, undefined>;

  // Handle page and row change
  const handlePageChange = (newPage: number, newRows: number) => {
    setPage(newPage);
    setRows(newRows);
  };

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const tableData = useMemo(() => {
    if (!data?.allOrders) return [];

    return data.allOrders.map(
      (order: IOrder): IExtendedOrder => ({
        ...order,
        itemsTitle:
          order.items
            .map((item) => item.title)
            .join(', ')
            .slice(0, 15) + '...',
        OrderdeliveryAddress: order.deliveryAddress.toString().slice(0, 15) + '...',
        DateCreated: new Date(order.createdAt).toLocaleDateString(),
      })
    );
  }, [data]);

  const filteredData = useMemo(() => {
    return tableData.filter((order: IExtendedOrder) => {
      const statusFilter =
        selectedActions.length === 0 ||
        selectedActions.includes(order.orderStatus);
      const searchFilter =
        searchTerm === '' ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) 
      return statusFilter && searchFilter;
    });
  }, [tableData, selectedActions, searchTerm]);

  const displayData: TOrderRowData[] = useMemo(() => {
    if (loading) {
      return OrderTableSkeleton({ rowCount: rows });
    }
    return filteredData;
  }, [loading, rows, filteredData]);

  return (
    <div className="p-3">
      <OrderSuperAdminTableHeader
        selectedActions={selectedActions}
        setSelectedActions={setSelectedActions}
        onSearch={handleSearch}
      />
      <Table
        data={displayData as IExtendedOrder[]}
        setSelectedData={setSelectedData}
        selectedData={selectedData}
        columns={ORDER_COLUMNS}
        loading={loading}
        onPageChange={handlePageChange}
        useServerPagination={true}
        rowsPerPage={rows}
      />
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
}