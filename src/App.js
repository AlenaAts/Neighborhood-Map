import React, { Component } from 'react';
import './App.css';
import udacityLogo from './img/udacity-logo-svg-vector.svg'

// components
import TheMap from './TheMap'
import Search from './Search'
import List from './List'

// npm packages
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class App extends Component {
  state = {

    // parametres for map's default position
    center: {
          lat: 51.507363,
          lng: -0.128101
        },
    zoom: 13,

    // an array for fetched schools list
    schoolList: [],

    // parametres for info window to be displayed
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  componentDidMount() {
    this.getSchools()
  }

  // fetch the list of drama schools and academies in London area via Foursquare API
  getSchools() {
    fetch('https://api.foursquare.com/v2/venues/search?near=London&query=drama+school+academy&categoty=4d4b7105d754a06372d81259+4bf58dd8d48988d199941735&limit=50&&intent=browse&client_id=4IDXHTW3JZM0BWQDVBZU2GB0N3ZZL5EBZ2TR5VV5Y3ZPNOKJ&client_secret=WVJNYT1DBFQE1EHJGMQKP1TFEVGHBSDOGPNCVTZNBEYHPJJ5&v=20180804&locale=en')
    .then(school => school.json())
    .then(sch => {
      const schoolList = sch.response.venues
      if (schoolList.length === 0) {
        window.alert('Failed! No schools found')
      }
      schoolList.sort(sortBy('name'))
      schoolList.forEach((e) => {
        if (e.location.adress) {
          e.location.adress = "No adress available"
          e.location.formattedAdress.unshift("No adress available")
        }
      })

    this.setState({ schoolList })
    console.log(schoolList)
    })
  }

  // display an info window
  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }


  render() {
    return (
      <div className="App">

          <header>
              <h1><a href="/">London Drama Schools</a></h1>
          </header>

          <main className="maincontent">

            <aside className="sidebar">
              <Search />
              <List
              schools={this.state.schoolList}/>
            </aside>
            <TheMap
            center={this.state.center}
            zoom={this.state.zoom}
            schools={this.state.schoolList}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            selectedPlace={this.state.selectedPlace}
            onMarkerClick={this.onMarkerClick}
            />
             
         </main>

          <footer className="footer">
            <img className="logo" src={udacityLogo} alt="udacity logo"></img>
            <span> Neighborhood Map Project. Copyright (c) 2018</span>
          </footer>
      </div>
    );
  }
}

export default App;
