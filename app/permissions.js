import { me } from "appbit";

export function getNextAllowedActivity(activityNumber) {
  const { granted } = me.permissions;
  
  const grantedActivity = granted('access_activity');
  const grantedWeather = granted('access_location') && 
        granted('access_internet');
  
  const grantedPermissions = {
    0: grantedActivity,
    1: grantedActivity,
    2: true,
    3: true,
    4: grantedActivity,
    5: grantedActivity,
    6: granted('access_heart_rate'),
    7: grantedActivity,
    8: grantedWeather,
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
