/** @format */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import allTags from "./HashTag";
import HashTag from "./HashTag";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
      width: "100%",
    },
  },
  col_3_block: {
    "& > div": {
      margin: theme.spacing(1),
      width: "31%",
    },
    display: "flex",
    marginTop: theme.spacing(1),
    // width: "90%",
  },
  col_2_block: {
    "& > div": {
      margin: theme.spacing(1),
      width: "50%",
    },
    display: "flex",
    marginTop: theme.spacing(1),
    // width: "90%",
  },
  col_1_block: {
    margin: theme.spacing(1),
  },
  btn_container: {
    width: "100%",
    textAlign: "center",
  },
  btn: {
    width: "100px",
    margin: 10,
  },
}));

export default function AddComment(props) {
  const {
    comment,
    setComment,
    handleAddComment,
    handleDeleteComment,
    allTags,
    tag_1,
    tag_2,
    tag_3,
    setTag_1,
    setTag_2,
    setTag_3,
    setNewTag_1,
    setNewTag_2,
    setNewTag_3,
  } = props;
  const classes = useStyles();

  const updateTag_1 = (tag) => {
    setComment({ ...comment, tag_1: JSON.stringify(tag) });
  };
  const updateTag_2 = (tag) => {
    setComment({ ...comment, tag_2: JSON.stringify(tag) });
  };
  const updateTag_3 = (tag) => {
    setComment({ ...comment, tag_3: JSON.stringify(tag) });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.col_2_block}>
        <div>
          <Typography variant="h6" component="h2">
            修課學期
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            value={comment.semester}
            onChange={(e) => {
              setComment((comment) => ({
                ...comment,
                semester: e.target.value,
              }));
            }}
            variant="outlined"
          />
        </div>
        <div>
          <Typography variant="h6" component="h2">
            推薦指數★★★★★
          </Typography>
          <TextField
            id="outlined-textarea"
            value={comment.recomendation}
            onChange={(e) => {
              setComment((comment) => ({
                ...comment,
                recomendation: e.target.value,
              }));
            }}
            variant="outlined"
          />
        </div>
      </div>
      <div className={classes.col_1_block}>
        <Typography variant="h6" component="h2">
          上課用書(影印講義或是指定教科書)
        </Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={comment.book}
          onChange={(e) => {
            setComment((comment) => ({
              ...comment,
              book: e.target.value,
            }));
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.col_1_block}>
        <Typography variant="h6" component="h2">
          上課方式(投影片、團體討論、老師教學風格)
        </Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={comment.teachingStyle}
          onChange={(e) => {
            setComment((comment) => ({
              ...comment,
              teachingStyle: e.target.value,
            }));
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.col_1_block}>
        <Typography variant="h6" component="h2">
          評分方式(給分甜嗎？是紮實分？)
        </Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={comment.grading}
          onChange={(e) => {
            setComment((comment) => ({
              ...comment,
              grading: e.target.value,
            }));
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.col_1_block}>
        <Typography variant="h6" component="h2">
          考題型式、作業方式
        </Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={comment.homework}
          onChange={(e) => {
            setComment((comment) => ({
              ...comment,
              homework: e.target.value,
            }));
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.col_1_block}>
        <Typography variant="h6" component="h2">
          其它(是否注重出席率？如果為外系選修，需先有什麼基礎較好嗎？老師個性？加簽習慣？嚴禁遲到等…)
        </Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={comment.other}
          onChange={(e) => {
            setComment((comment) => ({
              ...comment,
              other: e.target.value,
            }));
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.col_1_block}>
        <Typography variant="h6" component="h2">
          一句話總結
        </Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={2}
          value={comment.conclusion}
          onChange={(e) => {
            setComment((comment) => ({
              ...comment,
              conclusion: e.target.value,
            }));
          }}
          variant="outlined"
        />
      </div>
      <div className={classes.col_3_block}>
        <div>
          <Typography variant="h6" component="h2">
            HashTag
          </Typography>
          <HashTag
            allTags={allTags}
            setNewTag={setNewTag_1}
            value={tag_1}
            setValue={setTag_1}
            updateTag={updateTag_1}
          />
        </div>
        <div>
          <Typography variant="h6" component="h2">
            HashTag
          </Typography>
          <HashTag
            allTags={allTags}
            setNewTag={setNewTag_2}
            value={tag_2}
            setValue={setTag_2}
            updateTag={updateTag_2}
          />
        </div>
        <div>
          <Typography variant="h6" component="h2">
            HashTag
          </Typography>
          <HashTag
            allTags={allTags}
            setNewTag={setNewTag_3}
            value={tag_3}
            setValue={setTag_3}
            updateTag={updateTag_3}
          />
        </div>
      </div>
      <div className={classes.btn_container}>
        <Button
          variant="contained"
          className={classes.btn}
          onClick={handleAddComment}
        >
          發表評論
        </Button>
        <Button
          variant="contained"
          className={classes.btn}
          onClick={handleDeleteComment}
        >
          刪除評論
        </Button>
      </div>
    </form>
  );
}
