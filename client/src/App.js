import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Menu from './components/Menu/Menu';
import ClinicalCases from './components/ClinicalCases/ClinicalCases';
import Search from './components/Search/Search';
import Stats from './components/Stats/Stats';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'inherit'
  },
}));


function App() {

  const classes = useStyles();
  return (
    <Router>
      <Grid container direction="row" justify="strech" className={classes.container}>
        <Grid item>
          <Menu/>
        </Grid>
        <Grid item>
          <Switch>
            <Route path="/clinical-cases">
              <ClinicalCases />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
