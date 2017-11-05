import React, { Component } from 'react';
import Web3 from 'web3';

import './style.css';
import { config } from './../../config.js';


let web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.nodeUrl + ':' + config.nodePort));


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBlock: {
                number: 'n/a',
                timestp: 'n/a',
            }
        };
    }

    componentWillMount() {
        this.interval = setInterval(() => this.setState({
            currentBlock: Home.getLastBlockInfo()
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    static getLastBlockInfo(){
        let number = 'n/a';
        let timestp = 'n/a';

        try {
            number = web3.eth.blockNumber;
            timestp = new Date(parseInt(web3.eth.getBlock(number).timestamp.toString() + '000', 10)).toString();
        }
        catch (err) {
            console.error(err.message);
        }

        return {
            number: number,
            timestp: timestp,
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h6 className="bc-infos">Ethereum status (current block) : number: <strong>{this.state.currentBlock.number}</strong> ,
                        timestamp: <strong>{this.state.currentBlock.timestp}</strong></h6>
                    <h6 className="bc-infos">Contract address : </h6>
                    <h6 className="bc-infos">Token address : </h6>
                </div>
            </div>
        );
    }
}

export default Home;