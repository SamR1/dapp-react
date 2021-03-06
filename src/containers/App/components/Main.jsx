import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../../Home/Home';

const Main = () => {
    return (
        <div className="container">
            <div className="row">
                <br/><br/><br/>
                <Router>
                    <div>
                        <Route exact path="/" component={Home}/>
                    </div>
                </Router>
            </div>
        </div>
    );
};

export default Main;