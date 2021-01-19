import React from 'react'

function PeopleChosingSelect(props){
    const options = ['0~150', '150~300', '300~500', '500~800', '800以上']
    return (
        <div className="people-chosing-select-container">
            初選人數
        <select >
            <option>--請選擇--</option>
            {options.map((op) => {
                return (
                <option onClick={() => {props.setPeopleChosing(op)}}>
                    {op}
                </option>
                )
            })
            }
        </select>
        </div>
    )
}
export default PeopleChosingSelect