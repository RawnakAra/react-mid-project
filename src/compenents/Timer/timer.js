import React, { useState, useEffect } from 'react';
import './timer.css'
import { useStopwatch } from 'react-timer-hook'
const Timer = ({time}) => {
 const {seconds ,minutes} = useStopwatch({autoStart:time ? time : false })
return(
    <span>{minutes}:{seconds}</span> 
)
}

export default Timer;