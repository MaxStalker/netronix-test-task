import styled, { keyframes } from 'styled-components';
import {FlexColumn} from "../Layout";

export const DashboardContent = styled.div`
  display: grid;
  padding: 40px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 10px;
`;

export const EmptyContainer = styled(FlexColumn)`
	width: 100%;
	height: 100vh;
	align-items: center;
	justify-content: center;
`

export const Message = styled.p`
  font-size: 16px;
  color: var(--light-teal);
  & i{
  	font-size: 1.25em;
  	color: var(--white);
  }
`;

export const Icon = styled.i``;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
	750% {
    transform: rotate(320deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const SpinningIcon = styled(Icon)`
	flex: 0 0 auto;
	margin-right: 10px;
  animation: ${rotate} 1.25s ease-in-out infinite;
`;
