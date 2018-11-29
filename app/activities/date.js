import document       from 'document';
import * as util      from '../../common/utils';
import * as actions   from '../activityActions';

export const date = {
  activity: 3,
  changeColor: function () {
    actions.changeActivityColor(this)
  },

  changeFormat: function () {
    this.format = util.getNextFormat(this.format);
    actions.saveActivitySettings(this);
  },

  //icon: 'icons/date.png',
  iconFill: '#fff',
  initActivity: undefined,
  name: 'date',

  onClick: (activity) => { actions.onClickActivity(activity); },

  refreshActivityColor: function () { actions.refreshActivityColor(this); },

  switchToNext: function () {
    actions.switchToNextActivity(this);
  },

  textFill: '#fff',
  
  update: function () {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);

    const today = new Date();
    const day = util.numberToDay(today.getDay());
    const month = util.numberToMonth(today.getMonth());
    const date = today.getDate();

    if (this.format === 'current') {
      metric.text = `${day} ${month} ${date}`;

    } else if (this.format === 'percentage') {
      metric.text = `${date} ${today.getMonth() + 1} ${today.getFullYear()}`;

    } else {
      metric.text = `${date} / ${today.getMonth() + 1}`;
    }
  }
};