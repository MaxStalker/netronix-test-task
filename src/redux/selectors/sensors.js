import { createSelector } from 'reselect';

export const getId = (_, props) => props.id;
export const getSensors = state => state.sensors.byId;
export const getSensorsList = state => state.sensors.list;

export const getSensorById = createSelector([getSensors, getId], (sensors, id) => {
  if (!sensors[id]) {
    return {
      status: 'empty',
    };
  }
  return sensors[id];
});
