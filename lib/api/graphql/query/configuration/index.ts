import { gql } from '@apollo/client';

export const GET_CONFIGURATION = gql`
  query getConfiguration {
    configuration {
      _id
      currency
      currencySymbol
      deliveryRate
      twilioEnabled
      webClientID
      googleApiKey
      webAmplitudeApiKey
      googleMapLibraries
      googleColor
      webSentryUrl
      publishableKey
      clientId
      skipEmailVerification
      skipMobileVerification
    }
  }
`;
