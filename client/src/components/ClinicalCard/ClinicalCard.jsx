import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
});

function ClinicalCard(props) {
  const classes = useStyles();

  return (<Card variant='outlined' className={classes.root}>
    <CardContent >
    <Typography variant="h5" component="h2">Case id: {props.case_id}</Typography>
      {
        Object.keys(props.sections).map(key => {
          return (
            <div>
              <Typography variant="h6">{key}</Typography>
              <Typography variant="body">{props.sections[key]}</Typography>
            </div>
          )
        })
      }
    </CardContent>
  </Card>);
}

export default ClinicalCard;
