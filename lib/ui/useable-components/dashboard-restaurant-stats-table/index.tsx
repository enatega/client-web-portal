import React from 'react';
<<<<<<< HEAD
import { IDashboardRestaurantStatsTableComponentsProps } from '@/lib/utils/interfaces';
=======
import { IDashboardStatsTableComponentsProps } from '@/lib/utils/interfaces';
>>>>>>> 6b25c7e89c5a0002f082a391dcbbc51dbd9daaba
import DashboardStatsTableSkeleton from '../custom-skeletons/dashboard.stats.table.skeleton';
import {
  formatNumber,
  formatNumberWithCurrency,
} from '@/lib/utils/methods/currency';
<<<<<<< HEAD
import { DASHBOARD_PAYMENT_METHOD_SUB_TITLE } from '@/lib/utils/constants';

export default function DashboardRestaurantStatsTable({
=======

export default function DashboardStatsTable({
>>>>>>> 6b25c7e89c5a0002f082a391dcbbc51dbd9daaba
  loading,
  title,
  data,
  amountConfig,
<<<<<<< HEAD
}: IDashboardRestaurantStatsTableComponentsProps) {
  if (loading) return <DashboardStatsTableSkeleton />;

  const {
    total_orders,
    total_sales,
    total_sales_without_delivery,
    total_delivery_fee,
  } = data;

=======
}: IDashboardStatsTableComponentsProps) {
  if (loading) return <DashboardStatsTableSkeleton />;

>>>>>>> 6b25c7e89c5a0002f082a391dcbbc51dbd9daaba
  return (
    <div className="w-full mx-auto">
      <div className="bg-white shadow-md rounded-lg border border-gray-300">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
<<<<<<< HEAD
          <h2 className="text-lg font-bold text-gray-800">
            {
              DASHBOARD_PAYMENT_METHOD_SUB_TITLE[
                title as keyof typeof DASHBOARD_PAYMENT_METHOD_SUB_TITLE
              ]
            }
          </h2>
          <i className="fas fa-arrow-down text-green-500"></i>
        </div>
        <div className="p-4 max-h-50 overflow-auto ">
          <div className={`flex justify-between py-2`}>
            <span className="text-gray-800">Total Orders</span>
            <span className="text-gray-800">
              {amountConfig ? formatNumber(total_orders) : total_orders}
            </span>
          </div>

          <div className={`flex justify-between py-2`}>
            <span className="text-gray-800">Total Sales</span>
            <span className="text-gray-800">
              {amountConfig
                ? formatNumberWithCurrency(total_sales, amountConfig.currency)
                : total_sales}
            </span>
          </div>

          <div className={`flex justify-between py-2`}>
            <span className="text-gray-800">Total Sales Without Delivery</span>
            <span className="text-gray-800">
              {amountConfig
                ? formatNumberWithCurrency(
                    total_sales_without_delivery,
                    amountConfig.currency
                  )
                : total_sales_without_delivery}
            </span>
          </div>

          <div className={`flex justify-between py-2`}>
            <span className="text-gray-800">Total Delivery Fee</span>
            <span className="text-gray-800">
              {amountConfig
                ? formatNumberWithCurrency(
                    total_delivery_fee,
                    amountConfig.currency
                  )
                : total_delivery_fee}
            </span>
          </div>
=======
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <i className="fas fa-arrow-down text-green-500"></i>
        </div>
        <div className="p-4 max-h-40 overflow-y-auto ">
          {data.map((item, index: number) => (
            <div
              key={index}
              className={`flex justify-between py-2 ${index !== data.length - 1 ? 'border-b border-gray-300' : ''}`}
            >
              <span className="text-gray-800">{item.label}</span>
              <span className="text-gray-800">
                {amountConfig
                  ? amountConfig?.format === 'currency'
                    ? formatNumberWithCurrency(
                        item.value,
                        amountConfig.currency
                      )
                    : formatNumber(item.value)
                  : item.value}
              </span>
            </div>
          ))}
>>>>>>> 6b25c7e89c5a0002f082a391dcbbc51dbd9daaba
        </div>
      </div>
    </div>
  );
}
