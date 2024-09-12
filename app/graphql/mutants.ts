import { gql } from "@apollo/client"

export const createFood = gql`
  mutation CreateFood($foodInput:FoodInput!){
      createFood(
          foodInput:$foodInput
      ){
        _id
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
        createdAt
        updatedAt
      }
      }
    }`

export const editFood = gql`
    mutation EditFood($foodInput:FoodInput!){
        editFood(
            foodInput:$foodInput
        ){
            _id
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
              createdAt
              updatedAt
            }
        }
      }`

export const deleteFood = gql`
      mutation DeleteFood($id:String!,$restaurant:String!,$categoryId:String!){
        deleteFood(id:$id,restaurant:$restaurant,categoryId:$categoryId){
          _id
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
            createdAt
            updatedAt
          }
        }
      }`

export const createCategory = gql`
mutation CreateCategory($category:CategoryInput){
  createCategory(category:$category){
    _id
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
}`

export const editCategory = gql`
      mutation EditCategory($category:CategoryInput){
        editCategory(category:$category){
          _id
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
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
        }
      }`

export const deleteCategory = gql`
      mutation DeleteCategory($id:String!,$restaurant:String!){
        deleteCategory(id:$id,restaurant:$restaurant){
                _id
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
                    createdAt
                    updatedAt
                  }
                  createdAt
                  updatedAt
                }
        }
      }`

export const saveEmailConfiguration = gql`mutation SaveEmailConfiguration($configurationInput:EmailConfigurationInput!){
  saveEmailConfiguration(configurationInput:$configurationInput){
    _id
    email
    emailName
    password
    enableEmail
  }
}`
export const saveFormEmailConfiguration = gql`mutation  SaveFormEmailConfiguration($configurationInput:FormEmailConfigurationInput!){
  saveFormEmailConfiguration(configurationInput: $configurationInput) {
    _id
    formEmail

  }
}`
export const saveSendGridApiKey = gql`mutation SaveSendGridApiKey($configurationInput: SendGridConfigurationInput!) {
  saveSendGridConfiguration(configurationInput: $configurationInput) {
    _id
    sendGridApiKey
    sendGridEnabled
    sendGridEmail
    sendGridEmailName
    sendGridPassword
  }
}`

export const saveFirebaseConfiguration = gql`
  mutation SaveFirebaseConfiguration(
    $configurationInput:FirebaseConfigurationInput!
  ) {
    saveFirebaseConfiguration(configurationInput: $configurationInput) {
      _id
      firebaseKey
      authDomain
      projectId
      storageBucket
      msgSenderId
      appId
      measurementId
      vapidKey
    }
  }
`

export const saveSentryConfiguration = gql`
  mutation SaveSentryConfiguration($configurationInput: SentryConfigurationInput!) {
    saveSentryConfiguration(configurationInput: $configurationInput) {
      _id
      dashboardSentryUrl
      webSentryUrl
      apiSentryUrl
      customerAppSentryUrl
      restaurantAppSentryUrl
      riderAppSentryUrl
    }
  }
`
export const saveGoogleApiKeyConfiguration = gql`
  mutation SaveGoogleApiKeyConfiguration(
    $configurationInput: GoogleApiKeyConfigurationInput!
  ) {
    saveGoogleApiKeyConfiguration(configurationInput: $configurationInput) {
      _id
      googleApiKey
    }
  }
`
export const saveCloudinaryConfiguration = gql`mutation SaveCloudinaryConfiguration($configurationInput: CloudinaryConfigurationInput!) {
  saveCloudinaryConfiguration(configurationInput: $configurationInput) {
    _id
    cloudinaryUploadUrl
    cloudinaryApiKey
 
  }
}
`
export const saveAmplitudeApiKeyConfiguration = gql`
  mutation SaveAmplitudeApiKeyConfiguration(
    $configurationInput: AmplitudeApiKeyConfigurationInput!
  ) {
    saveAmplitudeApiKeyConfiguration(configurationInput: $configurationInput) {
      _id
      webAmplitudeApiKey
      appAmplitudeApiKey
    }
  }
`
export const saveGoogleClientIDConfiguration = gql`mutation SaveGoogleClientIDConfiguration($configurationInput: GoogleClientIDConfigurationInput!) {
  saveGoogleClientIDConfiguration(configurationInput: $configurationInput) {
    _id
    webClientID
    androidClientID
    iOSClientID
    expoClientID
  }
}
`
export const saveWebConfiguration = gql`
  mutation SaveWebConfiguration($configurationInput: WebConfigurationInput!) {
    saveWebConfiguration(configurationInput: $configurationInput) {
      _id
    
      googleMapLibraries
      googleColor
    }
  }
`

