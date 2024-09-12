import { QueryContext } from '@/lib/context/query-context';
import Loader from '@/lib/ui/screen-components/loader/Loader';
import CuisineTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/cuisines/CuisinesTable';
import GlobalButton from '@/lib/ui/useable-components/global-button/button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import { QueryResult } from '@apollo/client';
import { useContext } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

export default function CuisinesScreen() {
  const { cuisines }: { cuisines: QueryResult } = useContext(QueryContext);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Cuisines" className="mx-5" />
        <GlobalButton Icon={IoIosAddCircleOutline} title="Add Cuisine" />
      </div>
      {cuisines.loading ? <Loader /> : <CuisineTable cuisines={cuisines} />}
    </div>
  );
}
