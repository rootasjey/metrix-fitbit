import document         from 'document';

import { activities }   from './activities';
import * as layout      from './layout';
import { metrics }      from './metrics';
import * as settings    from './settings';
import * as permissions from './permissions';
import * as util        from '../common/utils';

export function initialize() {
  metrics.map(metric => {
    initActivity({ metric });
    metric.initActivity = initActivity;
    metric.activityCount = activities.length;
  });

  bindSwitchTapMode();
}

export function updateAll(params) {
  metrics.map(metric => metric.update(params));
}

/**
 * Make a metric reinitialize its data.
 * @param {String} activityName - Activity's name to reinitialize.
 */
export function reinitialize({ activityName }) {
  metrics
    .filter(metric => metric.name === activityName)
    .map(metric => { metric.initialized = false });
}

function bindSwitchTapMode() {
  const icon = document.getElementById('action-switcher-img');
  const tapMode = settings.getData('tapMode') || 'stats';
  const currentMode = util.getTapMode(tapMode);

  icon.y = layout.getModeIconY();
  icon.href = currentMode.icon;

  icon.onclick = (e) => {
    currentMode = util.getNextTapMode(currentMode);

    tapMode = currentMode.name;
    icon.href = currentMode.icon;

    settings.update({ key: 'tapMode', value: tapMode });
  }
}

/**
 * Init new activity to display on the watch
 * @param {Object} metric - info line displayed
 * @param {Boolean} asked - the user asked for this changes; to distinguish from init
 */
function initActivity({ metric, asked }) {
  if (!asked) {
    const savedData = settings.getData(`metric${metric.metricNumber}`);

    if (savedData) {
      metric.activity = savedData.activity ?
        savedData.activity : metric.activity;

      metric.format = savedData.format ?
        savedData.format : metric.format;

      metric.color = savedData.color ?
        savedData.color : metric.color;
    }
  }

  // Permission check
  metric.activity = permissions.getNextAllowedActivity(metric.activity);

  const activity = activities[metric.activity];

  const textElem = document.getElementById(`metric${metric.metricNumber}`)
  const icon = document.getElementById(`metric${metric.metricNumber}-img`);

  if (activity.icon) {
    icon.style.visibility = 'visible';
    icon.style.opacity = 1;
    textElem.x = layout.getTextX({ icon: true });

    icon.href = activity.icon;
    icon.style.fill = activity.iconFill ? activity.iconFill : 'white';

    icon.x = layout.getIconX();
    icon.y = layout.getIconY({ metricNumber: metric.metricNumber });

  } else {
    icon.style.visibility = 'hidden';
    textElem.x = layout.getTextX({ icon: false });
  }

  if (metric.color) {
    icon.style.fill = metric.color;
    textElem.style.fill = metric.color;
  }

  textElem.text = '--';
  textElem.style.fill = metric.color ? metric.color : activity.textFill ? activity.textFill : 'white';
  textElem.style.fontSize = metric.fontSize ? metric.fontSize : 50;

  // NOTE: Object.assign is NOT available :(
  metric.changeColor          = activity.changeColor;
  metric.changeFormat         = activity.changeFormat;
  metric.iconFill             = activity.iconFill;
  metric.initialized          = activity.initialized
  metric.name                 = activity.name;
  metric.onClick              = activity.onClick;
  metric.refreshActivityColor = activity.refreshActivityColor
  metric.switchToNext         = activity.switchToNext;
  metric.saveSettings         = activity.saveSettings;
  metric.textFill             = activity.textFill;
  metric.update               = activity.update;

  textElem.onclick = () => {
    if (settings.getData('lockUI')) { return; }

    metric.onClick(metric);
  }
}

// Listen to settings changes
settings.initialize((data) => {
  if (!data) return;

  if (data.backgroundColor) {
    const bg = document.getElementById('background');
    bg.style.fill = data.backgroundColor;
  }

  updateLockUIIcon(data.lockUI);
});

settings.bindReinitialize(({ activityName }) => {
  reinitialize({ activityName })
});

settings.bindResetAllColors(() => {
  metrics.map((metric) => {
    metric.color = undefined;
    metric.refreshActivityColor();
  });
});

settings.bindLockUIChanged(updateLockUIIcon);

function updateLockUIIcon(active) {
  const lockUI = document.getElementById('lockUI');
  lockUI.style.visibility = active ? 'visible' : 'hidden';
}
