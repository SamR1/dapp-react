import React from 'react';

const NavBar = () => {
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header"><a className="navbar-brand" href="/">DAISEE</a></div>
                <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;