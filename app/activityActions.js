import * as colors   from '../common/colors';
import document      from 'document';
import * as settings from './settings';

export function changeActivityColor(activity) {
  activity.color = colors.getNextColor(activity.color);

  refreshActivityColor(activity)
}

export function refreshActivityColor(activity) {
  const idSelector = 'metric' + activity.metricNumber;

  const metric = document.getElementById(idSelector);
  const icon = document.getElementById(`metric${activity.metricNumber}-img`);

  icon.style.fill   = activity.color ? activity.color : activity.iconFill;
  metric.style.fill = activity.color ? activity.color : activity.textFill;

  saveActivitySettings(activity);
}

export function onClickActivity(activity) {
  const tapMode = settings.getData('tapMode');
  
  if (tapMode === 'colors') {
    activity.changeColor();
    
  } else if (tapMode === 'cycles') {
    activity.switchToNext();
    
  } else { // stats
    activity.changeFormat();
  }
}

export function saveActivitySettings(activity) {
  const key = `metric${activity.metricNumber}`;
  
  const { activity, color, format } = activity;
  
  const value = {
    activity,
    color,
    format
  };

  settings.update({ key, value });
}

export function switchToNextActivity(metric) {
  metric.activity = (metric.activity + 1) % (metric.activityCount);
  metric.initActivity({ metric, asked: true });

  saveActivitySettings(metric);
}