//components
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';

//contexts

//interfaces
import { IEditPopupVal } from '@/lib/utils/interfaces/coupons.interface';
import {
  IWithDrawRequest,
  IWithDrawRequestsTableProps,
} from '@/lib/utils/interfaces/withdraw-request.interface';

//hooks
import { useRef, useState } from 'react';

//icons
import Table from '@/lib/ui/useable-components/table';
import TableHeader from '@/lib/ui/useable-components/table-header';
import { IColumnConfig } from '@/lib/utils/interfaces/table.interface';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function WithdrawTable({
  data,
  setIsEditing,
  setIsDeleting,
  setVisible,
  // isDeleting,
  visible,
  loading,
  filters,
  globalFilterValue,
  onGlobalFilterChange,
  statusOptions,
  setSelectedStatuses,
  selectedStatuses,
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
  const requestsColumns: IColumnConfig<IWithDrawRequest>[] = [
    {
      headerName: 'Name',
      propertyName: 'name',
    },
    {
      headerName: 'Vendor',
      propertyName: 'description',
    },
    {
      headerName: 'Shop Type',
      propertyName: 'shopType',
    },
    {
      headerName: 'Action',
      propertyName: 'action',
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
    <Table
      columns={requestsColumns}
      data={data ?? []}
      selectedData={selectedData}
      setSelectedData={(e) => setSelectedData(e as IWithDrawRequest[])}
      filters={filters}
      loading={loading}
      header={
        <TableHeader
          globalFilterValue={globalFilterValue}
          onGlobalFilterChange={onGlobalFilterChange}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          statusOptions={statusOptions}
        />
      }
    />
  );
}
