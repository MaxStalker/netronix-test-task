import { default as reducer, formatSensorData, PRECISION } from 'redux/reducers/sensors/byId';
import { NEW_SENSOR_DATA } from 'redux/reducers/sensors/actions';
import { getLastItem } from 'helpers/utility';

describe('Sensor utility functions', () => {
  it('shall properly format timestamp value', () => {
    const serialTimestamp = Math.floor(new Date().getTime() / 1000);
    const serialValue = '42';
    const sensorValue = [serialTimestamp, serialValue];
    const output = formatSensorData(sensorValue, 'Serial');
    expect(output.formattedTimestamp).toEqual(new Date(serialTimestamp * 1000).toISOString());
  });

  it('shall properly format serial value', () => {
    const serialTimestamp = Math.floor(new Date().getTime() / 1000);
    const serialValue = '0B100100';
    const sensorValue = [serialTimestamp, serialValue];

    const output = formatSensorData(sensorValue, 'Serial');
    expect(output.value).toEqual(serialValue);
    expect(output.formattedTimestamp).toEqual(new Date(serialTimestamp * 1000).toISOString());
  });

  it('shall properly format location value', () => {
    const locationTimestamp = Math.floor(new Date().getTime() / 1000);
    const locationValue = [11, 22];
    const sensorValue = [locationTimestamp, locationValue];

    const output = formatSensorData(sensorValue, 'Location');
    expect(output.value.lat).toEqual(locationValue[0]);
    expect(output.value.lon).toEqual(locationValue[1]);
  });

  it('shall properly format float value', () => {
    const locationTimestamp = Math.floor(new Date().getTime() / 1000);
    const locationValue = 42;
    const sensorValue = [locationTimestamp, locationValue];

    const output = formatSensorData(sensorValue, 'Temperature');
    expect(output.value).toEqual(locationValue.toFixed(PRECISION));
  });
});

describe('Sensor byId reducer', () => {
  it('shall properly init empty state', () => {
    const initialState = {};
    const ID = '42';
    const action = {
      type: NEW_SENSOR_DATA,
      payload: {
        _id: ID,
        name: 'Pressure',
        unit: 'hPa',
        measurements: [[1542135730, 987.3478495981932]],
      },
    };
    const id = action.payload._id;
    const newState = reducer(initialState, action);
    const { measurements } = action.payload;
    expect(newState[id].unit).toEqual(action.payload.unit);
    const lastItem = getLastItem(measurements);
    const expectedTimestamp = lastItem[0] * 1000;
    const expectedLastValue = lastItem[1].toFixed(PRECISION);
    expect(newState[id].lastValue.timestamp).toEqual(expectedTimestamp);
    expect(newState[id].lastValue.value).toEqual(expectedLastValue);
  });

  it('shall not affect existing state if action type does not match', () => {
    const initialState = {};
    const action = {
      type: 'IRRELEVANT_DATA',
      payload: {
        data: 'deprecated',
      },
    };
    const newState = reducer(initialState, action);
    expect(newState).toEqual({});
  });

  it('shall properly update existing state', () => {
    const initialState = {};
    const firstAction = {
      type: NEW_SENSOR_DATA,
      payload: {
        _id: '42',
        name: 'Pressure',
        unit: 'hPa',
        measurements: [[1542135730, 987.3478495981932]],
      },
    };
    const secondAction = {
      type: NEW_SENSOR_DATA,
      payload: {
        _id: '42',
        name: 'Pressure',
        unit: 'hPa',
        measurements: [[1542135731, 1027.3997857850343], [1542135732, 961.1215744777243]],
      },
    };
    const id = firstAction.payload._id;
    let newState = reducer(initialState, firstAction);
    newState = reducer(newState, secondAction);
    const { measurements } = secondAction.payload;
    const lastItem = getLastItem(measurements);
    const expectedTimestamp = lastItem[0] * 1000;
    const expectedLastValue = lastItem[1].toFixed(PRECISION);
    expect(newState[id].lastValue.formattedTimestamp).toEqual(
      new Date(expectedTimestamp).toISOString(),
    );
    expect(newState[id].lastValue.timestamp).toEqual(expectedTimestamp);
    expect(newState[id].lastValue.value).toEqual(expectedLastValue);
    const itemsTotal = firstAction.payload.measurements.length + secondAction.payload.measurements.length;
    expect(newState[id].measurements.length).toEqual(itemsTotal);
  });
});
