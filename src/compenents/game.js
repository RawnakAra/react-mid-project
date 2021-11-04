import axios from "axios";
import React, { useEffect } from "react";
import Border from "./border";
import Timer from "./Timer/timer";
import { useStopwatch } from 'react-timer-hook'


const Game = () => {
    const [data, setData] = React.useState(null)
    const [steps, setstps] = React.useState(19)
    let [stepNumber, setStepNumber] = React.useState(0)
    const [size, setSize] = React.useState(6)
    const [squares, setSquares] = React.useState(["",3,4,5,4,3,5,"","","","","",5,"","","","","",5,"","","","","",3,"","","","","",1,"","","","",""])
    const [show, setShow] = React.useState(false)
    const [hearts, setHearts] = React.useState(['❤️', '❤️', '❤️'])
    const [showBtn, setShowBtn] = React.useState('');
    const [puzzle, setPuzzle] = React.useState(
        ["",3,4,5,4,3,
        5,1, 1, 1, 1, 1,
        5,1, 1, 1, 1, 1,
        5,1, 1, 1, 1, 1,
        3,0, 1, 1, 1, 0,
        1,0, 0, 1, 0, 0]
    )
    let [id, setId] = React.useState(1)
    const [select, setSelect] = React.useState('')
    const [time ,setTime] =React.useState(true)
    const {seconds ,minutes, reset} = useStopwatch({autoStart:time })
  

    // React.useEffect(() => {
    //     getPuzzleFromApi()
    // }, [id])

    // const getPuzzleFromApi = async () => {
    //     await axios.get(`https://617c34b6d842cf001711c2b7.mockapi.io/puzzle/${id}`)
    //         .then(res => {
    //             setPuzzle(res.data.puzzle)
    //             setSquares(res.data.squares)
    //             setstps(res.data.stepNum)
    //             setSize(res.data.size)
    //             //setData(res.data)
    //             //console.log(res.data.size)
    //         })
    // }

    React.useEffect(() => {
        getAllData()
    }, [])

    const getAllData = async () => {
        await axios.get(`https://617c34b6d842cf001711c2b7.mockapi.io/puzzle`)
            .then(res => {

                setData(res.data)
                //console.log(res.data)
            })
    }

    const handleCange = (e) => {
        console.log(Number(e.target.value) + 1)
        let found = data.find(u => {
            if (u.size == Number(e.target.value) + 1) {
                return u
            }
        })
        setPuzzle(found.puzzle)
        setSelect(Number(e.target.value) + 1)
        setSquares(found.squares)
        setstps(found.stepNum)
        console.log(found.stepNum)
        setSize(found.size)
        setId(found.id)
        reset()
    }

    const nextLevel = () => {
        console.log('nexttt')
        if (stepNumber === steps) {
            console.log('first if')
            setId(Number(id) + 1)
            let found = data.find(u => {
                if (u.id == Number(id) + 1) {
                    return u
                }
            })
            setPuzzle(found.puzzle)
            setStepNumber(0)
            setSquares(found.squares)
            setstps(found.stepNum)
            setSize(found.size)
            setHearts(['❤️', '❤️', '❤️'])
            setTime(false)
            reset()

        }
    }

    const test = (index) => {
        //if (stepNumber !== steps){
        if (index > size && index !== (size) && index !== (size * 2) && index !== (size * 3) && index !== (size * 4)) {
            let squareCopy = [...squares]
            if (showBtn === '⬛') {
                if (puzzle[index] === 1 && squareCopy[index]=== "") {
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
                        setTime(false)
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
                        setTime(false)
                    }
                }
            }
            setSquares(squareCopy)
        }
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
            <div className='header' style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className='timer' style={{ marginLeft: '100ox' }}>
                <span>{minutes}:{seconds}</span> 
                </div>
                <div className='hearts' >
                    {
                        hearts.map((h, index) => {
                            return <span key={index}>{h}</span>
                        })
                    }
                </div >
            </div>
            {
                show ?<h3 style={{fontSize:'36px'}} >Game over 🤯🤯</h3>  :
                    <div style={{display:'flex' , justifyContent: 'space-around' }}>
                        <div  >
                            <Border squares={squares} costomFun={test} show={show} size={size} />
                        </div>
                        <div className='inputs'>
                            <div className='btns'>
                                <input type='button' value={'✖️'} className='btn' onClick={xButtonHandler} />
                                <input type='button' value={'⬛'} className='btn' onClick={blackButtonHandler} />
                            </div>
                            <div className='nextlevel'>
                                <input type='button' value='Next Level' className='save' onClick={() => nextLevel()} />
                            </div>
                        
                        <div >
                            <select className="select" id="dropdown"  value={select} onChange={(e) => handleCange(e)}>
                                <option value='5' >Board Size</option>
                                <option value="5" >5X5</option>
                                <option value="8" >8X8</option>
                                <option value="10">10X10</option>
                                <option value="15">15X15</option>
                            </select>
                        </div>
                        </div>
                    </div>
            }

        </div>

    )
}

export default Game