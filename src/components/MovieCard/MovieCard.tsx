import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Color from 'color';
import React from 'react';
import { Movie } from '../../types';

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.03)',
    },
    maxWidth: 256,
  },
  card: ({ color }: { color: string }) => ({
    minWidth: 256,
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }: { color: string }) => {
    return {
      backgroundColor: color,
      padding: '1rem',
      paddingBottom: '1rem !important',
    };
  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '1.5rem',
    color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    color: '#fff',
    opacity: 0.87,
    fontWeight: 500,
    fontSize: 14,
  },
  media: {
    height: 300,
  },
  rating: ({ color }) => ({
    position: 'absolute',
    width: 30,
    height: 30,
    top: 10,
    right: 10,
    backgroundColor: color,
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    borderRadius: 30,
    padding: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
}));

const MovieCard = ({ movie }: { movie: Movie }) => {
  const styles = useStyles({ color: '#203f52' });
  return (
    <CardActionArea className={styles.actionArea}>
      <Card className={styles.card}>
        <CardMedia image={movie.poster_path} className={styles.media} />
        <CardContent className={styles.content}>
          <Typography variant='h2' className={styles.title}>
            {movie.title}
          </Typography>
          <Typography variant='subtitle1' className={styles.subtitle}>
            {movie.release_date}
          </Typography>
        </CardContent>
        <div className={styles.rating}>
          <span>{movie.vote_average}</span>
        </div>
      </Card>
    </CardActionArea>
  );
};

export default MovieCard;
