import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Grid, makeStyles } from '@material-ui/core';
import { keysOrder } from '../../store/clinicalCases';
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

  function transform(key) {
    let result = key.replace('_', ' ');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const handleClick = (event) => {
    const id = event.currentTarget.id;
    for(let i in keysOrder) {
      if (keysOrder[i] === id) {
        let newSelected = [...selected];
        newSelected[i] = !selected[i];
        setSelected([...newSelected]);
        props.onSelect(newSelected); 
        break;
      }
    }
  }

  const renderItems = () => {
    let result = []
    keysOrder.map((key, index) => {
      result.push(
        <Card square fullWidth className={selected[index] ? classes.cardClicked : classes.card} >
          <ButtonBase
            className={classes.cardAction}
            onClick={(event) => handleClick(event)}
            id={key}
          >
            <CardContent>
              <Typography variant="h6">{transform(key)}</Typography>
              <Typography variant="body">{props.sections[key]}</Typography>
            </CardContent>
          </ButtonBase>
        </Card>
      );
    });
    return result;
  }

  return (
    <Grid container direction="row">
      {renderItems()}
    </Grid>
  );
}

export default ClickableCard;