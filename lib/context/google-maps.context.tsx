// Core
import React, { createContext } from 'react';

// Third-party libraries
import { useJsApiLoader } from '@react-google-maps/api';

// Components

// Interfaces
import {
  IGoogleMapsContext,
  IGoogleMapsProviderProps,
} from '../utils/interfaces';

export const GoogleMapsContext = createContext<IGoogleMapsContext | undefined>(
  undefined
);

export const GoogleMapsProvider: React.FC<IGoogleMapsProviderProps> = ({
  apiKey,
  libraries,
  children,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
