import { IGlobalComponentProps } from './global.interface';

// Componentns

// Super Admin
export interface IDashboardStatsTableComponentsProps
  extends IGlobalComponentProps {
  amountConfig?: {
    format: 'currency' | 'number';
    currency: string;
  };
  loading: boolean;
  title: string;
  data: { label: string; value: number }[];
}

// Restaurant & Vendor

export interface IDashboardDateFilterComponentsProps {
  dateFilter: { startDate: string; endDate: string };
  setDateFilter: (dateFilter: { startDate: string; endDate: string }) => void;
}

export interface IDashboardOrderStatsComponentsProps {
  dateFilter: { startDate: string; endDate: string };
}

export interface IDashboardGrowthOverviewComponentsProps {
  dateFilter: { startDate: string; endDate: string };
}

export interface IDashboardRestaurantStatesTableComponentsProps {
  dateFilter: { startDate: string; endDate: string };
}

export interface IDashboardRestaurantStatsTableComponentsProps
  extends IGlobalComponentProps {
  amountConfig?: {
    currency: string;
  };
  loading: boolean;
  title: string;
  data: IDashboardRestaurantOrderSalesDetailsByPaymentMethodData;
}

// API

// Super Admin
export interface IDashboardUsersResponseGraphQL {
  getDashboardUsers: {
    usersCount: number;
    vendorsCount: number;
    restaurantsCount: number;
    ridersCount: number;
  };
}

export interface IDashboardUsersByYearResponseGraphQL {
  getDashboardUsersByYear: {
    usersCount: number[];
    vendorsCount: number[];
    restaurantsCount: number[];
    ridersCount: number[];
  };
}

export interface IDashboardOrdersByTypeResponseGraphQL {
  getDashboardOrdersByType: {
    label: string;
    value: number;
  }[];
}

export interface IDashboardSalesByTypeResponseGraphQL {
  getDashboardSalesByType: {
    label: string;
    value: number;
  }[];
}

// Restaurant & Vendor

export interface IDashboardRestaurantOrdersSalesStatsResponseGraphQL {
  getRestaurantDashboardOrdersSalesStats: {
    totalOrders: number;
    totalSales: number;
    totalCODOrders: number;
    totalCardOrders: number;
  };
}

export interface IDashboardRestaurantSalesOrderCountDetailsByYearResponseGraphQL {
  getRestaurantDashboardSalesOrderCountDetailsByYear: {
    salesAmount: number[];
    ordersCount: number[];
  };
}

interface IDashboardRestaurantOrderSalesDetailsByPaymentMethodData {
  total_orders: number;
  total_sales: number;
  total_sales_without_delivery: number;
  total_delivery_fee: number;
}

interface IDashboardOrderSalesDetailsByPaymentMethodData {
  _type: string;
  data: IDashboardRestaurantOrderSalesDetailsByPaymentMethodData;
}

export interface IDashboardOrderSalesDetailsByPaymentMethodResponseGraphQL {
  getDashboardOrderSalesDetailsByPaymentMethod: {
    all: IDashboardOrderSalesDetailsByPaymentMethodData[];
    cod: IDashboardOrderSalesDetailsByPaymentMethodData[];
    card: IDashboardOrderSalesDetailsByPaymentMethodData[];
  };
}
