import React, { Component } from 'react';

import './Home.css';
import EthStatus from './components/EthStatus';
import NodeInfo from './components/NodeInfo';
import EnergyGraph from './components/EnergyGraph';


class Home extends Component {

    render() {
        return (
            <div className="Home">
                <div className="container">
                    <div className="row">
                        <EthStatus/>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 node-info">
                            <NodeInfo/>
                        </div>
                        <div className="col-md-8">
                            <EnergyGraph/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;