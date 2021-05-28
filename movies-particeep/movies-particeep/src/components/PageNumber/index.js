import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setPerPage } from "../../redux/slices/moviesSlice";

const useStyles = makeStyles(() => ({
  categories: {
    margin: "50px 0",
  },
  formControl: {
    width: "20vw",
  },
}));

function PageNumber() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const perPage = useSelector((state) => state.movies.perPage);
  const handleChange = (e) => {
    dispatch(setPerPage(e.target.value));
  };

  return (
    <Grid container className={classes.categories} spacing={4}>
      <Grid container direction="row" justify="center" alignItems="center">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Per Page
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={perPage}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default PageNumber;
