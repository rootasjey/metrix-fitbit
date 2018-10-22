// Import the Companion module
import { me } from "companion";
import { settingsStorage } from "settings";
import * as messaging from "messaging";

const KEY_BG_COLOR = 'backgroundColor';

if (me.launchReasons.settingsChanged) {
  // The companion was started due to application settings changes
  sendValue(KEY_BG_COLOR, settingsStorage.getItem(KEY_BG_COLOR));
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