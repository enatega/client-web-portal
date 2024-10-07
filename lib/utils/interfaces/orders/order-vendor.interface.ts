import { IGlobalComponentProps } from "../global.interface";
import { ReactNode } from "react";

export interface IOrderVendorHeaderProps extends IGlobalComponentProps {
    setSelectedActions: React.Dispatch<React.SetStateAction<string[]>>;
    selectedActions: string[];
    onSearch: (searchTerm: string) => void;
  }

 export interface IMenuItem extends IGlobalComponentProps{
    label: string;
    value: string;
  }

 export interface IOrder extends IGlobalComponentProps{
    _id: string;
    orderId: string;
    items: Array<{
      variation: any;
      description: ReactNode;
      title: string;
      quantity: number;
    }>;
    paymentStatus: string;
    createdAt: string;
    deliveryAddress: {
      deliveryCharges: ReactNode;
      deliveryAddress: string;
    };
    orderAmount: number;
    orderStatus: string;
  }

  // Create a new interface that extends IOrder with the additional properties
export interface IExtendedOrder extends IOrder {
  paidAmount?: any;
  paymentMethod?: ReactNode;
  deliveryCharges?: number;
  tipping?: any;
  taxationAmount?: any;
  itemsTitle?: string;
  OrderdeliveryAddress?: string;
  DateCreated?: string;
}
  
  export interface IOrdersData extends IGlobalComponentProps {
    ordersByRestId: IOrder[];
  }
  
  export interface ITableOrder extends IOrder {
    itemsTitle: string;
    OrderdeliveryAddress: string;
    DateCreated: string;
  }