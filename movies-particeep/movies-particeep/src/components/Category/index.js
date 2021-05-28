import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/slices/moviesSlice";

const useStyles = makeStyles({
  root: {
    margin: "20px",
  },
  media: {
    height: 140,
  },
});

export default function Category({ category }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const exist = useSelector((state) =>
    state.movies.selectedCategory.findIndex((cat) => cat === category)
  );

  const handleSelect = () => {
    dispatch(selectCategories(category));
  };

  return (
    <Button
      variant="contained"
      color={exist !== -1 ? "secondary" : "primary"}
      className={classes.root}
      onClick={handleSelect}
    >
      {category}
    </Button>
  );
}
