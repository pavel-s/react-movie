import { Box, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { useAppDispatch } from '../../redux/hooks';
import {
  userWatchedAddItem,
  userWatchedRemoveItem,
  userWatchListAddItem,
  userWatchListRemoveItem,
} from './../../redux/userReducer';
import { ComponentPropsWithoutRef, FC } from 'react';

const useStyles = makeStyles({
  button: { color: 'lightgray', '&:hover': { color: 'white' } },
});

const Action: FC<
  ComponentPropsWithoutRef<typeof IconButton> & { tooltip: string }
> = ({ tooltip, children, ...rest }) => {
  const styles = useStyles();
  return (
    <Tooltip title={tooltip}>
      <IconButton className={styles.button} {...rest}>
        {children}
      </IconButton>
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
    <Box>
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
    </Box>
  );
};

export default MovieCardActions;
