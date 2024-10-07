import { ApolloError, useMutation } from '@apollo/client';
import { useContext, useMemo, useState } from 'react';

// Prime React
import { Dialog } from 'primereact/dialog';

// Components
import CustomButton from '@/lib/ui/useable-components/button';
import CustomDropdownComponent from '@/lib/ui/useable-components/custom-dropdown';

// Context
import { ToastContext } from '@/lib/context/global/toast.context';

// Hooks
import { useQueryGQL } from '@/lib/hooks/useQueryQL';

// API
import {
    DUPLICATE_RESTAURANT,
    GET_CLONED_RESTAURANTS,
    GET_VENDORS,
} from '@/lib/api/graphql';

// Interface and Types
import {
    IDropdownSelectItem,
    IQueryResult,
    IRestaurantDuplicateDialogComponentProps,
    IVendorReponse,
    IVendorResponseGraphQL,
} from '@/lib/utils/interfaces';

const RestaurantDuplicateDialog = ({
    restaurantId,
    visible,
    onHide,
}: IRestaurantDuplicateDialogComponentProps) => {
    // Context
    const { showToast } = useContext(ToastContext);

    // States
    const [vendor, setSelectedVendor] = useState<IDropdownSelectItem>({
        label: '',
        code: '',
    });

    // API
    const vendorResponse = useQueryGQL(
        GET_VENDORS,
        { fetchPolicy: 'network-only' },
        {
            debounceMs: 300,
        }
    ) as IQueryResult<IVendorResponseGraphQL | undefined, undefined>;

    const [duplicateRestaurant, { loading }] = useMutation(
        DUPLICATE_RESTAURANT,

        {
            refetchQueries: [
                {
                    query: GET_CLONED_RESTAURANTS,
                },
            ],

            onCompleted: () => {
                showToast({
                    type: 'success',
                    title: 'Restaurant Duplicate',
                    message: `Restaurant has been duplicated successfully.`,
                    duration: 2000,
                });
                setSelectedVendor({ label: '', code: '' });
                onHide();
            },
            onError: ({ networkError, graphQLErrors }: ApolloError) => {
                showToast({
                    type: 'error',
                    title: 'Restaurant Duplicate',
                    message:
                        graphQLErrors[0]?.message ??
                        networkError?.message ??
                        `Restaurant duplicate failed`,
                    duration: 2500,
                });
                setSelectedVendor({ label: '', code: '' });
                onHide();
            },
        }
    );

    // Memoized Data
    const vendorsDropdown = useMemo(
        () =>
            vendorResponse?.data?.vendors?.map((vendorItem: IVendorReponse) => {
                return { label: vendorItem.email, code: vendorItem._id };
            }),
        [vendorResponse?.data?.vendors]
    );

    // Handlers
    const handleDuplicate = async () => {
        try {
            if (!vendor.code) {
                showToast({
                    type: 'warn',
                    title: 'Restaurant Duplicate',
                    message: `Please select a vendor`,
                });
                return;
            }

            await duplicateRestaurant({
                variables: { id: restaurantId, owner: vendor.code ?? '' },
            });
        } catch (err) {
            showToast({
                type: 'error',
                title: 'Restaurant Duplicate',
                message: `Restaurant duplicate failed.`,
            });
            setSelectedVendor({ label: '', code: '' });
            onHide();
        }
    };

    const footer = (
        <div className="space-x-2">
            <CustomButton
                label="Cancel"
                icon="pi pi-times"
                onClick={onHide}
                className="h-9 rounded border border-gray-300 px-5 bg-transparent text-black"
            />
            <CustomButton
                loading={loading}
                label="Duplicate"
                className="h-9 rounded border-gray-300 px-4 bg-red-500 text-white"
                icon="pi pi-check"
                onClick={handleDuplicate}
            />
        </div>
    );

    return (
        <Dialog
            visible={visible}
            style={{ width: '32rem' }}
            breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            header="Duplicate Restaurant"
            modal
            footer={footer}
            onHide={onHide}
        >
            <CustomDropdownComponent
                name="vendor"
                placeholder="Select Vendor"
                showLabel={true}
                selectedItem={vendor}
                setSelectedItem={(key: string, item: IDropdownSelectItem) =>
                    setSelectedVendor(item)
                }
                options={vendorsDropdown ?? []}
            />
        </Dialog>
    );
};

export default RestaurantDuplicateDialog;
