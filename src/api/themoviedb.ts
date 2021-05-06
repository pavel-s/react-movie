import axios, { AxiosResponse } from 'axios';
import { Movie } from '../types';
require('dotenv').config();
const API_KEY = process.env.REACT_APP_TMDB_KEY;

const POSTER_IMAGE_SIZE = 'w500';

const instance = axios.create();

class API {
  private initializing = true;
  private config: ApiConfig = null;
  private async getApiConfig() {
    this.initializing = true;
    try {
      const result = await instance.get<any, AxiosResponse<ApiConfig>>(
        `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`
      );
      this.config = result.data;
    } catch (error) {
      console.log(error);
    } finally {
      this.initializing = false;
    }
  }
  private async makePosterUrl(
    poster: string,
    skipConfigCheck: boolean = false
  ) {
    if (!this.config && !this.initializing && !skipConfigCheck) {
      await this.getApiConfig();
    }
    if (this.config) {
      return (
        this.config.images.base_url +
        (this.config.images.poster_sizes.includes(POSTER_IMAGE_SIZE)
          ? POSTER_IMAGE_SIZE
          : this.config.images.poster_sizes[0]) +
        poster
      );
    } else {
      return '';
    }
  }
  /**
   * @param url - specific api request url
   */
  private async getMoviesList(url: string) {
    try {
      const result = await instance.get<any, AxiosResponse<MoviesListResponse>>(
        url
      );

      const resultsPopulated = await Promise.all(
        result.data.results.map(async (movie) => {
          if (!movie.poster_path) {
            return movie;
          }
          const posterUrl = await this.makePosterUrl(movie.poster_path, true);
          return { ...movie, poster_path: posterUrl };
        })
      );

      return { ...result.data, results: resultsPopulated };
    } catch (error) {
      console.log(error);
    }
  }
  constructor() {
    this.getApiConfig();
  }
  async getMovie(id: number = 550) {
    try {
      const result = await instance.get<any, AxiosResponse<Movie>>(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const posterUrl = await this.makePosterUrl(result.data.poster_path);

      return {
        ...result.data,
        poster_path: posterUrl,
      } as Movie;
    } catch (error) {
      console.log(error);
    }
  }
  // search for movies
  async searchMovies(query: string, page: number = 1) {
    const result = await this.getMoviesList(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=${page}&include_adult=false`
    );
    return result;
  }
  // get trending item list for last week
  async getTrending(type: 'movie' | 'tv' = 'movie') {
    const result = await this.getMoviesList(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=${API_KEY}`
    );
    return result;
  }
}

export const themoviedbAPI = new API();

type ApiConfig = {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
} | null;

type MoviesListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type TrendingResponse = MoviesListResponse;
export type SearchResponse = TrendingResponse;
