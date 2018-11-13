import { default as reducer } from 'redux/reducers/sensors/list';
import { NEW_SENSOR_DATA } from 'redux/reducers/sensors/actions';
import { getLastItem } from 'helpers/utility';

describe('Sensor list reducer', () => {
  it('shall properly update initial state', () => {
    const initState = [];
    const action = {
      type: NEW_SENSOR_DATA,
      payload: { _id: 1 },
    };
    const newState = reducer(initState, action);
    expect(newState.length).toEqual(1);
    expect(newState[0]).toEqual(action.payload._id);
  });

  it('shall not affect existing state if action type does not match', () => {
    const initialState = [];
    const action = {
      type: 'IRRELEVANT_DATA',
      payload: {
        data: 'deprecated',
      },
    };
    const newState = reducer(initialState, action);
    expect(newState).toEqual([]);
  });

  it('shall not add new item if item with id exists', () => {
    const initialState = ['test'];
    const action = {
      type: NEW_SENSOR_DATA,
      payload: { _id: 'test' },
    };
    const newState = reducer(initialState, action);
    expect(newState.length).toEqual(initialState.length);
    expect(newState[0]).toEqual(initialState[0]);
  });

  it('shall add new item for new id', () => {
    const initialState = ['test'];
    const action = {
      type: NEW_SENSOR_DATA,
      payload: { _id: 'new item' },
    };
    const newState = reducer(initialState, action);
    expect(newState.length).toEqual(initialState.length + 1);
    expect(getLastItem(newState)).toEqual(action.payload._id);
  });
});
