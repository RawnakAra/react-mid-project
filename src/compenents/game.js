import React from "react";
import Border from "./border";

const Game =()=>{
    // const [squares ,setSquares] = React.useState( Array(36).fill(''))
    const [squares ,setSquares] = React.useState( ['',3,4,5,4,3,5,'','','','','',5,'','','','','',5,'','','','','',3,'','','','','',1,'','','','',''])
    const [show , setShow] = React.useState(false)
    const [hearts , setHearts] = React.useState(['❤️','❤️','❤️'])
    const [showBtn , setShowBtn ] = React.useState('');
    const puzzle = ['',3,4,5,4,3,
                    5,1, 1, 1, 1, 1,
                    5,1, 1, 1, 1, 1,
                    5,1, 1, 1, 1, 1,
                    3,0, 1, 1, 1, 0,
                    1,0, 0, 1, 0, 0]


    const test =(index)=>{
        
        if(index === '0'|| index === '1'|| index === '2'|| index === '3'|| index === '4'|| index === '5'|| index === '6'||index === '12'||index === '18'||index === '24'||index === '30'){
            alert('Please Press on the board')
    }else {
        let squareCopy =[...squares]
        if(showBtn === '⬛'){
          if(puzzle[index] === 1){
             squareCopy[index] = '⬛'
          }else{
              if(hearts.length > 1){
              let copyHearts =[...hearts]
              copyHearts.pop()
              setHearts(copyHearts)
          }else{
            setHearts([])
              setShow(true)
          }
        }
        }
        else if(showBtn === '✖️'){
            if(puzzle[index] === 0){
            squareCopy[index] = '✖️' 
        }else{
            if(hearts.length > 1){
            let copyHearts =[...hearts]
            copyHearts.pop()
            setHearts(copyHearts)
        }else{
            setHearts([])
              setShow(true)
          }
    }
    }
  setSquares(squareCopy)
}
}

      const xButtonHandler =()=>{
          console.log('X')
          setShowBtn('✖️')
      }
      const blackButtonHandler=()=>{
         
          setShowBtn('⬛')
      }
      
return(
    <div>
        <h1>Nonogram</h1>
        <div className='hearts' >
            {
                hearts.map((h,index)=>{
                    return <span key={index}>{h}</span>
                })
            }
        </div >
        {
            show ? 'Game over' : 
        <div>
        <Border squares={squares}  costomFun={test} show={show}  />
        <div className='btns'>
           <input type='button' value = {'✖️'} className='btn' onClick={xButtonHandler}/>
           <input type='button' value = {'⬛'} className='btn' onClick={blackButtonHandler}/>
        </div>
        </div>
         }
    </div>

)
}
export default Game