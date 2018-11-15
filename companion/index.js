// Import the Companion module
import { me } from "companion";
import { settingsStorage } from "settings";
import * as messaging from "messaging";

import * as weather from '../lib/fitbit-weather/companion';

const KEY_BG_COLOR = 'backgroundColor';
const KEY_TEMPERATURE_UNIT = 'imperialUnit';
const KEY_REFRESH_TIME = 'weatherRefreshTime';

const KEYS_SETTINGS = [
  KEY_BG_COLOR,
  KEY_TEMPERATURE_UNIT,
  KEY_REFRESH_TIME,
];

// SETTINGS
// --------
if (me.launchReasons.settingsChanged) {
  // The companion was started due to application settings changes
  KEYS_SETTINGS
    .map((key) => sendValue(key, settingsStorage.getItem(key)));
  //sendValue(KEY_BG_COLOR, settingsStorage.getItem(KEY_BG_COLOR));
}

// Event fires when a setting is changed
settingsStorage.onchange = function(evt) {
  sendValue(evt.key, evt.newValue);
}

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
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
weather.setup({ provider : weather.Providers.darksky, apiKey : '57281e87e833689d3150c587198f04c6' })