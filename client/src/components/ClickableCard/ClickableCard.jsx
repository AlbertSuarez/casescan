import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Grid, makeStyles } from '@material-ui/core';
import { sectionsOrder } from '../../store/data';
import { transform } from '../../utils/data';

const useStyles = makeStyles((theme) => (
  {
    card: {
      width: 'inherit',
      marginTop: '0.5em',
      marginBottom: '0.5em'
    },
    cardAction: {
      display: 'block',
      textAlign: 'justify'
    },
    cardClicked: {
      width: 'inherit',
      marginTop: '0.5em',
      marginBottom: '0.5em',
      backgroundColor: theme.palette.secondary.light
    }
  }
))
function ClickableCard (props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([false, false, false, false, false, false])

  const handleClick = (event) => {
    const id = event.currentTarget.id;
    for(let i in sectionsOrder) {
      if (sectionsOrder[i] === id) {
        let newSelected = [...selected];
        newSelected[i] = !selected[i];
        setSelected([...newSelected]);
        props.onSelect(newSelected); 
        break;
      }
    }
  }

  const renderItems = () => {
    return sectionsOrder.map((key, index) => {
      return (
        <Card square fullWidth className={selected[index] ? classes.cardClicked : classes.card} >
          <ButtonBase
            className={classes.cardAction}
            onClick={(event) => handleClick(event)}
            id={key}
          >
            <CardContent>
              <Typography variant="h6">{transform(key)}</Typography>
              <Typography variant="body1">{props.sections[key]}</Typography>
            </CardContent>
          </ButtonBase>
        </Card>
      );
    });
  }

  return (
    <Grid container direction="row">
      {renderItems()}
    </Grid>
  );
}

export default ClickableCard;