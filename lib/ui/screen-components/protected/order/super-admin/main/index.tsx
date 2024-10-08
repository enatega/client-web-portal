import React, { useState, useMemo } from 'react';
import Table from '@/lib/ui/useable-components/table';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { IQueryResult } from '@/lib/utils/interfaces';
import OrderTableSkeleton from '@/lib/ui/useable-components/custom-skeletons/orders.vendor.row.skeleton';
import { IOrder, IExtendedOrder } from '@/lib/utils/interfaces';
import { TOrderRowData } from '@/lib/utils/types';
import { GET_ORDERS_WITHOUT_PAGINATION } from '@/lib/api/graphql';
import OrderSuperAdminTableHeader from '../header/table-header';
import { ORDER_SUPER_ADMIN_COLUMNS } from '@/lib/ui/useable-components/table/columns/order-superadmin-columns';

export default function OrderSuperAdminMain() {
  const [selectedData, setSelectedData] = useState<IExtendedOrder[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, loading } = useQueryGQL(
    GET_ORDERS_WITHOUT_PAGINATION,
    {},
    {
      fetchPolicy: 'network-only',
    }
  ) as IQueryResult<{ allOrdersWithoutPagination: IOrder[] } | undefined, undefined>;

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const tableData = useMemo(() => {
    if (!data?.allOrdersWithoutPagination) return [];

    return data.allOrdersWithoutPagination.map(
      (order: IOrder): IExtendedOrder => ({
        ...order,
        itemsTitle:
          order.items
            .map((item) => item.title)
            .join(', ')
            .slice(0, 15) + '...',
        OrderdeliveryAddress: order.deliveryAddress.deliveryAddress.toString().slice(0, 15) + '...',
        DateCreated: order.createdAt.toString().slice(0, 10),
      })
    );
  }, [data]);

  const filteredData = useMemo(() => {
    return tableData.filter((order: IExtendedOrder) => {
      const statusFilter =
        selectedActions.length === 0 ||
        selectedActions.includes(order.orderStatus);
      return statusFilter;
    });
  }, [tableData, selectedActions, searchTerm]);

  const displayData: TOrderRowData[] = useMemo(() => {
    if (loading) {
      return OrderTableSkeleton({ rowCount: 10 }); // Display 10 skeleton rows while loading
    }
    return filteredData;
  }, [loading, filteredData]);

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
        columns={ORDER_SUPER_ADMIN_COLUMNS}
        loading={loading}
        useServerPagination={true} 
      />
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
}
