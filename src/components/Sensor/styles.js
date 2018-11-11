import styled from 'styled-components';
import { FlexColumn, FlexRow } from 'components/Layout';

export const SensorContent = styled(FlexColumn)`
  padding: 20px;
  background-color: #3a4c75;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 3px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  height: 300px;
  & p {
    margin: 0;
    margin-bottom: 10px;
  }
`;

export const Indicator = styled.div`
  --dot-size: 12px;
  display: block;
  width: var(--dot-size);
  height: var(--dot-size);
  background-color: ${({ color = 'black' }) => color};
  border-radius: var(--dot-size);
  transition: background-color 1s ease-in-out;
  box-shadow: 0 0 0 3px rgb(49, 65, 101), 0 5px 1px rgba(255, 255, 255, 0.12);
`;

export const Header = styled(FlexRow)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: normal;
  color: var(--light-teal);
`;

export const ValueBlock = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Value = styled.h2`
  margin: 0;
  color: var(--white);
  font-size: 32px;
  margin-bottom: ${({ marginBottom = '10px' }) => marginBottom};
  font-family: Aldrich, sans-serif;
`;

export const ValueUnits = styled.p`
  font-size: 20px;
  color: var(--light-teal);
  margin: 0;
`;

export const Timestamp = styled.p`
  font-size: 12px;
  color: var(--light-teal);
  text-align: center;
`;
