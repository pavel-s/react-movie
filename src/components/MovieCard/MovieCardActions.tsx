import { ComponentPropsWithoutRef, FC } from 'react';
import { CardActions, IconButton, Tooltip, styled } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useAppDispatch } from '../../redux/hooks';
import {
  userWatchedAddItem,
  userWatchedRemoveItem,
  userWatchListAddItem,
  userWatchListRemoveItem,
} from './../../redux/userReducer';

const MCardActions = styled(CardActions)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 256,
  '&:hover': {
    backgroundColor: 'rgb(1,1,1, 0.3)',
  },
});

const MActionButton = styled(IconButton)({
  color: 'lightgray',
  '&:hover': { color: 'white' },
});

const Action: FC<
  ComponentPropsWithoutRef<typeof IconButton> & { tooltip: string }
> = ({ tooltip, children, ...rest }) => {
  return (
    <Tooltip title={tooltip}>
      <MActionButton size='large' {...rest}>
        {children}
      </MActionButton>
    </Tooltip>
  );
};

const MovieCardActions = ({
  id,
  inWatchList,
  watched,
  flipped,
}: {
  id: number;
  inWatchList?: boolean;
  watched?: boolean;
  flipped?: boolean;
}) => {
  const dispatch = useAppDispatch();

  const handleWatchListAdd = () => dispatch(userWatchListAddItem(id));
  const handleWatchListRemove = () => dispatch(userWatchListRemoveItem(id));

  const handleWatchedAdd = () => dispatch(userWatchedAddItem(id));
  const handleWatchedRemove = () => dispatch(userWatchedRemoveItem(id));

  const tabIndex = flipped ? -1 : 0;

  return (
    <MCardActions>
      {inWatchList ? (
        <Action
          tooltip='remove from watch list'
          onClick={handleWatchListRemove}
          tabIndex={tabIndex}
        >
          <HighlightOffRoundedIcon />
        </Action>
      ) : (
        <Action
          tooltip='add to watch list'
          onClick={handleWatchListAdd}
          tabIndex={tabIndex}
        >
          <AddBoxOutlinedIcon />
        </Action>
      )}

      {watched ? (
        <Action
          tooltip='remove from watched'
          onClick={handleWatchedRemove}
          tabIndex={tabIndex}
        >
          <VisibilityOffOutlinedIcon />
        </Action>
      ) : (
        <Action
          tooltip='add to watched'
          onClick={handleWatchedAdd}
          tabIndex={tabIndex}
        >
          <VisibilityOutlinedIcon />
        </Action>
      )}
    </MCardActions>
  );
};

export default MovieCardActions;
