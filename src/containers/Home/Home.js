import React, { Component } from 'react';

import './Home.css';
import EthStatus from './components/EthStatus';
import NodeInfo from './components/NodeInfo';

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
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;