import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `4px 0 0 4px`,
      },
    },
  },
  container: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
    width: "inherit",
    backgroundColor: theme.palette.grey[100],
  },
  containerBody: {
    padding: '2em',
    paddingTop: '1em'
  },
  itemHeader: {
    backgroundColor: theme.palette.primary.main,
    padding: '2em',
    paddingTop: '2em'
  }
}));


function Search() {

  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item className={classes.itemHeader}>
        <Typography variant="h4">Search similarity</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" className={classes.containerBody}>
          <Grid item className={classes.itemSearch}>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Search;
