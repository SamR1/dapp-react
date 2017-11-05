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
                transactionsList.push(EnergyTransactions.getResultData(result, 'prod'));
            }
        });

        this.consEvent = daiseeContract.Consume(() => this.setState({
            transactions: transactionsList
        }));
        this.consEvent.watch(function(error, result){
            if (!error){
                transactionsList.push(EnergyTransactions.getResultData(result, 'cons'));
            }
        });
    }

    static getResultData(result, type){
        let energyTransaction = '';
        let from = '';
        let to = '';

        let contractFrom = EnergyTransactions.checkIfIsNodeAddress(result.args.from);

        switch(type) {
            case 'cons':
                from = EnergyTransactions.checkIfIsNodeAddress(result.args.origin);
                to = contractFrom;
                energyTransaction = 'consumed';
                break;
            case 'prod':
                from = contractFrom;
                to = '';
                energyTransaction = 'produced';
                break;
            default:  // buy event (not implemented yet)
                from = contractFrom;
                to = EnergyTransactions.checkIfIsNodeAddress(result.args.to);
                energyTransaction = 'purchased';
        }

        return {
            blockNumber: result.blockNumber,
            from,
            to,
            transaction: 'Energy ' + energyTransaction + ' : ' + result.args.energy.c.toString() + ' W'
        };
    }

    static checkIfIsNodeAddress(address){
        return address === config.nodeAddress.toLowerCase() ? 'me' : address;
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

export default EnergyTransactions;