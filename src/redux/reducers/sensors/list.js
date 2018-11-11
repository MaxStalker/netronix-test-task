import { NEW_SENSOR_DATA } from './actions';
export default (state = [], action) => {
  switch (action.type) {
    case NEW_SENSOR_DATA: {
      const { _id } = action.payload;
      return state.indexOf(_id) < 0 ? [...state, _id] : [...state];
    }
    default: {
      return state;
    }
  }
};
