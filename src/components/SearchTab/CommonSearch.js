/** @format */

import React, { useEffect, useState } from "react";
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
    minWidth: 200,
    maxWidth: 400,
  },
  searchInput: {
    margin: theme.spacing(2),
    // minWidth: 300, doesn't work
    maxWidth: 300,
  },
}));

const option_list1 = ["國文", "英文", "外文", "進階英文", "體育"];
const option_list2 = [1, 2, 3];

function CommonSearch(props) {
  const { searchConditions, setSearchConditions } = props;
  const classes = useStyles();
  const [select_1, setSelect_1] = useState([]);
  const [select_2, setSelect_2] = useState(option_list2);
  const [select_3, setSelect_3] = useState([]);

  // const option_list3 = ["含小組討論", "校際課程"];

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-checkbox-label">搜尋項目</InputLabel>
        <Select
          labelId="mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          value={select_1}
          onChange={(e) => {
            setSelect_1(e.target.value);
            let next_searchConditions = { ...searchConditions };
            option_list1.map((option) => {
              if (e.target.value.indexOf(option) > -1) {
                next_searchConditions[option] = true;
              } else {
                next_searchConditions[option] = false;
              }
            });
            setSearchConditions(next_searchConditions);
          }}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {option_list1.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                color="primary"
                checked={select_1.indexOf(option) > -1}
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
        <InputLabel id="mutiple-checkbox-label">加選方式</InputLabel>
        <Select
          labelId="mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          value={select_2}
          onChange={(e) => {
            setSelect_2(e.target.value);
            let booleanOptions = [false, false, false];
            e.target.value.map((option) => {
              let index = option_list2.indexOf(option);
              if (index > -1) {
                booleanOptions[index] = true;
              }
            });
            setSearchConditions({
              ...searchConditions,
              加選方式: booleanOptions,
            });
          }}
          input={<Input />}
          renderValue={(selected) => selected.sort().join(", ")}
        >
          {option_list2.map((option, i) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                color="primary"
                checked={select_2.indexOf(option) > -1}
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <FormControl className={classes.formControl}>
        <InputLabel id="mutiple-checkbox-label">其他選項</InputLabel>
        <Select
          labelId="mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          value={select_3}
          onChange={(e) => {
            setSelect_3(e.target.value);
          }}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {option_list3.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                color="primary"
                checked={select_3.indexOf(option) > -1}
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </form>
  );
}

export default CommonSearch;
