import React from 'react';
import './Weather.scss';

const Weather = props => {
  return (
    <div className="Weather">
      <div className="Weather__description">
        <p>{props.weatherTemp}&#176;</p>

        <span className="icon">
          <i className={`wi wi-owm-${props.weatherId}`} />
        </span>

        <p>{props.weatherStatusDescription}</p>
      </div>

      <div className="Weather__misc">
        <p>Humidity: {props.weatherHumidity}%</p>

        <span className="icon">
          <i className={`wi wi-direction-${props.weatherWindDirection}`} />
        </span>

        <p>Wind: {props.weatherWindSpeed} mph</p>
      </div>
    </div>
  );
};

export default Weather;
