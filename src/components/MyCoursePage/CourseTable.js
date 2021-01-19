/** @format */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { TableContainer as MUITableContainer } from "@material-ui/core";

const days = ["一", "二", "三", "四", "五", "六"];
const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D"];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // "& > *": {
    // width: "90%",
    // margin: theme.spacing(1),
    // },
  },
  tablecell: {
    padding: "4px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(224, 224, 224, 1)",
  },
  first_row: {
    border: "1px solid rgba(224, 224, 224, 1)",
    height: "15px",
    textAlign: "center",
  },
  first_col: {
    border: "1px solid rgba(224, 224, 224, 1)",
    width: "30px",
    textAlign: "center",
  },
  btn: {
    margin: 2,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: "6pt",
    display: "flex",
    flexDirection: "column",
  },
}));

function MyTableCell(props) {
  const { day, time, courseBlock } = props;
  const classes = useStyles();

  const courses = courseBlock[day][time];

  return (
    <TableCell className={classes.tablecell}>
      {courses.map((course) => {
        return (
          <Button style={{ background: course.color }} className={classes.btn}>
            {course.courseName}[{course.professor}]
          </Button>
        );
      })}
    </TableCell>
  );
}

function CourseTable(props) {
  const { list2Table, setList2Table } = props;
  const classes = useStyles();

  var courseBlock = {
    一: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      A: [],
      B: [],
      C: [],
      D: [],
    },
    二: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      A: [],
      B: [],
      C: [],
      D: [],
    },
    三: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      A: [],
      B: [],
      C: [],
      D: [],
    },
    四: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      A: [],
      B: [],
      C: [],
      D: [],
    },
    五: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      A: [],
      B: [],
      C: [],
      D: [],
    },
    六: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      A: [],
      B: [],
      C: [],
      D: [],
    },
  };

  list2Table.map((course) => {
    const randColor =
      "rgba(" +
      Math.floor(Math.random() * 256).toString() +
      "," +
      Math.floor(Math.random() * 256).toString() +
      "," +
      Math.floor(Math.random() * 256).toString() +
      ", 0.3)";
    if (!("color" in course)) {
      course.color = randColor;
    }

    if (course.day1 === true) {
      let times = course.time1.split(",");
      console.log("一", times);
      times.map((t) => {
        courseBlock["一"][t].push(course);
      });
    }
    if (course.day2 === true) {
      let times = course.time2.split(",");
      console.log("二", times);
      times.map((t) => {
        courseBlock["二"][t].push(course);
      });
    }
    if (course.day3 === true) {
      let times = course.time3.split(",");
      console.log("三", times);
      times.map((t) => {
        courseBlock["三"][t].push(course);
      });
    }
    if (course.day4 === true) {
      let times = course.time4.split(",");
      console.log("四", times);
      times.map((t) => {
        courseBlock["四"][t].push(course);
      });
    }
    if (course.day5 === true) {
      let times = course.time5.split(",");
      console.log("五", times);
      times.map((t) => {
        courseBlock["五"][t].push(course);
      });
    }
    if (course.day6 === true) {
      let times = course.time6.split(",");
      console.log("六", times);
      times.map((t) => {
        courseBlock["六"][t].push(course);
      });
    }
  });

  return (
    <div className={classes.root}>
      <MUITableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.first_row}></TableCell>
              {days.map((x) => {
                return (
                  <TableCell
                    className={classes.first_row}
                    style={{ width: "16%" }}
                  >
                    {x}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {times.map((t) => {
              return (
                <TableRow>
                  <TableCell className={classes.first_col}>{t}</TableCell>
                  {days.map((d) => {
                    return (
                      <MyTableCell courseBlock={courseBlock} day={d} time={t} />
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </MUITableContainer>
    </div>
  );
}

export default CourseTable;
