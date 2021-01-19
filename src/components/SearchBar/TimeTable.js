/** @format */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { set } from "mongoose";

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
  const { searchConditions, setSearchConditions } = props;
  const classes = useStyles();
  // const timeFilter = props.timeFilter;
  // const setTimeFilter = props.setTimeFilter;
  const [mouseDown, setMouseDown] = useState(false);
  const [startIndex, setStartIndex] = useState(false);
  const [finishIndex, setFinishIndex] = useState(false);
  const times = [];
  for (let i = 0; i < 6; i++) {
    times.push([]);
    for (let j = 0; j < 15; j++) {
      times[i].push(false);
    }
  }
  const [tempTimeFilter, setTempTimeFilter] = useState(times);
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
  const days = ["一", "二", "三", "四", "五", "六"];

  const handleSelect = (day, time) => {
    let next_searchConditions = { ...searchConditions };
    let next_day = { ...searchConditions["時間"][day] };
    if (next_day[time] === true) {
      next_day[time] = false;
    } else {
      next_day[time] = true;
    }
    next_searchConditions["時間"][day] = next_day;
    setSearchConditions(next_searchConditions);
    setStartIndex(false);
    setMouseDown(false);
    setFinishIndex(false);
  };

  const handleSelectAll = (day) => {
    let next_searchConditions = { ...searchConditions };
    if (searchConditions["時間"][day].findIndex((x) => x === false) == -1) {
      next_searchConditions["時間"][day] = searchConditions["時間"][day].map(
        (x) => false
      );
    } else {
      next_searchConditions["時間"][day] = searchConditions["時間"][day].map(
        (x) => true
      );
    }
    setSearchConditions(next_searchConditions);
    setStartIndex(false);
    setMouseDown(false);
    setFinishIndex(false);
  };

  const btn_style = (day, time) => {
    return {
      background:
        searchConditions["時間"][day][time] || tempTimeFilter[day][time]
          ? "rgb(153, 221, 255)"
          : "gray",
    };
  };

  const handleMouseDown = (day, time) => {
    setMouseDown(true);
    setStartIndex([day, time]);
  };

  const handleMouseOver = (day, time) => {
    if (mouseDown !== false) {
      let next_timeFilter = [];
      let min_day;
      let max_day;
      if (startIndex[0] < day) {
        min_day = startIndex[0];
        max_day = day;
      } else {
        min_day = day;
        max_day = startIndex[0];
      }
      let min_time;
      let max_time;
      if (startIndex[1] < time) {
        min_time = startIndex[1];
        max_time = time;
      } else {
        min_time = time;
        max_time = startIndex[1];
      }
      for (let i = 0; i < 6; i++) {
        next_timeFilter.push([]);
        for (let j = 0; j < 15; j++) {
          if (i >= min_day && i <= max_day && j >= min_time && j <= max_time) {
            next_timeFilter[i].push(true);
          } else {
            next_timeFilter[i].push(searchConditions["時間"][i][j]);
          }
        }
      }
      setFinishIndex([day, time]);
      setTempTimeFilter(next_timeFilter);
    }
  };

  const handleMouseUp = () => {
    if (startIndex && finishIndex) {
      let next_timeFilter = [];
      let min_day;
      let max_day;
      if (startIndex[0] < finishIndex[0]) {
        min_day = startIndex[0];
        max_day = finishIndex[0];
      } else {
        min_day = finishIndex[0];
        max_day = startIndex[0];
      }
      let min_time;
      let max_time;
      if (startIndex[1] < finishIndex[1]) {
        min_time = startIndex[1];
        max_time = finishIndex[1];
      } else {
        min_time = finishIndex[1];
        max_time = startIndex[1];
      }
      for (let i = 0; i < 6; i++) {
        next_timeFilter.push([]);
        for (let j = 0; j < 15; j++) {
          if (i >= min_day && i <= max_day && j >= min_time && j <= max_time) {
            next_timeFilter[i].push(true);
          } else {
            next_timeFilter[i].push(searchConditions["時間"][i][j]);
          }
        }
      }
      setSearchConditions({ ...searchConditions, 時間: next_timeFilter });
      // setStartIndex(false);
      // setMouseDown(false);
      setTempTimeFilter(times);
      // setFinishIndex(false);
    }
    setStartIndex(false);
    setMouseDown(false);
    setFinishIndex(false);
  };

  return (
    <div className={classes.root} onMouseUp={handleMouseUp}>
      {days.map((day, dayIndex) => {
        return (
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained primary button group"
            variant="contained"
          >
            <Button onClick={() => handleSelectAll(dayIndex)}>{day}</Button>
            {btn_text.map((text, index) => {
              return (
                <Button
                  style={btn_style(dayIndex, index)}
                  onClick={() => handleSelect(dayIndex, index)}
                  onMouseDown={() => {
                    handleMouseDown(dayIndex, index);
                  }}
                  onMouseOver={() => {
                    handleMouseOver(dayIndex, index);
                  }}
                >
                  {text}
                </Button>
              );
            })}
          </ButtonGroup>
        );
      })}

      {/* <ButtonGroup
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
      </ButtonGroup>*/}
    </div>
  );
}

export default TimeTable;
