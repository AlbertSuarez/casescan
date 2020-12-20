import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';
import { getClinicalCaseById } from '../../store/clinicalCases';
import { getSimilarityById } from '../../store/search';
import ClickableCard from "../ClickableCard/ClickableCard";
import { keysOrder } from '../../store/clinicalCases';
import SimilarCases from '../SimilarCases/SimilarCases';

const useStyles = makeStyles((theme) =>  ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `4px 0 0 4px`,
      },
    },
  },
  input: {
    width: "100%",
  },
  containerSearch: {
    display: "flex",
    paddingLeft: "1em",
    width: '100%'
  },
  container: {
    padding: '2em'
  },
  itemButton: {
    marginTop: '1em',
    width: '100%',
    display:'flex',
    justifyContent: 'center'
  },
  itemResult: {
    marginTop: '2em'
  },
  resultHeader: {
    marginBottom: '2em'
  }
}));

function SearchById() {
  const classes = useStyles();
  const [input, setInput] = React.useState('');
  const [data, setData] = React.useState({
    clinicalCase: {
      case_id: '',
      sections: {}
    },
    results: {}
  });
  const [selected, setSelected] = React.useState([]);

  function transform(key) {
    let result = key.replace('_', ' ');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  /** HANDLERS */
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    if (!Object.keys(data.clinicalCase.sections).length && input) {
      const clinicalCase = await getClinicalCaseById(input);
      setData({
        clinicalCase: clinicalCase[0],
        results: {},
      });
    } else if (Object.keys(data.clinicalCase.sections).length) {
      let sections = []
      keysOrder.map((element, index) => {
        if(selected[index]) {
          sections.push(element)
        }
      })
      const results = await getSimilarityById({ case_id: data.clinicalCase.case_id, sections });
      setData({
        results,
        clinicalCase: { ...data.clinicalCase, sections: [] }
      })
    }
  }

  const handleSelect = (values) => {
    setSelected(values)
  }

  /** COMPUTED */
  const showClinicalCase = () => {
    if (Object.keys(data.clinicalCase.sections).length) return true
    else return false
  }

  const showResults = () => {
    if (Object.keys(data.results).length) return true
    else return false
  }

  const renderSearch = function () {
    return (
      <Paper component="form" className={classes.containerSearch}>
        <InputBase
          className={classes.input}
          placeholder="Search clinical case by id"
          value={input}
          onChange={handleChange}
          fullWidth
          inputProps={{ "aria-label": "search clinical case" }}
        />
        <IconButton
          className={classes.iconButton}
          onClick={handleClick}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  };

  const renderResults = function () {

    let all = Object.keys(data.results);
    all = all.map((element) => transform(element));
    all = all.join(", ");
    return (
      <Grid container direction="column" className={classes.itemResult}>
        <Grid item className={classes.resultHeader}>
          <Typography variant="subtitle1">Clinics cases similarities with clinical case <b>{data.clinicalCase.case_id}</b>. </Typography>
          <Typography variant="subtitle2">Topic(s): {all}</Typography>
        </Grid>
        <SimilarCases sections={data.results} />
      </Grid>
    )
  }
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>{renderSearch()}</Grid>
      {
        showClinicalCase() &&
        <Grid item>
          <ClickableCard sections={data.clinicalCase.sections} onSelect={handleSelect} />
        </Grid>
      }
      {
        showClinicalCase() &&
        <Grid item className={classes.itemButton}>
          <Button variant="contained" color="secondary" onClick={handleClick}>Search similarity</Button>
        </Grid>
      }
      {
        showResults() && renderResults()
      }
    </Grid>
  )
}

export default SearchById;