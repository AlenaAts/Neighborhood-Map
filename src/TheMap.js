import React, { Component } from 'react';

// credit: https://github.com/fullstackreact/google-maps-react
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class TheMap extends Component {

  


	render() {
    const {schools, center, zoom, marker, visible, selectedPlace, onMarkerClick} = this.props

		return(
			<section className="map-container">
        <div className="map" aria-label="" role="application">
        <button className="menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        <Map
        google={this.props.google}
        zoom={zoom}
        initialCenter={center}
        >
        {schools.map((school) => (
            <Marker
            key={school.id}
            onClick={onMarkerClick}
            name={school.name}
            position={{ lat: school.location.lat, lng: school.location.lng}}
            address={school.location.formattedAddress}
            />
          ))}

        <InfoWindow
        marker={marker}
        visible={visible}
        onClose={this.onInfoWindowClose}>
          <div className="info-window">
            <h2>{selectedPlace.name}</h2>
            <div>
              <span>{selectedPlace.address}</span>
              <span>{selectedPlace.address}</span>
              <span>{selectedPlace.address}</span>
              <span>{selectedPlace.address}</span>
              <span>{selectedPlace.address}</span>
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