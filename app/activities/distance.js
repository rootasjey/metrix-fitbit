import document             from 'document';
import * as util            from '../../common/utils';
import { getActivityValue } from '../userActivity';
import * as actions         from '../activityActions';

export const distance = {
  activity: 4,
  changeColor: function () {
    actions.changeActivityColor(this);
  },

  changeFormat: function () {
    this.format = util.getNextFormat(this.format);
    actions.saveActivitySettings(this);
  },

  icon: 'icons/activities/distance.png',
  iconFill: '#2ecc71',
  initActivity: undefined,
  name: 'distance',

  onClick: (activity) => { actions.onClickActivity(activity); },
    
  refreshActivityColor: function () { actions.refreshActivityColor(this); },
  
  switchToNext: function () {
    actions.switchToNextActivity(this);
  },

  textFill: '#2ecc71',

  update: function () {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);

    metric.text = getActivityValue({activity: this.name, metric: this});
  }
};