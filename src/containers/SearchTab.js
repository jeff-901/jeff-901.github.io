/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DepartmentSearch from "../components/SearchTab/DepartmentSearch";
import AllSearch from "../components/SearchTab/AllSearch";
import GeneralSearch from "../components/SearchTab/GeneralSearch";
import CommonSearch from "../components/SearchTab/CommonSearch";
import OtherSearch from "../components/SearchTab/OtherSearch";

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
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function SearchTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.resetSearchConditions();
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // all tabs object
  const tabList = [
    {
      全部查詢: (
        <AllSearch
          searchConditions={props.searchConditions}
          setSearchConditions={props.setSearchConditions}
          // search={props.search}
        />
      ),
    },
    {
      院系所課程: (
        <DepartmentSearch
          searchConditions={props.searchConditions}
          setSearchConditions={props.setSearchConditions}
          // search={props.search}
        />
      ),
    },
    {
      通識課程: (
        <GeneralSearch
          searchConditions={props.searchConditions}
          setSearchConditions={props.setSearchConditions}
          // search={props.search}
        />
      ),
    },
    {
      共同必修: (
        <CommonSearch
          searchConditions={props.searchConditions}
          setSearchConditions={props.setSearchConditions}
          // search={props.search}
        />
      ),
    },
    {
      其他全校性課程: (
        <OtherSearch
          searchConditions={props.searchConditions}
          setSearchConditions={props.setSearchConditions}
          // search={props.search}
        />
      ),
    },
  ];

  return (
    <div className={classes.root}>
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
        onChangeIndex={handleChangeIndex}
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
  );
}
