import * as messaging from "messaging";

import document from 'document';

import { activities } from './activities';
import { metrics } from './metrics';
import * as settings from './settings';

export function initialize() {
  metrics.map(metric => {
    initActivity({ metric });
    metric.initActivity = initActivity;
  });
  
  bindSwitchTapMode();
}

export function updateAll(params) {
  metrics.map(metric => metric.update(params));
}

function bindSwitchTapMode() {
  const icon = document.getElementById('action-switcher-img');
  
  const tapMode = settings.getData('tapMode') || 'stats';
  
  icon.href = tapMode === 'cycles' ? 'icons/cycles.png' : 'icons/stats.png';
  
  icon.onclick = (e) => {
    tapMode = tapMode === 'stats' ? 'cycles' : 'stats';
    icon.href = tapMode === 'cycles' ? 'icons/cycles.png' : 'icons/stats.png';
    
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
  
  const activity = activities[metric.activity];
    
  const textElem = document.getElementById(`metric${metric.metricNumber}`)
  const icon = document.getElementById(`metric${metric.metricNumber}-img`);
  
  if (activity.icon) {
    icon.style.visibility = 'visible';
    textElem.x = 280;
    
    icon.href = activity.icon;
    icon.style.fill = activity.iconFill ? activity.iconFill : 'white';
    
  } else {
    icon.style.visibility = 'hidden';
    textElem.x = 320;
  }
  
  if (metric.color) {
    icon.style.fill = metric.color;
    textElem.style.fill = metric.color;
  }
  
  textElem.style.fill = activity.textFill ? activity.textFill : 'white';
  textElem.text = '--';

  // NOTE: Object.assign is NOT available :(
  //metric.activity             = activity.activity;
  metric.changeColor          = activity.changeColor;
  metric.changeFormat         = activity.changeFormat;
  //metric.color                = activity.color;
  //metric.format               = activity.format;
  metric.name                 = activity.name;
  metric.onClick              = activity.onClick;
  metric.switchToNext         = activity.switchToNext;
  metric.update               = activity.update;
  metric.saveSettings         = activity.saveSettings;
  
  textElem.onclick = () => metric.onClick(metric)
  
  /*
  textElem.onclick = (e) => {
    metric.changeFormat();
  }
  */
}

settings.initialize(data => {
  if (!data) return;
  
  if (data.backgroundColor) {
    const bg = document.getElementById('background');
    bg.style.fill = data.backgroundColor;
  }
})
