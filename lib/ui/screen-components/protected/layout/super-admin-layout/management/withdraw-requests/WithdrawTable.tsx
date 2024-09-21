//components
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import GenericTable from '@/lib/ui/useable-components/global-table';

//contexts

//interfaces
import { ITableColumn } from '@/lib/utils/interfaces';
import { IEditPopupVal } from '@/lib/utils/interfaces/coupons.interface';
import {
  IWithDrawRequest,
  IWithDrawRequestsTableProps,
} from '@/lib/utils/interfaces/withdraw-request.interface';

//hooks
import { useRef, useState } from 'react';

//icons
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function WithdrawTable({
  data,
  setIsEditing,
  setIsDeleting,
  setVisible,
  //   isDeleting,
  visible,
  loading,
  filters,
}: IWithDrawRequestsTableProps) {
  //toast
  //   const { showToast } = useContext(ToastContext);

  //refs
  const editDeletePopupRef = useRef<HTMLDivElement | null>(null);

  //states
  const [isEditDeletePopupOpen, setIsEditDeletePopupOpen] =
    useState<IEditPopupVal>({
      _id: '',
      bool: false,
    });
  const [selectedData, setSelectedData] = useState<IWithDrawRequest[]>([]);

  //columns
  const requestsColumns: ITableColumn<IWithDrawRequest>[] = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Vendor',
      field: 'description',
    },
    {
      header: 'Shop Type',
      field: 'shopType',
    },
    {
      header: 'Action',
      field: 'action',
      body: (rowData: IWithDrawRequest) => (
        <div className="three-dots">
          {isEditDeletePopupOpen._id === rowData?._id &&
          isEditDeletePopupOpen.bool ? (
            <div className="editdeletepoup-container" ref={editDeletePopupRef}>
              <EditDeletePopup
                setIsEditing={setIsEditing}
                data={rowData}
                setVisible={setVisible}
                setIsDeleting={setIsDeleting}
                visible={visible}
                setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
              />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="hover:scale-105 p-1 cursor-pointer"
              onClick={() =>
                setIsEditDeletePopupOpen({
                  _id: rowData?._id,
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
    <div>
      <GenericTable
        columns={requestsColumns}
        data={data}
        loading={loading}
        filters={filters}
        onSelectionChange={(e) => setSelectedData(e as IWithDrawRequest[])}
        selection={selectedData}
      />
    </div>
  );
}
