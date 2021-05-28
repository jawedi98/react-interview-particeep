import { Avatar, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  goBackPage,
  goNextPage,
} from "../../redux/slices/moviesSlice";

const useStyles = makeStyles((theme) => ({
  pagination: {
    margin: "40px 0",
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: "0 10px",
  },
  avatarSelected: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: "0 10px",
    backgroundColor: theme.palette.primary.main,
  },
}));

function PageButtons() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const movies = useSelector((state) => state.movies.movies);
  const perPage = useSelector((state) => state.movies.perPage);
  const offset = useSelector((state) => state.movies.offset);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    setPage(offset / perPage);
  }, [offset, perPage]);

  const renderPages = () => {
    let toRender = [];
    const moviesShown = movies.filter((m) => m.show);
    if (moviesShown.length > 0) {
      for (
        let index = 0;
        index < Math.ceil(moviesShown.length / perPage);
        index++
      ) {
        toRender.push(
          <Avatar
            key={index}
            className={page === index ? classes.avatarSelected : classes.avatar}
          >
            {index}
          </Avatar>
        );
      }
    }
    return toRender;
  };

  const goBack = () => {
    dispatch(goBackPage());
  };
  const goNext = () => {
    dispatch(goNextPage());
  };

  return (
    <Grid container className={classes.pagination} spacing={4}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button variant="contained" color="primary" onClick={goBack}>
          Precedent
        </Button>
        {renderPages()}
        <Button variant="contained" color="primary" onClick={goNext}>
          Suivant
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageButtons;
