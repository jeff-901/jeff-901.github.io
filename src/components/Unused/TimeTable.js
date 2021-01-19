/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      width: "80px",
      margin: "0px 1px 0px 0px",
    },
  },
}));

function TimeTable(props) {
  const classes = useStyles();
  const timeFilter = props.timeFilter;
  const setTimeFilter = props.setTimeFilter;

  const btn_text = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "A",
    "B",
    "C",
    "D",
  ];

  const handleSelect = (day, time) => {
    let next_timeFilter = [...timeFilter];
    if (next_timeFilter[day][time] === true) {
      next_timeFilter[day][time] = false;
    } else {
      next_timeFilter[day][time] = true;
    }
    setTimeFilter(next_timeFilter);
  };

  const handleSelectAll = (day) => {
    let next_timeFilter = [...timeFilter];
    next_timeFilter[day] = timeFilter[day].map((x) => !x);
    // if (timeFilter[day][time] === true) {
    //   next_timeFilter[day][time] = false;
    // } else {
    //   next_timeFilter[day][time] = true;
    // }
    setTimeFilter(next_timeFilter);
  };

  function btn_style(day, time) {
    return { background: timeFilter[day][time] ? "blue" : "gray" };
  }

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button onClick={() => handleSelectAll(0)}>一</Button>
        {btn_text.map((text, index) => {
          return (
            <Button
              style={btn_style(0, index)}
              onClick={() => handleSelect(0, index)}
            >
              {text}
            </Button>
          );
        })}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button onClick={() => handleSelectAll(1)}>二</Button>
        {btn_text.map((text, index) => {
          return (
            <Button
              style={btn_style(1, index)}
              onClick={() => handleSelect(1, index)}
            >
              {text}
            </Button>
          );
        })}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button onClick={() => handleSelectAll(2)}>三</Button>
        {btn_text.map((text, index) => {
          return (
            <Button
              style={btn_style(2, index)}
              onClick={() => handleSelect(2, index)}
            >
              {text}
            </Button>
          );
        })}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button onClick={() => handleSelectAll(3)}>四</Button>
        {btn_text.map((text, index) => {
          return (
            <Button
              style={btn_style(3, index)}
              onClick={() => handleSelect(3, index)}
            >
              {text}
            </Button>
          );
        })}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button onClick={() => handleSelectAll(4)}>五</Button>
        {btn_text.map((text, index) => {
          return (
            <Button
              style={btn_style(4, index)}
              onClick={() => handleSelect(4, index)}
            >
              {text}
            </Button>
          );
        })}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button onClick={() => handleSelectAll(5)}>六</Button>
        {btn_text.map((text, index) => {
          return (
            <Button
              style={btn_style(5, index)}
              onClick={() => handleSelect(5, index)}
            >
              {text}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

export default TimeTable;
