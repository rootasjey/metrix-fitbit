import * as util      from '../../common/utils';
import * as actions   from '../activityActions';
import document       from 'document';
import { battery }    from 'power';

export const batteryLevel = {
  activity: 9,
  changeColor: function () {
    actions.changeActivityColor(this);
  },

  changeFormat: function () {
    this.format = util.getNextFormat(this.format);
    actions.saveActivitySettings(this);
  },

  icon: 'icons/activities/battery-100.png',
  iconFill: '#feca57',
  initActivity: undefined,
  name: 'battery',

  onClick: (activity) => { actions.onClickActivity(activity); },

  refreshActivityColor: function () { actions.refreshActivityColor(this); },

  switchToNext: function () {
    actions.switchToNextActivity(this);
  },

  textFill: '#feca57',

  update: function () {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);

    const level = Math.floor(battery.chargeLevel);

    const icon = document.getElementById(`${idSelector}-img`);
    const colorAndIcon = getColorAndIcon(level, battery.charging);

    this.icon = colorAndIcon.icon;
    icon.href = colorAndIcon.icon;

    if (this.format === 'current') {
      metric.text = `${level}`;

    } else if (this.format === 'percentage') {
      metric.text = `${level}%`;

    } else {
      metric.text = `${level}/100`;
    }

    if (!this.color) {
      this.iconFill = colorAndIcon.color;
      this.textFill = colorAndIcon.color;

      icon.style.fill = colorAndIcon.color;
      metric.style.fill = colorAndIcon.color;
    }
  }
}

function getColorAndIcon(level = 100, charging = false) {
  if (charging) {
    return {
      color: '#1e90ff',
      icon: 'icons/activities/battery-charging.png',
    };
  }

  if (level > 50) {
    return {
      color: '#2ecc71',
      icon: 'icons/activities/battery-100.png',
    };
  }

  if (level > 20) {
    return {
      color: '#f39c12',
      icon: 'icons/activities/battery-50.png',
    };
  }

  return {
    color: '#e74c3c',
    icon: 'icons/activities/battery-0.png',
  };
}
