import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import ClinicalCard from "../ClinicalCard/ClinicalCard";
import { transform } from '../../utils/data';
import { sectionsOrder } from '../../store/data';

const useStyles = makeStyles((theme) =>  (
  {
    container: {
      marginBottom: '2em'
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

function SimilarCases(props) {
  const classes = useStyles();

  function renderSections() {
    let result = sectionsOrder.map((key) => {
      if(!(key in props.sections)) return
      return <Grid container direction="column" >
        <Typography variant="subtitle1" component="h2" className={classes.title}>Section: {transform(key)}</Typography>
        <Divider className={classes.divider}/>
        {
          props.sections[key].map((clinicCase) => {
            return (
              <div className={classes.container}>
                <ClinicalCard 
                  case_id={clinicCase.case_id}
                  sections={clinicCase.sections}
                  percentage={clinicCase.percentage} />
              </div>
            )
          })
        }
      </Grid>
    })
    return result;
  }
  return <Grid item>{renderSections()}</Grid>;
}

export default SimilarCases;
