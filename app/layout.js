import { me as device } from 'device';

if (!device.screen) {
  device.screen = { width: 348, height: 250 };
}

const { height, width } = device.screen;

const deviceType = width === 300 && height === 300 ? 'Versa' : 'Ionic';

/** Return horizontal icon position. */
export function getIconX() {
  const hPos = {
    Ionic: 290,
    Versa: 250,
  };

  return hPos[deviceType];
}

/** Return vertical icon position. */
export function getIconY({ metricNumber }) {
  const vPos = {
    Ionic: {
      0: 20,
      1: 77,
      2: 120,
      3: 165,
      4: 210,
    },
    Versa: {
      0: 30,
      1: 90,
      2: 150,
      3: 200,
      4: 255,
    },
  };

  return vPos[deviceType][metricNumber];
}

/**
 * Return vertical icon mode position.
 * (mode = stats format/switch next activity)
 */
export function getModeIconY() {
  const vPos = {
    Ionic: 190,
    Versa: 230,
  };

  return vPos[deviceType];
}

export function getLockIconY() {
  const vPos = {
    Ionic: 130,
    Versa: 170,
  }

  return vPos[deviceType];
}

/** Return vertical text position. */
export function getTextX({ icon } = {}) {
  const hPos = {
    true: {
      Ionic: 280,
      Versa: 240,
    },
    false: {
      Ionic: 320,
      Versa: 290,
    }
  };

  return hPos[icon][deviceType];
}
