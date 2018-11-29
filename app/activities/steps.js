import document             from 'document';
import * as util            from '../../common/utils';
import { getActivityValue } from '../userActivity';
import * as actions         from '../activityActions';

export const steps = {
  activity: 7,
  changeColor: function () {
    actions.changeActivityColor(this);
  },

  changeFormat: function () {
    this.format = util.getNextFormat(this.format);
    actions.saveActivitySettings(this);
  },

  icon: 'icons/activities/steps.png',
  iconFill: '#f1c40f',
  initActivity: undefined,
  name: 'steps',

  onClick: (activity) => { actions.onClickActivity(activity); },

  refreshActivityColor: function () { actions.refreshActivityColor(this); },

  switchToNext: function () {
    actions.switchToNextActivity(this);
  },

  textFill: '#f1c40f',

  update: function () {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);

    metric.text = getActivityValue({activity: this.name, metric: this});
  }
}