import document           from 'document';

import * as api           from '../../lib/fitbit-weather/app';
import * as colors        from '../../common/colors';
import * as settings      from '../settings';
import * as util          from '../../common/utils';

import { getWeatherIcon } from '../../common/icons';

import { onClickActivity,
         saveActivitySettings,
         switchToNextActivity,

       } from '../activityActions';

export const weather = {
    activity: 8,
    changeColor: function () {},

    changeFormat: function () {
      this.format = util.getNextFormat(this.format);
      saveActivitySettings(this);
      this.initialized = false;
    },

    icon: 'icons/weather/clearsky-day.png',
    iconFill: '#f1c40f',
    initActivity: undefined,
    initialized: false,
    name: 'weather',

    onClick: (activity) => { onClickActivity(activity); },

    switchToNext: function () {
      switchToNextActivity(this);
    },

    textFill: '#f1c40f',

    update: function ({ evt }) {
      const date = new Date(evt.date);

      if (this.initialized && date.getSeconds() % 60 !== 0) {
        return;
      }

      if (!this.initialized) { this.initialized = true; }

      const idSelector = 'metric' + this.metricNumber;

      const icon = document.getElementById(`metric${this.metricNumber}-img`);
      const metricElem = document.getElementById(idSelector);

      const imperialUnit = settings.getData('imperialUnit');
      const weatherRefreshTime = settings.getData('weatherRefreshTime');

      const refreshTime = weatherRefreshTime ?
            parseInt(weatherRefreshTime.values[0].name) : 60;

      // return the cached value if it is less than 60 minutes old by default
      api.fetch(weatherRefreshTime * 60 * 1000)
      .then(data => {
        const format = this.format;

        metricElem.text = `${getText({ data, format, imperialUnit })}`;

        updateIcon({ data, icon, metric: this });
        updateColor({ data, icon, metric: this, metricElem });
        adaptFontSize({ format, metricElem })

      })
      .catch(error => {
        metricElem.text = `error`;
        console.log(error)
      });
    }
  };

function adaptFontSize({ format, metricElem }) {
  if (metricElem.text.length > 6) {
    metricElem.style.fontSize = 20;
    return;
  }

  metricElem.style.fontSize = 50;
}

function getTemperature({ data, imperialUnit }) {
  return imperialUnit ?
    `${Math.floor(data.temperatureF)} °F` :
    `${Math.floor(data.temperatureC)} °C`;
}

function getText({ data, format, imperialUnit }) {
  switch (format) {
    case 'current':
      return getTemperature({ data, imperialUnit });
    case 'percentage':
      return data.description;
    default:
      return data.location;
  }
}

function updateIcon({ data, icon, metric }) {
  metric.icon = getWeatherIcon({ code: data.conditionCode, isDay: data.isDay });

  icon.href = metric.icon;
}

function updateColor({ data, icon, metric, metricElem }) {
  const color = colors.getWeatherColor({ code: data.conditionCode, isDay: data.isDay });

  metric.textFll = color;
  metric.iconFill = color;

  metricElem.style.fill = color;
  icon.style.fill = color;
}
