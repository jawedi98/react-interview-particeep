import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovies,
  addLike,
  addDislike,
  removeLike,
  removeDislike,
} from "../../redux/slices/moviesSlice";
import { Box, IconButton, LinearProgress } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    maxWidth: 400,
    margin: "20px",
  },
  media: {
    height: 140,
  },
  actions: {
    justifyContent: "space-around",
  },
});

export default function MovieCard({ movie }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [likeDislike, setLikeDislike] = useState(0);
  const stateMovie = useSelector((state) =>
    state.movies.movies.find((m) => m.id === movie.id)
  );

  const handleDelete = () => {
    dispatch(deleteMovies(movie.id));
  };

  const handleDislike = () => {
    if (likeDislike === 1) {
      dispatch(addDislike(movie.id));
      dispatch(removeLike(movie.id));
      setLikeDislike((oldState) => (oldState = -1));
    } else if (likeDislike === 0) {
      dispatch(addDislike(movie.id));
      setLikeDislike((oldState) => (oldState = -1));
    }
  };
  const handleLike = () => {
    if (likeDislike === -1) {
      dispatch(addLike(movie.id));
      dispatch(removeDislike(movie.id));
      setLikeDislike((oldState) => (oldState = 1));
    } else if (likeDislike === 0) {
      dispatch(addLike(movie.id));
      setLikeDislike((oldState) => (oldState = -1));
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Box>
          <IconButton aria-label="like" onClick={handleLike}>
            <ThumbUpIcon color={likeDislike === 1 ? `primary` : "inherit"} />{" "}
            {stateMovie.likes}
          </IconButton>
          <IconButton aria-label="dislike" onClick={handleDislike}>
            <ThumbDownIcon
              color={likeDislike === -1 ? `secondary` : "inherit"}
            />{" "}
            {stateMovie.dislikes}
          </IconButton>
          <LinearProgress
            variant="determinate"
            value={
              (
                stateMovie.likes /
                (stateMovie.likes + stateMovie.dislikes)
              ).toFixed(3) * 100
            }
          />
        </Box>
      </CardActions>
    </Card>
  );
}
