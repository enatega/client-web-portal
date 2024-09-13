import { IGlobalProps } from './global.interface';

export interface IConfigurationContextProps extends IGlobalProps {}

export interface IConfiguration {
  webClientID?: string;
  publishableKey?: string;
  clientId?: string;
  googleApiKey?: string;
  webAmplitudeApiKey?: string;
  googleColor?: string;
  webSentryUrl?: string;
  skipEmailVerification?: boolean;
  skipMobileVerification?: boolean;
  currency: string;
  currencySymbol: string;
  deliveryRate: string;
  googleMapLibraries: string;
  twilioEnabled: string;
}

export interface IConfigurationUnresolved {
  currency: string;
  currencySymbol: string;
  deliveryRate: number;
}
