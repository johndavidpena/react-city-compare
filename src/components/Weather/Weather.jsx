import React from 'react';
import './Weather.scss';

const Weather = props => {
  return (
    <div className="Weather">
      <div className="Weather__temperatures">
        <p>Current: {props.weatherTemp}&#176;</p>
        <p>Low: {props.weatherTemp}&#176;</p>
        <p>High: {props.weatherTemp}&#176;</p>
      </div>

      <div className="Weather__description">
        <span className="icon">
          <i className={`wi wi-owm-${props.weatherId}`} />
        </span>

        <p>{props.weatherStatusDescription}</p>
      </div>

      <div className="Weather__misc">
        <p>Humidity: {props.weatherHumidity}%</p>

        <p>Wind Speed: {props.weatherWindSpeed} mph</p>

        <p>Wind Direction: </p>
        <span className="icon">
          <i className={`wi wi-direction-${props.weatherWindDirection}`} />
        </span>
      </div>
    </div>
  );
};

export default Weather;
