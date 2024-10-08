import OrdersSuperAdminHeader from "@/lib/ui/screen-components/protected/order/super-admin/header/screen-header";
import OrderSuperAdminMain from "@/lib/ui/screen-components/protected/order/super-admin/main";
const OrderSuperAdminScreen = () => {
    return (
      <div className="screen-container">
        <OrdersSuperAdminHeader/>
        <OrderSuperAdminMain/>
      </div>
    );
  };
  
  export default OrderSuperAdminScreen;