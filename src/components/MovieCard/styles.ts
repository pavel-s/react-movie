import { makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

const POSTER_HOVER_SCALE = 1.03;

export const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
  },
  relative: {
    position: 'relative',
  },
  actionArea: {
    borderRadius: 16,
    maxWidth: 256,
    height: 384,
    overflow: 'hidden',
    '&:focus > *': {
      transform: `scale(${POSTER_HOVER_SCALE})`,
    },
  },
  card: {
    width: 256,
    minHeight: 480,
    borderRadius: 16,
    boxShadow: 'none',
    transition: '0.3s',
    backfaceVisibility: 'hidden',
  },
  flip: {
    transform: 'rotateY(180deg)',
  },
  hide: {
    display: 'none',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },
  actions: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 256,
    '&:hover': {
      backgroundColor: 'rgb(1,1,1, 0.3)',
    },
  },
  content: {
    padding: '1rem',
    paddingBottom: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#fff',
    opacity: 0.87,
    fontWeight: 500,
    fontSize: 14,
  },
  media: {
    height: 384,
    transition: '0.2s',
    '&:hover': {
      transform: `scale(${POSTER_HOVER_SCALE})`,
    },
  },
  noPoster: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  rating: ({ color }: { color: CSSProperties['color'] }) => ({
    position: 'absolute',
    width: 30,
    height: 30,
    top: 10,
    right: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color,
    color: color === 'yellow' ? '#000' : '#fff',
    fontWeight: 600,
    fontSize: 16,
    borderRadius: 30,
    padding: 3,
    zIndex: 1,
  }),
}));
