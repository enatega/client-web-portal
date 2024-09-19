export const getUsers = `query{
    users{
      _id
      name
      email
      phone
      addresses{
        location{coordinates}
        deliveryAddress
      }
    }
  }`;
