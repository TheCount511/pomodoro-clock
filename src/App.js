import React, {Component} from 'react'
import './App.css'
let timerId;


class App extends Component {constructor() {super();
        this.state = {
            breakTime: 5,
            sessionTime: 25,
            start_stop: false,
            display: "Session",
            countdown: "inactive",
            currentPosition: "",
            min:25,
            sec:0,
            timerState: false
            }
       }

    increaseTime = (value, type) => {(value < 60 && this.setState({[type]: value + 1
        }, ()=>{ 
        (type==="sessionTime" && this.setState({
            min:this.state[type]})
            )})) 
    }
    decreaseTime = (value, type) => {(value> 1 && this.setState({[type]: value - 1
        }, ()=>{ 
        (type==="sessionTime" && this.setState({
            min:this.state[type]})
            )}))
    }

    reset = () => {
         clearInterval(timerId)
        
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
        let stop=(resetTime)=>{
               
                resetTime()
        }

        let resetTimer=()=>{
        this.setState({ 
        breakTime: 5, 
        sessionTime: 25, 
        min:25, 
        sec:0, 
        start_stop: false, 
        countdown:"inactive",
        display: "Session"
        })     
        }

        stop(resetTimer);
    }
    
playSound = () => {
       
      document.getElementById("beep").play();
    }

timer =(time1, time2 )=>{
    let countdown
    if(this.state.countdown==="active"){
       countdown = (this.state.min + (this.state.sec/60)) * 60 * 1000;
       this.setState({countdown:"inactive" }) 
    }
    else{
      countdown =  time1 * 60 * 1000;
    } 
    timerId =  setInterval(()=>{
    countdown -= 1000;
    let mins = Math.floor(countdown / (60 * 1000));
    let secs = Math.floor((countdown - (mins * 60 * 1000)) / 1000);


       
if (countdown < 0) {
    clearInterval(timerId)

    this.setState({display: (this.state.display==="Session"?"Break":"Session"), min:time2, sec:0} , ()=>{
        
        this.timer(time2, time1);
    })
     
}
else if(countdown ===0){
    this.playSound()
    this.setState({
        min:mins,
        sec:secs
    })
}
else{
this.setState({
    min:mins, 
    sec:secs})
    } }, 1000);
}

startTimer = () => { 

this.setState({start_stop: true}, ()=>{
    this.timer(this.state.sessionTime, this.state.breakTime)
})}

pauseTimer = () => {this.setState({ start_stop: false, countdown:"active"}, ()=>  {
    clearInterval(timerId);
}
    )}


render() {
const { breakTime, display, start_stop, sessionTime, min, sec} = this.state;
const {increaseTime, decreaseTime, reset, startTimer, pauseTimer} = this;
        
return (
<div className="content">
<h1>Pomodoro Clock</h1>
<div className="set">
<div>
    <div id="break-label">Break Length</div>
    <ul className="buttons">
     <li>
        <i className="fas fa-arrow-up"id="break-increment"onClick={()=>increaseTime(breakTime,"breakTime")}>
        </i>
    </li>
    <li><span id="break-length">{breakTime}</span>
    </li>
    <li>
    <i className="fas fa-arrow-down"id="break-decrement"onClick={()=>decreaseTime(breakTime,"breakTime")}></i>
    </li>
    </ul>
</div>
<div>
    <div id="session-label">Session Length</div>
    <ul className="buttons">
    <li>
        <i className="fas fa-arrow-up"id="session-increment"onClick={()=>increaseTime(sessionTime,"sessionTime")}>
        </i>
    </li>
    <li>
    <span id="session-length">{sessionTime}</span>
    </li>
    <li>
    <i className="fas fa-arrow-down"id="session-decrement"onClick={()=>decreaseTime(sessionTime,"sessionTime")}></i>
    </li>
    </ul>
</div>
</div>     
<div className="session">
    <div id="timer-label">{display}</div>
    <span id="time-left">{`${(min<10?"0":"")+min}:${(sec<10?"0":"")+sec}`}</span>
</div>
<div className="controls">
{start_stop ?
<i className="fas fa-pause"id="start_stop"onClick={pauseTimer}>
</i> :
<i className="fas fa-play"id="start_stop"onClick={startTimer}>
</i>}
<i className="fas fa-redo"id="reset"onClick={reset}>
</i>
<audio
    id="beep"
    preload="auto"
    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    ref="beep"
    />
</div>

</div>
        )
    }
}



export default App;