/** @format */

import React from "react";
import conditionOptions from "../conditonOptions.json";
// import ConditionSelect from "../components/ConditionSelect";

// function ConditionSelectContainer(props){
//     //props.setTimeFilter
//     // console.log(conditionOptions)
//     const nums = [0, 1, 2]
//     return (
//         <div className="condition-select-container">
//             綜合選擇
//             {nums.map((i) => {
//                 if (i==0) {
//                     return <ConditionSelect options={Object.keys(conditionOptions)} id={i}
//                     setCondition={props.setConditions} value={props.conditions[i]}/>
//                 } else if (i==1) {
//                     if (props.conditions[0]!=="false" ) {
//                         return <ConditionSelect options={Object.keys(conditionOptions[props.conditions[i-1]])} id={i}
//                         setCondition={props.setConditions} value={props.conditions[i]}/>
//                     }else{
//                         return <ConditionSelect options={[]} id={i} setCondition={props.setConditions}
//                         value={props.conditions[i]}/>
//                     }
//                 } else {
//                     if (props.conditions[i-2]!=="false" && props.conditions[i-1]!=="false") {
//                         return <ConditionSelect options={conditionOptions[props.conditions[i-2]][props.conditions[i-1]]}
//                         id={i} setCondition={props.setConditions} value={props.conditions[i]}/>
//                     } else {
//                         return <ConditionSelect options={[]} id={i} setCondition={props.setConditions}
//                         value={props.conditions[i]}/>
//                     }
//                 }
//             })}

//             {/* <ConditionSelect options={[]} setConditon={props.setConditons[1]}/>
//             <ConditionSelect options={[]} setConditon={props.setConditons[2]}/> */}
//             {/* <h1>{props.conditions[0]}</h1>
//             <h1>{props.conditions[1]}</h1>
//             <h1>{props.conditions[2]}</h1> */}
//         </div>
//     )
// }
// export default ConditionSelectContainer

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiTextField-root": {
      width: "100%",
      height: "50px",
      display: "flex",
    },
  },
}));

function ConditionSelectContainer(props) {
  const classes = useStyles();
  let option_list1 = Object.keys(conditionOptions);
  let option_list2 = [];
  let option_list3 = [];
  console.log(props.conditions);
  if (props.conditions[0] !== "") {
    option_list2 = Object.keys(conditionOptions[props.conditions[0]]);
  }
  if (props.conditions[0] !== "" && props.conditions[1] !== "") {
    option_list3 = conditionOptions[props.conditions[0]][props.conditions[1]];
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {/* <div> */}
      <TextField
        id="standard-selection"
        select
        // label="Select"
        value={props.conditions[0]}
        onChange={(e) => {
          props.setConditions(0, e.target.value);
        }}
        // variant="outlined"
      >
        <MenuItem value="">None</MenuItem>
        {option_list1.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {/* </div> */}
      {/* <div> */}
      <TextField
        id="standard-selection"
        select
        // label="Select"
        value={props.conditions[1]}
        onChange={(e) => {
          props.setConditions(1, e.target.value);
        }}
        // variant="outlined"
      >
        <MenuItem value="">None</MenuItem>
        {option_list2.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {/* </div> */}
      {/* <div> */}
      <TextField
        id="standard-selection"
        select
        // label="Select"
        value={props.conditions[2]}
        onChange={(e) => {
          props.setConditions(2, e.target.value);
        }}
        // variant="outlined"
      >
        <MenuItem value="">None</MenuItem>
        {option_list3.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {/* </div> */}
    </form>
  );
}

export default ConditionSelectContainer;
