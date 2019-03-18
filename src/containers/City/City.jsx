import React, { Component } from 'react';
import './City.scss';
import './Search.scss';
import axios from 'axios';
import getOpenWeatherUrl from '../../logic/getOpenWeatherUrl';
import parseCityData from '../../logic/parseCityData';
import handleFocus from '../../logic/handleFocus';
import { unsplashKey } from '../../api/unsplashKey';
import Unsplash from '../Unsplash/UnsplashOriginal';
import Weather from '../../components/Weather/Weather';

class City extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: props.key,
      // loading: false,
      error: null,
      cityName: null,
      population: null,
      weatherStatusDescription: null,
      weatherId: null,
      weatherDate: null,
      weatherTemp: null,
      weatherHumidity: null,
      weatherWindSpeed: null,
      weatherWindDirection: null,
      unsplashPics: null
    };
  }

  renderLoading() {
    return <div className="City__loading">Loading...</div>;
  }

  renderPicsLoading() {
    return <div className="City__loading">Loading pics..</div>;
  }

  getUnsplashPics(cityName) {
    // console.log(cityName);

    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${cityName}&per_page=50&client_id=${unsplashKey}`
      )
      .then(res => {
        console.log('[City] getUnsplashPics(), res is ', res);
        if (res.data.total === 0) {
          console.log('[City] getUnsplashPics() did not find any results for that location');
          return;
        }
        let picsArray = [...res.data.results];
        console.log('[City] picsArray is ', picsArray);
        this.setState({
          unsplashPics: picsArray
        });
      })
      .catch(err => {
        this.setState({
          // loading: false,
          error: 'Error from getUnsplashPics ',
          err
        });
      });
  }

  getCityInfo(url) {
    axios
      .get(url)
      .then(res => {
        let parsedCityData = parseCityData(res);

        this.setState({
          // loading: false,
          cityName: parsedCityData.cityName,
          population: parsedCityData.population,
          weatherStatusDescription: parsedCityData.weatherStatusDescription,
          weatherId: parsedCityData.weatherId,
          weatherDate: parsedCityData.weatherDate,
          weatherTemp: parsedCityData.weatherTemp,
          weatherHumidity: parsedCityData.weatherHumidity,
          weatherWindSpeed: parsedCityData.weatherWindSpeed,
          weatherWindDirection: parsedCityData.weatherWindDirection
        });
      })
      .then(() => {
        console.log(this.state.cityName);
        this.getUnsplashPics(this.state.cityName);
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: 'Error from getCityInfo',
          err
        });
      });
  }

  findCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        let openWeatherUrl = getOpenWeatherUrl(position.coords);
        this.getCityInfo(openWeatherUrl);
      });
    } else {
      this.setState({
        error: 'Error in [City.jsx] at findCurrentLocation - geolocation not found.'
      });
    }
  };

  // ? Need to use ref????
  searchHandler = () => {
    let input = document.getElementById('searchInput');
    let autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ['(cities)']
    });
    window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
      let place = autocomplete.getPlace();

      // let city = place.name; // Dont need really
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      // console.log('[City] searchHandler...', lat, lng);

      let position = {
        latitude: lat,
        longitude: lng
      };
      let openWeatherUrl = getOpenWeatherUrl(position);

      this.getCityInfo(openWeatherUrl);
    });
  };

  render() {
    return (
      <section className="City">
        {!this.state.cityName ? (
          <div className="City__wrapper">
            <div className="City__doubleButton">
              <button onClick={this.findCurrentLocation}>Current Location</button>
              <span className="or">or</span>
              <input
                id="searchInput"
                placeholder="Enter city"
                type="text"
                onChange={this.searchHandler}
                onFocus={handleFocus}
              />
            </div>
          </div>
        ) : (
          <div className="City__wrapper">
            <div className="City__doubleButton">
              <button onClick={this.findCurrentLocation}>Current Location</button>
              <span className="or">or</span>
              <input
                id="searchInput"
                placeholder="Enter city"
                type="text"
                onChange={this.searchHandler}
                onFocus={handleFocus}
              />
            </div>

            <div className="City__display">
              <div className="City__display-info">
                <p>
                  {this.state.cityName}, population of {this.state.population}
                </p>
              </div>

              <Weather
                key="weather"
                cityName={this.state.cityName}
                weatherStatusDescription={this.state.weatherStatusDescription}
                weatherId={this.state.weatherId}
                weatherDate={this.state.weatherDate}
                weatherTemp={this.state.weatherTemp}
                weatherMin={this.state.weatherMin}
                weatherMax={this.state.weatherMax}
                weatherHumidity={this.state.weatherHumidity}
                weatherWindSpeed={this.state.weatherWindSpeed}
                weatherWindDirection={this.state.weatherWindDirection}
              />

              {!this.state.unsplashPics ? (
                <div className="City__display-noImages">
                  <p>No images found for location</p>
                </div>
              ) : (
                <Unsplash key="unsplash" pics={this.state.unsplashPics} />
              )}
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default City;
