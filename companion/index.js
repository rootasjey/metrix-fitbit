// Import the Companion module
import { me }               from 'companion';
import { settingsStorage }  from 'settings';
import * as messaging       from 'messaging';

import * as weather         from '../lib/fitbit-weather/companion';

const KEYS_SETTINGS = [
  'backgroundColor',
  'distanceImperialUnit',
  'imperialUnit',
  'manualLocation',
  'weatherRefreshTime',
];

// SETTINGS
// --------
if (me.launchReasons.settingsChanged) {
  // The companion was started due to application settings changes
  KEYS_SETTINGS
    .map((key) => sendValue(key, settingsStorage.getItem(key)));
}

// Event fires when a setting is changed
settingsStorage.onchange = function(evt) {
  sendValue(evt.key, evt.newValue);

  if (evt.key === 'updateManualLocation') {
    handleCustomLocation();
  }
}

function getSavedLocationValue(key = '') {
  return settingsStorage.getItem(key) ?
    JSON.parse(settingsStorage.getItem(key)).name : '';
}

function handleCustomLocation() {
  settingsStorage.setItem('weatherNotification', 'Fetching location...');

  const addressLine   = getSavedLocationValue('addressLine');
  const adminDistrict = getSavedLocationValue('adminDistrict');
  const countryRegion = getSavedLocationValue('countryRegion');
  const postalCode    = getSavedLocationValue('postalCode');

  const locationData = {
    addressLine,
    adminDistrict,
    countryRegion,
    postalCode,
  };

  weather.findLocationByAddress(locationData)
    .then((result) => {
      if (result.error) {
        settingsStorage.setItem('weatherNotification', result.message);
        return;
      }

      settingsStorage.setItem('lat', result.lat);
      settingsStorage.setItem('lon', result.lon);

      settingsStorage.setItem('weatherNotification', 'Location found');
    })
    .catch(() => {
      settingsStorage.setItem('weatherNotification', 'Location not found :(');
    });
}

function sendValue(key, val) {
  if (val) {
    let computedVal;

    try { computedVal = JSON.parse(val); }
    catch { computedVal = val; }

    sendSettingData({
      key: key,
      value: computedVal,
    });
  }
}

function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
    return;
  }

  console.log("No peerSocket connection");
}

// WEATHER
// -------
weather.setup({
  apiKey: '57281e87e833689d3150c587198f04c6',
  bingMapKey: 'As2xOFxZwP4XEckfO5XKZ5u5qJHdD3QXUkq429Cs75Hect8Ksw3j35tN1CPshina',
  provider : weather.Providers.darksky,
});
