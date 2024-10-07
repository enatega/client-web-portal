import OrdersVendorHeader from "@/lib/ui/screen-components/protected/order/vendor/header/screen-header";
import OrderVendorMain from "@/lib/ui/screen-components/protected/order/vendor/main";

const OrderVendorScreen = () => {
  return (
    <div className="screen-container">
      <OrdersVendorHeader/>
      <OrderVendorMain/>
    </div>
  );
};

export default OrderVendorScreen;
