import document from 'document';

import * as util from '../../common/utils';

import { onClickActivity, 
         saveActivitySettings, 
         switchToNextActivity,
        
       } from '../activityActions';

export const date = {
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
  };