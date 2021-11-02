import React from "react";

const Square =({val,costomFun,ss})=>{
    
return(
       <input type='button' className='square' id={ss} value={val} onClick={costomFun}/>
)
}
export default Square