import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import { ITableColumn } from '@/lib/utils/interfaces';
import { ICuisine } from '@/lib/utils/interfaces/cuisine.interface';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import GenericTable from '../../../../../../useable-components/global-table';
export default function CuisineTable({
  data,
  loading,
}: {
  data: ICuisine[] | undefined | null;
  loading: boolean;
}) {
  //state variables
  const [isEditPopupOpen, setIsEditDeletePopupOpen] = useState<{
    _id: string;
    bool: boolean;
  }>({
    _id: '',
    bool: false,
  });
  //selected data
  const [selectedData, setSelectedData] = useState<ICuisine[]>([]);

  //column
  const cuisineColums: ITableColumn<ICuisine>[] = [
    {
      header: 'Image',
      field: 'image',
      body: (data: ICuisine) => (
        <img
          src={
            'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt={data.description}
          width={80}
          height={80}
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
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="hover:scale-105 p-1"
              onClick={() =>
                setIsEditDeletePopupOpen({
                  _id: data._id,
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
    <GenericTable
      columns={cuisineColums}
      data={data ?? []}
      onSelectionChange={(e) => setSelectedData(e as ICuisine[])}
      selection={selectedData}
      loading={loading}
    />
  );
}
