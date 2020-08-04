import React, {Component} from 'react'
import './App.css'

class App extends Component {
    constructor() {super();
        this.state = {
            breakTime: 5,
            sessionTime:25,
            start_stop: false,
            display: "Session"
        }
    }


    increaseTime=(value, type)=>{
             (value<60 && this.setState({[type]:value+1}))    
        }
    decreaseTime=(value, type)=>{
        (value>1 && this.setState({[type]:value-1})) 
    }

    reset=()=>{
        this.setState({breakTime:5, sessionTime:25, start_stop:false})
    }
    startTimer=()=>{
        this.setState({start_stop:true});
    }
    stopTimer=()=>{
        this.setState({start_stop:false})
    }
    render() {
        const {breakTime,display,start_stop,sessionTime} = this.state;
        const {increaseTime, decreaseTime, reset, startTimer, stopTimer} = this;
        return (
            <div className="container">
                <div className="content">
                    <h1>Pomodoro Clock</h1>
                        <div className="set">
                            <div>
                                <div id="break-label">Break Length</div>
                                <ul className="buttons">
                                    <li ><i className="fas fa-arrow-up"id="break-increment" onClick={()=>increaseTime(breakTime, "breakTime")}></i>
                                    </li>
                                    <li><span id="break-length">{breakTime}</span></li>
                                    <li><i className="fas fa-arrow-down"id="break-decrement" onClick={()=>decreaseTime(breakTime, "breakTime")}></i></li>
                                </ul>
                            </div>
                            <div>
                                <div id="session-label">Session Length</div>
                                <ul className="buttons">
                                    <li><i className="fas fa-arrow-up"id="session-increment" onClick={()=>increaseTime(sessionTime, "sessionTime")}></i></li>
                                    <li><span id="session-length">{sessionTime}</span></li>
                                    <li><i className="fas fa-arrow-down"id="session-decrement"  onClick={()=>decreaseTime(sessionTime, "sessionTime")}></i></li>
                                </ul>
                            </div>
                        </div>     
                        <div className="session">
                            <div id="timer-label">{display}</div>
                            <span id="time-left">{`25:00`}</span>
                        </div>
                        <div className="controls">
                            {start_stop ? <i className="fas fa-pause"id="start_stop" onClick={stopTimer}></i> : <i className="fas fa-play"id="start_stop" onClick={startTimer}></i>}
                            <i className="fas fa-redo"id="reset" onClick={reset}></i>
                        </div>
                </div>
            </div>

        )
    }
}



export default App;