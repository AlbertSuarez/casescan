import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button/Button";
import ClinicalCard from "../ClinicalCard/ClinicalCard";

import { getClinicalCaseById, getAllCases } from "../../store/clinicalCases";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `4px 0 0 4px`,
      },
    },
  },
  container: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
    width: "inherit",
    backgroundColor: theme.palette.grey[100],
  },
  containerBody: {
    padding: '2em',
    paddingTop: '1em'
  },
  itemHeader: {
    backgroundColor: theme.palette.primary.main,
    padding: '2em',
    paddingTop: '2em'
  },
  itemSearch: {
    paddingTop: "2em",
  },
  itemCards: {
    paddingTop: "2em",
    "& div": {
      marginBottom: "2em",
    },
  },
  itemButton: {
    display: "flex",
    justifyContent: "center",
  },
  containerSearch: {
    display: "flex",
    paddingLeft: "1em",
  },
  input: {
    width: "100%",
  }
}));

function ClinicalCases() {
  const classes = useStyles();

  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [page, setPage] = React.useState(1);

  /** HANDLERS */
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    let result;
    if (input) {
      result = await getClinicalCaseById(input)
    } else {
      result = await getAllCases()
    }
    await setData(result)
  };

  const handleMore = () => {
    setPage(page + 1);
  };

  /**COMPUTED */
  const isNextPage = function () {
    if (page * 3 >= data.length) return false;
    return true;
  };

  /** RENDERS */
  const renderSearch = function () {
    return (
      <Paper component="form" className={classes.containerSearch}>
        <InputBase
          className={classes.input}
          placeholder="Search clinical case by id"
          value={input}
          onChange={handleChange}
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

  const renderCards = function () {
    const max = page * 3 < data.length ? page * 3 : data.length;
    let i = 0;
    let result = [];
    while (i < max) {
      const element = data[i];
      result.push(<ClinicalCard case_id={element.case_id} sections={element.sections} />);
      i += 1;
    }
    return result;
  };

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item className={classes.itemHeader}>
        <Typography variant="h4">Casos clinics</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" className={classes.containerBody}>
          <Grid item className={classes.itemSearch}>
            {renderSearch()}
          </Grid>
          <Grid item className={classes.itemCards}>
            {renderCards()}
          </Grid>
          {data && isNextPage() && (
            <Grid item className={classes.itemButton}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleMore}
              >
                Mostrar més documents
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ClinicalCases;
