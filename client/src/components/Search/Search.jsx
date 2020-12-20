import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import SearchById from './SearchById';
import SearchByText from "./SearchByText";
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
  itemSearch: {
    backgroundColor: theme.palette.primary.main
  },
  paperSearch: {
    padding: '2em',
    paddingTop: '1em',
    paddingBottom: '0.5em',
    backgroundColor: theme.palette.primary.main 
  },
  itemHeader: {
    backgroundColor: theme.palette.primary.main,
    padding: '2em',
    paddingBottom: '0.5em'
  },
  indicator: {
    backgroundColor: theme.palette.primary.dark
  }
}));


function Search() {

  const classes = useStyles();
  const [step, setStep] = React.useState(0);

  const handleChange = (event, newValue) => {
    setStep(newValue);
  };


  const renderTabs = () => {
    if (!step) return <SearchById />
    else return <SearchByText />
  } 
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item className={classes.itemHeader}>
        <Typography variant="h4">Search similarities</Typography>
      </Grid>
      <Grid item className={classes.itemSearch}>
        <Paper className={classes.paperSearch} elevation={0} square>
          <Tabs
            value={step}
            onChange={handleChange}
            className={classes.tab}
            classes={{
              indicator: classes.indicator
            }}
          >
            <Tab label="By existing clinical case" />
            <Tab label="By text" />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item>
        {renderTabs()}
      </Grid>
    </Grid>
  );
}

export default Search;
