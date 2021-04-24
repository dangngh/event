import React, { Component } from 'react'
import './App.css';
import * as EventsAPI from './EventsAPI'
import reverse from 'reverse-geocode'
import EventsList from './EventsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  state = {
    events: [],
    geoLocation: '',
    isLocal: false
  }
  getLocalEvents = () => {
    EventsAPI.getLocalEvents(this.state.geoLocation)
      .then(events => this.setState({ events, isLocal: true }))
  }
  getGeolocation = () => {
    const success = (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      const location = reverse.lookup(latitude, longitude, 'ca').city
      this.setState({geoLocation: location})
    }
    const error = () => {
      throw error
    }
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  componentDidMount() {
    this.getGeolocation()
    EventsAPI.getEvents()
      .then(events => {
        this.setState({events})
      })
      .catch(error => {console.log(error)})
  }
  render() {
    return (
      <div className='page-container'>
        <div className='event-app'>
          <div className='app-header'>
            <h1>Where to?</h1>
            <button disabled={this.state.isLocal} onClick={this.getLocalEvents}>
              <FontAwesomeIcon icon={faCrosshairs}/>
            </button>
          </div>
          <EventsList events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;
