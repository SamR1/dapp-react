import React, { Component } from 'react';

import { getSellersList } from '../../../utils/ethUtils';


class EnergySellers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sellers: []
        };
    }

    componentWillMount() {
        this.interval = setInterval(() => this.setState({
            sellers: getSellersList()
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="sellers-table">
                <h4 className="sub-header">Purchased energy:</h4>
                <div className="table-responsive">
                    <table className="table" id="purchased">
                        <thead>
                        <tr>
                            <th>n°</th>
                            <th>from</th>
                            <th>consumed</th>
                            <th>remain</th>
                            <th>total</th>
                        </tr>
                        </thead>
                        <tbody id="energystat">
                        {
                            this.state.sellers.map((seller) => {
                                return (
                                    <tr key={seller.nb}>
                                        <td>{seller.nb}</td>
                                        <td>{seller.from}</td>
                                        <td>{seller.consumed}</td>
                                        <td>{seller.remain}</td>
                                        <td>{seller.total}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default EnergySellers;
