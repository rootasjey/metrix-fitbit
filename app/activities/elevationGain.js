import document             from 'document';
import * as util            from '../../common/utils';
import { getActivityValue } from '../userActivity';
import * as actions         from '../activityActions';

export const elevationGain = {
  activity: 5,
  changeColor: function () {
    actions.changeActivityColor(this);
  },

  changeFormat: function () {
    this.format = util.getNextFormat(this.format);
    actions.saveActivitySettings(this);
  },

  icon: 'icons/activities/elevationGain.png',
  iconFill: '#3498db',
  initActivity: undefined,
  name: 'elevationGain',

  onClick: (activity) => { actions.onClickActivity(activity); },

  refreshActivityColor: function () { actions.refreshActivityColor(this); },

  switchToNext: function () {
    actions.switchToNextActivity(this);
  },

  textFill: '#3498db',

  update: function () {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);

    metric.text = getActivityValue({activity: this.name, metric: this});
  }
};