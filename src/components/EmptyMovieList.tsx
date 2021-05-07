import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  message: {
    color: theme.palette.text.primary,
  },
}));

const EmptyMovieList = () => {
  const styles = useStyles();
  return (
    <Typography variant='h2' className={styles.message}>
      This list is empty.
    </Typography>
  );
};

export default EmptyMovieList;
