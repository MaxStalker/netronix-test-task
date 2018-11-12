// @flow
import { NEW_SENSOR_DATA } from './actions';
import {
  type Action,
  type SensorState,
  type SensorValue,
  type LocationValue,
  type LocationFormattedValue,
  type FormattedSensorValue,
} from './types';

const HISTORY_SIZE = 50;

const formatSensorData = (pair: SensorValue, name: string): FormattedSensorValue => {
  const timestamp = pair[0] * 1000;
  const formattedTimestamp = new Date(timestamp).toISOString();
  let value = '';
  switch (name) {
    case 'Location': {
      value = {
        lat: pair[1][0],
        lon: pair[1][1],
      };
      break;
    }
    case 'Serial': {
      value = pair[1];
      break;
    }
    default: {
      value = pair[1].toFixed(5);
    }
  }
  return {
    timestamp,
    formattedTimestamp,
    value,
  };
};

export default (state: SensorState = {}, action: Action) => {
  switch (action.type) {
    case NEW_SENSOR_DATA: {
      const { _id, unit, ...rest } = action.payload;
      const { name, measurements } = rest;
      const lastTuple = measurements.slice(-1);
      const lastValue = lastTuple.length > 0 ? lastTuple[0] : false;
      const prevMeasurements = state[_id] ? state[_id].measurements : [];
      const formattedMeasurements = measurements.map(pair => formatSensorData(pair, name));
      const oldLastValue =
        state[_id] && state[_id].lastValue
          ? state[_id].lastValue
          : {
              value: '--',
              timestamp: '--',
              formattedTimestamp: '--',
            };
      const newMeasurements = [...prevMeasurements, ...formattedMeasurements];
      return {
        ...state,
        [_id]: {
          ...rest,
          unit: unit ? unit : 'Raw Data',
          lastValue: lastValue ? formatSensorData(lastValue, name) : oldLastValue,
          measurements:
            newMeasurements.length > HISTORY_SIZE ? newMeasurements.slice(-50) : newMeasurements,
          lastUpdate: new Date().getTime(),
        },
      };
    }
    default: {
      return state;
    }
  }
};
