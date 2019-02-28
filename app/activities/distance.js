import document             from 'document';
import * as util            from '../../common/utils';
import * as actions         from '../activityActions';
import * as settings        from '../settings';

import {
  getActivityValue,
  getActivityRawValue
} from '../userActivity';

import { goals } from 'user-activity';

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

    // Calculate manually values because of possible miles unit
    if (settings.getData('distanceImperialUnit') &&
        this.format !== 'percentage') {

      const miles = 0.00062137;

      const rawValue = getActivityRawValue(this.name);

      if (this.format === 'current') {
        metric.text = Math.floor(rawValue * miles);

      } else {
        const todayValue = Math.floor(rawValue * miles);

        const activityGoal = typeof goals[this.name] !== 'undefined' ?
          Math.floor(goals[this.name] * miles) : 0;

        const text = todayValue - activityGoal;

        if (text > 0) text = '+' + text;

        metric.text = text;
      }

      return;
    }

    metric.text = getActivityValue({activity: this.name, metric: this});
  }
};