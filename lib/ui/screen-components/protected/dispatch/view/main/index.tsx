// queries
import {
  GET_ACTIVE_ORDERS,
  GET_RIDERS_BY_ZONE,
  UPDATE_STATUS,
} from '@/lib/api/graphql';
import { ToastContext } from '@/lib/context/toast.context';

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';
import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';
import { IDropdownSelectItem, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  IActiveOrders,
  IGetActiveOrders,
  IGetRidersByZone,
  IGetRidersByZoneVariables,
  IRidersByZone,
} from '@/lib/utils/interfaces/dispatch.interface';
import {
  IColumnConfig,
  IFilterType,
} from '@/lib/utils/interfaces/table.interface';
import {
  LazyQueryResultTuple,
  useLazyQuery,
  useMutation,
} from '@apollo/client';
import {
  faCircleCheck,
  faDashboard,
  faTrash,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

export default function DispatchMain() {
  //toast
  const { showToast } = useContext(ToastContext);
  //states
  const [activeOrders, setActiveOrders] = useState<IActiveOrders[]>([]);
  const [selectedData, setSelectedData] = useState<IActiveOrders[]>([]);
  const [riderOptions, setRiderOptions] = useState<IDropdownSelectItem[]>([]);
  const [currentRiders, setCurrentRiders] = useState<IRidersByZone[]>([]);
  const [currentSelectedRider, setCurrentSelectedRider] =
    useState<IDropdownSelectItem>();
  const [isRiderLoading, setIsRiderLoading] = useState({
    _id: '',
    bool: false,
  });
  //   const [ridersData, setRidersData] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState(['']);

  //filters
  const [filters, setFilters] = useState<IFilterType>({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });

  //mutaions
  const [updateStatus] = useMutation(UPDATE_STATUS, {
    onError: (err) =>
      showToast({
        type: 'error',
        message:
          err.message ||
          err.graphQLErrors[0].message ||
          'An error occured while updating the status',
        title: 'Edit Order Status',
      }),
  });
  //   const [assignRider] = useMutation(ASSIGN_RIDER);

  //queries
  const { data: active_orders_data, fetch: fetchActiveOrders } = useLazyQueryQL(
    GET_ACTIVE_ORDERS,
    {
      pollInterval: 3000,
    }
  ) as ILazyQueryResult<IGetActiveOrders | undefined, undefined>;

  const [fetch] = useLazyQuery(GET_RIDERS_BY_ZONE) as LazyQueryResultTuple<
    IGetRidersByZone | undefined,
    IGetRidersByZoneVariables
  >;
  const handleRiderClick = async (
    rowData: IActiveOrders
  ): Promise<{ data?: IRidersByZone[]; loading: boolean }> => {
    const res = await fetch({
      variables: {
        id: rowData.zone._id,
      },
    });
    return {
      data: res.data?.ridersByZone,
      loading: res.loading,
    };
  };

  //subscriptions
  //   const subscribeFunc = (rowData: any) => {
  //     const { data: subscription_data } = useSubscription(SUBSCRIPTION_ORDER, {
  //       variables: {
  //         _id: rowData._id,
  //       },
  //     });
  //     console.log({ subscription_data });
  //   };

  //global filters change
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  //status options

  const actionStatusOptions = [
    {
      label: 'Pending',
      code: 'PENDING',
      body: () => <Tag value="Pending" severity="secondary" rounded />,
    },
    {
      label: 'Assigned',
      code: 'ASSIGNED',
      body: () => <Tag value="Assigned" severity="warning" rounded />,
    },
    {
      label: 'Accepted',
      code: 'ACCEPTED',
      body: () => <Tag value="Accepted" severity="info" rounded />,
    },
    {
      label: 'Delivered',
      code: 'DELIVERED',
      body: () => <Tag value="Delivered" severity="success" rounded />,
    },
    {
      label: 'Rejected',
      code: 'REJECTED',
      body: () => <Tag value="Reject" severity="danger" rounded />,
    },
  ];

  const handleStatusDropDownChange = async (
    e: DropdownChangeEvent,
    rowData: IActiveOrders
  ) => {
    try {
      const filtered_arr = activeOrders.filter(
        (order) => order._id !== rowData._id
      );
      const updated_active_order = { ...rowData, orderStatus: e.value.code };
      await updateStatus({
        variables: {
          _id: rowData._id,
          orderStatus: e.value.code,
        },
      });
      showToast({
        type: 'success',
        title: 'Edit Order Status',
        message: 'Order status has been updated successfully',
      });

      setActiveOrders(() => [updated_active_order, ...filtered_arr]);
    } catch (error) {
      console.log(error);
    }
  };

  // status templates
  const valueTemplate = (option: IDropdownSelectItem) => (
    <div className="flex gap-2 items-center justify-start">
      <Tag
        severity={severityChecker(option?.code)}
        value={option?.label}
        rounded
      />
    </div>
  );
  const itemTemplate = (option: IDropdownSelectItem) => {
    if (option.code === 'PENDING' || option.code === 'ASSIGNED') return;
    return (
      <div
        className={`flex flex-row-reverse gap-2 items-center justify-start ${option.code === 'PENDING' || option.code === 'ASSIGNED' ? 'hidden' : 'visible'}`}
      >
        <span>
          {option.code === 'REJECTED'
            ? 'Reject'
            : option.code === 'ACCEPTED'
              ? 'Accept'
              : option.code === 'DELIVERED'
                ? 'Delivered'
                : ''}
        </span>
        <FontAwesomeIcon
          icon={
            option.code === 'REJECTED'
              ? faTrash
              : option.code === 'ACCEPTED'
                ? faCircleCheck
                : option.code === 'DELIVERED'
                  ? faTruck
                  : faDashboard
          }
        />
      </div>
    );
  };

  function severityChecker(status: string) {
    switch (status) {
      case 'PENDING':
        return 'danger';
      case 'ASSIGNED':
        return 'info';
      case 'ACCEPTED':
        return 'success';
    }
  }
  //columns
  const colums: IColumnConfig<IActiveOrders>[] = [
    {
      propertyName: 'deliveryAddress.deliveryAddress',
      headerName: 'Order Information',
    },
    {
      propertyName: 'restaurant.name',
      headerName: 'Restaurant',
    },
    {
      propertyName: 'paymentMethod',
      headerName: 'Payment',
    },
    {
      propertyName: 'rider.name',
      headerName: 'Rider',
      body: (rowData: IActiveOrders) => {
        async function handleClick(rowData: IActiveOrders) {
          setIsRiderLoading({
            _id: rowData._id,
            bool: true,
          });
          const { data } = await handleRiderClick(rowData);
          data?.forEach((rider) => {
            setRiderOptions((prev) => [
              ...prev,
              { label: rider.name, code: rider.name.toUpperCase() },
            ]);
          });
          if (data) {
            setCurrentRiders(data);
          }
          setIsRiderLoading({
            _id: rowData._id,
            bool: false,
          });
        }
        return (
          <div onClick={() => handleClick(rowData)}>
            <CustomDropdownComponent
              name="riders"
              options={
                isRiderLoading._id === rowData._id && riderOptions
                  ? riderOptions
                  : [{ label: '', code: '' }]
              }
              selectedItem={
                currentSelectedRider ?? { label: 'Select', code: 'SELECT' }
              }
              placeholder="Select Rider"
              setSelectedItem={(key, item) => setCurrentSelectedRider(item)}
              loading={
                isRiderLoading.bool && isRiderLoading._id === rowData._id
              }
            />
          </div>
        );
      },
    },
    {
      propertyName: 'createdAt',
      headerName: 'Order Time',
      body: (rowData: IActiveOrders) => (
        <span>
          {new Date(rowData.createdAt)
            .toLocaleDateString()
            .concat(', ', new Date(rowData.createdAt).toLocaleTimeString())}
        </span>
      ),
    },
    {
      propertyName: 'orderStatus',
      headerName: 'Status',
      body: (rowData: IActiveOrders) => {
        let currentStatus = actionStatusOptions.find(
          (status) => status.code === rowData?.orderStatus
        );
        return (
          <Dropdown
            value={currentStatus}
            onChange={(e) => handleStatusDropDownChange(e, rowData)}
            options={actionStatusOptions}
            itemTemplate={itemTemplate}
            valueTemplate={valueTemplate}
          />
        );
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetchActiveOrders();
  }, []);
  useEffect(() => {
    if (active_orders_data?.getActiveOrders) {
      setActiveOrders(active_orders_data.getActiveOrders);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    console.log({ currentRiders });
  }, [active_orders_data?.getActiveOrders, activeOrders]);
  return (
    <div>
      <Table
        columns={colums}
        data={activeOrders}
        isSelectable={true}
        loading={isLoading}
        selectedData={selectedData}
        setSelectedData={(e) => setSelectedData(e as IActiveOrders[])}
        header={
          <TableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            statusOptions={actionStatusOptions}
          />
        }
        filters={filters}
      />
    </div>
  );
}
