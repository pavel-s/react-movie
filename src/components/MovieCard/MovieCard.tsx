import React, { FC, useState } from 'react';
import {
  Box,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  Typography,
} from '@mui/material';
import { Movie } from '../../types';
import MovieCardActions from './MovieCardActions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MCard, MCardActionArea, MCardMedia, Rating } from './styles';

const getRatingColor = (rating: number) => {
  if (rating < 5) return 'red';
  if (rating < 7) return 'yellow';
  return 'green';
};

const MovieCard: FC<
  React.ComponentPropsWithRef<typeof Box> & {
    movie: Movie;
    inWatchList?: boolean;
    watched?: boolean;
  }
> = ({ movie, inWatchList, watched, ...rest }) => {
  const [cardFlipped, setCardFlipped] = useState(false);

  const ratingBgColor = getRatingColor(movie.vote_average);
  const ratingColor = ratingBgColor === 'yellow' ? '#000' : '#fff';

  return (
    <Fade in>
      <Box position='relative' {...rest}>
        <MCard isBack={true} flip={cardFlipped}>
          <CardHeader
            title={movie.title}
            action={
              <IconButton
                onClick={() => setCardFlipped((prev) => !prev)}
                tabIndex={cardFlipped ? 0 : -1}
                aria-label='flip card'
                size='large'
              >
                <ArrowBackIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant='body2'>{movie.overview}</Typography>
          </CardContent>
        </MCard>

        <MCard flip={cardFlipped}>
          <MCardActionArea
            onClick={() => setCardFlipped((prev) => !prev)}
            tabIndex={cardFlipped ? -1 : 0}
            aria-label='flip card'
          >
            {movie.poster_path ? (
              <MCardMedia image={movie.poster_path} />
            ) : (
              <MCardMedia>no poster</MCardMedia>
            )}
          </MCardActionArea>
          <CardContent>
            <Typography variant='h3' fontSize={28} mb={1}>
              {movie.title}
            </Typography>
            <Typography variant='body1' color='info.dark' fontSize={14}>
              {movie.release_date}
            </Typography>
          </CardContent>
          <Rating bgcolor={ratingBgColor} color={ratingColor}>
            {movie.vote_average}
          </Rating>
          <MovieCardActions
            id={movie.id}
            inWatchList={inWatchList}
            watched={watched}
            flipped={cardFlipped}
          />
        </MCard>
      </Box>
    </Fade>
  );
};

export default MovieCard;