export const saveAppConfiguration = gql`
  mutation SaveAppConfiguration($configurationInput: AppConfigurationsInput!) {
    saveAppConfigurations(configurationInput: $configurationInput) {
      _id
    
      termsAndConditions
      privacyPolicy
      testOtp
    }
  }
`
export const saveDeliveryRateConfiguration = gql`mutation SaveDeliveryRateConfiguration($configurationInput: DeliveryCostConfigurationInput!) {
  saveDeliveryRateConfiguration(configurationInput: $configurationInput) {
    _id
    deliveryRate
    costType
  }
}`;

export const savePaypalConfiguration = gql`mutation SavePaypalConfiguration($configurationInput:PaypalConfigurationInput!){
  savePaypalConfiguration(configurationInput:$configurationInput){
    _id
    clientId
    clientSecret
    sandbox
  }
}`

export const saveStripeConfiguration = gql`mutation SaveStripeConfiguration($configurationInput:StripeConfigurationInput!){
  saveStripeConfiguration(configurationInput:$configurationInput){
    _id
    publishableKey
    secretKey
  
  }
}`

export const saveTwilioConfiguration = gql`mutation saveTwilioConfiguration($configurationInput:TwilioConfigurationInput!){
  saveTwilioConfiguration(configurationInput:$configurationInput){
    _id
    twilioAccountSid
    twilioAuthToken
    twilioPhoneNumber
    twilioEnabled
  }
}`

export const saveVerificationToggles = gql`mutation SaveVerificationsToggle($configurationInput:VerificationConfigurationInput!){
  saveVerificationsToggle(configurationInput: $configurationInput) {
    skipEmailVerification
    skipMobileVerification
  }
}`

export const saveCurrencyConfiguration = gql`mutation SaveCurrencyConfiguration($configurationInput:CurrencyConfigurationInput!){
  saveCurrencyConfiguration(configurationInput:$configurationInput){
    _id
    currency
    currencySymbol
  }
}`

export const ownerLogin = gql`mutation ownerLogin($email:String!,$password:String!){
  ownerLogin(email:$email,password:$password){
    userId
    token
    email
    userType
    restaurants{
      _id
      orderId
      name
      image
      address
    }
  }
}`

export const createSection = gql`mutation CreateSection($section:SectionInput!){
  createSection(section:$section){
      _id
      name
      enabled
      restaurants{
        _id
        name
      }
    }
}`
export const editSection = gql`mutation editSection($section:SectionInput!){
  editSection(section:$section){
      _id
      name
      enabled
      restaurants{
        _id
        name
      }
    }
}`

export const deleteSection = gql`mutation DeleteSection($id:String!){
  deleteSection(id:$id)
}`

export const deleteVendor = gql`mutation DeleteVendor($id:String!){
  deleteVendor(id:$id)
}`

export const updateOrderStatus = gql`mutation UpdateOrderStatus($id:String!,$status:String!,$reason:String){
  updateOrderStatus(id:$id,status:$status,reason:$reason){
    _id
    orderStatus
  }
}
`
export const updateStatus = gql`mutation UpdateStatus($id:String!,$orderStatus:String!){
  updateStatus(id:$id,orderStatus:$orderStatus){
    _id
    orderStatus
  }
}
`

export const uploadToken = gql`mutation UploadToken($id:String!,$pushToken:String!){
  uploadToken(id:$id,pushToken:$pushToken){
    _id
    pushToken
  }
}`

export const resetPassword = gql`mutation ResetPassword($password:String!,$token:String!){
  resetPassword(password:$password,token:$token){
    result
  }
}`

export const createRider = gql`
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
  }`

export const editRider = gql`
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
      }`
export const deleteRider = gql`
      mutation DeleteRider($id:String!){
        deleteRider(id:$id){
          _id
        }
      }`

