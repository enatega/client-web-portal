import { IExtendedOrder } from "../interfaces"
export type TOrderRowData =
| IExtendedOrder
| {
    orderId: ReactElement,
    itemsTitle: ReactElement,
    paymentMethod: ReactElement,
    orderStatus: ReactElement,
    DateCreated: ReactElement,
    OrderdeliveryAddress: ReactElement,
  };