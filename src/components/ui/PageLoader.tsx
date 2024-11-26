import styled from 'styled-components';
import Loader from './Loader';

export default function PageLoader() {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
