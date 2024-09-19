// Core
import { useState } from 'react';

// PrimeReact
import { FilterMatchMode } from 'primereact/api';

// Hooks
import useToast from '@/lib/hooks/useToast';

// Custom Components
import DeleteDialog from '@/lib/ui/useable-components/delete-dialog';
import Table from '@/lib/ui/useable-components/table';
import { BANNERS_TABLE_COLUMNS } from '@/lib/utils/constants';
import { IActionMenuItem } from '@/lib/utils/interfaces/action-menu.interface';
import BannersHeader from '../header';

// Interfaces and Types
import { IQueryResult } from '@/lib/utils/interfaces';
import {
  IBannersDataResponse,
  IBannersMainComponentsProps,
  IBannersResponse,
} from '@/lib/utils/interfaces/banner.interface';

// GraphQL
import { deleteBanner } from '@/lib/api/graphql/mutation/banners';
import { getBanners } from '@/lib/api/graphql/query/banners';
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import { gql, useMutation } from '@apollo/client';

const GET_BANNERS = gql`
  ${getBanners}
`;

const DELETE_BANNER = gql`
  ${deleteBanner}
`;

export default function BannersMain({
  setIsAddBannerVisible,
}: IBannersMainComponentsProps) {
  // Hooks
  const { showToast } = useToast();

  // State - Table
  const [deleteId, setDeleteId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<IBannersResponse[]>(
    []
  );
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  const filters = {
    global: { value: globalFilterValue, matchMode: FilterMatchMode.CONTAINS },
    action: {
      value: selectedActions.length > 0 ? selectedActions : null,
      matchMode: FilterMatchMode.IN,
    },
  };

  //Query
  const { data } = useQueryGQL(GET_BANNERS, {
    fetchPolicy: 'cache-and-network',
  }) as IQueryResult<IBannersDataResponse | undefined, undefined>;

  //Mutation
  const [mutateDelete, { loading: mutationLoading }] = useMutation(
    DELETE_BANNER,
    {
      refetchQueries: [{ query: GET_BANNERS }],
    }
  );

  const menuItems: IActionMenuItem<IBannersResponse>[] = [
    {
      label: 'Edit',
      command: (data?: IBannersResponse) => {
        console.log(data);
      },
    },
    {
      label: 'Delete',
      command: (data?: IBannersResponse) => {
        if (data) {
          setDeleteId(data._id);
        }
      },
    },
  ];

  return (
    <div className="p-2 pt-5">
      <Table
        header={
          <BannersHeader
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={(e) => setGlobalFilterValue(e.target.value)}
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
            setIsAddBannerVisible={setIsAddBannerVisible}
          />
        }
        data={data?.banners || []}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={BANNERS_TABLE_COLUMNS({ menuItems })}
      />
      <DeleteDialog
        loading={mutationLoading}
        visible={!!deleteId}
        onHide={() => {
          setDeleteId('');
        }}
        onConfirm={() => {
          mutateDelete({
            variables: { id: deleteId },
            onCompleted: () => {
              showToast({
                type: 'success',
                title: 'Success!',
                message: 'Banner Deleted',
                duration: 3000,
              });
              setDeleteId('');
            },
          });
        }}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
}
