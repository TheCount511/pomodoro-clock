import React, { Component } from 'react'
import './App.css'
//51790-9ikmIvm0ufb6Z9X


class App extends Component {
    constructor() {
        super();
        this.state = {
            presentValue: "",
            display: 0,
            input: [],
            initialvalue: 0,
            operand: '',
            result: "",
            status: "",
            buffer: "",
            specialOp: ""
        }
    }

    //this function is used to calculate string expressions as mathematical expressions
    calculate = (expr) => {
        return new Function('return ' + expr)()

    }

    //this function is used to replace the operand when it is being changed mid expression
    setCharAt = (str, index, chr) => {
        return str.substr(0, index) + chr;
    }

    //this function handles button clicks
    handleclick = (event) => {
        const userInput = event.target.value;
        const operators = ["+", "-", "/", "*"];

        //this clears the calculator when the "AC" button is clicked 
        if (userInput === "clear") {
            this.setState({ presentValue: "", display: 0, initialvalue: 0, input: [], result: "", operand: "", status: "", buffer: "" })
        }


        //this check is the input is a Number
        if (!isNaN(parseInt(userInput))) {

            if (this.state.presentValue.toString().length >= 16) {
                let truVal = () => this.setState({ display: this.state.presentValue })
                setTimeout(truVal, 4000);

                this.setState({ display: "Input limit reached" });
            } else {
                if (this.state.status === "end") {
                    this.setState({ initialvalue: 0 })
                }

                if (this.state.buffer !== "" && this.state.presentValue === "") {
                    this.setState(state => ({ presentValue: parseFloat(`${state.buffer}${userInput}`) }), () => {
                        this.setState(state => ({
                            display: state.presentValue
                        }))
                    })
                } else if (this.state.buffer !== "" && !isNaN(parseFloat(this.state.presentValue))) {
                    this.setState(state => ({ buffer: `${this.state.buffer}${userInput}` }), () => {
                        this.setState(state => ({ presentValue: parseFloat(state.buffer), display: state.buffer }))
                    })
                } else //If a number hasn't been entered previously set the present value to the new number
                    if (this.state.presentValue === 0) {
                        this.setState({ presentValue: parseFloat(userInput), }, () => { this.setState(state => ({ display: state.presentValue })) })
                    }

                else { //If a number has been entered, but no operation has been performed on it; concatenate the new number to it.
                    this.setState(state => ({ presentValue: parseFloat(`${state.presentValue}${userInput}`) }), () => { this.setState(state => ({ display: state.presentValue })) });
                }
            }

            //if  the input is an operand perform the following functions; starting with setting the operand state to the input
        } else if (userInput === ".") {

            if (this.state.presentValue === "") {
                this.setState({ presentValue: 0 }, () => { this.setState({ buffer: `0.`, display: `0.` }) })
            } else if (!isNaN(parseFloat(this.state.presentValue)) && !this.state.presentValue.toString().includes(".")) {
                this.setState(state => ({ buffer: `${state.presentValue}${userInput}`, display: `${state.presentValue}${userInput}` }))
            }

        } else if (operators.includes(userInput)) {
            this.setState({
                operand: userInput,
                status: "start",
                buffer: ""
            });

            //when an operand is clicked, if the last value of the input state is an operand, and the present value os empty
            //set the last value of the input state(the operand) to the newly selected operand
            if (operators.includes(this.state.input[this.state.input.length - 1]) && this.state.presentValue === "") {

                if ((this.state.input[this.state.input.length - 1] !== "-" && this.state.input[this.state.input.length - 2] !== "-") && userInput === "-") {

                    this.setState(state =>
                        ({ input: [...state.input, userInput], initialvalue: `${state.initialvalue}${userInput}` }))
                } else if ((operators.includes(this.state.input[this.state.input.length - 1])) && operators.includes(this.state.input[this.state.input.length - 2]) && userInput !== "-") {
                    let edit = (resolve) => {
                        this.state.input.splice(-2, 2, userInput);
                        resolve();
                    }

                    let resolve = () => {
                        this.setState(state => ({ input: state.input, initialvalue: this.setCharAt(state.initialvalue, state.initialvalue.length - 2, userInput) }))
                    }

                    edit(resolve);


                } else {
                    this.state.input[this.state.input.length - 1] = userInput;
                    this.setState(state => ({ initialvalue: this.setCharAt(state.initialvalue, state.initialvalue.length - 1, userInput) }));
                }
            }

            //when an operand is selected, if the input state is empty and the present value is empty
            //add the input value to the input state and follow it with the operand
            //also set the initial value to include the operand
            else if (!this.state.input.length && this.state.presentValue === "")

            {
                this.setState(state => ({
                    input: [...state.input, state.initialvalue, state.operand],
                    initialvalue: `${state.initialvalue}${state.operand}`
                }))

            } else if (this.state.presentValue === "" && this.state.specialOp) {
                this.setState(state => ({
                    input: [...state.input, state.operand],
                    initialvalue: `${state.initialvalue}${state.operand}`,
                    specialOp: false
                }))
            }

            //if the last value of the input state is an operand perform the following functions:
            else if (isNaN(this.state.input[this.state.input.length - 1])) {
                //add the present value, followed by the selected operand to the input state
                this.setState(state => ({
                        input: [...state.input, state.presentValue, state.operand],
                    }),
                    () => { //when that is completed set the result to be the calculation of the initial value and the present value
                        if (this.state.initialvalue === 0) {
                            this.setState(state => ({
                                result: state.presentValue,
                                initialvalue: `${state.presentValue}${state.operand}`
                            }), () => {
                                //when that is completed set the present value to null
                                this.setState({
                                    presentValue: ""
                                })
                            })
                        } else {
                            this.setState(state => ({
                                result: this.calculate(`${state.initialvalue}${state.presentValue}`),
                                initialvalue: `${this.calculate(`${state.initialvalue}${state.presentValue}`)}${state.operand}`,
                            }), () => {
                                //when that is completed set the present value to null
                                this.setState({
                                    presentValue: ""
                                })
                            })
                        }
                    })
            }


        }

        //if the input clicked is an equal to sign then calculate the expression
        if (userInput === "=" && !isNaN(parseInt(this.state.presentValue)) && (this.state.input.length >= 1)) {

            this.setState(state => ({ result: this.calculate(`${state.initialvalue}${state.presentValue}`) }), () => {
                this.setState(state => ({ initialvalue: state.result, display: state.result, presentValue: "", input: [], operand: "", status: "end" }))
            });
        }

        if (userInput === "±") {
            if (parseFloat(this.state.presentValue) > 0 && this.state.input.length === 0) {
                if (this.state.input.length < 1) {
                    this.setState(state => ({ initialvalue: -(state.presentValue), specialOp: true }), () => { this.setState(state => ({ presentValue: "", input: [...state.input, state.initialvalue], display: state.initialvalue })) })
                }
            } else if (this.state.input.length >= 1 && !isNaN(parseFloat(this.state.presentValue))) {

                this.setState(state => ({ presentValue: -(state.presentValue) }), () => {
                    this.setState(state => ({ display: state.presentValue, input: [...state.input, state.presentValue] }))
                })
            }
        }
    }

