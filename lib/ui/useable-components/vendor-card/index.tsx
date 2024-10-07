// Core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';

// Context
import { VendorContext } from '@/lib/context/super-admin/vendor.context';

// Interface
import { IVendorCardProps } from '@/lib/utils/interfaces';

// Methods
import { onUseLocalStorage, toTextCase } from '@/lib/utils/methods';

// Icons
import {
  faEdit,
  faEllipsisVertical,
  faShop,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

// Component
import { DELETE_VENDOR, GET_VENDORS } from '@/lib/api/graphql';
import { ToastContext } from '@/lib/context/global/toast.context';
import { SELECTED_VENDOR_EMAIL } from '@/lib/utils/constants';
import { ApolloError, useMutation } from '@apollo/client';
import Image from 'next/image';
import CustomDialog from '../delete-dialog';
import CustomPopupMenu from '../popup-menu';
import TextComponent from '../text-field';

export default function VendorCard({
  _id,
  email,
  userType,
  totalRestaurants,
}: IVendorCardProps) {
  // Context
  const { vendorId, onSetVendorId, vendorResponse, onResetVendor } =
    useContext(VendorContext);
  const { onSetVendorFormVisible } = useContext(VendorContext);
  const { showToast } = useContext(ToastContext);
  // Statees
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState<boolean>(false);

  // API
  const [deleteVendor, { loading }] = useMutation(DELETE_VENDOR, {
    refetchQueries: [{ query: GET_VENDORS }],
    onCompleted: () => {
      showToast({
        type: 'success',
        title: 'Vendor Delete',
        message: 'Vendor has been deleted successfully',
      });

      onResetVendor(true); // so after refetching is vendor can be selected.
      vendorResponse.refetch();
    },
    onError: ({ networkError, graphQLErrors }: ApolloError) => {
      showToast({
        type: 'error',
        title: 'Vendor Delete',
        message:
          graphQLErrors[0]?.message ??
          networkError?.message ??
          'Vendor Deletion  Failed',
        duration: 2500,
      });
    },
  });

  // Handlers
  const onVendorCardClicked = (_vendorId: string) => {
    onSetVendorId(_vendorId);
    onUseLocalStorage('save', 'vendorId', _vendorId.toString());
    onUseLocalStorage('save', SELECTED_VENDOR_EMAIL, email);
  };

  const onHandlerEdit = () => {
    onSetVendorFormVisible(true, true);
  };

  // API Hanlders
  const onHandleConfirmDeleteVendor = async () => {
    try {
      await deleteVendor({ variables: { id: vendorId } });
      setDeletePopupOpen(false);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Vendor Delete',
        message: 'Vendor delete failed',
      });
    }
  };

  const onHandleHideDeleteVendor = () => {
    setDeletePopupOpen(false);
  };

  const onHandlerDelete = () => {
    setDeletePopupOpen(true);
  };
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (!(e.target as HTMLElement).closest('.three-dots')) {
          onVendorCardClicked(_id);
        }
        setPopupOpen(false);
      }}
      className="relative"
    >
      <div
        className={`flex items-center bg-${vendorId === _id ? 'black' : 'white'} cursor-pointer p-2 px-3`}
      >
        <Image
          width={40}
          height={40}
          src="https://placehold.co/40x40"
          alt="User avatar"
          className="mr-3 rounded-full"
        />
        <div className="flex flex-1 flex-col gap-y-1">
          <TextComponent
            className={`card-h2 text-${vendorId === _id ? 'white' : 'black'}`}
            text={toTextCase(userType, 'title')}
          />

          <TextComponent
            className={`card-h3 text-${vendorId === _id ? 'white' : 'black'}`}
            text={email}
          />

          <div
            className={`flex w-fit items-center gap-x-2 rounded-md px-1 bg-${vendorId === _id ? 'primary-color' : 'gray-100'}`}
          >
            <FontAwesomeIcon
              icon={faShop}
              color={vendorId === _id ? 'white' : 'black'}
              size="xs"
            />
            <span
              className={`card-h2 text-${vendorId === _id ? 'white' : 'black'}`}
            >
              {totalRestaurants}
            </span>
          </div>
        </div>

        <div className="three-dots relative">
          {vendorId === _id && (
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={`p-1 ${isPopupOpen ? 'text-gray-400' : 'text-white'
                } cursor-pointer hover:scale-105`}
              onClick={(e) => {
                e.stopPropagation();
                setPopupOpen(!isPopupOpen);
              }}
            />
          )}
          {isPopupOpen && (
            <div className="absolute left-2 top-[1.2rem] z-10 mt-1 -translate-x-full">
              <CustomPopupMenu
                close={() => setPopupOpen(false)}
                items={[
                  {
                    title: 'Edit',
                    icon: faEdit,
                    fn: onHandlerEdit,
                    data: vendorId,
                    color: 'text-gray-600',
                  },
                  {
                    title: 'Delete',
                    icon: faTrash,
                    fn: onHandlerDelete,
                    data: null,
                    color: 'text-red-500',
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      <CustomDialog
        loading={loading}
        visible={isDeletePopupOpen}
        onHide={onHandleHideDeleteVendor}
        onConfirm={onHandleConfirmDeleteVendor}
      />
    </div>
  );
}
