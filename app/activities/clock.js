import * as colors      from '../../common/colors';
import document         from 'document';
import { preferences }  from 'user-settings';
import * as util        from '../../common/utils';

import { onClickActivity, 
         saveActivitySettings, 
         switchToNextActivity,
        
       } from '../activityActions';

export const clock = {
    activity: 2,
    
    changeColor: function () {
      this.color = colors.getNextColor(this.color);
      
      const idSelector = 'metric' + this.metricNumber;
      
      const metric = document.getElementById(idSelector);
      const icon = document.getElementById(`metric${this.metricNumber}-img`);
  
      icon.style.fill   = this.color;
      metric.style.fill = this.color;
      
      saveActivitySettings(this);
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
  };