import React from 'react';
import { EmptyContainer, Message, SpinningIcon } from './styles';

const EmptyState = () => (
  <EmptyContainer>
    <Message>
      <SpinningIcon className="fas fa-hourglass-half" /> Please wait, loading data from server...
    </Message>
  </EmptyContainer>
);
export default EmptyState;
