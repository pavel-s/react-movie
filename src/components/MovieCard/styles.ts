import { Box, Card, CardActionArea, CardMedia, styled } from '@mui/material';

const POSTER_HOVER_SCALE = 1.03;

export const MCard = styled(Card, {
  shouldForwardProp: (propName) => propName !== 'isBack' && propName !== 'flip',
})<{ isBack?: boolean; flip?: boolean }>(({ isBack, flip }) => ({
  position: isBack ? 'absolute' : 'relative',
  top: isBack ? 0 : undefined,
  width: 256,
  minHeight: 480,
  borderRadius: 16,
  boxShadow: 'none',
  transition: '0.3s',
  backfaceVisibility: 'hidden',

  transform: isBack
    ? flip
      ? undefined
      : 'rotateY(180deg)'
    : flip
    ? 'rotateY(180deg)'
    : undefined,
}));

export const MCardActionArea = styled(CardActionArea)({
  borderRadius: 16,
  maxWidth: 256,
  height: 384,
  overflow: 'hidden',
  '&:focus > *': {
    transform: `scale(${POSTER_HOVER_SCALE})`,
  },
});

export const MCardMedia = styled(CardMedia)({
  height: 384,
  transition: '0.2s',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '&:hover': {
    transform: `scale(${POSTER_HOVER_SCALE})`,
  },
});

export const Rating = styled(Box)({
  position: 'absolute',
  width: 30,
  height: 30,
  top: 10,
  right: 10,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 14,
  borderRadius: '50%',
  padding: 3,
  zIndex: 1,
});
