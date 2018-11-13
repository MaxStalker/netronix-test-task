import { createSelector } from 'reselect';

import { type SensorListState, type SensorState } from '../reducers/sensors/types';

export const getId: () => string = (_, props) => props.id;
export const getSensors: () => SensorState = state => state.sensors.byId;
export const getSensorsList: () => SensorListState = state => state.sensors.list;

export const getSensorById = createSelector([getSensors, getId], (sensors, id) => {
  if (!sensors[id]) {
    return {
      status: 'empty',
    };
  }
  return sensors[id];
});
