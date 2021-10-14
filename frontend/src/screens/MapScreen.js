import React, { useEffect, useRef, useState } from 'react';
import { LoadScript, GoogleMap, StandaloneSearchBox, Marker,} from '@react-google-maps/api';
import LoadingBox from '../components/LoadingBox';
import Axios from 'axios';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';
import { useDispatch } from 'react-redux';

const libs = ['places']; //57.Choose address on google map
const defaultLocation = { lat: 45.516, lng: -73.56 }; //57.Choose address on google map

export default function MapScreen(props) { //57.Choose address on google map
  const [googleApiKey, setGoogleApiKey] = useState(''); //57.Choose address on google map
  const [center, setCenter] = useState(defaultLocation); //57.Choose address on google map
  const [location, setLocation] = useState(center); //57.Choose address on google map

  const mapRef = useRef(null); //57.Choose address on google map
  const placeRef = useRef(null); //57.Choose address on google map
  const markerRef = useRef(null); //57.Choose address on google map

  useEffect(() => { //57.Choose address on google map
    const fetch = async () => { //57.Choose address on google map
      const { data } = await Axios('/api/config/google'); //57.Choose address on google map
      setGoogleApiKey(data); //57.Choose address on google map
      getUserCurrentLocation(); //57.Choose address on google map
    };
    fetch(); //57.Choose address on google map
  }, []); //57.Choose address on google map

  const onLoad = (map) => { //57.Choose address on google map
    mapRef.current = map; //57.Choose address on google map
  };

  const onMarkerLoad = (marker) => { //57.Choose address on google map
    markerRef.current = marker; //57.Choose address on google map
  };
  const onLoadPlaces = (place) => { //57.Choose address on google map
    placeRef.current = place; //57.Choose address on google map
  };
  const onIdle = () => { //57.Choose address on google map
    setLocation({
      lat: mapRef.current.center.lat(), //57.Choose address on google map
      lng: mapRef.current.center.lng(), //57.Choose address on google map
    });
  };
  const onPlacesChanged = () => { //57.Choose address on google map
    const place = placeRef.current.getPlaces()[0].geometry.location; //57.Choose address on google map
    setCenter({ lat: place.lat(), lng: place.lng() }); //57.Choose address on google map
    setLocation({ lat: place.lat(), lng: place.lng() }); //57.Choose address on google map
  };
  const dispatch = useDispatch(); //57.Choose address on google map
  const onConfirm = () => { //57.Choose address on google map
    const places = placeRef.current.getPlaces(); //57.Choose address on google map
    if (places && places.length === 1) { //57.Choose address on google map
      // dispatch select action
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM, //57.Choose address on google map
        payload: {
          lat: location.lat, //57.Choose address on google map
          lng: location.lng, //57.Choose address on google map
          address: places[0].formatted_address, //57.Choose address on google map
          name: places[0].name, //57.Choose address on google map
          vicinity: places[0].vicinity, //57.Choose address on google map
          googleAddressId: places[0].id, //57.Choose address on google map
        },
      });
      alert('location selected successfully.'); //57.Choose address on google map
      props.history.push('/shipping'); //57.Choose address on google map
    } else {
      alert('Please enter your address'); //57.Choose address on google map
    }
  };

  const getUserCurrentLocation = () => { //57.Choose address on google map
    if (!navigator.geolocation) { //57.Choose address on google map
      alert('Geolocation os not supported by this browser'); //57.Choose address on google map
    } else {
      navigator.geolocation.getCurrentPosition((position) => { //57.Choose address on google map
        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude,}); //57.Choose address on google map
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude,}); //57.Choose address on google map
      });
    }
  };

  return googleApiKey ? (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap id="smaple-map" mapContainerStyle={{ height: '100%', width: '100%' }} center={center} zoom={15} onLoad={onLoad} onIdle={onIdle}>
          <StandaloneSearchBox onLoad={onLoadPlaces} onPlacesChanged={onPlacesChanged}> 
            <div className="map-input-box">
              <input type="text" placeholder="Enter your address"></input>
              <button type="button" className="primary" onClick={onConfirm}>Confirm</button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox></LoadingBox>
  );
}