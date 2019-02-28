// Import the Companion module
import { me } from "companion";
import { settingsStorage } from "settings";
import * as messaging from "messaging";

import * as weather from '../lib/fitbit-weather/companion';

const KEYS_SETTINGS = [
  'backgroundColor',
  'distanceImperialUnit',
  'imperialUnit',
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
weather.setup({
  apiKey : '57281e87e833689d3150c587198f04c6',
  provider : weather.Providers.darksky,
});
