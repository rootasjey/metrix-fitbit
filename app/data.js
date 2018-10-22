import * as messaging from "messaging";

import document from 'document';

import { activities } from './activities';
import { metrics } from './metrics';

export function initialize() {
  metrics.map(initActivity);
}

export function updateAll(params) {
  metrics.map(metric => metric.update(params));
}

function initActivity(metric) {
  const activity = activities[metric.activity];
    
  const textElem = document.getElementById(`metric${metric.metricNumber}`)
  const icon = document.getElementById(`metric${metric.metricNumber}-img`);
  
  icon.href = activity.icon;
  icon.style.fill = activity.iconFill ? activity.iconFill : 'white';
  
  textElem.style.fill = activity.textFill ? activity.textFill : 'white';
  textElem.text = '--';

  metric.name                 = activity.name;
  metric.update               = activity.update;
  metric.changeColor          = activity.changeColor;
  metric.changeFormat         = activity.changeFormat;
  metric.switchToNextActivity = activity.switchToNextActivity

  textElem.onclick = (e) => {
    metric.changeFormat();
  }

  icon.onclick = (e) => {
    metric.switchToNextActivity();
  }
}

messaging.peerSocket.onmessage = function(evt) {
  if (!evt) return;
  
  if (evt.data.key === 'backgroundColor') {
    const color = evt.data.value;
    const bg = document.getElementById('background');
    
    bg.style.fill = color;
  }
}
