/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import CommentTable from "../components/CommentPage/CommentTable";
import AddComment from "../components/CommentPage/AddComment";

import {
  createComment,
  deleteComment,
  findCourse,
  findUserComment,
  createTag,
  updateComment,
  updateCourse,
} from "../axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  test: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    width: "80%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CommentPage(props) {
  const {
    comments,
    commentId,
    user,
    setComments,
    findTags,
    allTags,
    setAllTags,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [hasCommentAlready, setHasCommentAlready] = useState(false);

  const [tag_1, setTag_1] = useState(null);
  const [tag_2, setTag_2] = useState(null);
  const [tag_3, setTag_3] = useState(null);
  const [newTag_1, setNewTag_1] = useState(null);
  const [newTag_2, setNewTag_2] = useState(null);
  const [newTag_3, setNewTag_3] = useState(null);

  // console.log(newTag_1);
  // console.log(newTag_2);
  // console.log(newTag_3);

  const commentInit = {
    id: commentId,
    username: user.name,
    semester: "",
    recomendation: "",
    book: "",
    teachingStyle: "",
    grading: "",
    homework: "",
    other: "",
    conclusion: "",
    tag_1: "",
    tag_2: "",
    tag_3: "",
  };

  const [comment, setComment] = useState(commentInit);

  // TODO: fetch the user's comment when entering the page
  useEffect(async () => {
    // console.log("user: ", user);
    if (user.id !== undefined) {
      let next_comments = await findUserComment(commentId, user.name);
      if (next_comments === null) {
        setComment(commentInit);
      } else {
        setComment(next_comments);
        setHasCommentAlready(true);
        // console.log("next_comments: ", next_comments);
      }
    } else {
      setComment(commentInit);
    }
    await findTags();
    // setAllTags(data);
    // console.log("alltags: ", allTags);

    // console.log(next_comments);
  }, [commentId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleAddComment = async () => {
    console.log("handleAddComment");
    console.log(comment);
    let courseData = commentId.split("_");
    if (!hasCommentAlready) {
      createComment(comment).then((msg) => {
        if (msg === "success") {
          setComments([...comments, comment]);
          setValue(0);
        } else {
          console.log("fail to create comment");
        }
      });
      let courses = await findCourse({
        courseName: courseData[0],
        professor: courseData[1],
      });
      let newtags = [
        JSON.parse(comment.tag_1).title,
        JSON.parse(comment.tag_2).title,
        JSON.parse(comment.tag_3).title,
      ];
      console.log(courses[0]);
      console.log(courses[0].tags);
      let next_tags = [...JSON.parse(courses[0].tags)];
      let exist_flag = [false, false, false];
      for (let i = 0; i < next_tags.length; i++) {
        for (let j = 0; j < newtags.length; j++) {
          if (newtags[j] === next_tags[i]) {
            exist_flag[j] = true;
          }
        }
      }
      for (let j = 0; j < newtags.length; j++) {
        if (exist_flag[j] === false) {
          next_tags.push(newtags[j]);
        }
      }
      updateCourse(courseData[0], courseData[1], JSON.stringify(next_tags));
    } else {
      updateComment(commentId, user.name, comment).then((msg) => {
        if (msg === "success") {
          let updateIndex = comments.findIndex((x) => {
            return x.id === commentId && x.username === user.name;
          });
          let next_comments = [...comments];
          next_comments[updateIndex] = comment;
          setComments(next_comments);
          setValue(0);
          // console.log("update comment success");
        } else {
          console.log("fail to update comment");
        }
      });
      // console.log([comment.tag_1, comment.tag_2, comment.tag_3]);

      updateCourse(
        courseData[0],
        courseData[1],
        JSON.stringify([
          JSON.parse(comment.tag_1).title,
          JSON.parse(comment.tag_2).title,
          JSON.parse(comment.tag_3).title,
        ])
      );
    }

    if (newTag_1) {
      createTag(newTag_1).then((msg) => {
        if (msg === "success") {
          // setAllTags([...allTags, newTag_1]);
          setNewTag_1(null);
        } else {
          console.log("fail to create tag1");
        }
      });
    }
    if (newTag_2) {
      createTag(newTag_2).then((msg) => {
        if (msg === "success") {
          // setAllTags([...allTags, newTag_2]);
          setNewTag_2(null);
        } else {
          console.log("fail to create tag2");
        }
      });
    }
    if (newTag_3) {
      createTag(newTag_3).then((msg) => {
        if (msg === "success") {
          // setAllTags([...allTags, newTag_3]);
          setNewTag_3(null);
        } else {
          console.log("fail to create tag3");
        }
      });
    }
  };

  // TODO: delete comment of the given user
  const handleDeleteComment = async () => {
    const deleteIndex = comments.findIndex((x) => x.username === user.name);
    if (deleteIndex !== -1) {
      let next_comments = [...comments];
      next_comments.splice(deleteIndex, 1);
      let message = await deleteComment(
        comments[deleteIndex].id,
        comments[deleteIndex].username
      );
      let deletedTag_1 = comments[deleteIndex].tag_1;
      let deletedTag_2 = comments[deleteIndex].tag_2;
      let deletedTag_3 = comments[deleteIndex].tag_3;
      if (message === "error") {
        alert("some error needed to fix");
      }
      setComments(next_comments);
      setComment(commentInit);
      setValue(0);
      setTag_1(null);
      setTag_2(null);
      setTag_3(null);
    }
    // setComment(commentInit);
  };

  // all tabs object
  const tabList = [
    {
      所有評論: <CommentTable comments={comments} />,
    },
    {
      "加入/修改評論": (
        <AddComment
          comment={comment}
          setComment={setComment}
          comments={comments}
          setComments={setComments}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
          allTags={allTags}
          setAllTags={setAllTags}
          tag_1={tag_1}
          tag_2={tag_2}
          tag_3={tag_3}
          setTag_1={setTag_1}
          setTag_2={setTag_2}
          setTag_3={setTag_3}
          setNewTag_1={setNewTag_1}
          setNewTag_2={setNewTag_2}
          setNewTag_3={setNewTag_3}
        />
      ),
    },
  ];

  return (
    <div className={classes.test}>
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom component="div">
          {commentId}
        </Typography>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            {tabList.map((item) => {
              return <Tab label={Object.keys(item)[0]} />;
            })}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={(e) => handleChangeIndex(e.target.inedex)}
        >
          {tabList.map((item, index) => {
            return (
              <TabPanel value={value} index={index} dir={theme.direction}>
                {Object.values(item)[0]}
              </TabPanel>
            );
          })}
        </SwipeableViews>
      </div>
    </div>
  );
}
