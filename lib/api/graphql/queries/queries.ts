import { gql } from '@apollo/client';
export const getCuisines = gql`
  query Cuisines {
    cuisines {
      _id
      name
      description
      image
      shopType
    }
  }
`;

export const getBanners = gql`
  query Banners {
    banners {
      _id
      title
      description
      action
      screen
      file
      parameters
    }
  }
`;
export const getBannerActions = gql`
  query BannerActions {
    bannerActions
  }
`;

export const getTipping = gql`
  query Tips {
    tips {
      _id
      tipVariations
      enabled
    }
  }
`;

export const getAddons = gql`
  query Addons {
    addons {
      _id
      title
      description
      options {
        _id
        title
        description
        price
      }
      quantityMinimum
      quantityMaximum
    }
  }
`;

export const getOptions = gql`
  query Options {
    options {
      _id
      title
      description
      price
    }
  }
`;
export const getPaymentStatuses = gql`
  query {
    getPaymentStatuses
  }
`;

export const restaurantByOwner = gql`
  query RestaurantByOwner($id: String) {
    restaurantByOwner(id: $id) {
      _id
      email
      userType
      restaurants {
        _id
        orderId
        orderPrefix
        name
        slug
        image
        address
        username
        password
        location {
          coordinates
        }
        shopType
      }
    }
  }
`;

export const restaurantList = gql`
  query RestaurantList {
    restaurantList {
      _id
      name
      address
    }
  }
`;

export const restaurants = gql`
  query Restaurants {
    restaurants {
      _id
      name
      image
      orderPrefix
      slug
      address
      deliveryTime
      minimumOrder
      isActive
      commissionRate
      tax
      owner {
        _id
        email
      }
      shopType
    }
  }
`;

export const getRestaurantProfile = gql`
  query Restaurant($id: String) {
    restaurant(id: $id) {
      _id
      orderId
      orderPrefix
      slug
      name
      image
      logo
      address
      location {
        coordinates
      }
      deliveryBounds {
        coordinates
      }
      username
      password
      deliveryTime
      minimumOrder
      tax
      isAvailable
      stripeDetailsSubmitted
      openingTimes {
        day
        times {
          startTime
          endTime
        }
      }
      owner {
        _id
        email
      }
      shopType
      cuisines
    }
  }
`;

export const getRestaurantDetail = gql`
  query Restaurant($id: String) {
    restaurant(id: $id) {
      _id
      orderId
      orderPrefix
      slug
      name
      image
      address
      location {
        coordinates
      }
      deliveryTime
      minimumOrder
      tax
      categories {
        _id
        title
        foods {
          _id
          title
          description
          variations {
            _id
            title
            price
            discounted
            addons
          }
          image
          isActive
        }
      }
      options {
        _id
        title
        description
        price
      }
      addons {
        _id
        options
        title
        description
        quantityMinimum
        quantityMaximum
      }
      shopType
    }
  }
`;

export const getOffers = gql`
  query Offers {
    offers {
      _id
      name
      tag
      restaurants {
        _id
        name
      }
    }
  }
`;

export const getSections = gql`
  query Sections {
    sections {
      _id
      name
      enabled
      restaurants {
        _id
        name
      }
    }
  }
`;

export const pageCount = gql`
  query PageCount($restaurant: String!) {
    pageCount(restaurant: $restaurant)
  }
`;
export const getUsers = gql`
  query {
    users {
      _id
      name
      email
      phone
      addresses {
        location {
          coordinates
        }
        deliveryAddress
      }
    }
  }
`;

export const getRiders = gql`
  query {
    riders {
      _id
      name
      username
      password
      phone
      available
      zone {
        _id
        title
      }
    }
  }
`;

export const getAvailableRiders = gql`
  query {
    availableRiders {
      _id
      name
      username
      phone
      available
      zone {
        _id
      }
    }
  }
`;

export const withdrawRequestQuery = gql`
  query GetWithdrawRequests($offset: Int) {
    getAllWithdrawRequests(offset: $offset) {
      success
      message
      data {
        _id
        requestId
        requestAmount
        requestTime
        rider {
          _id
          name
          currentWalletAmount
        }
        status
      }
      pagination {
        total
      }
    }
  }
`;
