// @flow

export type TupleValue = [number, number] | number | string;
export type LocationFormattedValue = { lat: number, lon: number };
export type SensorValue = [number, TupleValue];
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
    unit?: string,
  },
};

export type Action = NewSensorData;

export type InitState = {};
export type NewState = {
  name: string,
  _id: string,
  measurements: [FormattedSensorValue],
  unit: ?string,
  lastValue: FormattedSensorValue,
  lastUpdate: number,
};

export type SensorState = InitState | NewState;