export const toggleAvailablity = gql`
      mutation ToggleRider($id:String){
        toggleAvailablity(id:$id){
          _id
        }
}`

export const assignRider = gql` mutation AssignRider($id:String!,$riderId:String!){
  assignRider(id:$id,riderId:$riderId){
    _id
    orderStatus
    rider{
      _id
      name
    }
  }
}`

export const updatePaymentStatus = gql`mutation UpdatePaymentStatus($id:String!,$status:String!){
  updatePaymentStatus(id:$id,status:$status){
    _id
    paymentStatus
    paidAmount
  }
}
`

export const createOffer = gql`mutation CreateOffer($offer:OfferInput!){
  createOffer(offer:$offer){
      _id
      name
      tag
      restaurants{
        _id
        name
        address
      }
    }
}`

export const editOffer = gql`mutation EditOffer($offer:OfferInput!){
  editOffer(offer:$offer){
      _id
      name
      tag
      restaurants{
        _id
        name
        address
      }
    }
}`

export const deleteOffer = gql`mutation DeleteOffer($id:String!){
  deleteOffer(id:$id)
}`

export const createOptions = gql`mutation CreateOptions($optionInput:CreateOptionInput){
  createOptions(optionInput:$optionInput){
    _id
    options{
      _id
      title
      description
      price
    }
  }
}`

export const createAddons = gql`mutation CreateAddons($addonInput:AddonInput){
  createAddons(addonInput:$addonInput){
      _id
      addons{
        _id
        options
        title
        description
        quantityMinimum
        quantityMaximum
      }
      
    }
}`
export const editAddon = gql`mutation editAddon($addonInput:editAddonInput){
  editAddon(addonInput:$addonInput){
      _id
      addons{
        _id
        options
        title
        description
        quantityMinimum
        quantityMaximum
      }
  }
}`

export const deleteAddon = gql`
      mutation DeleteAddon($id:String!,$restaurant:String!){
        deleteAddon(id:$id,restaurant:$restaurant){
          _id
          addons{
            _id
            options
            title
            description
            quantityMinimum
            quantityMaximum
          }
        }
      }`

export const deleteOption = gql`
      mutation DeleteOption($id:String!,$restaurant:String!){
        deleteOption(id:$id,restaurant:$restaurant){
          _id
          options{
            _id
            title
            description
            price
          }
        }
      }`
export const editOption = gql`mutation editOption($optionInput:editOptionInput){
  editOption(optionInput:$optionInput){
          _id
          options{
            _id
            title
            description
            price
          }
        }
      }`

export const createCoupon = gql`mutation CreateCoupon($couponInput:CouponInput!){
  createCoupon(couponInput:$couponInput){
    _id
    title
    discount
    enabled
  }
}`
export const editCoupon = gql`mutation editCoupon($couponInput:CouponInput!){
  editCoupon(couponInput:$couponInput){
        _id
        title
        discount
        enabled
        }
      }`
export const deleteCoupon = gql`mutation DeleteCoupon($id:String!){
        deleteCoupon(id:$id)
      }`

export const createCuisine = gql`mutation CreateCuisine($cuisineInput:CuisineInput!){
        createCuisine(cuisineInput:$cuisineInput){
          _id
          name
          description
          image
        shopType
        }
      }`
export const editCuisine = gql`mutation editCuisine($cuisineInput:CuisineInput!){
        editCuisine(cuisineInput:$cuisineInput){
          _id
          name
          description
          image
      shopType
              }
            }`
export const deleteCuisine = gql`mutation DeleteCuisine($id:String!){
              deleteCuisine(id:$id)
            }`

export const createBanner = gql`mutation CreateBanner($bannerInput:BannerInput!){
  createBanner(bannerInput:$bannerInput){
    _id
    title
    description
    action
    file
    screen
    parameters
  }
}`

export const editBanner = gql`mutation editBanner($bannerInput:BannerInput!){
  editBanner(bannerInput:$bannerInput){
    _id
    title
    description
    action
    file
    screen
    parameters
  }
}`

export const deleteBanner = gql`mutation DeleteBanner($id:String!){
  deleteBanner(id:$id)
}`

export const createTipping = gql`mutation CreateTipping($tippingInput:TippingInput!){
        createTipping(tippingInput:$tippingInput){
          _id
          tipVariations
          enabled
        }
      }`

