import document             from 'document';
import { getActivityValue } from '../userActivity';
import * as util            from '../../common/utils';

import { onClickActivity, 
         saveActivitySettings, 
         switchToNextActivity,
       } from '../activityActions';

export const calories = {
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
  }