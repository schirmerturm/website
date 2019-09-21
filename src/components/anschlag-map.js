import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import React from "react"

const Map = withScriptjs(
  withGoogleMap(({ lat, lon }) => (
    <GoogleMap defaultZoom={14} defaultCenter={{ lat: lat, lng: lon }}>
      <Marker position={{ lat: lat, lng: lon }} />
    </GoogleMap>
  ))
)

export default ({ lat, lon }) => (
  <Map
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: `100%`, backgroundColor: 'gray' }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    lat={lat}
    lon={lon}
  />
)
