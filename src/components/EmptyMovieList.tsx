import { Typography, useTheme } from '@mui/material';

const EmptyMovieList = ({ message }: { message?: string }) => {
  const color = useTheme().palette.text.primary;
  return (
    <Typography variant='h2' color={color}>
      {message || 'This list is empty.'}
    </Typography>
  );
};

export default EmptyMovieList;
