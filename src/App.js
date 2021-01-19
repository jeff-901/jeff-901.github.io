/** @format */

import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./containers/Main";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import CommentPage from "./containers/CommentPage";
import MyCoursePage from "./containers/MyCoursePage";
// Main
const courseDB = [
  {
    id: 0,
    courseNum: "ESOE2012",
    department: "工科海洋系",
    courseName: "資料結構",
    teacher: "張恆華",
    credit: "3.0",
    time: "五2,3,4(工科204)",
    people: 51,
    remark: "光機電資訊領域必修。",
    add: "加入",
    more: "a link",
    day1: false,
    day2: false,
    day3: false,
    day4: false,
    day5: true,
    day6: false,
    time1: "",
    time2: "",
    time3: "",
    time4: "",
    time5: "2,3,4",
    time6: "",
  },
  {
    id: 1,
    courseNum: "CSIE2210",
    department: "資工系",
    courseName: "系統程式設計",
    teacher: "鄭卜壬",
    credit: "3.0",
    time: "三2,3,4(資103)",
    people: 160,
    remark: "限本系所學生(含輔系、雙修生) 且 限學士班二年級以上",
    add: "加入",
    more: "a link",
    day1: false,
    day2: false,
    day3: true,
    day4: false,
    day5: false,
    day6: false,
    time1: "",
    time2: "",
    time3: "2,3,4",
    time4: "",
    time5: "",
    time6: "",
  },
  {
    id: 2,
    courseNum: "PE2080",
    department: "",
    courseName: "排球初級",
    teacher: "胡林煥",
    credit: "1.0",
    time: "二8,9(排球場)",
    people: 42,
    remark: "專項運動學群,本校修課人數上限：42人",
    add: "加入",
    more: "a link",
    day1: true,
    day2: false,
    day3: false,
    day4: false,
    day5: false,
    day6: false,
    time1: "1,2",
    time2: "",
    time3: "",
    time4: "",
    time5: "",
    time6: "",
  },
  {
    id: 3,
    courseNum: "Chem1009",
    department: "物治系",
    courseName: "普通化學丙",
    teacher: "陳浩銘",
    credit: "3.0",
    time: "三3,4(博雅201)五3,4(博雅201)",
    people: 160,
    remark:
      "本課程中文授課,使用英文教科書。請依指定修習院系班次修習。詳閱化學系選課須知。初選期間不開放通識A7*課加選。 參閱分班編組課程",
    add: "加入",
    more: "a link",
    day1: false,
    day2: false,
    day3: true,
    day4: false,
    day5: true,
    day6: false,
    time1: "",
    time2: "",
    time3: "3,4",
    time4: "",
    time5: "3,4",
    time6: "",
  },
];

function App() {
  const [user, setUser] = useState(false); //user info
  // const [courses, setCourses] = useState([]); //courses result
  // const [timeFilter, setTimeFilter] = useState(times); //time filter
  // const [tags, setTags] = useState([]); //tags filter
  // const [keyword, setKeyword] = useState(""); //keyword filter
  // const [peopleChosing, setPeopleChosing] = useState(false); //初選人數
  // const [hotRate, setHotRate] = useState(false); //評論
  // const [conditions, setConditions] = useState(["", "", ""]);

  // MyCoursePage
  const [myCourse, setMyCourse] = useState([]);

  // useEffect(async ()=>{
  //   let myOldCourse = await
  // })

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Main
              // courses={courses}
              // tags={tags}
              // chooseTag={chooseTag}
              user={user}
              setUser={setUser}
              setMyCourse={setMyCourse}
              // setKeyword={setKeyword}
              // keyword={keyword}
              // timeFilter={timeFilter}
              // chooseTag={chooseTag}
              // tags={tags}
              // setTimeFilter={setTimeFilter}
              // setPeopleChosing={setPeopleChosing}
              // setHotRate={setHotRate}
              // setConditions={setConditions}
              // conditions={conditions}
              myCourse={myCourse}
              setMyCourse={setMyCourse}
            />
          </div>
        </Route>
        <Route path="/comments">
          <CommentPage />
        </Route>
        <Route path="/comments/:id">
          <CommentPage />
        </Route>
        <Route path="/mycourses">
          <MyCoursePage myCourse={myCourse} setMyCourse={setMyCourse} />
        </Route>
        <Redirect from="/Home" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
