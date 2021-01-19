import React from 'react'

function HotRateSelect(props){
    const options = ['0~5', '5~10', '10~20', '20~50', '50以上']
    return (
        <div className="hot-rate-select-container">
            討論熱度
        <select >
            <option>--請選擇--</option>
            {options.map((op) => {
                return (
                <option onClick={() => {props.setHotRate(op)}}>
                    {op}
                </option>
                )
            })
            }
        </select>
        </div>
    )
}
export default HotRateSelect