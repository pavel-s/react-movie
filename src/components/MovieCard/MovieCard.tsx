import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { Movie } from '../../types';
import MovieCardActions from './MovieCardActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from 'clsx';
import { useStyles } from './styles';

const getRatingColor = (rating: number) => {
  if (rating < 5) return 'red';
  if (rating < 7) return 'yellow';
  return 'green';
};

const MovieCard = ({
  movie,
  inWatchList,
  watched,
}: {
  movie: Movie;
  inWatchList?: boolean;
  watched?: boolean;
}) => {
  const styles = useStyles({ color: getRatingColor(movie.vote_average) });

  const [cardFlipped, setCardFlipped] = useState(false);

  return (
    <Box className={styles.wrapper}>
      <Card
        className={clsx(
          styles.card,
          styles.cardBack,
          !cardFlipped && styles.flip
        )}
      >
        <CardHeader
          title={movie.title}
          action={
            <IconButton
              onClick={() => setCardFlipped((prev) => !prev)}
              tabIndex={cardFlipped ? 0 : -1}
              aria-label='flip card'
            >
              <ArrowBackIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant='body2'>{movie.overview}</Typography>
        </CardContent>
      </Card>
      <Card className={clsx(styles.card, cardFlipped && styles.flip)}>
        <CardActionArea
          className={styles.actionArea}
          onClick={() => setCardFlipped((prev) => !prev)}
          tabIndex={cardFlipped ? -1 : 0}
          aria-label='flip card'
        >
          {movie.poster_path ? (
            <CardMedia image={movie.poster_path} className={styles.media} />
          ) : (
            <div className={styles.media + ' ' + styles.noPoster}>
              no poster
            </div>
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
            flipped={cardFlipped}
          />
        </CardActions>
      </Card>
    </Box>
  );
};

export default MovieCard;
