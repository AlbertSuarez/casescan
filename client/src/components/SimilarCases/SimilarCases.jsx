import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import ClinicalCard from "../ClinicalCard/ClinicalCard";

const useStyles = makeStyles((theme) =>  (
  {
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

function SimilarCases(props) {

  const classes = useStyles();

  function transform(key) {
    let result = key.replace('_', ' ');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  function renderSections() {
    let result = Object.keys(props.sections).map((key) => {
      return <Grid container direction="column" >
        <Typography variant="subtitle1" component="h2" className={classes.title}>Section: {transform(key)}</Typography>
        <Divider className={classes.divider}/>
        {
          props.sections[key].map((clinicCase) => {
            return <ClinicalCard case_id={clinicCase.case_id} sections={clinicCase.sections} percentage={clinicCase.percentage} />
          })
        }
      </Grid>
    })
    return result;
  }
  return <Grid item>{renderSections()}</Grid>;
}

export default SimilarCases;
