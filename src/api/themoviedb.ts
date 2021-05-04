import axios, { AxiosResponse } from 'axios';
import { Movie } from '../types';
const API_KEY = process.env.REACT_APP_TMDB_KEY;

const instance = axios.create();

class API {
  private initializing = true;
  private config: ApiConfig = null;
  private async getApiConfig() {
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
        (this.config.images.poster_sizes.includes('w500')
          ? 'w500'
          : this.config.images.poster_sizes[0]) +
        poster
      );
    } else {
      return '';
    }
  }
  constructor() {
    this.getApiConfig();
  }
  async getMovie(id: string) {
    try {
      const result = await instance.get<any, AxiosResponse<Movie>>(
        `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`
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
  // get trending item list for last week
  async getTrending(type: 'movie' | 'tv' = 'movie') {
    try {
      const result = await instance.get<any, AxiosResponse<TrendingResponse>>(
        `https://api.themoviedb.org/3/trending/${type}/week?api_key=${API_KEY}`
      );

      const resultsPopulated = await Promise.all(
        result.data.results.map(async (movie) => {
          const posterUrl = await this.makePosterUrl(movie.poster_path, true);
          return { ...movie, poster_path: posterUrl };
        })
      );

      return { ...result.data, results: resultsPopulated };
    } catch (error) {
      console.log(error);
    }
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

type TrendingResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
