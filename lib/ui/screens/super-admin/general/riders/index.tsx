'use client';
// Core
import { useState } from 'react';

// GraphQL
import { getRiders } from '@/lib/api/graphql';
import { gql } from '@apollo/client';

// Components
import { useQueryGQL } from '@/lib/hooks/useQueryQL';
import RiderAddForm from '@/lib/ui/screen-components/protected/riders/add-form';
import RidersMain from '@/lib/ui/screen-components/protected/riders/view/main';
import { IQueryResult } from '@/lib/utils/interfaces';
import { IRidersDataResponse } from '@/lib/utils/interfaces/rider.interface';

const GET_RIDERS = gql`
  ${getRiders}
`;

export default function RidersScreen() {
  // State
  const [isAddRiderVisible, setIsAddRiderVisible] = useState(false);

  // Query
  const { refetch, loading, data } = useQueryGQL(
    GET_RIDERS,
    {}
  ) as IQueryResult<IRidersDataResponse | undefined, undefined>;

  return (
    <div className="px-6">
      <RidersMain
        refetch={refetch}
        loading={loading}
        data={data}
        setIsAddRiderVisible={setIsAddRiderVisible}
      />
      <RiderAddForm
        refetch={refetch}
        setIsAddRiderVisible={setIsAddRiderVisible}
        isAddRiderVisible={isAddRiderVisible}
      />
    </div>
  );
}
