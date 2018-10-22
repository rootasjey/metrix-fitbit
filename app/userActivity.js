import { goals } from 'user-activity';
import { today } from 'user-activity';

export function getActivityValue({ activity, metric }) {
  let text = '';
  
  if (metric.format === 'current') {
      text = `${today.local[activity]}`;

    } else if (metric.format === 'percentage') {
      text = today.local[activity] / goals[activity] * 100;
      text = Math.floor(text) + '%';
      
    } else {
      text = today.local[activity] - goals[activity];
      
      if (text > 0) text = '+' + text;
    }
  
  return text;
}