// Core
import React, { createContext, useEffect } from 'react';

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

  useEffect(() => {
    const loadGoogleMapsScript = (key: string) => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window.google === 'undefined') {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = reject;
          document.head.appendChild(script);
        } else {
          resolve(); // Google Maps already loaded
        }
      });
    };

    const unloadGoogleMapsScript = () => {
      const script = document.querySelector(
        'script[src^="https://maps.googleapis.com/maps/api/js"]'
      );
      if (script) {
        document.head.removeChild(script);
      }
    };

    // Reinitialize Google Maps if API key changes
    if (apiKey) {
      unloadGoogleMapsScript(); // Unload the previous script if any
      loadGoogleMapsScript(apiKey)
        .then(() => {})
        .catch(() => console.error('Failed to load Google Maps script.'));
    }
  }, [apiKey]);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
