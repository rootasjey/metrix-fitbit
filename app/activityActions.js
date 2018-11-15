import * as settings from './settings';

export function onClickActivity(activity) {
  const tapMode = settings.getData('tapMode');
  
  if (tapMode === 'stats')
    activity.changeFormat();
  else
    activity.switchToNext();
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