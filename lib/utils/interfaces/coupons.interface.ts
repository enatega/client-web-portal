import { DataTableFilterMeta } from 'primereact/datatable';
import { Dispatch, SetStateAction } from 'react';

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
  setCoupons: (coupon: ICoupon) => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setEditData: Dispatch<SetStateAction<ICoupon | undefined>>;
  isEditing: boolean;
  editData: ICoupon | undefined;
}
export interface IEditPopupVal {
  _id: string;
  bool: boolean;
}
export interface ICouponsTableProps {
  data: ICoupon[] | null | undefined;
  loading: boolean;
  filters?: DataTableFilterMeta;
}
