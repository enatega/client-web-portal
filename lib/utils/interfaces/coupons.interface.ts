import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IDropdownSelectItem, IEditState } from './global.interface';
import { IFilterType } from './table.interface';

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
  filters?: IFilterType | undefined;
  setIsEditing: Dispatch<SetStateAction<IEditState<ICoupon>>>;
  setIsDeleting: Dispatch<SetStateAction<IEditState<ICoupon>>>;
  isDeleting: IEditState<ICoupon>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  setCoupons: Dispatch<SetStateAction<ICoupon[]>>;
  globalFilterValue: string;
  onGlobalFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  statusOptions: IDropdownSelectItem[];
  setSelectedStatuses: Dispatch<SetStateAction<string[]>>;
  selectedStatuses: string[];
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

export interface ICouponScreenHeaderProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  setCoupons: Dispatch<SetStateAction<ICoupon[]>>;
  handleAddCouponLocally: (coupon: ICoupon) => void;
  setIsEditing: Dispatch<SetStateAction<IEditState<ICoupon>>>;
  visible: boolean;
  isEditing: IEditState<ICoupon>;
  coupons: ICoupon[];
  handleButtonClick: () => void;
}
