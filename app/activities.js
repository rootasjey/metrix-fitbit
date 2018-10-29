import document from 'document';
import { preferences } from 'user-settings';

import { getActivityValue } from './userActivity';

import * as util from '../common/utils';
import * as colors from '../common/colors';

import * as settings from './settings';

export const activities = [
  {
    activity: 0,
    changeColor: function () {},
    
    changeFormat: function () {
      this.format = util.getNextFormat(this.format);
      saveActivitySettings(this);
    },
    
    icon: 'icons/activities/activeMinutes.png',
    iconFill: '#e67e22',
    initActivity: undefined,
    name: 'activeMinutes',
    
    onClick: (activity) => { onClickActivity(activity); },
    
    switchToNext: function () {
      switchToNextActivity(this);
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
      saveActivitySettings(this);
    },
    
    icon: 'icons/activities/calories.png',
    iconFill: '#9b59b6',
    initActivity: undefined,
    name: 'calories',
    
    onClick: (activity) => { onClickActivity(activity); },
    
    switchToNext: function () {
      switchToNextActivity(this);
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
      saveActivitySettings(this);
    },
    
    //icon: 'icons/clock.png',
    iconFill: '#2ecc71',
    initActivity: undefined,
    name: 'clock',
    
    onClick: (activity) => { onClickActivity(activity); },
    
    switchToNext: function () {
      switchToNextActivity(this);
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
      saveActivitySettings(this);
    },
    
    //icon: 'icons/date.png',
    initActivity: undefined,
    name: 'date',
    
    onClick: (activity) => { onClickActivity(activity); },
    
    switchToNext: function () {
      switchToNextActivity(this);
    },
    
    update: function () {
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);

      const today = new Date();
      const day = util.numberToDay(today.getDay());
      const month = util.numberToMonth(today.getMonth());
      const date = today.getDate();
      
      if (this.format === 'current') {
        metric.text = `${day} ${month} ${date}`;
        
      } else if (this.format === 'percentage') {
        metric.text = `${day.substring(0,1)} ${month} ${date}`;
        
      } else {
        metric.text = `${date} / ${today.getMonth() + 1}`;
      }
    }
  },
  
  {
    activity: 4,
    changeColor: function () {},

    changeFormat: function () {
      this.format = util.getNextFormat(this.format);
      saveActivitySettings(this);
    },
    
    icon: 'icons/activities/distance.png',
    iconFill: '#2ecc71',
    initActivity: undefined,
    name: 'distance',
    
    onClick: (activity) => { onClickActivity(activity); },
    
    switchToNext: function () {
      switchToNextActivity(this);
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
      saveActivitySettings(this);
    },
    
    icon: 'icons/activities/elevationGain.png',
    iconFill: '#3498db',
    initActivity: undefined,
    name: 'elevationGain',
    
    onClick: (activity) => { onClickActivity(activity); },
    
    switchToNext: function () {
      switchToNextActivity(this);
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
    icon: 'icons/activities/hr.png',
    iconFill: '#e74c3c',
    initActivity: undefined,
    name: 'hr',
    
    onClick: (activity) => { onClickActivity(activity); },
    
    switchToNext: function () {
      switchToNextActivity(this);
    },
    
    textFill: '#e74c3c',
    
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
      saveActivitySettings(this);
    },
    
    icon: 'icons/activities/steps.png',
    iconFill: '#f1c40f',
    initActivity: undefined,
    name: 'steps',
    
    onClick: (activity) => { onClickActivity(activity); },
    
    switchToNext: function () {
      switchToNextActivity(this);
    },
    
    textFill: '#f1c40f',
    
    update: function () {
      const idSelector = 'metric' + this.metricNumber;
      const metric = document.getElementById(idSelector);

      metric.text = getActivityValue({activity: this.name, metric: this});
    }
  },
]

function onClickActivity(activity) {
  const tapMode = settings.getData('tapMode');
  
  if (tapMode === 'stats')
    activity.changeFormat();
  else
    activity.switchToNext();
}

function saveActivitySettings(activity) {
  const key = `metric${activity.metricNumber}`;
  
  const { activity, color, format } = activity;
  
  const value = {
    activity,
    color,
    format
  };

  settings.update({ key, value });
}

function switchToNextActivity(metric) {
  metric.activity = (metric.activity + 1) % 7;
  metric.initActivity({ metric, asked: true });

  saveActivitySettings(metric);
}
