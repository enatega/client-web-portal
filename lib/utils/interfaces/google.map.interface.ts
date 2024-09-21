import { Libraries } from '@react-google-maps/api';
import { ReactNode } from 'react';
import { IGlobalComponentProps } from './global.interface';

export interface IGoogleMapsLoaderComponentProps
  extends IGlobalComponentProps {}

export interface IAutoCompleteItem {
  code: string;
  name: string;
}

export interface CustomGoogleMapsAutoCompleteComponentProps
  extends IGlobalComponentProps {
  fetchSuggestions: (query: string) => Promise<IAutoCompleteItem[]>;
  onSelect: (item: IAutoCompleteItem) => void;
  minLength: number;
  placeholder: string;
  debounceTimeout?: number; // optional debounce timeout in milliseconds
}

export interface IGoogleMapsContext {
  isLoaded: boolean;
}

export interface IGoogleMapsProviderProps {
  apiKey: string;
  libraries: Libraries;
  children: ReactNode;
}

/* Shape */
export interface ICustomShapeComponentProps extends IGlobalComponentProps {
  selected: string;
  onClick: (value: string) => void;
}

export interface ILocationPoint {
  lat: number;
  lng: number;
}
