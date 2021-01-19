/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import clsx from "clsx";
import { Link } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: 0,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  list: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    align: "center",
  },
  notSelect: {
    color: "default",
  },
  select: {
    color: "blue",
  },
  notSelectText: {
    color: "black",
  },
}));

function Sidebar(props) {
  const { pages, open, pageIndex, setPageIndex } = props;
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      anchor="left"
      open={open}
    >
      <List className={classes.list}>
        <ListItem className={classes.appBarSpacer} key={0}></ListItem>
        {pages.map((page, index) => {
          return (
            <ListItem
              key={index + 1}
              component={Link}
              onClick={() => setPageIndex(index)}
              className={
                pageIndex === index ? classes.select : classes.notSelect
              }
            >
              <ListItemIcon
                className={
                  pageIndex === index ? classes.select : classes.notSelect
                }
              >
                {page.icon}
              </ListItemIcon>
              <ListItemText
                primary={page.title}
                className={
                  pageIndex === index ? classes.select : classes.notSelectText
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;
