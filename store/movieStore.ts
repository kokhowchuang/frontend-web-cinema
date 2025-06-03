import { create } from 'zustand';
import { Movie } from '../types/movie';

interface MovieState {
  movies: Movie[];
  loading: boolean;
  page: number;
  sort: string;
  setSort: (sort: string) => void;
  fetchMovies: (append?: boolean) => Promise<void>;
}

export const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  loading: false,
  page: 1,
  sort: 'primary_release_date.desc',
  setSort: (sort) => set({ sort, page: 1, movies: [] }),
  fetchMovies: async (append = false) => {
    const { page, sort, movies } = get();
    set({ loading: true });

    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=328c283cd27bd1877d9080ccb1604c91&sort_by=${sort}&page=${page}`
    );
    const data = await res.json();

    set({
      movies: append ? [...movies, ...data.results] : data.results,
      page: page + 1,
      loading: false,
    });
  },
}));
