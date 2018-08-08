import React, { Component } from 'react';

// credit: https://github.com/fullstackreact/google-maps-react
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class TheMap extends Component {

	render() {
    const {schools, center, zoom, marker, visible, selectedPlace, onMarkerClick, google, windowHasClosed, menuClicked, setMarkers} = this.props
		return(
			<section className="map-container">
        <div className="map" aria-label="" role="application">
        <button
        className="menu"
        onClick={menuClicked}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        <Map
        google={google}
        zoom={zoom}
        initialCenter={center}
        >
        {schools.map((school) => (
            <Marker
            key={school.id}
            onClick={onMarkerClick}
            name={school.name}
            position={{ lat: school.location.lat, lng: school.location.lng}}
            address={school.location.address}
            city={school.location.city}
            country={school.location.country}
            state={school.location.state}
            animation={(selectedPlace.name === school.name) && google.maps.Animation.Fo}
            ref={setMarkers} //passes marker data to App.js credit: https://reactjs.org/docs/refs-and-the-dom.html
            />
          ))}

        <InfoWindow
        marker={marker}
        visible={visible}
        onClose={windowHasClosed}
        >
          <div className="info-window">
            <h2>{selectedPlace.name}</h2>
            <div>
              <span>{selectedPlace.address}</span>
              <span>{selectedPlace.city}</span>
              <span>{selectedPlace.state}</span>
              <span>{selectedPlace.country}</span>
            </div>
          </div>
        </InfoWindow>

        </Map>
        </div>
      </section>

		);
	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCY_Mu1Bns8Sdm-556Z60n7zzTlkp1hLvM'
})(TheMap);