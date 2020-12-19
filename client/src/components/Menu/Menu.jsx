import React from 'react';
import { makeStyles, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    paddingRight: '1em'
  },
  ul: {
    textDecoration: 'none',
    listStyle: 'none'
  }
}));

function Menu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const items = [
    {
      text: 'Casos clínics',
      icon: <DescriptionOutlinedIcon />,
      href: '/clinical-cases'
    },
    {
      text: 'Busquedes',
      icon: <SearchIcon />,
      href: 'search'
    },
    {
      text: 'Estadístiques',
      icon: <EqualizerOutlinedIcon />,
      href: '/stats'
    },
  ]

  return (
    <Paper className={classes.root}>
      <List>
        {
          items.map((item) => {
            return (
              <Link to={item.href} className={classes.ul} >
                <ListItem key={item.text}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            )
          })
        }
      </List>
    </Paper>
  );
}

export default Menu;