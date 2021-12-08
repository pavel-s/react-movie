import { Container, makeStyles } from '@material-ui/core';
import { ComponentPropsWithRef } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    minHeight: `calc(100vh - ${theme.appBar.height}px)`,
    maxWidth: 1440,
  },
}));

const AppContainer = ({
  children,
  ...rest
}: ComponentPropsWithRef<typeof Container>) => {
  const styles = useStyles();

  return (
    <Container className={styles.container} {...rest}>
      {children}
    </Container>
  );
};

export default AppContainer;
