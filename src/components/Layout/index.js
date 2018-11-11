import styled from 'styled-components';

const Flexbox = styled.div`
  display: flex;
`;

export const FlexRow = styled(Flexbox)`
  flex-direction: row;
`;

export const FlexColumn = styled(Flexbox)`
  flex-direction: column;
`;
