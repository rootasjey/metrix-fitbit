import clock                from "clock";
import * as data            from './data';
import { display }          from 'display';
import { HeartRateSensor }  from 'heart-rate';

const hrm = new HeartRateSensor();

clock.granularity = 'seconds';

hrm.start();
data.initialize();

clock.ontick = (evt) => {
  data.updateAll({hrm, evt});
}

display.addEventListener("change", function () {
  if (this.on) {
    hrm.start();
    data.initMetric({ activityName: 'weather'});
    return;
  }

  hrm.stop();
});
