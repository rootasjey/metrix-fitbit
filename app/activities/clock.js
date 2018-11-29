import * as colors      from '../../common/colors';
import document         from 'document';
import { preferences }  from 'user-settings';
import * as util        from '../../common/utils';
import * as actions     from '../activityActions';

export const clock = {
  activity: 2,

  changeColor: function () {
    actions.changeActivityColor(this);
  },

  changeFormat: function () {
    this.format = util.getNextFormat(this.format);
    actions.saveActivitySettings(this);
  },

  //icon: 'icons/clock.png',
  iconFill: '#2ecc71',
  initActivity: undefined,
  name: 'clock',

  onClick: (activity) => { actions.onClickActivity(activity); },

  refreshActivityColor: function () { actions.refreshActivityColor(this); },

  switchToNext: function () {
    actions.switchToNextActivity(this);
  },

  textFill: '#2ecc71',

  update: function ({ evt } = {}) {
    if (!evt) return;

    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);

    let today = evt.date;
    let hours = today.getHours();

    if (preferences.clockDisplay === "12h") {
      // 12h format
      hours = hours % 12 || 12;
    } else {
      // 24h format
      hours = util.zeroPad(hours);
    }

    let mins = util.zeroPad(today.getMinutes());
    let secs = util.zeroPad(today.getSeconds());

    if (this.format === 'current') {
      metric.text = `${hours}:${mins}:${secs}`;

    } else if (this.format === 'percentage') {
      metric.text = `${hours}${mins}${secs}`;

    } else {
      metric.text = `${hours}:${mins}`;
    }
  }
};