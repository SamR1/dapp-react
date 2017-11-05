import React, { Component } from 'react';
import Web3 from 'web3';

import './style.css';
import { config } from './../../config.js';


let web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.nodeUrl + ':' + config.nodePort));


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBlockNb: null
        };
    }

    componentWillMount() {
        let currentBlockNumber = 'n/a';

        try{
            currentBlockNumber = web3.eth.blockNumber;
        }
        catch (err) {
            console.error(err.message);
        }
        
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