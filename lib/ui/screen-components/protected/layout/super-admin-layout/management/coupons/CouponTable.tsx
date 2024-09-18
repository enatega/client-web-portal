//interfaces
import { ITableColumn } from '@/lib/utils/interfaces';
import { ICoupon } from '@/lib/utils/interfaces/coupons.interface';

//icons
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import CustomTextField from '@/lib/ui/useable-components/input-field';
import GenericTable from '../../../../../../useable-components/global-table';

//prime react
import { InputSwitch } from 'primereact/inputswitch';

//hooks
import { EDIT_COUPON } from '@/lib/api/graphql/mutants';
import { ToastContext } from '@/lib/context/toast.context';
import { useMutation } from '@apollo/client';
import { debounce } from 'lodash';
import { useContext, useEffect, useState } from 'react';

export default function CouponTable({
  data,
  loading,
}: {
  data: ICoupon[] | null | undefined;
  loading: boolean;
}) {
  //states
  const [isEditPopupOpen, setIsEditDeletePopupOpen] = useState<{
    _id: string;
    bool: boolean;
  }>({
    _id: '',
    bool: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedData, setSortedData] = useState<ICoupon[]>([]);
  const [selectedData, setSelectedData] = useState<ICoupon[]>([]);

  //toast
  const { showToast } = useContext(ToastContext);

  //sorting data
  useEffect(() => {
    const filteredData = data?.filter((coupon) =>
      Object.values(coupon).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSortedData(filteredData || []);
  }, [searchQuery, data]);
  // handle enabled toggle
  function handleEnableField(rowData: ICoupon) {
    const coupon = sortedData.find((d) => d._id === rowData._id);
    const filteredData = sortedData.filter((d) => d._id !== rowData._id);
    const updatedCoupon = { ...rowData, enabled: !coupon?.enabled };
    setSortedData(() => [updatedCoupon, ...filteredData]);
  }
  //edit mutation
  const [editCoupon, { data: newData, loading: loadingNew, error }] =
    useMutation(EDIT_COUPON);
  console.log({ newData });
  //handle toggle mutation
  async function handleSubmitToggleState(rowData: ICoupon) {
    try {
      const updatedCoupon = {
        _id: rowData._id,
        title: rowData.title,
        discount: rowData.discount,
        enabled: !rowData.enabled,
      };
      await editCoupon({
        variables: {
          couponInput: updatedCoupon,
        },
      });
      showToast({
        type: 'info',
        message: 'Operation successfull!',
      });
    } catch (err) {
      showToast({
        type: 'error',
        message:
          error?.message ||
          error?.graphQLErrors[0].message ||
          'Something went wrong please try again',
      });
    }
  }
  //debounce toggle state
  const optimizedToggleFunction = debounce(handleSubmitToggleState, 2000);

  //column
  const columns: ITableColumn<ICoupon>[] = [
    {
      header: 'Name',
      field: '__typename',
    },
    {
      header: 'Code',
      field: 'title',
    },
    {
      header: 'Discount',
      field: 'discount',
    },
    {
      header: 'Status',
      field: 'enabled',
      body: (rowData: ICoupon) => (
        <div className="flex gap-2 items-center w-full justify-between">
          <InputSwitch
            checked={rowData.enabled}
            disabled={loadingNew}
            className="justify-self-start "
            onChange={() => handleEnableField(rowData)}
            onClick={() => optimizedToggleFunction(rowData)}
          />
          {isEditPopupOpen._id === rowData._id && isEditPopupOpen.bool ? (
            <EditDeletePopup
              setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
              data={rowData}
              type="coupon"
            />
          ) : (
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="hover:scale-105 p-1"
              onClick={() =>
                setIsEditDeletePopupOpen({
                  _id: rowData._id,
                  bool: true,
                })
              }
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2 p-3 w-full">
      <CustomTextField
        type="text"
        name="searchQuery"
        showLabel={false}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-72 p-3 rounded-md m-2 outline active:outline-green-700 self-start"
        placeholder="Filter tasks..."
      />
      <GenericTable
        columns={columns}
        data={sortedData}
        onSelectionChange={(e) => setSelectedData(e as ICoupon[])}
        selection={selectedData}
        loading={loading}
      />
    </div>
  );
}
