import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import { getClinicalCaseById } from '../../store/clinicalCases';
import { getSimilarityById } from '../../store/search';
import ClickableCard from "../ClickableCard/ClickableCard";
import { sectionsOrder } from '../../store/data';
import SimilarCases from '../SimilarCases/SimilarCases';
import { transform } from '../../utils/data';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    marginBottom: '1em',
    marginTop:'0.5em'
  },
  container: {
    padding: '2em',
    paddingLeft: '5em',
    paddingRight: '5em'
  },
  itemButton: {
    marginTop: '1em',
    width: '100%',
    display:'flex',
    justifyContent: 'left'
  },
  resultHeader: {
    marginBottom: '2em'
  },
  button: {
    borderRadius: '0',
    paddingTop: '0.7em',
    paddingBottom: '0.7em'
  },
  subtitle: {
    marginBottom: '1em'
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
  const [error, setError] = React.useState({
    error: false,
    message: ''
  })
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [data]);
  /** HANDLERS */
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    if (!Object.keys(data.clinicalCase.sections).length && input) {
      const clinicalCase = await getClinicalCaseById(input);
      if ('error' in clinicalCase) {
        setError({ error: true, message: clinicalCase.message });
      }
      else {
        setData({
          clinicalCase: clinicalCase[0],
          results: {},
        });
      }
    } else if (Object.keys(data.clinicalCase.sections).length) {
      let sections = []
      sectionsOrder.map((element, index) => {
        if(selected[index]) {
          sections.push(element)
        }
      })
      const results = await getSimilarityById({ case_id: data.clinicalCase.case_id, sections: sections });
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

  const showSearch = () => {
    if (!data.clinicalCase.case_id) return true
    return false
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
      <Grid container direction="column">
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
      {
        showSearch() &&
        <Grid item>
          {renderSearch()}
          {
            error.error &&
            <Alert severity="error">
              {error.message}
            </Alert>
          }
        </Grid>
      }
      {
        showClinicalCase() &&
        <Grid item>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Select the paragraphs that you want to search by:
          </Typography>
          <ClickableCard sections={data.clinicalCase.sections} onSelect={handleSelect} />
        </Grid>
      }
      {
        showClinicalCase() &&
        <Grid item className={classes.itemButton}>
          <Button 
            variant="contained"
            color="primary"
            onClick={handleClick}
            className={classes.button}
          >
            <Typography variant="body">Search similarity</Typography>
          </Button>
        </Grid>
      }
      {
        showResults() && renderResults()
      }
    </Grid>
  )
}

export default SearchById;