import { goals } from 'user-activity';
import { today } from 'user-activity';

export function getActivityValue({ activity, metric }) {
  let text = '';

  if (metric.format === 'current') {
      text = `${today.local[activity]}`;

  } else if (metric.format === 'percentage') {
    const activityGoal = typeof goals[activity] !== 'undefined' ?
          goals[activity] : 0;

    text = today.local[activity] / activityGoal * 100;
    text = Math.floor(text) + '%';

  } else {
    const activityGoal = typeof goals[activity] !== 'undefined' ?
          goals[activity] : 0;

    text = today.local[activity] - activityGoal;

    if (text > 0) text = '+' + text;
  }

  return text;
}

export function getActivityRawValue(activity) {
  return today.local[activity];
}
