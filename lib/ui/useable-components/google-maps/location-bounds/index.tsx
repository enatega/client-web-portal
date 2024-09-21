/* global google */

// Core imports
import { useQuery } from '@apollo/client';
import { throttle } from 'lodash';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// API and GraphQL
import {
  GET_RESTAURANT_DELIVERY_ZONE_INFO,
  GET_RESTAURANT_PROFILE,
} from '@/lib/api/graphql';

// Context
import { RestaurantsContext } from '@/lib/context/restaurants.context';

// Interfaces
import {
  ILocationPoint,
  IRestaurantDeliveryZoneInfo,
  IRestaurantProfile,
} from '@/lib/utils/interfaces';

// Utilities
import { transformPolygon } from '@/lib/utils/methods';

// Third-party libraries
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Circle, GoogleMap, Marker, Polygon } from '@react-google-maps/api';
import parse from 'autosuggest-highlight/parse';
import { AutoComplete, AutoCompleteSelectEvent } from 'primereact/autocomplete';

// Components
import CustomShape from './shapes';

interface Option {
  place_id: string;
  description: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
  reference: string;
}
const autocompleteService: {
  current: google.maps.places.AutocompleteService | null;
} = { current: null };

const CustomGoogleMapsLocationBounds: React.FC = () => {
  // Context
  const { restaurantsContextData, onSetRestaurantsContextData } =
    useContext(RestaurantsContext);

  const [deliveryZoneType, setDeliveryZoneType] = React.useState('radius');
  const [, /* locationData */ setLocation] = useState({
    city: '',
    postCode: '',
    address: '',
  });
  const [center, setCenter] = useState({
    lat: 33.684422,
    lng: 73.047882,
  });
  const [marker, setMarker] = useState({
    lat: 33.684422,
    lng: 73.047882,
  });
  const [path, setPath] = useState([
    {
      lat: 33.6981335731709,
      lng: 73.036895671875,
    },
    {
      lat: 33.684779099960515,
      lng: 73.04650870898438,
    },
    {
      lat: 33.693206228391965,
      lng: 73.06461898425293,
    },
    {
      lat: 33.706880699271096,
      lng: 73.05410472491455,
    },
  ]);
  const [distance, setDistance] = useState(1);

  // Auto complete
  const [options, setOptions] = useState<Option[]>([]);
  // const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedPlaceObject, setSelectedPlaceObject] = useState<Option | null>(
    null
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    // setSearch(value);
    // setSearch(value);
  };

  const onHandlerAutoCompleteSelectionChange = (
    event: AutoCompleteSelectEvent
  ) => {
    const selectedOption = event?.value as Option;
    if (selectedOption) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ placeId: selectedOption.place_id }, (results) => {
        if (
          results &&
          results[0] &&
          results[0].geometry &&
          results[0].geometry.location
        ) {
          const location = results[0].geometry.location;

          onSetRestaurantsContextData({
            ...restaurantsContextData,
            restaurant: {
              _id: restaurantsContextData?.restaurant?._id ?? null,
              autoCompleteAddress: selectedOption.description,
            },
          });

          setCenter({
            lat: location.lat(),
            lng: location.lng(),
          });
          setMarker({
            lat: location.lat(),
            lng: location.lng(),
          });
        }
      });
      setSelectedPlaceObject(selectedOption);
    }
  };

  /* const getCurrentLocation = (callback: (location: Location) => void) => {
    // Implement getting current location logic here
  }; */

  // Refs

  const polygonRef = useRef();
  const listenersRef = useRef([]);

  // API
  const { loading: isFetchingRestaurantProfile } = useQuery(
    GET_RESTAURANT_PROFILE,
    {
      variables: { id: restaurantsContextData?.restaurant?._id?.code ?? '' },
      fetchPolicy: 'network-only',
      onCompleted,
      onError,
    }
  );

  const { loading: isFetchingRestaurantDeliveryZoneInfo } = useQuery(
    GET_RESTAURANT_DELIVERY_ZONE_INFO,
    {
      variables: { id: restaurantsContextData?.restaurant?._id?.code ?? '' },
      fetchPolicy: 'network-only',
      onCompleted: onRestaurantZoneDataCompleted,
    }
  );

  /*   const [mutate, { loading }] = useMutation(
    UPDATE_DELIVERY_BOUNDS_AND_LOCATION,
    {
      update: (cache, { data }) => {
        if (data) {
          updateCache(cache, { data } as IRestaurantProfileResponse);
        }
      },
      onError,
      onCompleted,
    }
  ); */

  // Memos
  const radiusInMeter = useMemo(() => {
    return distance * 1000;
  }, [distance]);

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        console.log('debounce at 300');
        autocompleteService?.current?.getPlacePredictions(request, callback);
      }, 300),
    []
  );

  // API Handlers
  /*  function updateCache(
    cache: ApolloCache<unknown>,
    { data }: IRestaurantProfileResponse
  ) {
    const cachedData: IRestaurantProfileResponse | null = cache.readQuery({
      query: GET_RESTAURANT_PROFILE,
      variables: { id: restaurantsContextData?.restaurant?._id?.code ?? '' },
    });
    cache.writeQuery({
      query: GET_RESTAURANT_PROFILE,
      variables: { id: restaurantsContextData?.restaurant?._id?.code ?? '' },
      data: {
        restaurant: {
          ...cachedData?.data?.restaurant,
          ...data?.restaurant,
        },
      },
    });
  } */

  function onCompleted({ restaurant }: { restaurant: IRestaurantProfile }) {
    if (restaurant) {
      setCenter({
        lat: +restaurant?.location?.coordinates[1],
        lng: +restaurant?.location?.coordinates[0],
      });
      setMarker({
        lat: +restaurant?.location?.coordinates[1],
        lng: +restaurant?.location?.coordinates[0],
      });
      setPath(
        restaurant?.deliveryBounds
          ? transformPolygon(restaurant?.deliveryBounds?.coordinates[0])
          : path
      );
    }
  }

  function onRestaurantZoneDataCompleted({
    getRestaurantDeliveryZoneInfo,
  }: {
    getRestaurantDeliveryZoneInfo: IRestaurantDeliveryZoneInfo;
  }) {
    const {
      address,
      city,
      postCode,
      deliveryBounds: polygonBounds,
      circleBounds,
      location,
      boundType,
    } = getRestaurantDeliveryZoneInfo;

    const coordinates = {
      lng: location.coordinates[0],
      lat: location.coordinates[1],
    };

    setLocation((prevLocation) => {
      return {
        ...prevLocation,
        city,
        address,
        postCode,
      };
    });

    setCenter(coordinates);
    setMarker(coordinates);
    setDeliveryZoneType(boundType);

    if (circleBounds?.radius) setDistance(circleBounds?.radius);

    setPath(
      polygonBounds?.coordinates[0].map((coordinate: number[]) => {
        return { lat: coordinate[1], lng: coordinate[0] };
      }) || []
    );
  }

  // Handlers

  /* const onLoad = (autocomplete: google.maps.places.Autocomplete | null) => {
    console.log({ autocomplete });
    setSearchResult(autocomplete);
  };
 */
  /*  const extractCityAndPostalCode = (
    place
  ): { city: string; postCode: string } => {
    const addressComponents = place.address_components;

    const cityComponent = addressComponents.find((component) =>
      component?.types?.includes('locality')
    );
    const postalCodeComponent = addressComponents.find((component) =>
      component?.types?.includes('postal_code')
    );

    const city: string = cityComponent ? cityComponent?.long_name : '';
    const postalCode: string = postalCodeComponent
      ? postalCodeComponent?.long_name
      : '';

    return { city, postCode: postalCode };
  }; */

  const getPolygonPathFromCircle = (center: ILocationPoint, radius: number) => {
    const points = 4;
    const angleStep = (2 * Math.PI) / points;
    const path = [];

    for (let i = 0; i < points; i++) {
      const angle = i * angleStep;
      const lat = center.lat + (radius / 111300) * Math.cos(angle);
      const lng =
        center.lng +
        (radius / (111300 * Math.cos(center.lat * (Math.PI / 180)))) *
          Math.sin(angle);
      path.push({ lat, lng });
    }

    return path;
  };

  /*   function getPolygonPath(
    center: ILocationPoint,
    radius: number,
    numPoints: number = 4
  ) {
    const path = [];
  

    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints;
      const lat = center.lat + (radius / 111320) * Math.cos(angle);
      const lng =
        center.lng +
        (radius / (111320 * Math.cos((center.lat * Math.PI) / 180))) *
          Math.sin(angle);
      path.push([lng, lat]);
    }

    path.push(path[0]);
    return [path];
  }
 */
  /*  const handleDistanceChange = (event) => {
    const newDistance = parseFloat(event.target.value) || 0;
    setDistance(newDistance);
  }; */

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
      setMarker(newCenter);
    }
  }, [setPath, setCenter, setMarker]);

  const onLoadPolygon = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener('set_at', onEdit),
        path.addListener('insert_at', onEdit),
        path.addListener('remove_at', onEdit)
      );
    },
    [onEdit]
  );

  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  const removeMarker = () => {
    setMarker(null);
  };

  function onError() {
    setTimeout(() => {}, 5000);
  }

  const onDragEnd = (mapMouseEvent: google.maps.MapMouseEvent) => {
    const newLatLng = {
      lat: mapMouseEvent?.latLng?.lat() ?? 0,
      lng: mapMouseEvent?.latLng?.lng() ?? 0,
    };

    setMarker(newLatLng);
    setCenter(newLatLng);

    // Update polygon when marker is dragged
    if (deliveryZoneType === 'polygon') {
      const newPath = getPolygonPathFromCircle(newLatLng, radiusInMeter);
      setPath(newPath);
    }
  };

  // Use Effects
  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(selectedPlaceObject ? [selectedPlaceObject] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results: Option[]) => {
      if (active) {
        let newOptions: Option[] = [];
        if (selectedPlaceObject) {
          newOptions = [selectedPlaceObject];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [selectedPlaceObject, inputValue, fetch]);

  return (
    <div>
      <div className="overflow-hidden relative">
        <div className="w-full h-[400px] object-cover">
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className={`w-full flex flex-col justify-center gap-y-1 p-2`}>
              <div className="relative">
                <AutoComplete
                  id="google-map"
                  disabled={
                    isFetchingRestaurantDeliveryZoneInfo ||
                    isFetchingRestaurantProfile
                  }
                  className={`w-full h-11 border px-2 text-sm border-gray-300 focus:outline-none focus:shadow-none pr-16`}
                  value={inputValue}
                  completeMethod={(event) => {
                    handleInputChange(event.query);
                  }}
                  onSelect={onHandlerAutoCompleteSelectionChange}
                  suggestions={options}
                  forceSelection={false}
                  dropdown={true}
                  multiple={false}
                  placeholder="Enter your full address"
                  style={{ width: '100%' }}
                  itemTemplate={(item) => {
                    const matches =
                      item.structured_formatting?.main_text_matched_substrings;
                    let parts = null;
                    if (matches) {
                      parts = parse(
                        item.structured_formatting.main_text,
                        matches.map((match) => [
                          match.offset,
                          match.offset + match.length,
                        ])
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
              </div>
            </div>
          </div>

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
          >
            <Polygon
              editable
              draggable
              visible={deliveryZoneType === 'polygon'}
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

            <Circle
              center={center}
              radius={radiusInMeter}
              visible={deliveryZoneType === 'radius'}
              options={{
                fillColor: 'black',
                fillOpacity: 0.2,
                strokeColor: 'black',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />

            {marker && (
              <Marker
                position={marker}
                draggable
                onRightClick={removeMarker}
                onDragEnd={onDragEnd}
              />
            )}
          </GoogleMap>
        </div>
      </div>

      <CustomShape
        selected={deliveryZoneType}
        onClick={(val: string) => {
          if (val === 'polygon')
            setPath(getPolygonPathFromCircle(center, radiusInMeter));
          setDeliveryZoneType(val);
        }}
      />
    </div>
  );
};

export default CustomGoogleMapsLocationBounds;
