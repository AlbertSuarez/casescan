import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Menu from './components/Menu/Menu';
import ClinicalCases from './components/ClinicalCases/ClinicalCases';
import Search from './components/Search/Search';
import Stats from './components/Stats/Stats';
import theme from './theme';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'inherit'
  },
}));


function App() {

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Grid container direction="row" className={classes.container}>
          <Grid item sm={2}>
            <Menu/>
          </Grid>
          <Grid item sm={10}>
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
    </ThemeProvider>
  );
}

export default App;
