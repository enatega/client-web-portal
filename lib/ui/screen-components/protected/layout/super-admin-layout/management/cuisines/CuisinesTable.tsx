import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import { ITableColumn } from '@/lib/utils/interfaces';
import {
  ICuisine,
  IGetCuisinesData,
} from '@/lib/utils/interfaces/cuisine.interface';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import GenericTable from '../../../../../../useable-components/global-table';
export default function CuisineTable({
  data,
  loading,
}: {
  data: IGetCuisinesData | undefined;
  loading: boolean;
}) {
  //state variables
  const [isEditing, setIsEditing] = useState<{
    bool: boolean;
    data: ICuisine;
  }>({
    bool: false,
    data: {
      _id: '',
      __typename: '',
      description: '',
      image: '',
      name: '',
      shopType: '',
    },
  });
  const [isDeleting, setIsDeleting] = useState<{ _id: string; bool: boolean }>({
    _id: '',
    bool: false,
  });
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
              setIsDeleting={setIsDeleting}
              setIsEditing={setIsEditing}
              setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
              data={data}
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
  console.log({ isDeleting, isEditing });
  return (
    <GenericTable
      columns={cuisineColums}
      data={data?.cuisines ?? []}
      onSelectionChange={(e) => setSelectedData(e as ICuisine[])}
      selection={selectedData}
      loading={loading}
    />
  );
}
