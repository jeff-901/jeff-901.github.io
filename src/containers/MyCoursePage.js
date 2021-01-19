/** @format */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CourseList from "../components/MyCoursePage/CourseList";
import CourseTable from "../components/MyCoursePage/CourseTable";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  col_2_block: {
    display: "flex",
  },
  col_left: {
    marginRight: theme.spacing(1),
    width: "40%",
    overflow: "overflow-y",
  },
  col_right: {
    marginLeft: theme.spacing(1),
    width: "60%",
    overflow: "overflow-y",
  },
}));

export default function MyCoursePage(props) {
  const { myCourse, setMyCourse, user } = props;
  const classes = useStyles();
  const [list2Table, setList2Table] = useState([]);

  return (
    <div className={classes.col_2_block}>
      <Container className={classes.col_left} overflow="auto">
        <CourseList
          myCourse={myCourse}
          setMyCourse={setMyCourse}
          list2Table={list2Table}
          setList2Table={setList2Table}
          user={user}
        />
      </Container>
      <Container className={classes.col_right} overflow="auto">
        <CourseTable list2Table={list2Table} setList2Table={setList2Table} />
      </Container>
    </div>
  );
}
