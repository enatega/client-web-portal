//css
import classes from './index.module.css';

// queries
import {
  ASSIGN_RIDER,
  GET_ACTIVE_ORDERS,
  GET_RIDERS_BY_ZONE,
  SUBSCRIPTION_ORDER,
  UPDATE_STATUS,
} from '@/lib/api/graphql';

//components
import Table from '@/lib/ui/useable-components/table';
import DispatchTableHeader from '../header/table-header';

//inrfaces
import { IDropdownSelectItem, ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  IActiveOrders,
  IGetActiveOrders,
  IGetRidersByZone,
  IGetRidersByZoneVariables,
  IRidersByZone,
} from '@/lib/utils/interfaces/dispatch.interface';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';

//prime react
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  LazyQueryResultTuple,
  useLazyQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';

//contexts
import { ToastContext } from '@/lib/context/toast.context';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faDashboard,
  faTrash,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';

export default function DispatchMain() {
  // Toast
  const { showToast } = useContext(ToastContext);

  // States
  const [selectedData, setSelectedData] = useState<IActiveOrders[]>([]);
  const [riderOptions, setRiderOptions] = useState<IDropdownSelectItem[]>([]);
  const [isRiderLoading, setIsRiderLoading] = useState({
    _id: '',
    bool: false,
  });
  const [isStatusUpdating, setIsStatusUpdating] = useState({
    _id: '',
    bool: false,
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

    // Memo
  const actionStatusOptions = useMemo(
    () => [
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
    ],
    []
  );
  

  // Filters
  const filters = {
    global: { value: globalFilterValue, matchMode: FilterMatchMode.CONTAINS },
    orderStatus: {
      value: selectedActions.length > 0 ? selectedActions : null,
      matchMode: FilterMatchMode.IN,
    },
  };

  // Queries
  const {
    data: active_orders_data,
    fetch: fetchActiveOrders,
    loading,
  } = useLazyQueryQL(GET_ACTIVE_ORDERS, {
    fetchPolicy: 'network-only',
    debounceMs: 5000,
  }) as ILazyQueryResult<IGetActiveOrders | undefined, undefined>;

  const [fetch] = useLazyQuery(GET_RIDERS_BY_ZONE) as LazyQueryResultTuple<
  IGetRidersByZone | undefined,
  IGetRidersByZoneVariables
>;

  // Mutaions
  const [updateStatus] = useMutation(UPDATE_STATUS, {
    onError: (err) =>
      showToast({
        type: 'error',
        message:
          err.cause?.message||
          'An error occured while updating the status',
        title: 'Edit Order Status',
      }),
    onCompleted: () => {
      showToast({
        type: 'success',
        title: 'Edit Order Status',
        message: 'Order status has been updated successfully',
      });
    },
    refetchQueries: [{ query: GET_ACTIVE_ORDERS }],
  });

  const [assignRider] = useMutation(ASSIGN_RIDER, {
    onError: (error) => {
      showToast({
        type: 'error',
        title: 'Assign Rider',
        message:
          error.cause?.message ||
          'An error occured while assigning the job to rider',
      });
    },
    refetchQueries: [{ query: GET_ACTIVE_ORDERS }],
  });


  // Handlers
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

  const handleAssignRider = async (
    item: IDropdownSelectItem,
    rowData: IActiveOrders
  ) => {
    if (item._id) {
      setIsRiderLoading({
        _id: item._id,
        bool: true,
      });

      const { data } = await assignRider({
        variables: {
          id: rowData._id,
          riderId: item._id,
        },
      });
      if (data) {
        showToast({
          type: 'success',
          title: 'Assign Rider',
          message: `The order ${rowData.orderId} has been successfully assigned to rider ${item.label}`,
        });
      }
    }
    setIsRiderLoading({
      _id: '',
      bool: false,
    });
  };

  const handleStatusDropDownChange = async (
    e: DropdownChangeEvent,
    rowData: IActiveOrders
  ) => {
    setIsStatusUpdating({
      _id: rowData._id,
      bool: true,
    });
    try {
      await updateStatus({
        variables: {
          id: rowData._id,
          orderStatus: e.value.code,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsStatusUpdating({
        _id: rowData._id,
        bool: false,
      });
    }
  };


  // Order Subscription
  const useOrderSubscription = (rowData: IActiveOrders) => {
    useSubscription(SUBSCRIPTION_ORDER, {
      variables: {
        _id: rowData._id,
      },
      onError: (err) => {
        console.log({ err });
      },
      fetchPolicy: 'network-only',
    });
  };
  const OrderSubscription = ({rowData}:{rowData:IActiveOrders})=>{
    useOrderSubscription(rowData)
    return  (<p>{rowData.deliveryAddress.deliveryAddress}</p>)
  }


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
        className={`flex flex-row-reverse gap-2 items-center justify-start ${option.code === 'PENDING' || option.code === 'ASSIGNED' ? 'hidden' : 'visible'} ${classes.dropDownItem}`}
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

  //severity checker
  function severityChecker(status: string | undefined) {
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
     body:(rowData:IActiveOrders)=>(<OrderSubscription rowData={rowData} />)
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
              {
                label: rider.name,
                code: rider.name.toUpperCase(),
                _id: rider._id,
              },
            ]);
          });
          setIsRiderLoading({
            _id: rowData._id,
            bool: false,
          });
        }

        //selected rider
        let selectedRider: IDropdownSelectItem = {
          label: rowData?.rider?.name.toString() ?? 'Select Rider',
          code: rowData?.rider?.name.toString().toUpperCase() ?? 'SELECT RIDER',
          _id: rowData?.rider?._id.toString() ?? '',
        };
        return (
          <div onClick={() => handleClick(rowData)}>
            <Dropdown
              options={
                isRiderLoading._id === rowData._id && riderOptions
                  ? riderOptions
                  : [selectedRider]
              }
              loading={
                isRiderLoading.bool && isRiderLoading._id === rowData._id
              }
              value={selectedRider ?? 'Select Rider'}
              onChange={(e: DropdownChangeEvent) =>
                handleAssignRider(e.value, rowData)
              }
              filter={true}
              className="outline outline-gray-300 outline-1"
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
          (status: IDropdownSelectItem) => status.code === rowData?.orderStatus
        );
        return (
          <Dropdown
            value={currentStatus}
            onChange={(e) => handleStatusDropDownChange(e, rowData)}
            options={actionStatusOptions}
            itemTemplate={itemTemplate}
            valueTemplate={valueTemplate}
            loading={
              isStatusUpdating.bool && isStatusUpdating._id === rowData._id
            }
            className="outline outline-gray-300 outline-1"
          />
        );
      },
    },
  ];

  // UseEffects
  useEffect(() => {
    fetchActiveOrders();
  }, []);


  return (
    <div className='p-3'>
      <Table
        columns={colums}
        data={active_orders_data?.getActiveOrders ?? []}
        isSelectable={true}
        loading={loading}
        selectedData={selectedData}
        setSelectedData={(e) => setSelectedData(e as IActiveOrders[])}
        header={
          <DispatchTableHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={(e) => setGlobalFilterValue(e.target.value)}
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
          />
        }
        filters={filters}
      />
    </div>
  );
}
