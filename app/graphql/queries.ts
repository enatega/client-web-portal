import { gql } from '@apollo/client';

export const getCoupons = gql`
  query Coupons {
    coupons {
      _id
      title
      discount
      enabled
    }
  }
`;

export const getCuisines = `query Cuisines{
    cuisines {
      _id
      name
      description
      image
      shopType
    }
  }`;

export const getBanners = `query Banners{
    banners {
      _id
      title
      description
      action
      screen
      file
      parameters
    }
  }`;
export const getBannerActions = `query BannerActions{
    bannerActions
  }`;

export const getTipping = `query Tips{
    tips {
      _id
      tipVariations
      enabled
    }
  }`;

export const getAddons = `query Addons{
    addons{
    _id
    title
    description
    options{
      _id
      title
      description
      price
    }
    quantityMinimum
    quantityMaximum
  }}`;

export const getOptions = `query Options{
    options {
      _id
      title
      description
      price
    }
  }
  `;
export const getPaymentStatuses = `query{
    getPaymentStatuses
  }`;

export const restaurantByOwner = `query RestaurantByOwner($id:String){
  restaurantByOwner(id:$id){
  _id
  email
  userType
  restaurants{
    _id
    orderId
    orderPrefix
    name
    slug
    image
    address
    username
    password
    location{coordinates}
    shopType
    }
  }
}`;

export const restaurantList = `query RestaurantList{
  restaurantList{
    _id
    name
    address
  }
}`;

export const restaurants = `query Restaurants{
  restaurants{
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
    owner{
      _id
      email
    }
    shopType
  }
}
`;

export const getRestaurantProfile = `query Restaurant($id:String){
      restaurant(id:$id)
      {
      _id
      orderId
      orderPrefix
      slug
      name
      image
      logo
      address
      location{coordinates}
      deliveryBounds{
        coordinates
      }
      username
      password
      deliveryTime
      minimumOrder
      tax
      isAvailable
      stripeDetailsSubmitted
      openingTimes{
        day
        times{
          startTime
          endTime
        }
      }
      owner{
        _id
        email
      }
      shopType
      cuisines
    }
}`;

export const getRestaurantDetail = `query Restaurant($id:String){
      restaurant(id:$id){
      _id
      orderId
      orderPrefix
      slug
      name
      image
      address
      location{coordinates}
      deliveryTime
      minimumOrder
      tax
      categories{
        _id
        title
        foods{
          _id
          title
          description
          variations{
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
      options{
        _id
        title
        description
        price
      }
      addons{
        _id
        options
        title
        description
        quantityMinimum
        quantityMaximum
      }
      shopType
    }
}`;

export const getOffers = `query Offers{
  offers{
    _id
    name
    tag
    restaurants{
      _id
      name
    }
  }
}`;

export const getSections = `query Sections{
  sections{
    _id
    name
    enabled
    restaurants{
      _id
      name
    }
  }
}`;

export const pageCount = `
query PageCount($restaurant:String!){
  pageCount(restaurant:$restaurant)
}
`;
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

export const withdrawRequestQuery = `query GetWithdrawRequests($offset:Int){
      getAllWithdrawRequests(offset:$offset){
          success
          message
          data{
            _id
            requestId
            requestAmount
            requestTime
            rider{
              _id
              name
              currentWalletAmount
            }
            status
          }
          pagination{
            total
          }
      }
  }`;
