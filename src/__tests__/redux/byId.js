import { formatSensorData, PRECISION } from 'redux/reducers/sensors/byId';

describe('Test byId reducer of sensors domain', () => {
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
