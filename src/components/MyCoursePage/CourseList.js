/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableContainer as MUITableContainer } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import { updateUser } from "../../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  info: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tablecell_top: {
    padding: "8px 4px 8px 4px",
    fontSize: "12pt",
  },
  tablecell: {
    padding: "6px 2px 6px 2px",
    fontSize: "6pt",
  },
  btn: {
    fontSize: "8pt",
    margin: 0,
    padding: 0,
  },
}));

function Row(props) {
  const { row, myCourse, setMyCourse, list2Table, setList2Table, user } = props;
  const deleteIndex = list2Table.findIndex((x) => x._id === row._id);
  const added = deleteIndex === -1 ? false : true;
  const classes = useStyles();

  const handleAddBtn = () => {
    if (added) {
      let next_list2Table = [...list2Table];
      next_list2Table.splice(deleteIndex, 1);
      setList2Table(next_list2Table);
    } else {
      let next_list2Table = [...list2Table];
      next_list2Table.push(row);
      setList2Table(next_list2Table);
    }
  };

  const numToCh = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
  };
  let timeClassroom = "";
  let validDayCount = 0;
  for (let i = 1; i <= 5; i++) {
    if (row["day" + String(i)]) {
      validDayCount++;
    }
  }
  let classroom = "";
  for (let i = 0; i < row.classroom.length / validDayCount; i++) {
    classroom += row.classroom[i];
  }
  for (let i = 1; i <= 5; i++) {
    // console.log(row["day1"]);
    // console.log(row["day" + "1"]);
    if (row["day" + String(i)]) {
      timeClassroom += numToCh[i];
      timeClassroom += row["time" + String(i)];
      timeClassroom += "(" + classroom + ")";
    }
  }

  const handleDelete = async (id) => {
    let deleteIndex = myCourse.findIndex((x) => x._id === id);
    let next_courses = [...myCourse];
    next_courses.splice(deleteIndex, 1);
    // console.log(user);
    if (user) {
      await updateUser(user.id, JSON.stringify(next_courses));
      // console.log("delete course");
    }
    setMyCourse(next_courses);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell className={classes.tablecell} align="right">
          {row.department}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          {row.courseName}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          {row.professor}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          {timeClassroom}
        </TableCell>
        <TableCell className={classes.tablecell} align="center">
          <IconButton
            color={added ? "primary" : "default"}
            aria-label="add"
            id={row._id}
            className={classes.btn}
            onClick={handleAddBtn}
          >
            <AddBoxIcon />
          </IconButton>
        </TableCell>
        <TableCell className={classes.tablecell} align="center">
          <IconButton
            aria-label="delete"
            id={row._id}
            className={classes.btn}
            disabled={added ? true : false}
            onClick={() => {
              handleDelete(row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CourseList(props) {
  const { myCourse, setMyCourse, list2Table, setList2Table, user } = props;
  const attributes = [
    "課號",
    "授課對象",
    "課名",
    "教授",
    "學分",
    "時間教室",
    "人數",
    "備註",
    "加入",
    "刪除",
  ];
  const classes = useStyles();

  return (
    <MUITableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            {/* <TableCell align="left">{attributes[0]}</TableCell> */}
            <TableCell className={classes.tablecell_top} align="right">
              {attributes[1]}
            </TableCell>
            <TableCell className={classes.tablecell_top} align="right">
              {attributes[2]}
            </TableCell>
            <TableCell className={classes.tablecell_top} align="right">
              {attributes[3]}
            </TableCell>
            {/* <TableCell align="right">{attributes[4]}</TableCell> */}
            <TableCell className={classes.tablecell_top} align="right">
              {attributes[5]}
            </TableCell>
            {/* <TableCell align="right">{attributes[6]}</TableCell> */}
            {/* <TableCell align="right">{attributes[7]}</TableCell> */}
            <TableCell className={classes.tablecell_top} align="center">
              {attributes[8]}
            </TableCell>
            <TableCell className={classes.tablecell_top} align="center">
              {attributes[9]}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myCourse.map((course) => (
            <Row
              key={course.courseNum}
              row={course}
              myCourse={myCourse}
              setMyCourse={setMyCourse}
              list2Table={list2Table}
              setList2Table={setList2Table}
              user={user}
            />
          ))}
        </TableBody>
      </Table>
    </MUITableContainer>
  );
}

export default CourseList;
