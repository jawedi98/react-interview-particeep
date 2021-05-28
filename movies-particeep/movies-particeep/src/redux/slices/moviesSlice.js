import { createSlice } from "@reduxjs/toolkit";
import { movies$ } from "../../movies";

let initialState = {
  movies: [],
  categories: [],
  errors: "",
  selectedCategory: [],
  perPage: 4,
  offset: 0,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    populateMovies(state, { payload }) {
      let movies = [];
      payload.forEach((movie) => movies.push({ ...movie, show: true }));
      state.movies = movies;
      const unique = [...new Set(payload.map((item) => item.category))];
      state.categories = unique;
    },
    // DeleteById()
    deleteMovies(state, action) {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload
      );
      if (index !== -1) {
        state.movies.splice(index, 1);
        const unique = [...new Set(state.movies.map((item) => item.category))];
        state.categories = unique;
        const selected = [];
        state.selectedCategory.forEach((item) => {
          if (unique.includes(item)) selected.push(item);
        });
        state.selectedCategory = selected;
        state.movies.forEach((m) => (m.show = true));
      }
    },
    addLike(state, { payload }) {
      const index = state.movies.findIndex((movie) => movie.id === payload);
      state.movies[index].likes += 1;
    },
    addDislike(state, { payload }) {
      const index = state.movies.findIndex((movie) => movie.id === payload);
      state.movies[index].dislikes += 1;
    },
    removeLike(state, { payload }) {
      const index = state.movies.findIndex((movie) => movie.id === payload);
      state.movies[index].likes -= 1;
    },
    removeDislike(state, { payload }) {
      const index = state.movies.findIndex((movie) => movie.id === payload);
      state.movies[index].dislikes -= 1;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    selectCategories(state, { payload }) {
      const index = state.selectedCategory.findIndex((cat) => cat === payload);
      if (index !== -1) {
        state.selectedCategory.splice(index, 1);
      } else {
        state.selectedCategory.push(payload);
      }
      state.movies.forEach((m) => {
        m.show =
          state.selectedCategory.length === 0
            ? true
            : state.selectedCategory.includes(m.category);
      });
    },
    goBackPage(state) {
      if (state.offset > 0) state.offset -= state.perPage;
    },
    goNextPage(state) {
      if (state.offset + state.perPage < state.movies.length)
        state.offset += state.perPage;
    },
    setPerPage(state, { payload }) {
      state.perPage = payload;
      state.offset = 0;
    },
  },
});

export const fetchMovies = () => async (dispatch) => {
  movies$.then((movies) => {
    dispatch(populateMovies(movies));
  });
  // .catch((error) => dispatch(setErrors(error)));
};

export const moviesSelector = (state) => {
  return [state.movies.movies, state.movies.errors];
};

export const {
  populateMovies,
  addMovies,
  deleteMovies,
  updateMovies,
  unselectMovies,
  selectCategories,
  setErrors,
  addDislike,
  addLike,
  goBackPage,
  goNextPage,
  setPerPage,
  removeLike,
  removeDislike,
} = moviesSlice.actions;

export default moviesSlice.reducer;
