function parseCityData(res) {
  let round = n => Math.round(n);

  let convert = t => {
    let date = new Date(t);
    return {
      date: date.getUTCDate(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear()
    };
  };

  let getDate = data => {
    let dateNumber = data * 1000;
    let formattedDate = convert(dateNumber);

    function convertMonth(monthNum) {
      let monthName = null;
      // eslint-disable-next-line
      switch (monthNum) {
        case 0:
          monthName = 'January';
          break;
        case 1:
          monthName = 'February';
          break;
        case 2:
          monthName = 'March';
          break;
        case 3:
          monthName = 'April';
          break;
        case 4:
          monthName = 'May';
          break;
        case 5:
          monthName = 'June';
          break;
        case 6:
          monthName = 'July';
          break;
        case 7:
          monthName = 'August';
          break;
        case 8:
          monthName = 'September';
          break;
        case 9:
          monthName = 'October';
          break;
        case 10:
          monthName = 'November';
          break;
        case 11:
          monthName = 'December';
          break;
      }
      return monthName;
    }

    let month = convertMonth(formattedDate.month);

    let dateString = `${month} ${formattedDate.date}, ${formattedDate.year}`;
    return dateString;
  };

  let getWindDirection = data => {
    let windDirection = null;
    let windDegrees = data;

    switch (windDegrees) {
      case 0:
      case 360:
        windDirection = 'up';
        break;
      case 90:
        windDirection = 'left';
        break;
      case 180:
        windDirection = 'down';
        break;
      case 270:
        windDirection = 'left';
        break;
      default:
        if (windDegrees > 0 && windDegrees < 90) windDirection = 'up-right';
        if (windDegrees > 90 && windDegrees < 180) windDirection = 'down-right';
        if (windDegrees > 180 && windDegrees < 270) windDirection = 'down-left';
        if (windDegrees > 270 && windDegrees < 360) windDirection = 'up-left';
    }

    return windDirection;
  };

  let parsedCityData = {
    cityName: res.data.city.name,
    population: res.data.city.population,
    weatherStatusDescription: res.data.list[0].weather[0].description,
    weatherId: res.data.list[0].weather[0].id,
    weatherDate: getDate(res.data.list[0].dt),
    weatherTemp: round(res.data.list[0].main.temp),
    weatherHumidity: round(res.data.list[0].main.humidity),
    weatherWindSpeed: res.data.list[0].wind.speed,
    weatherWindDirection: getWindDirection(res.data.list[0].wind.deg)
  };

  // console.log('[parseCityData] parsedCityData ', parsedCityData);

  return parsedCityData;
}

export default parseCityData;
