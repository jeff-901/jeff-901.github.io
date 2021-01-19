/** @format */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { TableContainer as MUITableContainer } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CommentIcon from "@material-ui/icons/Comment";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CommentPage from "./CommentPage";
import { findComment, updateUser } from "../axios";

const useRowStyles = makeStyles((theme) => ({
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
  tablecell: {
    // padding: "8px 4px 8px 4px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "8pt",
    textAlign: "center",
  },
  tablecellRemark: {
    // padding: "8px 4px 8px 4px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "8pt",
    textAlign: "left",
  },
  btn: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: 0,
  },
}));

function Row(props) {
  const {
    row,
    myCourse,
    setMyCourse,
    setCommentId,
    handleOpenComment,
    handleCloseComment,
  } = props;
  const [open, setOpen] = useState(false);
  const deleteIndex = myCourse.findIndex(
    (x) =>
      // x.serialNumber + x.designatedFor === row.serialNumber + row.designatedFor
      x._id === row._id
    // console.log(row._id);
  );
  const added = deleteIndex === -1 ? false : true;
  const classes = useRowStyles();

  const handleAddBtn = async () => {
    let next_myCourse = [...myCourse];
    if (added) {
      next_myCourse.splice(deleteIndex, 1);
      setMyCourse(next_myCourse);
    } else {
      next_myCourse.push(row);
      setMyCourse(next_myCourse);
    }
    // console.log(next_myCourse[0]);
    if (props.user) {
      await updateUser(props.user.id, JSON.stringify(next_myCourse));
    }
  };

  const handleCommentBtn = () => {
    setCommentId(row.courseName + "_" + row.professor);
    handleOpenComment(row.courseName + "_" + row.professor);
    // setPageIndex(2);
    // console.log(row.courseName + "_" + row.professor);
  };

  const numToCh = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
  };
  let timeClassroom = "";
  let validDayCount = 0;
  for (let i = 1; i <= 6; i++) {
    if (row["day" + String(i)]) {
      validDayCount++;
    }
  }
  // let classroom = "";
  // // if (row.classroom )
  // if (validDayCount > 0) {
  //   for (let i = 0; i < row.classroom.length / validDayCount; i++) {
  //     classroom += row.classroom[i];
  //   }
  // }
  let classrooms = row.classroom.split(",");
  let j = 0;
  for (let i = 1; i <= 6; i++) {
    // console.log(row["day1"]);
    // console.log(row["day" + "1"]);
    if (row["day" + String(i)]) {
      timeClassroom += numToCh[i];
      timeClassroom += row["time" + String(i)];
      timeClassroom += "(" + classrooms[j] + ")";
      // timeClassroom += <br />;
      j++;
    }
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            // className={classes.tablecell}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tablecell} align="left">
          {row.courseCode}
        </TableCell>
        <TableCell className={classes.tablecell} align="left">
          {row.designatedFor}
        </TableCell>
        <TableCell className={classes.tablecell} component="th" scope="row">
          {row.courseName}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          {row.professor}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          {row.credit}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          {timeClassroom}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          {row.people.split("(")[0]}
        </TableCell>
        <TableCell className={classes.tablecellRemark} align="right">
          {row.remark}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          <IconButton
            color={added ? "primary" : "default"}
            disabled={added ? true : false}
            aria-label="add"
            id={row._id}
            className={classes.btn}
            onClick={handleAddBtn}
          >
            <AddBoxIcon />
          </IconButton>
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          <IconButton
            aria-label="add"
            // id={row.id + row.class}
            id={row._id}
            className={classes.btn}
            onClick={handleCommentBtn}
          >
            <CommentIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className={classes.info}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="p" gutterBottom component="div">
                {row.remark}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyle = makeStyles((theme) => ({
  firstRowCell: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "80%",
    height: "80%",
    overflow: "scroll",
  },
}));

function SearchCourseTable(props) {
  const {
    courses,
    myCourse,
    setMyCourse,
    user,
    findTags,
    allTags,
    setAllTags,
  } = props;
  const [commentId, setCommentId] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const findComments = async (id) => {
    // console.log(id);
    let data = await findComment(id);
    // console.log(data);
    setComments(data);
  };

  const handleOpenComment = async (id) => {
    await findComments(id);
    setOpenComment(true);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  const attributes = [
    "課號",
    "授課對象",
    "課程名稱",
    "教授",
    "學分",
    "時間教室",
    "人數",
    "備註",
    "加入",
    "評論",
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const courses = props.courses;
  // const myCourse = props.myCourse;
  // const setMyCourse = props.setMyCourse;
  const classes = useStyle();
  return (
    <>
      <MUITableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "6%" }} />
              <TableCell
                align="left"
                className={classes.firstRowCell}
                style={{ width: "8%" }}
              >
                {" "}
                {attributes[0]}{" "}
              </TableCell>
              <TableCell
                align="left"
                className={classes.firstRowCell}
                style={{ width: "8%" }}
              >
                {" "}
                {attributes[1]}
              </TableCell>
              <TableCell
                // component="th"
                className={classes.firstRowCell}
                scope="row"
                style={{ width: "10%" }}
              >
                {attributes[2]}
              </TableCell>
              <TableCell
                align="left"
                className={classes.firstRowCell}
                style={{ width: "6%" }}
              >
                {attributes[3]}
              </TableCell>
              <TableCell
                align="left"
                className={classes.firstRowCell}
                style={{ width: "4.5%" }}
              >
                {attributes[4]}
              </TableCell>
              <TableCell
                align="right"
                className={classes.firstRowCell}
                style={{ width: "10%" }}
              >
                {attributes[5]}
              </TableCell>
              <TableCell
                align="right"
                className={classes.firstRowCell}
                style={{ width: "4.5%" }}
              >
                {attributes[6]}
              </TableCell>
              <TableCell align="right" className={classes.firstRowCell}>
                {attributes[7]}
              </TableCell>
              <TableCell
                align="right"
                className={classes.firstRowCell}
                style={{ width: "4.5%" }}
              >
                {attributes[8]}
              </TableCell>
              <TableCell
                align="right"
                className={classes.firstRowCell}
                style={{ width: "4.5%" }}
              >
                {attributes[9]}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((course) => (
                <Row
                  key={course.courseNum}
                  row={course}
                  myCourse={myCourse}
                  user={props.user}
                  setMyCourse={setMyCourse}
                  setCommentId={setCommentId}
                  handleOpenComment={handleOpenComment}
                  handleCloseComment={handleCloseComment}
                />
              ))}
          </TableBody>
        </Table>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openComment}
          onClose={handleCloseComment}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openComment}>
            <div className={classes.paper}>
              <CommentPage
                comments={comments}
                setComments={setComments}
                commentId={commentId}
                user={user}
                findTags={findTags}
                allTags={allTags}
                setAllTags={setAllTags}
              />
            </div>
          </Fade>
        </Modal>
      </MUITableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={courses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

export default SearchCourseTable;
