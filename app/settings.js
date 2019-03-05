/*
  Responsible for loading, applying and saving settings.
  Requires companion/simple/companion-settings.js
  Callback should be used to update your UI.
*/
import { me }         from 'appbit';
import * as fs        from 'fs';
import * as messaging from 'messaging';

const SETTINGS_TYPE = 'cbor';
const SETTINGS_FILE = 'settings.cbor';

const KEY_TEMPERATURE_UNIT  = 'imperialUnit';
const KEY_MANUAL_LOCATION   = 'manualLocation';
const KEY_LOCK_UI           = 'lockUI';
const KEY_RESET_ALL_COLORS  = 'resetAllColors';
const KEY_RESET_ACTIVITIES  = 'resetMetrics';

let settings = {};
let onsettingschange;
let initMetric;
let resetMetrics;
let resetAllColors;
let lockUIChanged;

export function initialize(callback) {
  settings = loadSettings();
  onsettingschange = callback;
  onsettingschange(settings);
}

export function bindInitMetric(callback) {
  initMetric = callback;
}

export function bindResetAllColors(callback) {
  resetAllColors = callback;
}

export function bindResetMetrics(callback) {
  resetMetrics = callback;
}

export function bindLockUIChanged(callback) {
  lockUIChanged = callback;
}

export function getData(key = '') {
  if (key.length > 0) return settings[key];
  return undefined;
}

export function update({ key, value }) {
  settings[key] = value;
}

// Received message containing settings data
messaging.peerSocket.addEventListener('message', function(evt) {
  settings[evt.data.key] = evt.data.value;
  onsettingschange(settings);

  // Update immediately weather value when unit changed
  if (evt.data.key === KEY_TEMPERATURE_UNIT) {
    initMetric({ activityName: 'weather' });
  }

  if (evt.data.key === KEY_MANUAL_LOCATION) {
    initMetric({ activityName: 'weather', useFreshData: true });
  }

  if (evt.data.key === KEY_RESET_ALL_COLORS) {
    resetAllColors();
  }

  if (evt.data.key === KEY_LOCK_UI) {
    lockUIChanged(evt.data.value);
  }

  if (evt.data.key === KEY_RESET_ACTIVITIES) {
    resetMetrics();
  }
})

// Register for the unload event
me.addEventListener('unload', saveSettings);

// Load settings from filesystem
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    return {};
  }
}

// Save settings to the filesystem
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
