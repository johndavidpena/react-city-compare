import { apiKey } from '../api/openWeatherKey';

function getOpenWeatherUrl(position) {
  let protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  let url = `${protocol}://api.openweathermap.org/data/2.5/forecast?&lang=en&units=imperial&appid=${apiKey}&lat=${
    position.latitude
  }&lon=${position.longitude}`;

  return url;
}

export default getOpenWeatherUrl;
