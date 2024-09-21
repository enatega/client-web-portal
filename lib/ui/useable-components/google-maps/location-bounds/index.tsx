'use client';

// Core imports
import {
  ApolloCache,
  ApolloError,
  useMutation,
  useQuery,
} from '@apollo/client';
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
  UPDATE_DELIVERY_BOUNDS_AND_LOCATION,
} from '@/lib/api/graphql';

// Context
import { RestaurantsContext } from '@/lib/context/restaurants.context';

// Interfaces
import {
  ICustomGoogleMapsLocationBoundsComponentProps,
  ILocationPoint,
  IPlaceSelectedOption,
  IRestaurantDeliveryZoneInfo,
  IRestaurantProfile,
  IRestaurantProfileResponse,
  IRestaurantsContextPropData,
  IUpdateRestaurantDeliveryZoneVariables,
} from '@/lib/utils/interfaces';

// Utilities
import { transformPath, transformPolygon } from '@/lib/utils/methods';

// Third-party libraries
import {
  faChevronDown,
  faMapMarker,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'autosuggest-highlight/parse';
import { AutoComplete, AutoCompleteSelectEvent } from 'primereact/autocomplete';

// Components
import { ToastContext } from '@/lib/context/toast.context';
import { Circle, GoogleMap, Marker, Polygon } from '@react-google-maps/api';
import CustomButton from '../../button';
import CustomRadiusInputField from '../../custom-radius-input';
import CustomShape from './shapes';

const autocompleteService: {
  current: google.maps.places.AutocompleteService | null;
} = { current: null };

const CustomGoogleMapsLocationBounds: React.FC<
  ICustomGoogleMapsLocationBoundsComponentProps
> = ({ onStepChange }) => {
  // Context
  const {
    restaurantsContextData,
    onSetRestaurantsContextData,
    onRestaurantsFormVisible,
  } = useContext(RestaurantsContext);
  const { showToast } = useContext(ToastContext);

  //Hooks
  // const { getCurrentLocation } = useLocation();

  const [deliveryZoneType, setDeliveryZoneType] = useState('radius');
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
  // const [isLoading, setLoading] = useState(false);

  // Auto complete
  const [options, setOptions] = useState<IPlaceSelectedOption[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedPlaceObject, setSelectedPlaceObject] =
    useState<IPlaceSelectedOption | null>(null);

  const [search, setSearch] = useState<string>('');

  // Ref
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const listenersRef = useRef<google.maps.MapsEventListener[]>([]);

  // API
  const { loading: isFetchingRestaurantProfile } = useQuery(
    GET_RESTAURANT_PROFILE,
    {
      variables: { id: restaurantsContextData?.restaurant?._id?.code ?? '' },
      fetchPolicy: 'network-only',
      skip: !restaurantsContextData?.restaurant?._id?.code,
      onCompleted: onRestaurantProfileFetchCompleted,
      onError: onErrorFetchRestaurantProfile,
    }
  );

  const { loading: isFetchingRestaurantDeliveryZoneInfo } = useQuery(
    GET_RESTAURANT_DELIVERY_ZONE_INFO,
    {
      variables: { id: restaurantsContextData?.restaurant?._id?.code ?? '' },
      fetchPolicy: 'network-only',
      skip: !restaurantsContextData?.restaurant?._id?.code,
      onCompleted: onRestaurantZoneInfoFetchCompleted,
      onError: onErrorFetchRestaurantZoneInfo,
    }
  );

  const [updateRestaurantDeliveryZone, { loading: isSubmitting }] = useMutation(
    UPDATE_DELIVERY_BOUNDS_AND_LOCATION,
    {
      update: (cache, { data }) => {
        if (data) {
          updateCache(cache, { data } as IRestaurantProfileResponse);
        }
      },

      onCompleted: onRestaurantZoneUpdateCompleted,
      onError: onErrorLocationZoneUpdate,
    }
  );

  // Memos
  const radiusInMeter = useMemo(() => {
    return distance * 1000;
  }, [distance]);

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService?.current?.getPlacePredictions(request, callback);
      }, 1500),
    []
  );

  // API Handlers
  function updateCache(
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
  }

  // Profile Error
  function onErrorFetchRestaurantProfile({
    graphQLErrors,
    networkError,
  }: ApolloError) {
    showToast({
      type: 'error',
      title: 'Restaurant Profile',
      message:
        graphQLErrors[0].message ??
        networkError?.message ??
        'Restaurant Profile Fetch Failed',
      duration: 2500,
    });
  }

  // Restaurant Profile Complete
  function onRestaurantProfileFetchCompleted({
    restaurant,
  }: {
    restaurant: IRestaurantProfile;
  }) {
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

  // Restaurant Zone Info Error
  function onErrorFetchRestaurantZoneInfo({
    graphQLErrors,
    networkError,
  }: ApolloError) {
    showToast({
      type: 'error',
      title: 'Restaurant Location & Zone',
      message:
        graphQLErrors[0].message ??
        networkError?.message ??
        'Restaurant Location & Zone fetch failed',
      duration: 2500,
    });
  }
  // Restaurant Zone Info Complete
  function onRestaurantZoneInfoFetchCompleted({
    getRestaurantDeliveryZoneInfo,
  }: {
    getRestaurantDeliveryZoneInfo: IRestaurantDeliveryZoneInfo;
  }) {
    const {
      address,
      deliveryBounds: polygonBounds,
      circleBounds,
      location,
      boundType,
    } = getRestaurantDeliveryZoneInfo;

    const coordinates = {
      lng: location.coordinates[0],
      lat: location.coordinates[1],
    };

    setCenter(coordinates);
    setMarker(coordinates);
    setInputValue(address);

    if (boundType) setDeliveryZoneType(boundType);
    if (circleBounds?.radius) setDistance(circleBounds?.radius);

    setPath(
      polygonBounds?.coordinates[0].map((coordinate: number[]) => {
        return { lat: coordinate[1], lng: coordinate[0] };
      }) || []
    );
  }

  // Zone Update Error
  function onErrorLocationZoneUpdate({
    graphQLErrors,
    networkError,
  }: ApolloError) {
    showToast({
      type: 'error',
      title: 'Restaurant Location & Zone',
      message:
        graphQLErrors[0].message ??
        networkError?.message ??
        'Restaurant Location & Zone update failed',
      duration: 2500,
    });
  }

  // Zone Update Complete
  function onRestaurantZoneUpdateCompleted({
    restaurant,
  }: {
    restaurant: IRestaurantProfile;
  }) {
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

    showToast({
      type: 'success',
      title: 'Zone Update',
      message: 'Restaurant Zone has been updated successfully.',
    });

    onStepChange(0);
    onSetRestaurantsContextData({} as IRestaurantsContextPropData);
    onRestaurantsFormVisible(false);
  }

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
              ...restaurantsContextData?.restaurant,
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

          setInputValue(selectedOption.description);
        }
      });
      setSelectedPlaceObject(selectedOption);
    }
  };

  /*
  const locationCallback = (error: string | null, data?: ILocation) => {
    setLoading(false);
    if (error) {
      showToast({
        type: 'error',
        title: 'Current Location',
        message: 'Current location fetch failed.',
      });
      return;
    }

    setCenter({
      lat: data?.latitude ?? 0,
      lng: data?.longitude ?? 0,
    });
    setMarker({
      lat: data?.latitude ?? 0,
      lng: data?.longitude ?? 0,
    });

    setInputValue(data?.deliveryAddress ?? '');
    setSearch(data?.deliveryAddress ?? '');
    onSetRestaurantsContextData({
      ...restaurantsContextData,
      restaurant: {
        _id: restaurantsContextData?.restaurant?._id ?? null,
        autoCompleteAddress: data?.deliveryAddress,
      },
    });
  };

   const handleLocationButtonClick = () => {
    setLoading(true);
    getCurrentLocation(locationCallback);
  };
 */
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

  function getPolygonPath(
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

  const handleDistanceChange = (val: number) => {
    const newDistance = val || 0;
    setDistance(newDistance);
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
      setMarker(newCenter);
    }
  }, [setPath, setCenter, setMarker]);

  const onLoadPolygon = useCallback(
    (polygon: google.maps.Polygon) => {
      if (!polygon) return;

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

  // Submit Handler
  const onLocationSubmitHandler = () => {
    if (!restaurantsContextData?.restaurant?._id?.code) {
      showToast({
        type: 'error',
        title: 'Location & Zone',
        message: 'No restaurnat is selected',
      });

      return;
    }

    const location = {
      latitude: marker.lat,
      longitude: marker.lng,
    };

    let bounds = transformPath(path);
    if (deliveryZoneType === 'radius') {
      bounds = getPolygonPath(center, radiusInMeter);
    }

    let variables: IUpdateRestaurantDeliveryZoneVariables = {
      id: restaurantsContextData?.restaurant?._id?.code ?? '',
      location,
      boundType: deliveryZoneType,
      address: restaurantsContextData?.restaurant?.autoCompleteAddress,
      bounds: [[[]]],
    };

    variables = {
      ...variables,
      bounds,
      circleBounds: {
        radius: distance, // Convert kilometers to meters
      },
    };

    updateRestaurantDeliveryZone({ variables: variables });
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

    if (search === '') {
      setOptions(selectedPlaceObject ? [selectedPlaceObject] : []);
      return undefined;
    }

    fetch({ input: search }, (results: IPlaceSelectedOption[]) => {
      if (active) {
        let newOptions: IPlaceSelectedOption[] = [];
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
  }, [selectedPlaceObject, search, fetch]);

  return (
    <div>
      <div className="overflow-hidden relative">
        <div className="w-full h-[600px] object-cover">
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className={`w-full flex flex-col justify-center gap-y-1 p-2`}>
              <div className="relative">
                <AutoComplete
                  id="google-map"
                  disabled={
                    isFetchingRestaurantDeliveryZoneInfo ||
                    isFetchingRestaurantProfile
                  }
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
                  {/*  <FontAwesomeIcon
                    icon={faLocationCrosshairs}
                    className="text-gray-400 cursor-pointer"
                    onClick={handleLocationButtonClick}
                  /> */}
                </div>
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
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
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

      {deliveryZoneType === 'radius' && (
        <div className="w-[8rem] mt-2">
          <CustomRadiusInputField
            type="number"
            name="radius"
            placeholder="Radius"
            maxLength={35}
            min={0}
            max={100}
            value={distance}
            onChange={handleDistanceChange}
            showLabel={true}
            loading={false}
          />
        </div>
      )}

      <CustomShape
        selected={deliveryZoneType}
        onClick={(val: string) => {
          if (val === 'polygon')
            setPath(getPolygonPathFromCircle(center, radiusInMeter));
          setDeliveryZoneType(val);
        }}
      />

      <div className="flex justify-end mt-4">
        <CustomButton
          className="w-fit h-10 bg-black text-white border-gray-300 px-8"
          label="Save"
          type="submit"
          loading={isSubmitting}
          onClick={onLocationSubmitHandler}
        />
      </div>
    </div>
  );
};

export default CustomGoogleMapsLocationBounds;
