'use client';

// Core
import React, { useEffect, useState } from 'react';

// Interfaces
import {
  IConfiguration,
  IConfigurationContextProps,
  ILazyQueryResult,
} from '@/lib/utils/interfaces';

// API
import { GET_CONFIGURATION } from '@/lib/api/graphql';

// Hooks
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL';

export const ConfigurationContext = React.createContext<
  IConfiguration | undefined
>({
  webClientID: '',
  publishableKey: '',
  clientId: '',
  googleApiKey: '',
  webAmplitudeApiKey: '',
  googleColor: '',
  webSentryUrl: '',
  skipEmailVerification: false,
  skipMobileVerification: false,
  currency: '',
  currencySymbol: '',
  deliveryRate: '',
  googleMapLibraries: '',
  twilioEnabled: '',
});

export const ConfigurationProvider: React.FC<IConfigurationContextProps> = ({
  children,
}) => {
  const [configuration, setConfiguration] = useState<
    IConfiguration | undefined
  >();
  // API

  const { fetch, loading, error, data } = useLazyQueryQL(GET_CONFIGURATION, {
    fetchPolicy: 'network-only',
    debounceMs: 300,
  }) as ILazyQueryResult<IConfiguration | undefined, undefined>;

  // Handlers
  const onFetchConfiguration = async () => {
    fetch();

    let configuration: IConfiguration | undefined =
      loading || error || !data
        ? {
            webClientID: '',
            publishableKey: '',
            clientId: '',
            googleApiKey: '',
            webAmplitudeApiKey: '',
            googleColor: '',
            webSentryUrl: '',
            skipEmailVerification: false,
            skipMobileVerification: false,
            currency: '',
            currencySymbol: '',
            deliveryRate: '',
            googleMapLibraries: '',
            twilioEnabled: '',
          }
        : data;

    setConfiguration(configuration);
  };

  // Use Effect
  useEffect(() => {
    onFetchConfiguration();
  }, [data]);

  return (
    <ConfigurationContext.Provider value={configuration}>
      {children}
    </ConfigurationContext.Provider>
  );
};
