import React, { Component } from 'react';
import Web3 from 'web3';

import './Home.css';
import { config } from '../../utils/config.js';
import { getLastBlockInfo } from '../../utils/ethUtils';


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
            currentBlock: getLastBlockInfo()
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h6 className="bc-infos">Ethereum (current block) :
                        number: <strong>{this.state.currentBlock.number}</strong> ,
                        timestamp: <strong>{this.state.currentBlock.timestp}</strong></h6>
                    <h6 className="bc-infos">Contract address : <strong>{config.daiseeContract}</strong> </h6>
                    <h6 className="bc-infos">Token address : <strong>{config.tokenContract}</strong> </h6>
                </div>
            </div>
        );
    }
}

export default Home;