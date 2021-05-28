import { combineReducers } from "redux";

import movies from "./slices/moviesSlice";

const reducers = combineReducers({ movies });

export default reducers;
