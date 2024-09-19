'use client';

// Core
import { createContext, useEffect, useState } from 'react';
// Interfaces and Types
import {
  IProvider,
  IQueryResult,
  IVendorContextProps,
  IVendorReponse,
  IVendorResponseGraphQL,
} from '@/lib/utils/interfaces';

// API
import { GET_VENDORS } from '@/lib/api/graphql';

// Hooks
import { useQueryGQL } from '@/lib/hooks/useQueryQL';

// Methods
import { onFilterObjects } from '@/lib/utils/methods';

export const VendorContext = createContext<IVendorContextProps>(
  {} as IVendorContextProps
);

export const VendorProvider = ({ children }: IProvider) => {
  // States
  const [vendorFormVisible, setVendorFormVisible] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<IVendorReponse[]>();
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [isEditingVendor, setIsEditing] = useState(false);

  // API
  const vendorResponse = useQueryGQL(
    GET_VENDORS,
    {},
    {
      debounceMs: 300,
      onCompleted: (data: unknown) => {
        const _data = data as IVendorResponseGraphQL;
        setVendorId(_data?.vendors[0]?._id ?? '');
      },
    }
  ) as IQueryResult<IVendorResponseGraphQL | undefined, undefined>;

  // Handler
  const onSetVendorFormVisible = (status: boolean) => {
    setVendorFormVisible(status);
  };
  const onSetVendorId = (id: string) => {
    setVendorId(id);
  };

  const onSetGlobalFilter = (filter: string) => {
    setGlobalFilter(filter);
  };

  const onSetEditingVendor = (status: boolean) => {
    setIsEditing(status);
  };

  const onHandlerFilterData = () => {
    const _filtered: IVendorReponse[] = onFilterObjects(
      vendorResponse?.data?.vendors ?? [],
      globalFilter,
      ['email', 'userType']
    );

    setFiltered(_filtered);
  };

  // Use Effect
  useEffect(() => {
    onHandlerFilterData();
  }, [globalFilter]);

  let value: IVendorContextProps = {
    vendorFormVisible,
    onSetVendorFormVisible,
    vendorId,
    onSetVendorId,
    // Vendors Data
    vendorResponse,
    // Filter
    globalFilter,
    onSetGlobalFilter,
    filtered,
    // Editing
    isEditingVendor,
    onSetEditingVendor,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
};
