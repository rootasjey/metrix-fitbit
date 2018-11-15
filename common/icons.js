import { Conditions } from '../lib/fitbit-weather/common';

export function getWeatherIcon({ code, isDay }) {
  const period = isDay ? 'day' : 'night';

  switch (code) {
    case Conditions.ClearSky:
      return `icons/weather/clearsky-${period}.png`;
    case Conditions.FewClouds:
      return `icons/weather/fewclouds-${period}.png`;
    case Conditions.ScatteredClouds:
      return `icons/weather/scatteredclouds-${period}.png`;
    case Conditions.BrokenClouds:
      return `icons/weather/brokenclouds-${period}.png`;
    case Conditions.ShowerRain:
      return 'icons/weather/showerrain.png';
    case Conditions.Rain:
      return 'icons/weather/rain.png';
    case Conditions.Thunderstorm:
      return 'icons/weather/thunderstorm.png';
    case Conditions.Snow:
      return 'icons/weather/snow.png';
    case Conditions.Mist:
      return 'icons/weather/mist.png';
    case Conditions.Unknown:
      return 'icons/weather/clearsky-day.png';
    default:
      return 'icons/weather/clearsky-day.png'
  }
}
