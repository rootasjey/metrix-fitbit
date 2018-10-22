import document from 'document';
import { preferences } from 'user-settings';

import { getActivityValue } from './userActivity';

import * as util from '../common/utils';
import * as colors from '../common/colors';

export const activities = [
  {
    activity: 0,
    changeColor: function () {},
    
    changeFormat: function () {
      this.format = util.getNextFormat(this.format);
    },
    
    icon: 'icons/activeMinutes.png',
    iconFill: '#e67e22',
    name: 'activeMinutes',
    
    switchToNextActivity: function () {
      this.activity = (this.activity + 1) % 7;
      initActivity(this);
    },
    
    textFill: '#e67e22',
    
    update: function () {
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);

      metric.text = getActivityValue({activity: this.name, metric: this});
    }
  },
  {
    activity: 1,
    changeColor: function () {},
   
    changeFormat: function () {
      this.format = util.getNextFormat(this.format);
    },
    
    icon: 'icons/calories.png',
    iconFill: '#9b59b6',
    name: 'calories',
    
    switchToNextActivity: function () {
      this.activity = (this.activity + 1) % 7;
      initActivity(this);
    },
    
    textFill: '#9b59b6',
    
    update: function () {
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);

      metric.text = getActivityValue({activity: this.name, metric: this});
    }
  },
  {
    activity: 2,
    
    changeColor: function () {
      this.color = colors.getNextColor(this.color);
      
      const idSelector = 'metric' + this.metricNumber;
      
      const metric = document.getElementById(idSelector);
      const icon = document.getElementById(`metric${this.metricNumber}-img`);
  
      icon.style.fill   = this.color;
      metric.style.fill = this.color;
    },
    
    changeFormat: function () {
      this.changeColor();
    },
    
    icon: 'icons/clock.png',
    iconFill: '#2ecc71',
    name: 'clock',
    
    switchToNextActivity: function () {
      this.activity = (this.activity + 1) % 7;
      initActivity(this);
    },
    
    textFill: '#2ecc71',
    
    update: function ({ evt } = {}) {
      if (!evt) return;
      
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);

      let today = evt.date;
      let hours = today.getHours();

      if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
      } else {
        // 24h format
        hours = util.zeroPad(hours);
      }

      let mins = util.zeroPad(today.getMinutes());
      let secs = util.zeroPad(today.getSeconds());

      metric.text = `${hours}:${mins}:${secs}`;
    }
  },
  {
    activity: 3,
    changeColor: function () {},

    changeFormat: function () {
      this.format = util.getNextFormat(this.format);
    },
    
    icon: 'icons/date.png',
    name: 'date',
    
    switchToNextActivity: function () {
      this.activity = (this.activity + 1) % 7;
      initActivity(this);
    },
    
    update: function () {
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);

      let today = new Date();
      
      if (this.format === 'current') {
        metric.text = `${util.numberToDay(today.getDay())} ${util.numberToMonth(today.getMonth())} ${today.getDate()}`;
        
      } else if (this.format === 'percentage') {
        metric.text = `${util.numberToDay(today.getDay()).substring(0,1)} ${util.numberToMonth(today.getMonth())} ${today.getDate()}`;
        
      } else {
        metric.text = `${today.getDate()} / ${today.getMonth() + 1}`;
      }
    }
  },
  {
    activity: 4,
    changeColor: function () {},

    changeFormat: function () {
      this.format = util.getNextFormat(this.format);
    },
    
    icon: 'icons/distance.png',
    iconFill: '#2ecc71',
    name: 'distance',
    
    switchToNextActivity: function () {
      this.activity = (this.activity + 1) % 7;
      initActivity(this);
    },
    
    textFill: '#2ecc71',
    
    update: function () {
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);

      metric.text = getActivityValue({activity: this.name, metric: this});
    }
  },
  {
    activity: 5,
    changeColor: function () {},

    changeFormat: function () {
      this.format = util.getNextFormat(this.format);
    },
    
    icon: 'icons/elevationGain.png',
    iconFill: '#3498db',
    name: 'elevationGain',
    
    switchToNextActivity: function () {
      this.activity = (this.activity + 1) % 7;
      initActivity(this);
    },
    
    textFill: '#3498db',
    
    update: function () {
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);

      metric.text = getActivityValue({activity: this.name, metric: this});
    }
  },
  {
    activity: 6,
    changeColor: function () {},
    changeFormat: function () {},
    icon: 'icons/hr.png',
    iconFill: '#e74c3c',
    name: 'hr',
    
    switchToNextActivity: function () {
      this.activity = (this.activity + 1) % 7;
      initActivity(this);
    },
    
    update: function ({ hrm } = {}) {
      if(!hrm) return;
      
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);
      const icon = document.getElementById(`metric${this.metricNumber}-img`);
      
      hrm.onreading = function() {
        // Peek the current sensor values
        //console.log(hrm.heartRate);
        metric.text = hrm.heartRate ? `${hrm.heartRate}` : '--';
      }
      
      icon.style.opacity = icon.style.opacity === 0.5 ? 1 : 0.5;
    }
  },
  {
    activity: 7,
    changeColor: function () {},

    changeFormat: function () {
      this.format = util.getNextFormat(this.format);
    },
    
    icon: 'icons/steps.png',
    iconFill: '#f1c40f',
    name: 'steps',
    
    switchToNextActivity: function () {
      this.activity = (this.activity + 1) % 7;
      initActivity(this);
    },
    
    textFill: '#f1c40f',
    
    update: function () {
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);

      metric.text = getActivityValue({activity: this.name, metric: this});
    }
  },
]
