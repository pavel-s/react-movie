import { Container } from '@mui/material';
import { FC } from 'react';

const RouteContainer: FC = ({ children }) => {
  return (
    <Container maxWidth='xl' sx={{ minHeight: '100vh', paddingTop: 10 }}>
      {children}
    </Container>
  );
};

export default RouteContainer;
