// queries
import { GET_ACTIVE_ORDERS } from '@/lib/api/graphql';

//components
import Table from '@/lib/ui/useable-components/table';
import DispatchTableHeader from '../header/table-header';

//inrfaces
import { ILazyQueryResult } from '@/lib/utils/interfaces';
import {
  IActiveOrders,
  IGetActiveOrders,
} from '@/lib/utils/interfaces/dispatch.interface';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';

//prime react
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';

//hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';
import { useEffect, useState } from 'react';

export default function DispatchMain() {
  //toast
  // const { showToast } = useContext(ToastContext);
  //states
  const [selectedData, setSelectedData] = useState<IActiveOrders[]>([]);
  // const [riderOptions, setRiderOptions] = useState<IDropdownSelectItem[]>([]);
  // const [currentSelectedRider, setCurrentSelectedRider] =
  //   useState<IDropdownSelectItem>();
  // const [isRiderLoading, setIsRiderLoading] = useState({
  //   _id: '',
  //   bool: false,
  // });
  // const [isStatusUpdating, setIsStatusUpdating] = useState({
  //   _id: '',
  //   bool: false,
  // });
  //   const [ridersData, setRidersData] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  //filters
  const filters = {
    global: { value: globalFilterValue, matchMode: FilterMatchMode.CONTAINS },
    orderStatus: {
      value: selectedActions.length > 0 ? selectedActions : null,
      matchMode: FilterMatchMode.IN,
    },
  };
  //queries
  const {
    data: active_orders_data,
    fetch: fetchActiveOrders,
    loading,
  } = useLazyQueryQL(GET_ACTIVE_ORDERS, {
    fetchPolicy: 'network-only',
    debounceMs: 5000,
  }) as ILazyQueryResult<IGetActiveOrders | undefined, undefined>;

  //mutaions (commented out for now)
  // const [updateStatus] = useMutation(UPDATE_STATUS, {
  //   onError: (err) =>
  //     showToast({
  //       type: 'error',
  //       message:
  //         err.message ||
  //         err.graphQLErrors[0].message ||
  //         'An error occured while updating the status',
  //       title: 'Edit Order Status',
  //     }),
  // });

  // const [assignRider] = useMutation(ASSIGN_RIDER, {
  //   onError: (error) => {
  //     showToast({
  //       type: 'error',
  //       title: 'Assign Rider',
  //       message:
  //         error.message ??
  //         error.graphQLErrors[0].message ??
  //         'An error occured while assigning the job to rider',
  //     });
  //   },
  // });

  //======== commented out for now =========

  // const [fetch] = useLazyQuery(GET_RIDERS_BY_ZONE) as LazyQueryResultTuple<
  //   IGetRidersByZone | undefined,
  //   IGetRidersByZoneVariables
  // >;
  // const handleRiderClick = async (
  //   rowData: IActiveOrders
  // ): Promise<{ data?: IRidersByZone[]; loading: boolean }> => {
  //   const res = await fetch({
  //     variables: {
  //       id: rowData.zone._id,
  //     },
  //   });
  //   return {
  //     data: res.data?.ridersByZone,
  //     loading: res.loading,
  //   };
  // };

  // const handleAssignRider = async ({
  //   item,
  //   rowData,
  // }: {
  //   item: IDropdownSelectItem;
  //   rowData: IActiveOrders;
  // }) => {
  //   console.log({ item });
  //   setCurrentSelectedRider(item);
  //   try {
  //     if (item._id) {
  //       setIsRiderLoading({
  //         _id: item._id,
  //         bool: true,
  //       });
  //       const updatedOrder: IActiveOrders = {
  //         ...rowData,
  //         _id: rowData._id,
  //         orderStatus: 'ASSIGNED',
  //         rider: {
  //           _id: item?._id ?? '',
  //           name: item.label,
  //           username: rowData.rider?.username ?? '',
  //           available: rowData.rider?.available ?? false,
  //         },
  //       };
  //       var filtered_arr = activeOrders.filter(
  //         (order) => order._id !== rowData._id
  //       );
  //       setActiveOrders([updatedOrder, ...filtered_arr]);

  //       const { data } = await assignRider({
  //         variables: {
  //           id: rowData._id,
  //           riderId: item._id,
  //         },
  //       });
  //       if (data) {
  //         showToast({
  //           type: 'success',
  //           title: 'Assign Rider',
  //           message: `The order ${rowData.orderId} has been successfully assigned to rider ${item.label} Id:${item._id}`,
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     showToast({
  //       type: 'error',
  //       title: 'Assign Rider',
  //       message: 'An error occured while assigning the job to rider',
  //     });
  //   } finally {
  //     setIsRiderLoading({
  //       _id: '',
  //       bool: false,
  //     });
  //   }
  // };

  // ================= commenting out for now ==========

  //subscriptions
  //   const subscribeFunc = (rowData: any) => {
  //     const { data: subscription_data } = useSubscription(SUBSCRIPTION_ORDER, {
  //       variables: {
  //         _id: rowData._id,
  //       },
  //     });
  //     console.log({ subscription_data });
  //   };

  //status options
  // const actionStatusOptions = useMemo(
  //   () => [
  //     {
  //       label: 'Pending',
  //       code: 'PENDING',
  //       body: () => <Tag value="Pending" severity="secondary" rounded />,
  //     },
  //     {
  //       label: 'Assigned',
  //       code: 'ASSIGNED',
  //       body: () => <Tag value="Assigned" severity="warning" rounded />,
  //     },
  //     {
  //       label: 'Accepted',
  //       code: 'ACCEPTED',
  //       body: () => <Tag value="Accepted" severity="info" rounded />,
  //     },
  //     {
  //       label: 'Delivered',
  //       code: 'DELIVERED',
  //       body: () => <Tag value="Delivered" severity="success" rounded />,
  //     },
  //     {
  //       label: 'Rejected',
  //       code: 'REJECTED',
  //       body: () => <Tag value="Reject" severity="danger" rounded />,
  //     },
  //   ],
  //   []
  // );

  //=========== commenting out for now ==========

  // const handleStatusDropDownChange = async (
  //   e: DropdownChangeEvent,
  //   rowData: IActiveOrders
  // ) => {
  //   setIsStatusUpdating({
  //     _id: rowData._id,
  //     bool: true,
  //   });
  //   try {
  //     const filtered_arr = activeOrders.filter(
  //       (order) => order._id !== rowData._id
  //     );
  //     const updated_active_order = { ...rowData, orderStatus: e.value.code };
  //     await updateStatus({
  //       variables: {
  //         id: rowData._id,
  //         orderStatus: e.value.code,
  //       },
  //     });
  //     showToast({
  //       type: 'success',
  //       title: 'Edit Order Status',
  //       message: 'Order status has been updated successfully',
  //     });

  //     setActiveOrders(() => [updated_active_order, ...filtered_arr]);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsStatusUpdating({
  //       _id: rowData._id,
  //       bool: false,
  //     });
  //   }
  // };

  // status templates
  //========commenting out for now as per instructions==========

  // const valueTemplate = (option: IDropdownSelectItem) => (
  //   <div className="flex gap-2 items-center justify-start">
  //     <Tag
  //       severity={severityChecker(option?.code)}
  //       value={option?.label}
  //       rounded
  //     />
  //   </div>
  // );

  //========commenting out for now as per instructions==========

  // const itemTemplate = (option: IDropdownSelectItem) => {
  //   if (option.code === 'PENDING' || option.code === 'ASSIGNED') return;
  //   return (
  //     <div
  //       className={`flex flex-row-reverse gap-2 items-center justify-start ${option.code === 'PENDING' || option.code === 'ASSIGNED' ? 'hidden' : 'visible'}`}
  //     >
  //       <span>
  //         {option.code === 'REJECTED'
  //           ? 'Reject'
  //           : option.code === 'ACCEPTED'
  //             ? 'Accept'
  //             : option.code === 'DELIVERED'
  //               ? 'Delivered'
  //               : ''}
  //       </span>
  //       <FontAwesomeIcon
  //         icon={
  //           option.code === 'REJECTED'
  //             ? faTrash
  //             : option.code === 'ACCEPTED'
  //               ? faCircleCheck
  //               : option.code === 'DELIVERED'
  //                 ? faTruck
  //                 : faDashboard
  //         }
  //       />
  //     </div>
  //   );
  // };

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
        // async function handleClick(rowData: IActiveOrders) {
        //   setIsRiderLoading({
        //     _id: rowData._id,
        //     bool: true,
        //   });
        //   const { data } = await handleRiderClick(rowData);
        //   data?.forEach((rider) => {
        //     setRiderOptions((prev) => [
        //       ...prev,
        //       {
        //         label: rider.name,
        //         code: rider.name.toUpperCase(),
        //         _id: rider._id,
        //       },
        //     ]);
        //   });
        //   setIsRiderLoading({
        //     _id: rowData._id,
        //     bool: false,
        //   });
        // }
        return (
          // <div onClick={() => handleClick(rowData)}>
          <div>
            {/* <CustomDropdownComponent
              name="riders"
              options={
                isRiderLoading._id === rowData._id && riderOptions
                  ? riderOptions
                  : [{ label: '', code: '', _id: '' }]
              }
              selectedItem={
                currentSelectedRider?.label
                  ? currentSelectedRider
                  : rowData?.rider
                    ? {
                        label: rowData.rider.name,
                        code: rowData.rider.name.toUpperCase(),
                        _id: rowData.rider._id,
                      }
                    : { label: 'Select Rider', code: 'SELECT' }
              }
              optionValue={rowData?.rider?.name}
              placeholder="Select Rider"
              setSelectedItem={(key, item: IDropdownSelectItem) =>
                handleAssignRider({ item, rowData })
              }
              loading={
                isRiderLoading.bool && isRiderLoading._id === rowData._id
              }
            /> */}
            <p>{rowData.rider?.name ?? 'Select Rider'}</p>
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
      //========commenting out for now as per instructions==========

      // body: (rowData: IActiveOrders) => {
      //   let currentStatus = actionStatusOptions.find(
      //     (status) => status.code === rowData?.orderStatus
      //   );
      //   return (
      //     <Dropdown
      //       value={currentStatus}
      //       onChange={(e) => handleStatusDropDownChange(e, rowData)}
      //       options={actionStatusOptions}
      //       itemTemplate={itemTemplate}
      //       valueTemplate={valueTemplate}
      //       loading={
      //         isStatusUpdating.bool && isStatusUpdating._id === rowData._id
      //       }
      //     />
      //   );
      // },

      //======== temporary tag in replacement of dropdown for now ==========
      body: (rowData: IActiveOrders) => (
        <Tag
          severity={severityChecker(rowData.orderStatus)}
          value={rowData.orderStatus}
          rounded
        />
      ),
    },
  ];

  //useEffects
  useEffect(() => {
    fetchActiveOrders();
  }, []);
  return (
    <div>
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
