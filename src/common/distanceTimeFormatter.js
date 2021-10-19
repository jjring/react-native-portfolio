export const getDistanceText = (meters, units = 0) => {
  let distanceText = '';
  if (meters > 0) {
    if (units === 0) {
      let distance = meters / 1609.344;
      if (distance < 0.1) {
        distance = meters * 3.281;
        distanceText = `${distance.toFixed(0)} feet`;
      } else {
        distanceText = `${distance.toFixed(1)} miles`;
      }
    } else {
      const distance = meters / 1000;
      if (distance < 0.1) {
        distanceText = `${meters.toFixed(0)} meters`;
      } else {
        distanceText = `${distance.toFixed(1)} kilometers`;
      }
    }
  }
  return distanceText;
};

export const getDurationText = (seconds) => {
  let durationText = '';
  if (seconds > 0) {
    const durationMinutes = seconds / 60.0;

    if (durationMinutes < 1) {
      if (seconds === 1) {
        durationText = `${seconds.toFixed(0)} second`;
      } else {
        durationText = `${seconds.toFixed(0)} seconds`;
      }
    } else if (durationMinutes === 1) {
      durationText = `${durationMinutes.toFixed(0)} minute`;
    } else if (durationMinutes < 60) {
      durationText = `${durationMinutes.toFixed(0)} minutes`;
    } else {
      const hours = (durationMinutes / 60).toFixed(0);
      if (hours === 1) {
        durationText = `${hours} hour`;
      } else {
        durationText = `${hours} hours`;
      }

      const minutes = (durationMinutes % 60).toFixed(0);
      if (minutes === 1) {
        durationText += ` ${minutes} minute`;
      } else if (minutes > 1) {
        durationText += ` ${minutes} minutes`;
      }
    }
  }
  return durationText;
};
