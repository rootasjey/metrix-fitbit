import document from 'document';

import { onClickActivity, 
         switchToNextActivity,
        
       } from '../activityActions';

export const hr = {
    activity: 6,
    changeColor: function () {},
    changeFormat: function () {},
    hrm: undefined,
    icon: 'icons/activities/hr.png',
    iconFill: '#e74c3c',
    initActivity: undefined,
    name: 'hr',
    
    onClick: (activity) => { onClickActivity(activity); },
    
    switchToNext: function () {
      // Clean up event binding
      this.hrm.onreading = undefined;
      this.hrm = undefined;
      
      switchToNextActivity(this);
    },
    
    textFill: '#e74c3c',
    
    update: function ({ hrm } = {}) {
      if(!hrm) return;
      this.hrm = hrm;
      
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);
      const icon = document.getElementById(`metric${this.metricNumber}-img`);
      
      hrm.onreading = function() {
        metric.text = hrm.heartRate ? `${hrm.heartRate}` : '--';
      }
      
      icon.style.opacity = icon.style.opacity === 0.5 ? 1 : 0.5;
    }
  };