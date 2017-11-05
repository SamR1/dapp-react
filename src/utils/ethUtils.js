import Web3 from 'web3';

import { config } from './config.js';


let web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.nodeUrl + ':' + config.nodePort));


export function getLastBlockInfo() {
    let number = 'n/a';
    let timestp = 'n/a';

    try {
        number = web3.eth.blockNumber;
        timestp = new Date(parseInt(web3.eth.getBlock(number).timestamp.toString() + '000', 10)).toString();
    }
    catch (err) {
        console.error(err.message);
    }

    return {
        number,
        timestp,
    };
}