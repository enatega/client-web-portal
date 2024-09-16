export const getRiders = `query{
    riders{
      _id
      name
      username
      password
      phone
      available
      zone{
        _id
        title
      }
    }
  }`;
