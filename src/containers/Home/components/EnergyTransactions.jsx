import React, { Component } from 'react';

import { config } from '../../../utils/config.js';
import { daiseeContract } from '../../../utils/ethUtils';

let now = new Date();

class EnergyTransactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        };
    }

    componentWillMount() {

        let transactionsList = [];
        this.prodEvent = daiseeContract.Produce(() => this.setState({
            transactions: transactionsList
        }));
        this.prodEvent.watch(function(error, result){
            if (!error){
                transactionsList.push(EnergyTransactions.getResultData(result));
            }
        });

    }

    static getResultData(result){
        return {
            blockNumber: result.blockNumber,
            from: result.args.from === config.nodeAddress ? "me" : result.args.from,
            to: '',
            transaction: "Energy produced : " + result.args.energy.c.toString() + " W"
        };
    }

    render() {
        return (
            <div className="last-transaction">
                <h4 className="sub-header">Energy transactions since the last refresh ({now.toString()})</h4>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>block#</th>
                            <th>from</th>
                            <th>to</th>
                            <th>transactions</th>
                        </tr>
                        </thead>
                        <tbody id="transactions">
                        {
                            this.state.transactions.map((transaction) => {
                                return (
                                    <tr key={transaction.blockNumber}>
                                        <td>{transaction.blockNumber}</td>
                                        <td>{transaction.from}</td>
                                        <td>{transaction.to}</td>
                                        <td>{transaction.transaction}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default EnergyTransactions;