import React from "react";
import { Button, Grid, InputBase, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { sectionsOrder } from '../../store/data';
import { getSimilarityByText } from '../../store/search';
import { transform } from '../../utils/data';

import SimilarCases from "../SimilarCases/SimilarCases";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: '3em',
    paddingLeft: '3em',
    paddingTop: '2em'
  },
  paragraph:{ 
    marginBottom: '1em'
  },
  paragraphTitle: {
    fontWeight: 500,
    marginBottom: '0.5em'
  },
  input: {
    width: '100%',
    padding: '1em'
  },
  button: {
    borderRadius: '0',
    paddingTop: '0.7em',
    paddingBottom: '0.7em'
  }
}));

function SearchByText() {
  const classes = useStyles();
  const initValues = sectionsOrder.map(() => {
    return ''
  })
  const [values, setValues] = React.useState(initValues);
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [result]);
  
  const handleChange = (event) => {
    const id = event.currentTarget.id;
    let newValues = [...values];
    newValues[id] = event.currentTarget.value;
    setValues([...newValues]);
  }

  const handleClick = async () => {
    let section_names = sectionsOrder.map((el , index) => {
      if (values[index].length) {
        return values[index]
      }
    })
    const res = await getSimilarityByText({ section_names })
    await setResult(res)
  }

  const showResults = () => {
    if (Object.keys(result).length) return true;
    else return false;
  }

  function renderFormSections() {
    let inputSections = sectionsOrder.map((key, index) => {
      return (
        <Grid item className={classes.paragraph}>
          <Typography className={classes.paragraphTitle}>{transform(sectionsOrder[index])}</Typography>
          <Paper square>
            <InputBase
              className={classes.input}
              value = {values[index]}
              onChange={(event) => handleChange(event)}
              id = {index}
              multiline={true}
              rows={4}
            />
          </Paper>
        </Grid>
      )
    })
    return (
      <Grid container direction="column">
        {inputSections}
      </Grid>
    )
  }
  return (
    <Grid container direction="column" className={classes.container}>
      {      
        !showResults() &&
        <Grid item>
          {renderFormSections()}
        </Grid>
      }
      {
        !showResults() &&
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleClick}
          >
            SEARCH SIMILAR CLINICAL CASE
          </Button>
      </Grid>
      }
      {
        showResults &&
        <Grid item>
          <SimilarCases sections={result}/>
        </Grid>
      }
    </Grid>
  );
}

export default SearchByText;
