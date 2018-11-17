import { activeMinutes }  from './activities/activeMinutes';
import { calories }       from './activities/calories';
import { clock }          from './activities/clock';
import { date }           from './activities/date';
import { distance }       from './activities/distance';
import { elevationGain }  from './activities/elevationGain';
import { hr }             from './activities/hr';
import { steps }          from './activities/steps';
import { weather }        from './activities/weather';

/**
 * All activities displayable on screen.
 */
export const activities = [
  activeMinutes,
  calories,
  clock,
  date,
  distance,
  elevationGain,
  hr,
  steps,
  weather
]
