/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search_btn: {
    width: "100%",
  },
}));

function SearchButton(props) {
  const classes = useStyles();

  return (
    <div className={props.className}>
      <Button
        variant="contained"
        className={classes.search_btn}
        startIcon={<SearchIcon />}
        onClick={() => {
          props.search();
        }}
      >
        查詢
      </Button>
    </div>
  );
}

export default SearchButton;
