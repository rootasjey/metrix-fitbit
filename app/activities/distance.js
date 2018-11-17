import document             from 'document';
import * as util            from '../../common/utils';
import { getActivityValue } from '../userActivity';

import { onClickActivity, 
         saveActivitySettings, 
         switchToNextActivity,
        
       } from '../activityActions';

export const distance = {
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
  };