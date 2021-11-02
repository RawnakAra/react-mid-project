import React from "react";
import Square from "./square";

const Border = ({squares,costomFun,show}) => {
    return (
        <div className='container'>
            {
                squares.map((value , index) => {
                    return <Square val={value} key={index} ss={index} show={show} costomFun={()=>costomFun(index)}/>
                })
            }

        </div>
    )
}
export default Border