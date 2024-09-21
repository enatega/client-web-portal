import { DataTableFilterMeta } from 'primereact/datatable';
import { Dispatch, SetStateAction } from 'react';
import { IEditState } from './global.interface';

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
  withdrawrequests: IWithDrawRequest[];
}

export interface IWithDrawRequestFormProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  setCuisines: Dispatch<SetStateAction<IWithDrawRequest[]>>;
  cuisines: IWithDrawRequest[];
  isEditing: IEditState<IWithDrawRequest>;
  setIsEditing: Dispatch<
    SetStateAction<{
      bool: boolean;
      data: IWithDrawRequest;
    }>
  >;
  addCuisineLocally: (withdraw_request: IWithDrawRequest) => void;
}

export interface IWithDrawRequestsTableProps {
  data: IWithDrawRequest[] | undefined | null;
  loading: boolean;
  filters?: DataTableFilterMeta;
  setIsEditing: Dispatch<SetStateAction<IEditState<IWithDrawRequest>>>;
  setIsDeleting: Dispatch<SetStateAction<IEditState<IWithDrawRequest>>>;
  isDeleting: IEditState<IWithDrawRequest>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  setRequests: Dispatch<SetStateAction<IWithDrawRequest[]>>;
}
