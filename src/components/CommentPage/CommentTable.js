/** @format */

import React from "react";
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
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";

const useRowStyles = makeStyles({
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
    fontSize: "12pt",
  },
  btn: {
    margin: 2,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: "6pt",
    // display: "flex",
    // flexDirection: "row",
  },
});

const attributes = ["修課學期", "發布人", "推薦指數", "一句話總結"];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  // TODO: should add to comment schema and fetch from DB
  // const tags = [
  //   JSON.parse(row.tag1),
  //   JSON.parse(row.tag2),
  //   JSON.parse(row.tag3),
  // ];

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tablecell} align="left">
          {row.semester}
        </TableCell>
        <TableCell className={classes.tablecell} align="left">
          {row.username}
        </TableCell>
        <TableCell className={classes.tablecell} component="th" scope="row">
          {row.conclusion}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          <Button
            style={{ background: "rgba(255, 230, 179, 0.3)" }}
            className={classes.btn}
          >
            {JSON.parse(row.tag_1).title}
          </Button>
          <Button
            style={{ background: "rgba(255, 230, 179, 0.3)" }}
            className={classes.btn}
          >
            {JSON.parse(row.tag_2).title}
          </Button>
          <Button
            style={{ background: "rgba(255, 230, 179, 0.3)" }}
            className={classes.btn}
          >
            {JSON.parse(row.tag_3).title}
          </Button>
          {/* {tags.map((tag) => {
            return (
              <Button
                style={{ background: "rgba(255, 230, 179, 0.3)" }}
                className={classes.btn}
              >
                {tag.title}
              </Button>
            );
          })} */}
        </TableCell>
        <TableCell className={classes.tablecell} align="right">
          {row.recomendation}
        </TableCell>
      </TableRow>
      <TableRow className={classes.info}>
        <TableCell
          className={classes.tablecell}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div">
                上課用書(影印講義或是指定教科書)
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                {row.book}
                <p></p>
              </Typography>
              <Typography variant="h5" gutterBottom component="div">
                上課方式(投影片、團體討論、老師教學風格)
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                {row.teachingStyle}
                <p></p>
              </Typography>
              <Typography variant="h5" gutterBottom component="div">
                評分方式(給分甜嗎？是紮實分？)
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                {row.grading}
                <p></p>
              </Typography>
              <Typography variant="h5" gutterBottom component="div">
                考題型式、作業方式
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                {row.homework}
                <p></p>
              </Typography>
              <Typography variant="h5" gutterBottom component="div">
                其它(是否注重出席率？如果為外系選修，需先有什麼基礎較好嗎？老師個性？
                加簽習慣？嚴禁遲到等…)
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                {row.other}
                <p></p>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CommentTable(props) {
  const classes = useRowStyles();
  const comments = props.comments;

  return (
    <MUITableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={classes.tablecell} align="left">
              {attributes[0]}
            </TableCell>
            <TableCell className={classes.tablecell} align="left">
              {attributes[1]}
            </TableCell>
            <TableCell className={classes.tablecell} component="th" scope="row">
              {attributes[3]}
            </TableCell>
            <TableCell className={classes.tablecell} align="right">
              HashTag
            </TableCell>
            <TableCell className={classes.tablecell} align="right">
              {attributes[2]}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (
            <Row row={comment} />
          ))}
        </TableBody>
      </Table>
    </MUITableContainer>
  );
}

export default CommentTable;
