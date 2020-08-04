import React, {Component} from 'react'
import './App.css'

class App extends Component {
    constructor() {super();
        this.state = {
            breaktime: 5,
            start_stop: false,
            display: "Session"
        }
    }


    increaseTime=(value)=>{
             this.setState({breaktime:value+1})
        }


    render() {
        const {breaktime,display,start_stop} = this.state
        return (
            <div className="container">
                <div className="content">
                    <h1>Pomodoro Clock</h1>
                        <div className="set">
                            <div>
                                <div id="break-label">Break Length</div>
                                <ul className="buttons">
                                    <li ><i className="fas fa-arrow-up"id="break-increment" onClick={()=>this.increaseTime(breaktime)}></i>
                                    </li>
                                    <li><span id="break-length">{breaktime}</span></li>
                                    <li><i className="fas fa-arrow-down"id="break-decrement"></i></li>
                                </ul>
                            </div>
                            <div>
                                <div id="session-label">Session Length</div>
                                <ul className="buttons">
                                    <li><i className="fas fa-arrow-up"id="session-increment"></i></li>
                                    <li><span id="session-length">{25}</span></li>
                                    <li><i className="fas fa-arrow-down"id="session-decrement"></i></li>
                                </ul>
                            </div>
                        </div>     
                        <div className="session">
                            <div id="timer-label">{display}</div>
                            <span id="time-left">{`25:00`}</span>
                        </div>
                        <div className="controls">
                            {start_stop ? <i className="fas fa-pause"id="start_stop"></i> : <i className="fas fa-play"id="start_stop"></i>}
                            <i className="fas fa-redo"id="reset"></i>
                        </div>
                </div>
            </div>

        )
    }
}



export default App;