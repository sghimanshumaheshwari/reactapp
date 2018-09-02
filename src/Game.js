import React, { Component } from 'react';
import './Game.css';
//import axios from 'axios';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap';
import _ from 'lodash';


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
            button = <button className="btn btn-success">
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //selectedNumbers: [2, 4],
            selectedNumbers: [],
            numberOfStars: 1 + Math.floor(Math.random() * 9),
            //this state will store the flag that answer is correct or not.
            isCorrectAnswer: null,
        };
    };
    selectNumber = (selectedNumber) => {
        debugger;
        if (this.state.selectedNumbers.indexOf(selectedNumber) < 0)
            this.setState((prevState, props) => {
                return ({ selectedNumbers: prevState.selectedNumbers.concat(selectedNumber) });
            });
    }
    unselectNumber = (clickedNumber) => {
        this.setState((prevState, props) => ({
            selectedNumbers: prevState.selectedNumbers.filter((number) => number != clickedNumber)
        }));
    }
    checkAnswer = () => {
        //To check answer, wheather answer is correct or not.
        this.setState((prevState, props) => ({
            isCorrectAnswer: prevState.numberOfStars == prevState.selectedNumbers.reduce((total, num) => { total + num, 0 })
        }));
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
                        selectedNumbers={this.state.selectedNumbers} />
                    <Answer unselectNumber={this.unselectNumber} selectedNumbers={this.state.selectedNumbers} />

                </div>
                <br />
                <Number selectNumber={this.selectNumber} selectedNumbers={this.state.selectedNumbers} />
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