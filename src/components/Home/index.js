import React, { Component } from 'react';
import Web3 from 'web3';

import './style.css';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8540'));


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_block_nb: null
        }
    }

    componentWillMount() {
        let current_block_number = web3.eth.blockNumber;
        this.setState({
            current_block_nb: current_block_number
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                Current Block: {this.state.current_block_nb}
                </div>
            </div>
        );
    }
}

export default Home;