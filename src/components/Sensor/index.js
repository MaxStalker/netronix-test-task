import React from 'react';
import {
  SensorContent,
  Header,
  Title,
  Indicator,
  ValueBlock,
  Value,
  ValueUnits,
  Timestamp,
} from './styles';
import { sensorColor } from './utility';

const renderValue = (value, unit) => (
  <ValueBlock>
    <Value>{value}</Value>
    <ValueUnits>{unit}</ValueUnits>
  </ValueBlock>
);

const renderLocation = value => (
  <ValueBlock>
    <ValueUnits>Latitude:</ValueUnits>
    <Value marginBottom={'0.75em'}>{value.lat}</Value>
    <ValueUnits>Longitude: </ValueUnits>
    <Value>{value.lon}</Value>
  </ValueBlock>
);

const Sensor = props => {
  const { id, data } = props;
  const { name, lastValue, lastUpdate, unit = '' } = data;
  const now = new Date().getTime();
  const color = sensorColor(now, lastUpdate);
  return (
    <SensorContent title={`${name} sensor #${id}`}>
      <Header>
        <Title>{name}</Title>
        <Indicator color={color} />
      </Header>
      {name === 'Location' ? renderLocation(lastValue.value) : renderValue(lastValue.value, unit)}
      <Timestamp>Last update at:{lastValue.formattedTimestamp}</Timestamp>
    </SensorContent>
  );
};

export default Sensor;
