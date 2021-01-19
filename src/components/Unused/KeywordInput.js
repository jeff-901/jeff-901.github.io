import React, { useState } from 'react'


function KeywordInput(props) {
  return (
    <input type="text" placeholder="關鍵字" onChange={(e) => {props.setKeyword(e.target.value)}} value={props.value}/>
  );
}

export default KeywordInput;