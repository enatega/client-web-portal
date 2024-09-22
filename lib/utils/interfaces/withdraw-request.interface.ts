import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IDropdownSelectItem, IEditState } from './global.interface';
import { IFilterType } from './table.interface';

export interface IWithDrawRequest {
  _id: string;
  requestId: string;
  requestAmount: number;
  requestTime: string;
  rider: {
    _id: string;
    name: string;
    currentWalletAmount: number;
  };
  status: boolean;
}

export interface IGetWithDrawRequestsData {
  getAllWithdrawRequests: {
    data: IWithDrawRequest[];
  };
}

export interface IWithDrawRequestFormProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  setWithDrawRequests: Dispatch<SetStateAction<IWithDrawRequest[]>>;
  withdrawRequests: IWithDrawRequest[];
  isEditing: IEditState<IWithDrawRequest>;
  setIsEditing: Dispatch<
    SetStateAction<{
      bool: boolean;
      data: IWithDrawRequest;
    }>
  >;
  addWithdrawRequestsLocally: (withdraw_request: IWithDrawRequest) => void;
}

export interface IWithDrawRequestsTableProps {
  data: IWithDrawRequest[] | undefined | null;
  loading: boolean;
  filters?: IFilterType;
  setIsEditing: Dispatch<SetStateAction<IEditState<IWithDrawRequest>>>;
  setIsDeleting: Dispatch<SetStateAction<IEditState<IWithDrawRequest>>>;
  isDeleting: IEditState<IWithDrawRequest>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  setRequests: Dispatch<SetStateAction<IWithDrawRequest[]>>;
  globalFilterValue: string;
  onGlobalFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  statusOptions: IDropdownSelectItem[];
  setSelectedStatuses: Dispatch<SetStateAction<string[]>>;
  selectedStatuses: string[];
}
