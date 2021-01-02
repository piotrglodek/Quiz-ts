import styled, { keyframes } from 'styled-components';

const Spinner: React.FC = () => <StyledSpinner />;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 0.4rem solid #dfdfdf;
  border-top: 0.4rem solid ${({ theme: { color } }) => color.black};
  animation: ${rotate} 2s linear infinite;
`;

export default Spinner;
