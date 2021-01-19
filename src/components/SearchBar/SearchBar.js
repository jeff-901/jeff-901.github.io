/** @format */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TimeSelect from "./TimeSelect";
import SearchButton from "./SearchButton";
import PopularitySelect from "./PopularitySelect";
import TagSelect from "./TagSelect";

const useStyles = makeStyles((theme) => ({
  btn_row: {
    display: "flex",
    background: "white",
    "& .MuiTextField-root": {
      minWidth: 120,
      height: 50,
      margin: theme.spacing(2),
    },
    "& .MuiFormControlLabel-root": {
      height: 50,
      margin: theme.spacing(2),
    },
    // marginBottom: theme.spacing(1),
  },
  time_select: {
    width: "60%",
    margin: theme.spacing(2, 1, 2, 2),
  },
  btn: {
    margin: theme.spacing(2, 1, 2, 1),
    minWidth: "85px",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const semesterList = ["109-2", "109-1", "108-2", "108-1", "107-2", "107-1"];

export default function SearchBar(props) {
  const classes = useStyles();
  // const [semester, setSemester] = useState(props.searchConditions["semester"]);

  return (
    <div className={classes.btn_row}>
      <TimeSelect
        className={classes.time_select}
        searchConditions={props.searchConditions}
        setSearchConditions={props.setSearchConditions}
      />
      <SearchButton className={classes.btn} search={props.search} />
      <PopularitySelect className={classes.btn} />
      <TagSelect
        className={classes.btn}
        allTags={props.allTags}
        findTags={props.findTags}
        selectTag={props.selectTag}
        setSelectTag={props.setSelectTag}
      />
      <FormControl className={classes.formControl}>
        {/* <InputLabel id="demo-simple-select-label"></InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.searchConditions["semester"]}
          onChange={(e) => {
            // setSemester(e.target.value);
            // let newSearchConditions = props.searchConditions;
            // newSearchConditions["semester"] = e.target.value;
            props.setSearchConditions({
              ...props.searchConditions,
              semester: e.target.value,
            });
          }}
        >
          <MenuItem value="">學期</MenuItem>
          {semesterList.map((sem) => (
            <MenuItem value={sem} key={sem}>
              {sem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
