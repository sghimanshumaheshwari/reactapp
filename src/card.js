import React, { Component } from 'react';
import './card.css';
import axios from 'axios';
import 'font-awesome/css/font-awesome.css';
const Card = (props) => {
    return (
        <div className="cardinfo">
            <br />
            <div>
                <img width="75px" src={props.avatar_url} />
                <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                    <div>Name: {props.name}</div>
                    <div>Company Name: {props.company}</div>
                </div>
            </div>
        </div>
    );
};

const CardList = (props) => {

    return (
        <div>
            {props.cards.map((card, index) => <Card key={card.id} {...card} />)}

        </div>
    );
};


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '' };
    };
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('handle submit is clicked' + this.state.userName);

        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then((res) => {
                console.log(res);
                this.props.onSubmit({ name: res.data.name, company: res.data.company, avatar_url: res.data.avatar_url });
            });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="enter user name"
                    value={this.state.userName}
                    onChange={(event) => {
                        this.setState({ userName: event.target.value });
                    }}
                />
                <button type="submit">Add Card</button>
            </form>
        );
    };
};


class MainCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [
                { name: "James Darling", company: "facebook", avatar_url: "https://avatars0.githubusercontent.com/u/425?v=4" },
                { name: "Yehuda Katz", company: "Tilde, Inc.", avatar_url: "https://avatars0.githubusercontent.com/u/4?v=4" },
                { name: "Kevin Clark", company: "Cue", avatar_url: "https://avatars3.githubusercontent.com/u/20?v=4" },
            ]
        };
    };
    addNewCard = (cardInfo) => {
        debugger;
        this.setState(
            (prevState) => {
                return ({ cards: prevState.cards.concat(cardInfo) });
            }
        );
    };
    render() {
        return (
            <div className="mainCard">
                <i className="fa fa-star" />
                <Form onSubmit={this.addNewCard} />
                <CardList cards={this.state.cards}></CardList>
            </div>

        );

    };
};


//export default Card;
export default MainCard;