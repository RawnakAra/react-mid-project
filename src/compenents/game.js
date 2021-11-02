import axios from "axios";
import React, { useEffect } from "react";
import Border from "./border";


const Game = () => {
    const [steps, setstps] = React.useState('')
    let [stepNumber, setStepNumber] = React.useState(0)
    const [size ,setSize] = React.useState('')
    const [squares, setSquares] = React.useState(Array(36).fill(''))
    const [show, setShow] = React.useState(false)
    const [hearts, setHearts] = React.useState(['❤️', '❤️', '❤️'])
    const [showBtn, setShowBtn] = React.useState('');
    const [puzzle, setPuzzle] = React.useState(Array(36).fill(''))
    let [id, setId] = React.useState(1)
   
    React.useEffect(() => {
        getPuzzleFromApi()
    }, [id])

    const getPuzzleFromApi = async () => {
        await axios.get(`https://617c34b6d842cf001711c2b7.mockapi.io/puzzle/${id}`)
            .then(res => {
                setPuzzle(res.data.puzzle)
                setSquares(res.data.squares)
                setstps(res.data.stepNum)
                setSize(res.data.size)
                //console.log(res.data.size)
            })
    }

    const nextLevel = () => {
        if (stepNumber === steps){
            setId(id +1)
            setStepNumber(0)
            setHearts(['❤️', '❤️', '❤️'])
        }
        }

    const test = (index) => {
        //if (stepNumber !== steps){
        if (index > size && index !== (size) && index !== (size*2 ) && index !== (size*3 ) && index !== (size*4 )) {
            let squareCopy = [...squares]
            if (showBtn === '⬛') {
                if (puzzle[index] === 1) {
                    squareCopy[index] = '⬛'
                    stepNumber = stepNumber + 1
                    setStepNumber(stepNumber)
                    console.log(stepNumber)
                } else {
                    if (hearts.length > 1) {
                        let copyHearts = [...hearts]
                        copyHearts.pop()
                        setHearts(copyHearts)
                    } else {
                        setHearts([])
                        setShow(true)
                    }
                }
            }
            else if (showBtn === '✖️') {
                if (puzzle[index] === 0) {
                    squareCopy[index] = '✖️'

                } else {
                    if (hearts.length > 1) {
                        let copyHearts = [...hearts]
                        copyHearts.pop()
                        setHearts(copyHearts)
                    } else {
                        setHearts([])
                        setShow(true)
                    }
                }
            }
            setSquares(squareCopy)
        }
    
    // }else 
    // if (stepNumber === steps) {
    //     setId(id +1)
    // }
    }

    const xButtonHandler = () => {
        setShowBtn('✖️')
    }
    const blackButtonHandler = () => {
        setShowBtn('⬛')
    }


    return (
        <div>
            <h1>Nonogram</h1>
            <div className='hearts' >
                {
                    hearts.map((h, index) => {
                        return <span key={index}>{h}</span>
                    })
                }
            </div >
            {
                show ? 'Game over' :
                    <div>
                        <div  >
                        <Border squares={squares} costomFun={test} show={show} size={size}/>
                        </div>
                        <div className='inputs'>
                            <div className='btns'>
                                <input type='button' value={'✖️'} className='btn' onClick={xButtonHandler} />
                                <input type='button' value={'⬛'} className='btn' onClick={blackButtonHandler} />
                            </div>
                            <div className='nextlevel'>
                                <input type='button' value='Next Level' className='save' onClick={()=> nextLevel()} />
                            </div>
                        </div>
                    </div>
            }
        </div>

    )
}
// (stepNumber === steps) ? setId(id +1) : id
export default Game