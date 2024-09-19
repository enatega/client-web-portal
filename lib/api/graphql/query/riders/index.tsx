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

export const getAvailableRiders = `query{
    availableRiders{
      _id
      name
      username
      phone
      available
      zone{
        _id
      }
    }
  }`;

export const getZones = `query Zones{
    zones{
    _id
    title
    description
    location{coordinates}
    isActive
    }
}`;
