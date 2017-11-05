import React, { Component } from 'react';
import Web3 from 'web3';

import './style.css';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8540'));


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBlockNb: null
        };
    }

    componentWillMount() {
        let currentBlockNumber = web3.eth.blockNumber;
        this.setState({
            currentBlockNb: currentBlockNumber
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                Current Block: {this.state.currentBlockNb}
                </div>
            </div>
        );
    }
}

export default Home;