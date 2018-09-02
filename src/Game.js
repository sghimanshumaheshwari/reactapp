import React, { Component } from 'react';
import './Game.css';
//import axios from 'axios';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap';
import _ from 'lodash';

var possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

const Star = (props) => {
    //const numberOfStars = 1 + Math.floor(Math.random() * 9);
    //let stars = [];
    // for (let i = 0; i < numberOfStars; i++) {
    //     stars.push(<i key={i} className="fa fa-star" />);
    // }
    debugger;
    return (

        <div className="col-5">
            {/* {stars} */}
            {_.range(props.numberOfStars).map((number, i) => { return (<i key={i} className="fa fa-star" />); })}
        </div>

    );

}

const Button = (props) => {
    let button;
    switch (props.isCorrectAnswer) {
        case true:
            button = <button className="btn btn-success" onClick={() => { props.acceptAnswer(); }}>
                <i className="fa fa-check" />
            </button>;
            break;
        case false:
            button = <button className="btn btn-danger">
                <i className="fa fa-times" />
            </button>;
            break;
        default:
            button = <button onClick={() => { props.checkAnswer(); }}
                className="btn"
                disabled={props.selectedNumbers.length === 0} >
                =
            </button>;
            break;
    }

    return (
        <div className="col-2">
            {/* <button className="btn" disabled={props.selectedNumbers.length === 0} >= </button> */}
            {button}
            <br />
            <br />
            <button className="btn btn-warning btn-sm"
                onClick={() => { props.redraw(); }}
                disabled={props.redrawCount === 0} >
                <i className="fa fa-refresh" />&nbsp; {props.redrawCount}
            </button>
        </div>
    );
}


const Answer = (props) => {
    return (
        <div className="col-5">
            <div card text-center>
                <div>
                    {props.selectedNumbers.map((number, i) => { return (<span onClick={() => { props.unselectNumber(number) }} key={i}>{number}</span>) })}
                </div>
            </div>

        </div>
    );
}

const Number = (props) => {
    //debugger;
    //const arrayOfNumbers = _.range(1, 9);
    const getClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return ('used');
        }
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return ('selected');
        }
    };
    const numberSelectedAfterClick = (event) => {
        debugger;

        props.selectNumber(parseInt(event.target.textContent, 10));
    };
    return (
        <div className="card text-center">
            <div>
                {
                    //arrayOfNumbers.map((number, i) => {return(<span key={i}>{number}</span>);})
                    Number.List.map((number, i) => {
                        return (<span key={i} className={getClassName(number)} onClick={numberSelectedAfterClick} >{number}</span>);
                    })
                }
            </div>
        </div>
    );
}

Number.List = _.range(1, 9);

const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
        </div>
    );
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //selectedNumbers: [2, 4],
            selectedNumbers: [],
            numberOfStars: Game.randomNumber(), //1 + Math.floor(Math.random() * 9),
            //this state will store the flag that answer is correct or not.
            isCorrectAnswer: null,
            usedNumbers: [],
            redrawCount: 5,
            doneStatus: null,
        };
    };
    static randomNumber = () => {
        return (1 + Math.floor(Math.random() * 9));
    }
    selectNumber = (selectedNumber) => {
        debugger;
        if (this.state.selectedNumbers.indexOf(selectedNumber) < 0) {
            this.setState((prevState, props) => {
                return ({
                    selectedNumbers: prevState.selectedNumbers.concat(selectedNumber),
                    isCorrectAnswer: null,
                });
            });
        }
    }
    unselectNumber = (clickedNumber) => {
        this.setState((prevState, props) => ({
            selectedNumbers: prevState.selectedNumbers.filter((number) => number != clickedNumber),
            isCorrectAnswer: null,
        }));
    }
    checkAnswer = () => {
        //To check answer, wheather answer is correct or not.
        this.setState((prevState, props) => ({
            isCorrectAnswer: prevState.numberOfStars == prevState.selectedNumbers.reduce((total, num) => { return (total + num); }, 0)
        }));
    }

    acceptAnswer = () => {
        //Accept the answer, never let the used numbers to be used
        this.setState((prevState) => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            isCorrectAnswer: null,
            numberOfStars: Game.randomNumber(),//1 + Math.floor(Math.random() * 9),

        }), this.updateDoneStatus);
    }

    redraw = () => {
        if (this.state.redrawCount == 0) { return; }
        this.setState((prevState) => ({
            redrawCount: prevState.redrawCount - 1,
            selectedNumbers: [],
            numberOfStars: Game.randomNumber(), // 1 + Math.floor(Math.random() * 9),
            isCorrectAnswer: null,
            usedNumbers: [],
        }),this.updateDoneStatus);
    }

    possibleSolution = ({ numberOfStars, usedNumbers }) => {
        const possibleNumbers = _.range(1, 9).filter((num, indx) => {
            return (usedNumbers.indexOf(num) === -1);
        });
        return (possibleCombinationSum(possibleNumbers, numberOfStars));
    }

    updateDoneStatus = () => {
        this.setState((prevState) => {
            if (this.state.usedNumbers.length === 9) {
                return ({ doneStatus: 'Done Nice!!' });
            }
        if (prevState.redrawCount === 0 && !this.possibleSolution(prevState)) {
                // if there is not redraws left and there is no possible solution.
                return ({ doneStatus: 'Game Over!' });
            }



        });
    }

    //debugger;
    render() {
        //const {selectedNumbers, numberOfStars}=this.state;
        return (
            <div>
                <h1>Play Nine</h1>
                <hr />
                <div className="row">
                    <Star numberOfStars={this.state.numberOfStars} />
                    <Button checkAnswer={this.checkAnswer} isCorrectAnswer={this.state.isCorrectAnswer}
                        selectedNumbers={this.state.selectedNumbers}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        redrawCount={this.state.redrawCount} />
                    <Answer unselectNumber={this.unselectNumber} selectedNumbers={this.state.selectedNumbers} />

                </div>
                <br />
                {
                    (this.state.doneStatus) ? <DoneFrame doneStatus={this.state.doneStatus} /> :
                        <Number usedNumbers={this.state.usedNumbers} selectNumber={this.selectNumber}
                            selectedNumbers={this.state.selectedNumbers} />
                }
            </div>
        );
    };
}


class MainGame extends React.Component {
    render() {
        return (
            <div>
                <Game />
            </div>
        );
    };
}
export default MainGame;