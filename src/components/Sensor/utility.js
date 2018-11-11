export const sensorColor = (currentTime, lastTime) => {
  switch (true) {
    case currentTime - lastTime < 1000:
      return 'var(--green)';
    default: {
      return 'var(--red)';
    }
  }
};
