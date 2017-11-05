import React, { Component } from 'react';

import { config } from '../../../utils/config.js';
import { getLastBlockInfo } from '../../../utils/ethUtils';


class EthStatus extends Component {

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
            <div className="bc-infos">
                <h6>Ethereum (current block) :
                    number: <strong>{this.state.currentBlock.number}</strong>,
                    timestamp: <strong>{this.state.currentBlock.timestp}</strong></h6>
                <h6>Contract address : <strong>{config.daiseeContract}</strong> </h6>
                <h6>Token address : <strong>{config.tokenContract}</strong> </h6>
            </div>
        );
    }
}

export default EthStatus;