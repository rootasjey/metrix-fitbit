import document from 'document';

import * as util from '../../common/utils';

import { getActivityValue } from '../userActivity';

import { onClickActivity, 
         saveActivitySettings, 
         switchToNextActivity,
        
       } from '../activityActions';

export const activeMinutes = {
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
  };