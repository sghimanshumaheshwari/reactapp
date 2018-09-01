import React, { Component } from 'react';
import './Game.css';
//import axios from 'axios';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap';
import _ from 'lodash';


const Star = (props) => {
    const numberOfStars = 1 + Math.floor(Math.random() * 9);
    //let stars = [];
    // for (let i = 0; i < numberOfStars; i++) {
    //     stars.push(<i key={i} className="fa fa-star" />);
    // }
    debugger;
    return (

        <div className="col-5">
            {/* {stars} */}
            {_.range(numberOfStars).map((number, i) => { return (<i key={i} className="fa fa-star" />); })}
        </div>

    );

}

const Button = () => {
    return (
        <div className="col-2">
            <button>=</button>
        </div>
    );

}


const Answer = (props) => {
    return (
        <div className="col-5">
            <div card text-center>
                <div>
                    {props.selectedNumbers.map((number, i) => { return (<span key={i}>{number}</span>) })}
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
            selectedNumbers: [2, 4],
        };
    };
    selectNumber = (selectedNumber) => {
        debugger;
        this.setState((prevState) => {
            return ({ selectedNumbers: prevState.selectedNumbers.concat(selectedNumber) });
        });
    }
    debugger;
    render() {
        return (
            <div>
                <h1>Play Nine</h1>
                <hr />
                <div className="row">
                    <Star />
                    <Button />
                    <Answer selectedNumbers={this.state.selectedNumbers} />

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