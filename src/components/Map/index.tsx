import Loader from '../Loader';
import  { GoogleMap, useJsApiLoader, MarkerF,InfoWindowF } from '@react-google-maps/api';
import { bikeDelivery } from '../Assets';

const center = {
  lat: 37.566535,
  lng: 126.9779692,
};
const containerStyle = {
    width: '80%',
    height: '600px',
};
const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const GoogleMaps = () => {
  const  { isLoaded }  =  useJsApiLoader( { 
    id: 'google-map-script', 
    googleMapsApiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  })
  if(!isLoaded){
    return <Loader progress='지도를 로딩 중입니다.'/>
  }
  return (
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={{ styles: myStyles,disableDefaultUI: true}}
      >
        <MarkerF 
          key={1}
          position={{lat: 37.551111918342,lng: 126.84930138784 }}
          title='서울특별시 강서구'
          icon={{
            url: bikeDelivery,
            scaledSize: new window.google.maps.Size(64, 64),
          }}
        />
        <InfoWindowF
          position={{ lat: 37.563111918342, lng: 126.84930138784 }}
          options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
        >
          <div>
            <h1>서울특별시 강서구</h1>
          </div>
        </InfoWindowF>
      </GoogleMap>
  );
};

export default GoogleMaps;