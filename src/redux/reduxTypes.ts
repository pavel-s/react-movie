import { Movie } from '../types';

type RequestStatus = 'ready' | 'fetching' | 'success' | 'error';

export type WatchListItem = { id: number; dateAdded: number };
export type WatchedItem = { id: number; dateAdded: number };
export type UserState = {
  watchList: WatchListItem[];
  watched: WatchedItem[];
};

export type WatchListStateItem = WatchListItem & {
  status: RequestStatus;
  movie?: Movie;
};

export type WatchListState = {
  // items: (WatchListItem & { status: RequestStatus; movie?: Movie })[];
  [key: string]: WatchListStateItem;
};

export type WatchedStateItem = WatchedItem & {
  status: RequestStatus;
  movie?: Movie;
};

export type WatchedState = {
  [key: string]: WatchedStateItem;
};
