import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) =>  (
  {
    root: {
      minWidth: 275,
    },
    title: {
      textAlign: 'left',
      textTransform: 'uppercase',
      color: theme.palette.text.secondary,
      lineHeight: '2em'
    },
    subtitle: {
      textTransform: 'uppercase',
      fontWeight: 500
    },
    paragraph: {
      textAlign:'justify',
    },
    divider: {
      marginBottom: '1em'
    },
    pos: {
      marginBottom: 12,
    },
  }));


function ClinicalCard(props) {
  const classes = useStyles();
  const keysOrder = [
    'medical_history',
    'physic_exploration',
    'supplementary_tests',
    'assessment',
    'treatment',
    'evolution'
  ]
  function transform(key) {
    let result = key.replace('_', ' ')
    return result.charAt(0).toUpperCase() + result.slice(1)
  }
  return (<Card variant='outlined' className={classes.root} square>
    <CardContent >
    <Grid container justify='space-between'>
      <Grid item>
        <Typography variant="h6" component="h2" className={classes.title}>Case id: {props.case_id}</Typography>
      </Grid>
      {
        props.percentage &&
        <Grid item>
          <Chip label={props.percentage} />
        </Grid>
      }
    </Grid>
    <Divider className={classes.divider}/>
      {
        keysOrder.map(key => {
          if (key in props.sections) {
            return (
              <div>
                <Typography variant="subtitle1" className={classes.subtitle}>{transform(key)}</Typography>
                <Typography variant="body" className={classes.paragraph}>{props.sections[key]}</Typography>
              </div>
            )
          }
        })
      }
    </CardContent>
  </Card>);
}

export default ClinicalCard;
