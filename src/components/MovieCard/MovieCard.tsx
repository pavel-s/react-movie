import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Color from 'color';
import { Movie } from '../../types';
import MovieCardActions from './MovieCardActions';

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
    position: 'relative',
    minWidth: 256,
    maxWidth: 256,
    borderRadius: 16,
    boxShadow: 'none',
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  actions: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 256,
    '&:hover': {
      backgroundColor: 'rgb(1,1,1, 0.3)',
    },
  },
  content: ({ color }: { color: string }) => {
    return {
      // backgroundColor: color,
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
    height: 384,
  },
  noPoster: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
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
    zIndex: 1,
  }),
}));

const MovieCard = ({
  movie,
  inWatchList,
  watched,
}: {
  movie: Movie;
  inWatchList?: boolean;
  watched?: boolean;
}) => {
  const styles = useStyles({ color: '#203f52' });
  return (
    <Card className={styles.card}>
      <CardActionArea className={styles.actionArea}>
        {movie.poster_path ? (
          <CardMedia image={movie.poster_path} className={styles.media} />
        ) : (
          <div className={styles.media + ' ' + styles.noPoster}>no poster</div>
        )}
      </CardActionArea>

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
      <CardActions className={styles.actions}>
        <MovieCardActions
          id={movie.id}
          inWatchList={inWatchList}
          watched={watched}
        />
      </CardActions>
    </Card>
  );
};

export default MovieCard;
