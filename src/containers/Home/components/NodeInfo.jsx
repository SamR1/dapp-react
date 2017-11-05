import React, { Component } from 'react';

import { config } from '../../../utils/config.js';
import { getNodeInfo } from '../../../utils/ethUtils';


class NodeInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            node: {
                address: config.nodeAddress,
                tokenBalance: 'n/a',
                totalConsumption: 'n/a',
                totalProduction: 'n/a'
            }
        };
    }

    componentWillMount() {
        this.interval = setInterval(() => this.setState({
            node: getNodeInfo(config.nodeAddress)
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="node-infos">
                <h3>Node</h3>
                <h4>My account</h4>
                <h5>Address: <br/><strong>{config.nodeAddress}</strong></h5>
                <h5>Token Balance (DaiseeCoin): <br/><strong>{this.state.node.tokenBalance}</strong></h5>
                <h5>Energy :</h5>
                <h5> > Total consumption (Watt): <br/><strong>{this.state.node.totalConsumption}</strong></h5>
                <h5> > Total production  (Watt): <br/><strong>{this.state.node.totalProduction}</strong></h5>
            </div>
        );
    }
}

export default NodeInfo;