export const editTipping = gql`mutation editTipping($tippingInput:TippingInput!){
  editTipping(tippingInput:$tippingInput){
            _id
            tipVariations
            enabled
              }
            }`

export const createTaxation = gql`mutation CreateTaxation($taxationInput:TaxationInput!){
    createTaxation(taxationInput:$taxationInput){
          _id
        taxationCharges
        enabled
        }
      }`

export const editTaxation = gql`mutation editTaxation($taxationInput:TaxationInput!){
    editTaxation(taxationInput:$taxationInput){
            _id
            taxationCharges
            enabled
              }
            }`

export const createVendor = gql`mutation CreateVendor($vendorInput:VendorInput){
    createVendor(vendorInput:$vendorInput){
      _id
      email
      userType
    }
}`

export const editVendor = gql`mutation EditVendor($vendorInput:VendorInput){
  editVendor(vendorInput:$vendorInput){
    _id
    email
  }
}`

export const editRestaurant = gql`mutation EditRestaurant($restaurantInput:RestaurantProfileInput!){
    editRestaurant(restaurant:$restaurantInput){
      _id
      orderId
      orderPrefix
      name
      image
      logo
      slug
      address
      username
      password
      location{coordinates}
      isAvailable
      minimumOrder
      tax
      openingTimes{
        day
        times{
          startTime
          endTime
        }
      }
      shopType
    }
}`

export const createZone = gql`mutation CreateZone($zone:ZoneInput!){
  createZone(zone:$zone){
    _id
    title
    description
    location{coordinates}
    isActive
  }
}`

export const editZone = gql`mutation EditZone($zone:ZoneInput!){
  editZone(zone:$zone){
    _id
    title
    description
    location{coordinates}
    isActive
  }
}`

export const deleteZone = gql`mutation DeleteZone($id:String!){
  deleteZone(id:$id){
    _id
    title
    description
    location{coordinates}
    isActive
  }
}`

export const vendorResetPassword = gql`mutation VendorResetPassword($oldPassword: String!, $newPassword: String!){
    vendorResetPassword(oldPassword: $oldPassword, newPassword: $newPassword)
}`

export const deleteRestaurant = gql`mutation DeltetRestaurant($id:String!){
  deleteRestaurant(id:$id){
    _id
    isActive
  }
}`

export const updateTimings = gql`mutation UpdateTimings($id:String!,$openingTimes:[TimingsInput]){
  updateTimings(id:$id,
    openingTimes:$openingTimes){
    _id
    openingTimes{
      day
      times{
        startTime
        endTime
      }
    }
  }
}`

export const sendNotificationUser = gql`mutation SendNotificationUser($notificationTitle:String, $notificationBody: String!){
  sendNotificationUser(notificationTitle:$notificationTitle,notificationBody:$notificationBody)
}
`
export const updateCommission = gql`mutation UpdateCommission($id:String!,$commissionRate:Float!){
  updateCommission(id:$id,commissionRate:$commissionRate){
    _id
    commissionRate
  }
}`
export const createRestaurant = gql`mutation CreateRestaurant($restaurant:RestaurantInput!,$owner:ID!){
  createRestaurant(restaurant:$restaurant,owner:$owner){
    _id
    orderId
    orderPrefix
    name
    slug
    image
    logo
    address
    username
    password
    minimumOrder
    tax
    location{coordinates}
    shopType
    cuisines
  }
}`

export const updateDeliveryBoundsAndLocation = gql`mutation UPDATE_DELIVERY_BOUNDS_AND_LOCATION($id:ID!,$bounds:[[[Float!]]],$location:CoordinatesInput!){
  result :updateDeliveryBoundsAndLocation(id:$id,location:$location,bounds:$bounds){
    success
    message
    data{
      _id
      deliveryBounds{
        coordinates
      }
      location{
        coordinates
      }
    }
  }
}`

export const updateWithdrawReqStatus = gql`mutation UpdateWithdrawRequest($id:ID!, $status:String!){
  updateWithdrawReqStatus(id:$id,status:$status){
    success
    message
    data{
      rider{
        _id
        currentWalletAmount
      }
      withdrawRequest{
        _id
        status
      }
    }
  }
}`
