import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

import { Link } from "react-router-dom";
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    paddingTop: '2em',
  },
  ul: {
    textDecoration: 'none',
    width: '100% !important',
    justifyContent: 'center'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    textAlign: 'center',
    "&:visited": {
      textDecoration: 'none'
    },
    "&:hover": {
      textDecoration: 'none'
    },
    "&:focus": {
      textDecoration: 'none'
    },
    "&:active": {
      textDecoration: 'none'
    }
  },
  item: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  }
}));

function Menu() {
  const classes = useStyles();

  const items = [
    {
      text: 'Clinic cases',
      icon: <DescriptionOutlinedIcon />,
      href: '/clinical-cases'
    },
    {
      text: 'Search similarities',
      icon: <SearchIcon />,
      href: 'search'
    }
  ]

  return (
    <Paper className={classes.root}>
      <List className={classes.ul}>
        {
          items.map((item) => {
            return (
              <Link to={item.href} style={{ textDecoration: 'none' }} className={classes.link} >
                <ListItem className={classes.item} key={item.text}>
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