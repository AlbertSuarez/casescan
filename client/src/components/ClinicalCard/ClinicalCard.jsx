import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid, Chip, CardActionArea, Button, Avatar } from "@material-ui/core";
import { sectionsOrder } from '../../store/data';
import { transform } from '../../utils/data';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme) =>  (
  {
    root: {
      minWidth: 275
    },
    title: {
      textAlign: 'left',
      textTransform: 'uppercase',
      color: theme.palette.text.secondary,
      marginBottom: '0.5em',
      fontSize: '18px'
    },
    subtitle: {
      textTransform: 'uppercase',
      fontWeight: 600
    },
    paragraph: {
      textAlign: 'justify',
    },
    divider: {
      marginBottom: '1em'
    },
    section: {
      marginBottom: '1em'
    },
    cardOpen: {
      height: 'auto'
    }, 
    cardClose: {
      maxHeight: '20em'
    },
    actionArea: {
      backgroundColor: 'white',
      textAlign: 'center'
    }
  }));


function ClinicalCard(props) {
  const classes = useStyles();
  const [opened, setOpened] = React.useState(false)
  return (<Card variant='outlined' className={classes.root} square>
    <CardContent className={opened ? classes.cardOpen : classes.cardClose}>
    <Grid container justify='space-between'>
      <Grid item>
        <Typography variant="h6" component="h2" className={classes.title}>Case id: {props.case_id}</Typography>
      </Grid>
      {
        props.percentage &&
        <Grid item>
          <Chip avatar={<Avatar>%</Avatar>} label={props.percentage}  variant="outlined" />
        </Grid>
      }
    </Grid>
    <Divider className={classes.divider}/>
      {
        sectionsOrder.map(key => {
          if (key in props.sections) {
            return (
              <div className={classes.section}>
                <Typography variant="subtitle1" className={classes.subtitle}>{transform(key)}</Typography>
                <Typography variant="body1" className={classes.paragraph}>{props.sections[key]}</Typography>
              </div>
            )
          }
        })
      }
    </CardContent>
    <CardActionArea className={classes.actionArea}>
      <Button onClick={() => {setOpened(!opened)}}>
        {
          opened
          ? <ExpandLessIcon /> 
          : <ExpandMoreIcon />
        }
      </Button>
    </CardActionArea>
  </Card>);
}

export default ClinicalCard;
