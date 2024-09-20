/* eslint-disable no-unused-vars */
'use client';

// Core
import { useContext } from 'react';

// Context
import { IConfiguration } from '@/lib/utils/interfaces';

// Interface
import { ConfigurationContext } from '@/lib/context/configuration.context';
import { BACKEND_URL } from '@/lib/utils/constants';

// Third-Party
//import { Libraries } from '@react-google-maps/api';

export const useConfiguration = () => {
  const configuration: IConfiguration | undefined =
    useContext(ConfigurationContext);

  const GOOGLE_CLIENT_ID = configuration?.webClientID;
  const STRIPE_PUBLIC_KEY = configuration?.publishableKey;
  const PAYPAL_KEY = configuration?.clientId;
  const GOOGLE_MAPS_KEY = configuration?.googleApiKey;
  const AMPLITUDE_API_KEY = configuration?.webAmplitudeApiKey;
  /*   const LIBRARIES = 'places,drawing,geometry,localContext,visualization'.split(
    ','
  ) as Libraries; */
  const COLORS = {
    GOOGLE: configuration?.googleColor,
  };
  const SENTRY_DSN = configuration?.webSentryUrl;
  const SKIP_EMAIL_VERIFICATION = configuration?.skipEmailVerification;
  const SKIP_MOBILE_VERIFICATION = configuration?.skipMobileVerification;

  return {
    SERVER_URL: BACKEND_URL.LIVE.SERVER_URL,
    WS_SERVER_URL: BACKEND_URL.LIVE.WS_SERVER_URL,
    GOOGLE_CLIENT_ID,
    COLORS,
    PAYPAL_KEY,
    STRIPE_PUBLIC_KEY,
    GOOGLE_MAPS_KEY,
    AMPLITUDE_API_KEY,
    //LIBRARIES,
    SENTRY_DSN,
    SKIP_EMAIL_VERIFICATION,
    SKIP_MOBILE_VERIFICATION,
  };
};