    render() {
        return (
            <div className="calculator-container">
      <div className="formula">{this.state.input.join(" ")}</div>
      <div id="display">{this.state.display}</div>
      <div className="buttons-container">
        <button className="wide clear"  id="clear" value="clear"  onClick={this.handleclick}>AC</button>
        <button className="regular operator" id="divide" value="/" type="operator" onClick={this.handleclick}>/</button>
        <button className="regular operator special" id="multiply" value="*" type="operator"  onClick={this.handleclick}>*</button>
        <button className="regular operator special" id="multiply" value="±" type="operator"  onClick={this.handleclick}>±</button>
        <button className="regular" id="seven" value="7"  onClick={this.handleclick}>7</button>
        <button className="regular" id="eight" value="8"  onClick={this.handleclick}>8</button>
        <button className="regular" id="nine" value="9"  onClick={this.handleclick}>9</button>
        <button className="regular operator" id="add" value="+" type="operator" onClick={this.handleclick}>+</button>
        <button className="regular" id="subtract" value="-" type="operator" onClick={this.handleclick}>-</button>
        <button className="regular" id="four" value="4"  onClick={this.handleclick}>4</button>
        <button className="regular" id="five" value="5"  onClick={this.handleclick}>5</button>
        <button className="regular" id="six" value="6"  onClick={this.handleclick}>6</button>
        <button className="regular" id="one" value="1"  onClick={this.handleclick}>1</button>
        <button className="regular" id="two" value="2"  onClick={this.handleclick}>2</button>
        <button className="regular" id="three" value="3"  onClick={this.handleclick}>3</button>
        <button className="wide"    id="zero" value={Number(0)}  onClick={this.handleclick}>0</button>
        <button className="regular" id="decimal" value="."  onClick={this.handleclick}>.</button>
        <button className="long"    id="equals"  value="=" onClick={this.handleclick}>=</button>
      </div>
      </div>
        )
    }
}

export default App;