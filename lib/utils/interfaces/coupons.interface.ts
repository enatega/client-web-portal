import { DataTableFilterMeta } from 'primereact/datatable';
import { Dispatch, SetStateAction } from 'react';
import { IEditState } from './global.interface';

export interface ICoupon {
  discount: number;
  enabled: boolean;
  title: string;
  __typename: string;
  _id: string;
}
export interface IGetCouponsData {
  coupons: ICoupon[];
}
export interface IGetCouponsVariables {}

export interface ICouponsStakProps {
  coupon: ICoupon;
  setSelectedData: Dispatch<SetStateAction<ICoupon[]>>;
  selectedData: ICoupon[];
}
export interface IAddCouponProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  handleAddCouponLocally: (coupon: ICoupon) => void;
  setCoupons: Dispatch<SetStateAction<ICoupon[]>>;
  setIsEditing: Dispatch<
    SetStateAction<{
      bool: boolean;
      data: ICoupon;
    }>
  >;
  coupons: ICoupon[];
  isEditing: IEditState<ICoupon>;
}
export interface IEditPopupVal {
  _id: string;
  bool: boolean;
}
export interface ICouponsTableProps {
  data: ICoupon[] | null | undefined;
  loading: boolean;
  filters?: DataTableFilterMeta;
  setIsEditing: Dispatch<SetStateAction<IEditState<ICoupon>>>;
  setIsDeleting: Dispatch<SetStateAction<IEditState<ICoupon>>>;
  isDeleting: IEditState<ICoupon>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  setCoupons: Dispatch<SetStateAction<ICoupon[]>>;
}
export interface ICouponStatuses {
  enabled: {
    total: null | undefined | number;
    status: boolean;
  };
  disabled: {
    total: null | undefined | number;
    status: boolean;
  };
  all: {
    total: null | undefined | number;
    status: boolean;
  };
}
