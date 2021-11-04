import React from "react";
import Square from "./square";

const Border = ({squares,costomFun,show,size}) => {
    return (
        <div className='container' style={{display : "grid" , gridTemplate:`repeat(${size},1fr)/repeat(${size},1fr)` , }}>
            {
                squares.length > 0 ?
                squares.map((value , index) => {
                    return <Square val={value} key={index} ss={index} show={show} costomFun={()=>costomFun(index)}/>
                }):'Loding'
            }

        </div>
    )
}
export default Border