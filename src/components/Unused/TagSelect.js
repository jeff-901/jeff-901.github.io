import React from 'react'

function TagSelect(props){
    const tagNames = ['文學', '歷史', '藝術', '程式', '數學', '實作']
    return (
        <div className="tag-select-container">
            Tags
            {tagNames.map((tagName) => {
                return (
                <div className="tag-select">
                    <input type="checkbox" onClick={() => {props.chooseTag(tagName)}}
                    checked={props.tags.findIndex(ele => ele===tagName)!==-1}/>
                    <span>{tagName}</span>
                </div>)
            })}
        </div>
    )
}
export default TagSelect