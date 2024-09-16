import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import { ITableColumn } from '@/lib/utils/interfaces';
import {
  ICoupon,
  IGetCouponsData,
} from '@/lib/utils/interfaces/coupons.interface';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import GenericTable from '../../../../../../useable-components/global-table';

export default function CouponTable({
  data,
  loading,
}: {
  data: IGetCouponsData | undefined;
  loading: boolean;
}) {
  const [isEditing, setIsEditing] = useState<{
    bool: boolean;
    data: ICoupon;
  }>({
    bool: false,
    data: {
      discount: 0,
      enabled: false,
      title: '',
      __typename: '',
      _id: '',
    },
  });
  const [isDeleting, setIsDeleting] = useState<{ _id: string; bool: boolean }>({
    _id: '',
    bool: false,
  });
  console.log({ isEditing, isDeleting });
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

  useEffect(() => {
    const filteredData = data?.coupons?.filter((coupon) =>
      Object.values(coupon).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSortedData(filteredData || []);
  }, [searchQuery, data]);

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
            className="justify-self-start "
          />
          {isEditPopupOpen._id === rowData._id && isEditPopupOpen.bool ? (
            <EditDeletePopup
              setIsDeleting={setIsDeleting}
              setIsEditing={setIsEditing}
              setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
              data={rowData}
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
      <InputText
        type="text"
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
