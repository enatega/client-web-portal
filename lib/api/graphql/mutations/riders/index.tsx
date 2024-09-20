export const createRider = `
mutation CreateRider($riderInput:RiderInput!){
    createRider(
        riderInput:$riderInput
    ){
    _id
    name
    username
    password
    phone
    available
      zone{
        _id
      }
    }
  }`;

export const editRider = `
    mutation EditRider($riderInput:RiderInput!){
        editRider(
          riderInput:$riderInput
        ){
          _id
          name
          username
          phone
          zone{
            _id
          }
        }
      }`;

export const deleteRider = `
      mutation DeleteRider($id:String!){
        deleteRider(id:$id){
          _id
        }
      }`;
