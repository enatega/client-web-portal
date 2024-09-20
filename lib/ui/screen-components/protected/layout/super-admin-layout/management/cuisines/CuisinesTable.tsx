//interfaces
import { ITableColumn } from '@/lib/utils/interfaces';
import {
  ICuisine,
  ICuisineTableProps,
} from '@/lib/utils/interfaces/cuisine.interface';

//icons
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import GenericTable from '../../../../../../useable-components/global-table';

//hooks
import Image from 'next/image';
import { useState } from 'react';

export default function CuisineTable({
  data,
  loading,
  filters,
}: ICuisineTableProps) {
  //state variables
  const [isEditPopupOpen, setIsEditDeletePopupOpen] = useState<{
    _id: string;
    bool: boolean;
  }>({
    _id: '',
    bool: false,
  });
  const [selectedData, setSelectedData] = useState<ICuisine[]>([]);

  //columns
  const cuisineColums: ITableColumn<ICuisine>[] = [
    {
      header: 'Image',
      field: 'image',
      body: (data: ICuisine) => (
        <Image
          src={
            'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt={data.description}
          width={30}
          height={30}
          className="rounded-md"
        />
      ),
    },
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
      body: (data: ICuisine) => (
        <div className="three-dots">
          {isEditPopupOpen._id === data._id && isEditPopupOpen.bool ? (
            <EditDeletePopup
              setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
              data={data}
              type={'cuisine'}
            />
          ) : (
            <></>
          )}
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={`p-1 ${isEditPopupOpen._id === data._id && isEditPopupOpen.bool ? 'text-gray-400' : 'hover:scale-105 cursor-pointer'}`}
            onClick={() => {
              if (!(isEditPopupOpen._id === data._id && isEditPopupOpen.bool)) {
                setIsEditDeletePopupOpen({
                  _id: data._id,
                  bool: true,
                });
              }
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <GenericTable
      columns={cuisineColums}
      data={data ?? []}
      onSelectionChange={(e) => setSelectedData(e as ICuisine[])}
      selection={selectedData}
      loading={loading}
      filters={filters}
    />
  );
}
