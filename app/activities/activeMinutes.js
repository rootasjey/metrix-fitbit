import document             from 'document';
import { getActivityValue } from '../userActivity';
import * as util            from '../../common/utils';
import * as actions         from '../activityActions';

export const activeMinutes = {
  activity: 0,
  changeColor: function () {
    actions.changeActivityColor(this);
  },

  changeFormat: function () {
    this.format = util.getNextFormat(this.format);
    actions.saveActivitySettings(this);
  },

  icon: 'icons/activities/activeMinutes.png',
  iconFill: '#e67e22',
  initActivity: undefined,
  name: 'activeMinutes',

  onClick: (activity) => { actions.onClickActivity(activity); },

  refreshActivityColor: function () { actions.refreshActivityColor(this); },

  switchToNext: function () {
    actions.switchToNextActivity(this);
  },

  textFill: '#e67e22',

  update: function () {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);

    metric.text = getActivityValue({activity: this.name, metric: this});
  }
};