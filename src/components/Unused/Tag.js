import React from 'react'
function Tag(props) {
    return (
      <div className="tag" onClick={props.chooseTag}>
        #{props.value}
      </div>
    );
}
  
export default Tag;