import React from "react";

const Square =({val,costomFun,ss,show})=>{
    
return(
       <input type='button' className='square' id={ss} value={val} onClick={costomFun} style={{backgroundColor:show ? 'black' :'white'}}/>
)
}
export default Square