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

const useStyles = makeStyles((theme) => ({
  buttons: { color: 'lightgray', '&:hover': { color: 'white' } },
}));

const MovieCardActions = ({
  id,
  inWatchList,
  watched,
}: {
  id: number;
  inWatchList?: boolean;
  watched?: boolean;
}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const handleWatchListAdd = () => dispatch(userWatchListAddItem(id));
  const handleWatchListRemove = () => dispatch(userWatchListRemoveItem(id));

  const handleWatchedAdd = () => dispatch(userWatchedAddItem(id));
  const handleWatchedRemove = () => dispatch(userWatchedRemoveItem(id));

  return (
    <Box>
      {inWatchList ? (
        <Tooltip title='remove from watch list'>
          <IconButton
            className={styles.buttons}
            onClick={handleWatchListRemove}
          >
            <HighlightOffRoundedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='add to watch list'>
          <IconButton className={styles.buttons} onClick={handleWatchListAdd}>
            <AddBoxOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}

      {watched ? (
        <Tooltip title='remove from watched'>
          <IconButton className={styles.buttons} onClick={handleWatchedRemove}>
            <VisibilityOffOutlinedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='add to watched'>
          <IconButton className={styles.buttons} onClick={handleWatchedAdd}>
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default MovieCardActions;
