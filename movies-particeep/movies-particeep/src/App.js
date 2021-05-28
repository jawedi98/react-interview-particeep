import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Category from "./components/Category";
import MovieCard from "./components/MovieCard";
import PageButtons from "./components/PageButtons";
import PageNumber from "./components/PageNumber";
import { fetchMovies } from "./redux/slices/moviesSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const movies = useSelector((state) => state.movies.movies);
  const categories = useSelector((state) => state.movies.categories);
  const perPage = useSelector((state) => state.movies.perPage);
  const offset = useSelector((state) => state.movies.offset);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const showPage = () => {
    let toRender = [];
    const moviesShown = movies.filter((m) => m.show);
    if (moviesShown.length > 0) {
      for (
        let index = offset;
        index < Math.min(perPage + offset, moviesShown.length);
        index++
      ) {
        if (moviesShown[index].show)
          toRender.push(
            <MovieCard
              className={classes.paper}
              key={index}
              movie={moviesShown[index]}
            />
          );
      }
    }
    return toRender;
  };
  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <PageNumber />
        <Grid container className={classes.categories} spacing={4}>
          <Grid container direction="row" justify="center" alignItems="center">
            {categories.map((cat, index) => (
              <Category category={cat} key={index} />
            ))}
          </Grid>
        </Grid>
        <Grid container className={classes.root} spacing={4}>
          <Grid container direction="row" justify="center" alignItems="center">
            {showPage()}
          </Grid>
        </Grid>
        <PageButtons />
      </Grid>
    </Container>
  );
}

export default App;
