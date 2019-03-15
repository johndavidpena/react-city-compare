import React, { Component } from 'react';
import './City.scss';
import './Search.scss';
import axios from 'axios';
import getOpenWeatherUrl from '../../logic/getOpenWeatherUrl';
import parseCityData from '../../logic/parseCityData';
import handleFocus from '../../logic/handleFocus';
import { unsplashKey } from '../../api/unsplashKey';
import Unsplash from '../Unsplash/Unsplash';
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
        // console.log('[City] picsArray is ', picsArray);
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
            <div className="City__findSearch">
              <div className="City__find">
                <button className="City__find-button" onClick={this.findCurrentLocation}>
                  <svg
                    width="36px"
                    height="36px"
                    viewBox="0 0 36 36"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>findIcon</title>
                    <g
                      id="location-36"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Group"
                        transform="translate(3.000000, 2.500000)"
                        stroke="#282C34"
                        stroke-width="2"
                      >
                        <circle id="Oval" fill="#FEF73B" cx="15" cy="15.5" r="10" />
                        <path d="M15,0 L15,4" id="Line-2" stroke-linecap="square" />
                        <path d="M15,27 L15,31" id="Line-2-Copy" stroke-linecap="square" />
                        <path d="M26,15 L30,15" id="Line-2-Copy-2" stroke-linecap="square" />
                        <path d="M0,15 L4,15" id="Line-2-Copy-3" stroke-linecap="square" />
                      </g>
                    </g>
                  </svg>
                </button>
                <span>Use My Location</span>
              </div>

              <div className="City__search">
                <button type="submit" onClick={this.searchHandler}>
                  <svg
                    id="searchSVG"
                    width="30px"
                    height="31px"
                    viewBox="0 0 30 31"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>searchIcon</title>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                        id="search-36"
                        transform="translate(-4.000000, -3.000000)"
                        stroke="#282C34"
                      >
                        <g id="Group" transform="translate(5.000000, 4.000000)">
                          <circle id="Oval" strokeWidth="2" fill="#FEF73B" cx="8" cy="8" r="8" />
                          <path
                            d="M13.8873291,14.8873291 L26,27"
                            id="Line"
                            strokeWidth="3"
                            strokeLinecap="square"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
                <input
                  id="searchInput"
                  placeholder="Enter city here"
                  type="text"
                  // ! Change below to onSubmit or similar to lessen API calls
                  onChange={this.searchHandler}
                  onFocus={handleFocus}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="City__wrapper">
            <div className="City__findSearch">
              <div className="City__find">
                <button className="City__find-button" onClick={this.findCurrentLocation}>
                  <svg
                    width="36px"
                    height="36px"
                    viewBox="0 0 36 36"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>findIcon</title>
                    <g
                      id="location-36"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Group"
                        transform="translate(3.000000, 2.500000)"
                        stroke="#282C34"
                        stroke-width="2"
                      >
                        <circle id="Oval" fill="#FEF73B" cx="15" cy="15.5" r="10" />
                        <path d="M15,0 L15,4" id="Line-2" stroke-linecap="square" />
                        <path d="M15,27 L15,31" id="Line-2-Copy" stroke-linecap="square" />
                        <path d="M26,15 L30,15" id="Line-2-Copy-2" stroke-linecap="square" />
                        <path d="M0,15 L4,15" id="Line-2-Copy-3" stroke-linecap="square" />
                      </g>
                    </g>
                  </svg>
                </button>
                <span>Use My Location</span>
              </div>

              <div className="City__search">
                <button type="submit" onClick={this.searchHandler}>
                  <svg
                    width="30px"
                    height="31px"
                    viewBox="0 0 30 31"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>searchIcon</title>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                        id="search-36"
                        transform="translate(-4.000000, -3.000000)"
                        stroke="#282C34"
                      >
                        <g id="Group" transform="translate(5.000000, 4.000000)">
                          <circle id="Oval" strokeWidth="2" fill="#FEF73B" cx="8" cy="8" r="8" />
                          <path
                            d="M13.8873291,14.8873291 L26,27"
                            id="Line"
                            strokeWidth="3"
                            strokeLinecap="square"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
                <input
                  id="searchInput"
                  placeholder="Enter city here"
                  type="text"
                  // ! Change below to onSubmit or similar to lessen API calls
                  onChange={this.searchHandler}
                  onFocus={handleFocus}
                />
              </div>
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
                <span>&nbsp;</span>
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
