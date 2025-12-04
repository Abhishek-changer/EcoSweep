'use client';

import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface MapProps {
    center: {
        lat: number;
        lng: number;
    }
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export function Map({ center }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
  });

  if (!googleMapsApiKey) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-muted text-center p-4">
            <h3 className="text-lg font-semibold text-destructive">Google Maps API Key is Missing</h3>
            <p className="text-sm text-muted-foreground mt-2">
                Please add your Google Maps API key to the <code>.env.local</code> file and restart the server.
            </p>
        </div>
    );
  }

  if (loadError) {
      return (
          <div className="flex flex-col items-center justify-center h-full bg-muted text-center p-4">
              <h3 className="text-lg font-semibold text-destructive">Map Load Error</h3>
              <p className="text-sm text-muted-foreground mt-2">
                The map failed to load. This is likely due to an invalid or restricted API key. Please check the following in your Google Cloud Console:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside mt-2 text-left">
                <li>The API key is correct.</li>
                <li>The "Maps JavaScript API" is enabled.</li>
                <li>There are no HTTP referrer restrictions blocking your app's URL.</li>
                <li>A valid billing account is linked to your project.</li>
              </ul>
          </div>
      )
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    >
      <MarkerF position={center} />
    </GoogleMap>
  ) : <div className="flex items-center justify-center h-full bg-muted">Loading map...</div>;
}
