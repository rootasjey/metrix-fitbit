import document             from 'document';
import * as util            from '../../common/utils';
import { getActivityValue } from '../userActivity';

import { onClickActivity, 
         saveActivitySettings, 
         switchToNextActivity,
        
       } from '../activityActions';

export const steps = {
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
  }