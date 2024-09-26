'use client';

// Core imports
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import parse from 'autosuggest-highlight/parse';
import { throttle } from 'lodash';

// Interfaces
import {
  ILocationPoint,
  IPlaceSelectedOption,
  IZoneCustomGoogleMapsBoundComponentProps,
} from '@/lib/utils/interfaces';

// Utilities
import {
  calculatePolygonCentroid,
  transformPath,
  transformPolygon,
} from '@/lib/utils/methods';

// Third-party libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faMapMarker,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

// Prime React
import { AutoComplete, AutoCompleteSelectEvent } from 'primereact/autocomplete';
import { GoogleMapsContext } from '@/lib/context/google-maps.context';

const autocompleteService: {
  current: google.maps.places.AutocompleteService | null;
} = { current: null };

const CustomGoogleMapsLocationZoneBounds: React.FC<
  IZoneCustomGoogleMapsBoundComponentProps
> = ({ _path, onSetZoneCoordinates }) => {
  // Context
  const googleMapsContext = useContext(GoogleMapsContext);

  // States
  const [isMounted, setIsMounted] = useState(false);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [path, setPath] = useState<ILocationPoint[]>([]);

  // Auto complete
  const [options, setOptions] = useState<IPlaceSelectedOption[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedPlaceObject, setSelectedPlaceObject] =
    useState<IPlaceSelectedOption | null>(null);
  const [search, setSearch] = useState<string>('');

  // Ref
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const listenersRef = useRef<google.maps.MapsEventListener[]>([]);

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService?.current?.getPlacePredictions(request, callback);
      }, 1500),
    []
  );

  // Handlers
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const onHandlerAutoCompleteSelectionChange = (
    event: AutoCompleteSelectEvent
  ) => {
    const selectedOption = event?.value as IPlaceSelectedOption;
    if (selectedOption) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { placeId: selectedOption.place_id },
        (results: google.maps.GeocoderResult[] | null) => {
          if (
            results &&
            results[0] &&
            results[0]?.geometry &&
            results[0]?.geometry.location
          ) {
            const location = results[0]?.geometry?.location;

            setCenter({
              lat: location?.lat() ?? 0,
              lng: location?.lng() ?? 0,
            });

            setInputValue(selectedOption.description);
          }
        }
      );
      setSelectedPlaceObject(selectedOption);
    }
  };

  const onClickGoogleMaps = (e: google.maps.MapMouseEvent) => {
    setPath([
      ...path,
      { lat: e?.latLng?.lat() ?? 0, lng: e?.latLng?.lng() ?? 0 },
    ]);
  };

  const onSetCenterAndPolygon = () => {
    setIsMounted(true);

    if (
      Array.isArray(_path) &&
      _path.length > 0 &&
      Array.isArray(_path[0]) &&
      _path[0].length > 0
    ) {
      const _editValue = transformPolygon(_path[0]);
      console.log({ _editValue });
      setPath(_editValue);
      setCenter(calculatePolygonCentroid(_path[0]));
    }
  };

  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef?.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });

      setPath(nextPath);

      // Calculate new center based on polygon vertices
      const newCenter = nextPath.reduce(
        (acc, point) => ({
          lat: acc.lat + point.lat / nextPath.length,
          lng: acc.lng + point.lng / nextPath.length,
        }),
        { lat: 0, lng: 0 }
      );

      setCenter(newCenter);
    }
  }, [setPath, setCenter]);

  const onLoadPolygon = useCallback(
    (polygon: google.maps.Polygon) => {
      if (!polygon) return;

      polygonRef.current = polygon;
      const path = polygon?.getPath();
      listenersRef?.current?.push(
        path?.addListener('set_at', onEdit),
        path?.addListener('insert_at', onEdit),
        path?.addListener('remove_at', onEdit)
      );
    },
    [onEdit]
  );

  const onUnmount = useCallback(() => {
    console.log('on unmount');
    listenersRef?.current?.forEach((lis) => lis?.remove());
    polygonRef.current = null;
  }, []);

  // Use Effects
  useEffect(() => {
    if (!isMounted) return;
    onSetZoneCoordinates(transformPath(path ?? []));
  }, [path]);

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return;
    }

    if (search === '') {
      setOptions(selectedPlaceObject ? [selectedPlaceObject] : []);
      return;
    }

    fetch({ input: search }, (results: IPlaceSelectedOption[]) => {
      let newOptions: IPlaceSelectedOption[] = [];
      if (selectedPlaceObject) {
        newOptions = [selectedPlaceObject];
      }
      if (results) {
        newOptions = [...newOptions, ...results];
      }
      setOptions(newOptions);
    });

    return () => {
      autocompleteService.current = null;
    };
  }, [selectedPlaceObject, search, fetch]);

  useEffect(() => {
    onSetCenterAndPolygon();
  }, []);

  return (
    <div>
      <div className="overflow-hidden relative">
        <div className="w-full h-[600px] object-cover">
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className={`w-full flex flex-col justify-center gap-y-1 p-2`}>
              <div className="relative">
                <AutoComplete
                  id="google-map"
                  disabled={false}
                  className={`w-full h-11 border px-2 text-sm border-gray-300 focus:outline-none focus:shadow-none p`}
                  value={inputValue}
                  dropdownIcon={
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ fontSize: '1rem', color: 'gray' }}
                    />
                  }
                  completeMethod={(event) => {
                    setSearch(event.query);
                  }}
                  onChange={(e) => {
                    if (typeof e.value === 'string') handleInputChange(e.value);
                  }}
                  onSelect={onHandlerAutoCompleteSelectionChange}
                  suggestions={options}
                  forceSelection={false}
                  dropdown={true}
                  multiple={false}
                  loadingIcon={null}
                  placeholder="Enter your full address"
                  style={{ width: '100%' }}
                  itemTemplate={(item) => {
                    const matches =
                      item.structured_formatting?.main_text_matched_substrings;
                    let parts = null;
                    if (matches) {
                      parts = parse(
                        item.structured_formatting.main_text,
                        matches.map(
                          (match: { offset: number; length: number }) => [
                            match.offset,
                            match.offset + match.length,
                          ]
                        )
                      );
                    }

                    return (
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faMapMarker}
                            className="mr-2"
                          />
                          {parts &&
                            parts.map((part, index) => (
                              <span
                                key={index}
                                style={{
                                  fontWeight: part.highlight ? 700 : 400,
                                  color: 'black',
                                  marginRight: '2px',
                                }}
                              >
                                {part.text}
                              </span>
                            ))}
                        </div>
                        <small>
                          {item.structured_formatting?.secondary_text}
                        </small>
                      </div>
                    );
                  }}
                />
                <div className="absolute right-8 top-0 h-full flex items-center pr-2">
                  {inputValue && (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-gray-400 cursor-pointer mr-2"
                      onClick={() => {
                        setInputValue('');
                        setSearch('');
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {googleMapsContext?.isLoaded && (
            <GoogleMap
              mapContainerStyle={{
                height: '100%',
                width: '100%',
                borderRadius: 10,
                marginBottom: '20px',
              }}
              id="google-map"
              zoom={14}
              center={center}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onClick={onClickGoogleMaps}
            >
              {path.length > 0 && (
                <Polygon
                  key={'google-map-polygon'}
                  editable
                  draggable
                  paths={path}
                  options={{
                    strokeColor: 'black',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#000000',
                    fillOpacity: 0.35,
                  }}
                  onMouseUp={onEdit}
                  onDragEnd={onEdit}
                  onLoad={onLoadPolygon}
                  onUnmount={onUnmount}
                />
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomGoogleMapsLocationZoneBounds;
