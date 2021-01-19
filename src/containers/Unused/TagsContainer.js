import React, { useState } from 'react'
import Tag from '../components/Tag'
function TagsContainer(props) {

    return (
      <div className="tags-container">
        {props.tags.map((tagName) => {
          return (<Tag value={tagName} chooseTag={() => {props.chooseTag(tagName)}}/>)
        })}
          
      </div>
    );
  }
  
  export default TagsContainer