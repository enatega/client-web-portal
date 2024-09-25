export interface IActiveOrders {
  _id: string;
  zone: {
    _id: string;
  };
  orderId: string;
  restaurant: {
    _id: string;
    name: string;
    image: string;
    address: string;
    location: {
      coordinates: number[];
    };
  };
  deliveryAddress: {
    location: {
      coordinates: number[];
    };
    deliveryAddress: string;
    details: string;
    label: string;
  };
  items: {
    _id: string;
    title: string;
    description: string;
    image: string;
    quantity: number;
    variation: {
      _id: string;
      title: string;
      price: number;
      discounted?: number;
    };
    addons: {
      _id: string;
      options: {
        _id: string;
        title: string;
        description: string;
        price: number;
      }[];
      description: string;
      title: string;
      quantityMinimum: number;
      quantityMaximum: number;
    }[];
    specialInstructions?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
  user: {
    _id: string;
    name: string;
    phone: string;
    email: string;
  };
  paymentMethod: string;
  paidAmount: number;
  orderAmount: number;
  orderStatus: string;
  isPickedUp: boolean;
  status: string;
  paymentStatus: string;
  reason?: string;
  isActive: boolean;
  createdAt: string;
  deliveryCharges: number;
  rider?: {
    _id: string;
    name: string;
    username: string;
    available: boolean;
  };
}

export interface IGetActiveOrders {
  getActiveOrders: IActiveOrders[];
}

export interface IRidersByZone {
  _id: string;
  name: string;
  username: string;
  password: string;
  phone: string;
  available: string | boolean;
  zone: {
    _id: string;
    title: string;
  };
}

export interface IGetRidersByZone {
  ridersByZone: IRidersByZone[];
}
export interface IGetRidersByZoneVariables {}
export interface IAssignRider {
  _id: string;
  orderStatus: string;
  rider: {
    _id: string;
    name: string;
  };
}

export interface IUpdateOrderStatus {
  _id: string;
  orderStatus: string;
}
