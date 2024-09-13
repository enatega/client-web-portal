export const createCoupon = `mutation CreateCoupon($couponInput:CouponInput!){
    createCoupon(couponInput:$couponInput){
      _id
      title
      discount
      enabled
    }
  }`;
export const editCoupon = `mutation editCoupon($couponInput:CouponInput!){
    editCoupon(couponInput:$couponInput){
          _id
          title
          discount
          enabled
          }
        }`;
export const deleteCoupon = `mutation DeleteCoupon($id:String!){
          deleteCoupon(id:$id)
        }`;
