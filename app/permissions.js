import { me } from "appbit";

export function getNextAllowedActivity(activityNumber) {
  const { granted } = me.permissions;

  const grantedActivity = granted('access_activity');
  const grantedWeather = granted('access_location') &&
        granted('access_internet');

  const grantedPermissions = {
    0: grantedActivity,               // activeMinutes
    1: grantedActivity,               // calories
    2: true,                          // clock
    3: true,                          // date
    4: grantedActivity,               // distance
    5: grantedActivity,               // elevationGain
    6: granted('access_heart_rate'),  // hr
    7: grantedActivity,               // steps
    8: grantedWeather,                // weatther
    9: true,                          // batteryLevel
  };

  const lengthPerm = Object.keys(grantedPermissions).length;

  if (grantedPermissions[activityNumber]) {
    return activityNumber;
  }

  let i = activityNumber;

  while (!grantedPermissions[i]) {
    i = (i + 1) % lengthPerm;
  }

  return i;
}
