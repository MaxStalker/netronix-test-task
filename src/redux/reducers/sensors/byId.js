// @flow
import { NEW_SENSOR_DATA } from './actions';
import {
  type Action,
  type SensorState,
  type SensorValue,
  type TupleValue,
  type FormattedSensorValue,
  type LocationFormattedValue,
} from './types';
import { getLastItem } from '../../../helpers/utility';

const HISTORY_SIZE = 50;
export const PRECISION = 5;

export const formatSensorData = (pair: SensorValue, name: string): FormattedSensorValue => {
  const timestamp: number = pair[0] * 1000;
  const sensorValue: TupleValue = pair[1];
  const formattedTimestamp = new Date(timestamp).toISOString();
  let value: string | LocationFormattedValue = '';
  switch (name) {
    case 'Location': {
      if (Array.isArray(sensorValue)) {
        value = {
          lat: sensorValue[0],
          lon: sensorValue[1],
        };
      }
      break;
    }
    case 'Serial': {
      if (typeof sensorValue === 'string') {
        value = sensorValue;
      }
      break;
    }
    default: {
      if (typeof sensorValue === 'number') {
        value = sensorValue.toFixed(PRECISION);
      }
    }
  }
  return {
    timestamp,
    formattedTimestamp,
    value,
  };
};

export default (state: SensorState = {}, action: Action): SensorState => {
  switch (action.type) {
    case NEW_SENSOR_DATA: {
      const { _id, unit, ...rest } = action.payload;
      const { name, measurements } = rest;
      const lastTuple = getLastItem(measurements);
      const lastValue = lastTuple ? lastTuple : false;
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
