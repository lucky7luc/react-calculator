import React, { Component } from 'react';
import './App.css';

function Display (props) {
return (
<div>
  <div id='current-calc'>{props.currCalc}</div>
  <div id='display'>{props.inputVal}</div>
</div>);
}

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentCalc: [],
        inputValue: "0",
        currentDisplay: "",
        lastClicked: ""
    }

    this.allClear = this.allClear.bind(this);
    this.addNumber = this.addNumber.bind(this);
    this.addDot = this.addDot.bind(this);
    this.addSign = this.addSign.bind(this);
    this.getResult = this.getResult.bind(this);
  }

  allClear() {
    this.setState({
      currentCalc: [],
        inputValue: "0",
        currentDisplay: "",
        lastClicked: ""
    })
  }

  addNumber(number) {
    let newInput;
    let newInputArr;

    if(this.state.lastClicked === "="){
      newInput = number;
      newInputArr = [newInput];
    } else if(["+", "-", "/", "*", "+-", "--", "/-", "*-"].includes(this.state.inputValue)){
      newInput = number;
      newInputArr = this.state.currentCalc.concat(newInput);
    } else if (this.state.inputValue === "0"){
      newInput = number;
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
    } else {
      newInput = this.state.inputValue + number;
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
    }

    this.setState({
      currentCalc: newInputArr,
        inputValue: newInput,
        currentDisplay: newInputArr.join(""),
        lastClicked: number
    });
  }

  addDot() {
    let newInput;
    let newInputArr;

    if(this.state.inputValue.includes(".")){
      newInput = this.state.inputValue;
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput)
    } else if(["+", "-", "/", "*", "+-", "--", "/-", "*-"].includes(this.state.inputValue)){
      newInput = "0.";
      newInputArr = this.state.currentCalc.concat(newInput);
    } else{
      newInput = this.state.inputValue + ".";
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
    }

    this.setState({
      currentCalc: newInputArr,
        inputValue: newInput,
        currentDisplay: newInputArr.join(""),
        lastClicked: "."
    });
  }

  addSign(sign) {
   let newInput;
   let newInputArr;

   if(["+", "-", "/", "*", "+-", "--", "/-", "*-"].includes(this.state.inputValue)){
    if(sign === "-" && this .state.inputValue.length <= 1) {
      newInput = this.state.inputValue + sign;
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
    } else {
      newInput = sign;
      newInputArr = this.state.currentCalc.slice(0, -1).concat(newInput);
    };
   } else {
    newInput = sign;
    newInputArr = this.state.currentCalc.concat(newInput);
   }

   this.setState({
    currentCalc: newInputArr,
      inputValue: newInput,
      currentDisplay: newInputArr.join(""),
      lastClicked: sign
    });
  }


  getResult() {
    const result = eval(this.state.currentCalc.join(""));
    const newDisplay = this.state.currentCalc.concat(" = ", result);

    this.setState(prevState => ({
      currentCalc: [result],
      inputValue: result,
      currentDisplay: newDisplay.join(""),
      lastClicked: "="
    }));
  }

  render (){
    const {currentCalc, inputValue, currentDisplay, lastClicked} = this.state;

    return(
    <div className="calculator">

      <Display currCalc={currentDisplay} inputVal={inputValue} />

      <div id='buttons'>
        <button id='clear' className='btn' onClick={this.allClear}>AC</button>
        <button id='divide' className='calc btn' onClick={() => {this.addSign("/")}}>/</button>
        <button id='multiply' className='calc btn' onClick={() => {this.addSign("*")}}>*</button>

        <button id='seven' className='number btn' onClick={() => {this.addNumber("7")}}>7</button>
        <button id='eight' className='number btn' onClick={() => {this.addNumber("8")}}>8</button>
        <button id='nine' className='number btn' onClick={() => {this.addNumber("9")}}>9</button>
        <button id='subtract' className='calc btn' onClick={() => {this.addSign("-")}}>-</button>

        <button id='four' className='number btn' onClick={() => {this.addNumber("4")}}>4</button>
        <button id='five' className='number btn' onClick={() => {this.addNumber("5")}}>5</button>
        <button id='six' className='number btn' onClick={() => {this.addNumber("6")}}>6</button>
        <button id='add' className='calc btn' onClick={() => {this.addSign("+")}}>+</button>

        <button id='one' className='number btn' onClick={() => {this.addNumber("1")}}>1</button>
        <button id='two' className='number btn' onClick={() => {this.addNumber("2")}}>2</button>
        <button id='three' className='number btn' onClick={() => {this.addNumber("3")}}>3</button>

        <button id='zero' className='number btn' onClick={() => {this.addNumber("0")}}>0</button>
        <button id='decimal' className='number btn' onClick={this.addDot}>.</button>
        <button id='equals' className='btn' onClick={this.getResult}>=</button>
      </div>
    </div>
    );
  }
}

export default Calculator;