import React, { Component } from 'react';
import './App.css';
import udacityLogo from './img/udacity-logo-svg-vector.svg'
import foursquareLogo from './img/Powered-by-Foursquare-300.png'

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
    zoom: 11,

    // an array for fetched schools list from the beginning
    schoolList: [],

    // parametres for info window to be displayed
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},

    // query result for search field
    query: '',
    // an array of searched result
    showingSchools: [],
    // the condition of opened sidebar
    sidebarOn: true,
    // all markers data
    markers: []
  }

  componentDidMount = () => {
    this.getSchools()
  }

  // fetch the list of drama schools and academies in London area via Foursquare API
  getSchools = () => {
    fetch('https://api.foursquare.com/v2/venues/search?near=London&query="drama school"+"drama academy"&category=4d4b7105d754a06372d81259+4bf58dd8d48988d199941735&limit=50&&intent=browse&client_id=4IDXHTW3JZM0BWQDVBZU2GB0N3ZZL5EBZ2TR5VV5Y3ZPNOKJ&client_secret=WVJNYT1DBFQE1EHJGMQKP1TFEVGHBSDOGPNCVTZNBEYHPJJ5&v=20180807&locale=en')
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

    this.setState({ schoolList, showingSchools: schoolList }) // two arrays have the same result
                                                              // but only one of them will be used
                                                              // for containing search result
    })
  }

  // display an info window;
  // credit: https://github.com/fullstackreact/google-maps-react
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
   }

  // passes an empty array all markers data
  setMarkers = (marker) => {
        
    if (marker !== null) {
      this.state.markers.push(marker)
    }
    
   // console.log(this.state.markers)
  }


  // when infowindow is closed following paramentres become empty again
  windowHasClosed = () => {
    this.setState({
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: false
    })
  }

// search for schools
  updateQuery = (query) => {
    this.setState({ query: query})
    this.updateList(query)
  }

  updateList = (query) => {
    let showingSchools
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingSchools = this.state.schoolList.filter((school) => match.test(school.name))
    } else {
      showingSchools = this.state.schoolList // if the search field is empty
                                             // an array will have result
                                             // of fetched schools list
    }

    this.setState({showingSchools, query})
  }

  // check the condition of menu -> if sidebarOn is true -> change it to false. Same othervise
  menuBunttonClicked = () => {
    this.state.sidebarOn === true ? this.setState({ sidebarOn: false }) : this.setState({ sidebarOn: true })
    // console.log(this.state.sidebarOn)
  }


  onSchoolClick = (school) => {
    //console.log(school.name)

    for (const marker of this.state.markers) {
      if (school.name == marker.marker.name) {
        new marker.props.google.maps.event.trigger( marker.marker, 'click') // custom event triggered
      }
    }
  }
    
  render() {
    return (
      <div className="App">

          <header>
              <h1><a href="/">London Drama Schools</a></h1>
          </header>

          <main className="maincontent">

            <aside className={this.state.sidebarOn === true? "sidebar" : "sidebar-move"}>
              <Search
              query={this.state.query}
              onChange={this.updateQuery}/>

              <List
              schools={this.state.showingSchools}
              query={this.state.query}
              onSchoolClick={this.onSchoolClick} // not working as it should
              />

              <footer className="footer">
                <img src={udacityLogo} alt="udacity logo"></img>
                <span> Neighborhood Map Project</span>
                <img src={foursquareLogo} alt="foursquare logo"></img>
              </footer>
            </aside>

            <TheMap
            center={this.state.center}
            zoom={this.state.zoom}
            schools={this.state.showingSchools}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            selectedPlace={this.state.selectedPlace}
            onMarkerClick={this.onMarkerClick}
            menuClicked={this.menuBunttonClicked}
            windowHasClosed={this.windowHasClosed}
            setMarkers={this.setMarkers}
            />
            
         </main>

          
      </div>
    );
  }
}

export default App;
