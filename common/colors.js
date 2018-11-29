import { Conditions } from '../lib/fitbit-weather/common';

export function getNextColor(color) {
  switch (color) {
    case '#1abc9c':
      return '#16a085';
    case '#16a085':
      return '#2ecc71';
    case '#2ecc71':
      return '#27ae60';
    case '#27ae60':
      return '#3498db';
    case '#3498db':
      return '#2980b9';
    case '#2980b9':
      return '#9b59b6';
    case '#9b59b6':
      return '#8e44ad';
    case '#8e44ad':
      return '#34495e';
    case '#34495e':
      return '#2c3e50';
    case '#2c3e50':
      return '#f1c40f';
    case '#f1c40f':
      return '#f39c12';
    case '#f39c12':
      return '#e67e22';
    case '#e67e22':
      return '#d35400';
    case '#d35400':
      return '#e74c3c';
    case '#e74c3c':
      return '#c0392b';
    case '#c0392b':
      return '#ecf0f1';
    case '#ecf0f1':
      return '#bdc3c7';
    case '#bdc3c7':
      return '#95a5a6';
    case '#95a5a6':
      return '#7f8c8d';
    case '#7f8c8d':
      return undefined;
    default:
      return '#1abc9c';
  }
}

export function getWeatherColor({ code, isDay }) {
  switch (code) {
    case Conditions.ClearSky:
      return isDay ? '#f1c40f' : '#2ecc71';
    case Conditions.FewClouds:
      return isDay ? '#d35400' : '#686de0';
    case Conditions.ScatteredClouds:
      return isDay ? '#bdc3c7' : '#54a0ff';
    case Conditions.BrokenClouds:
      return isDay ? '#7f8c8d' : '#2e86de';
    case Conditions.ShowerRain:
      return isDay ? '#6ab04c' : '#009432';
    case Conditions.Rain:
      return isDay ? '#2980b9' : '#0abde3';
    case Conditions.Thunderstorm:
      return '#c0392b';
    case Conditions.Snow:
      return '#f5f6fa';
    case Conditions.Mist:
      return '#dfe4ea';
    case Conditions.Unknown:
      return '#8c7ae6';
    default:
      return '#8c7ae6';
  }
}
