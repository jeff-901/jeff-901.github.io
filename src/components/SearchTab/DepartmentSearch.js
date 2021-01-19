/** @format */

import React, { useState } from "react";
import conditionOptions from "../../conditonOptions.json";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      minWidth: 120,
      height: 50,
      margin: theme.spacing(2),
    },
    "& .MuiFormControlLabel-root": {
      height: 50,
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
  },
  searchInput: {
    margin: theme.spacing(2),
    // minWidth: 300, doesn't work
    maxWidth: 300,
  },
}));

const options = ["必修", "選修", "服學"];
const years = ["大一", "大二", "大三", "大四", "研究所"];

function DepartmentSearch(props) {
  const { searchConditions, setSearchConditions } = props;
  const classes = useStyles();
  const [optionSelected, setOption] = useState(["必修", "選修"]);
  const [yearSelected, setYear] = useState(["大一", "大二", "大三", "大四"]);

  const handleCheckYear = (e) => {
    setYear(e.target.value);
    let booleanYears = [false, false, false, false];
    e.target.value.map((year) => {
      let index = years.indexOf(year);
      if (index > -1) {
        if (index == 4) {
          setSearchConditions({
            ...searchConditions,
            研究所: true,
          });
        } else {
          booleanYears[index] = true;
        }
      }
    });
    setSearchConditions({
      ...searchConditions,
      年級: booleanYears,
    });
  };

  const handleCheckOption = (e) => {
    setOption(e.target.value);
    let next_searchConditions = { ...searchConditions };
    options.map((option) => {
      if (e.target.value.indexOf(option) > -1) {
        next_searchConditions[option] = true;
      } else {
        next_searchConditions[option] = false;
      }
    });
    setSearchConditions(next_searchConditions);
  };

  // console.log(searchConditions);

  let option_list1 = Object.keys(conditionOptions); // 學院
  let option_list2 = []; // 系所
  let option_list3 = []; // 組別

  if (searchConditions["學院"] !== "") {
    option_list2 = Object.keys(conditionOptions[searchConditions["學院"]]);

    if (searchConditions["系所"] !== "") {
      option_list3 =
        conditionOptions[searchConditions["學院"]][searchConditions["系所"]];
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-selection"
        select
        label="學院"
        value={searchConditions["學院"]}
        onChange={(e) => {
          setSearchConditions({
            ...searchConditions,
            學院: e.target.value,
            系所: "",
            組別: "",
          });
        }}
      >
        <MenuItem value="">None</MenuItem>
        {option_list1.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="standard-selection"
        select
        label="系所"
        value={searchConditions["系所"]}
        onChange={(e) => {
          setSearchConditions({
            ...searchConditions,
            系所: e.target.value,
            組別: "",
          });
        }}
      >
        <MenuItem value="">None</MenuItem>
        {option_list2.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="standard-selection"
        select
        label="組別"
        value={searchConditions["組別"]}
        onChange={(e) => {
          setSearchConditions({
            ...searchConditions,
            組別: e.target.value,
          });
        }}
      >
        <MenuItem value="">None</MenuItem>
        {option_list3.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className={classes.searchInput}
        id="standard-search"
        label="課名"
        type="search"
        onChange={(e) =>
          setSearchConditions({
            ...searchConditions,
            課名: e.target.value,
          })
        }
      />
      <TextField
        className={classes.searchInput}
        id="standard-search"
        label="教師名稱"
        type="search"
        onChange={(e) =>
          setSearchConditions({
            ...searchConditions,
            教師名稱: e.target.value,
          })
        }
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-checkbox-label">年級</InputLabel>
        <Select
          labelId="mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          value={yearSelected}
          onChange={handleCheckYear}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              <Checkbox
                color="primary"
                checked={yearSelected.indexOf(year) > -1}
              />
              <ListItemText primary={year} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-checkbox-label">其他選項</InputLabel>
        <Select
          labelId="mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          value={optionSelected}
          onChange={handleCheckOption}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                color="primary"
                checked={optionSelected.indexOf(option) > -1}
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

export default DepartmentSearch;
