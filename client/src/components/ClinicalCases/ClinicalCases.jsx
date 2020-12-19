import React from 'react';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      height: '100%',
      padding: '1em'
    },
  }));

function ClinicalCases () {
    const classes = useStyles();
    return(
    <div className={classes.root}>
        <Typography variant={"h4"}>
            Casos clinics
        </Typography>
    </div>
    );
}

export default ClinicalCases;