import React from "react";
import Square from "./square";

const SelectBord = ({squares,costomFun,show,select}) => {
    return (
        <div className='container' style={{display : "grid" , gridTemplate:`repeat(${select},1fr)/repeat(${select},1fr)`}}>
            {
                squares.map((value , index) => {
                    return <Square val={value} key={index} ss={index} show={show} costomFun={()=>costomFun(index)}/>
                })
            }

        </div>
    )
}
export default SelectBord