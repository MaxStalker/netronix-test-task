// @flow
import { NEW_SENSOR_DATA } from './actions';

export type TupleValue = number | [number, number];
export type Tuples = [TupleValue, TupleValue];

export type Action = NewSensorData;
export type FloatValue = [number, number];
export type LocationValue = [Tuples];
export type LocationFormattedValue = { lat: string, lon: string };
export type SerialValue = [number, string];
export type SensorValue = [Tuples];
export type FormattedSensorValue = {
  value: LocationFormattedValue | string,
  timestamp: number,
  formattedTimestamp: string,
};

export type NewSensorData = {
  type: string,
  payload: {
    _id: string,
    name: string,
    measurements: [SensorValue],
    unit: ?string,
  },
};

export type InitState = {};
export type NewState = {
  name: string,
  _id: string,
  measurements: [FormattedSensorValue],
  unit: ?string,
};
export type SensorState = InitState | NewState;
