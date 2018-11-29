import document             from 'document';
import { getActivityValue } from '../userActivity';
import * as util            from '../../common/utils';
import * as actions         from '../activityActions';

export const calories = {
  activity: 1,
  changeColor: function () {
    actions.changeActivityColor(this);
  },

  changeFormat: function () {
    this.format = util.getNextFormat(this.format);
    actions.saveActivitySettings(this);
  },

  icon: 'icons/activities/calories.png',
  iconFill: '#9b59b6',
  initActivity: undefined,
  name: 'calories',

  onClick: (activity) => { actions.onClickActivity(activity); },

  refreshActivityColor: function () { actions.refreshActivityColor(this); },

  switchToNext: function () {
    actions.switchToNextActivity(this);
  },

  textFill: '#9b59b6',

  update: function () {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);

    metric.text = getActivityValue({activity: this.name, metric: this});
  }
}