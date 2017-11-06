import Web3 from 'web3';

import { config } from './config.js';
import { daiseeAbiArray } from './daisee-abi';
import { tokenAbiArray } from './token-abi';


let web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.nodeUrl + ':' + config.nodePort));
let token = web3.eth.contract(tokenAbiArray).at(config.tokenContract);
let daisee = web3.eth.contract(daiseeAbiArray).at(config.daiseeContract);


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

export function getNodeInfo(props){
    let address = props;
    let tokenBalance = 'n/a';
    let totalConsumption = 'n/a';
    let totalProduction = 'n/a';

    try {
        tokenBalance = token.balanceOf(address).toString();
        totalProduction = daisee.energyProduction(address).toString();
        totalConsumption = daisee.totalEnergyConsumption(address).toString();
    }
    catch (err) {
        console.error(err.message);
    }

    return {
        address,
        tokenBalance,
        totalConsumption,
        totalProduction
    };
}

export function getSellersList(){

    let sellersList = [];
    let nodeAddress = config.nodeAddress.toLowerCase();

    try {
        let nbsellers = daisee.nbSellers();
        let j = 0;

        for (let i = 0; i < nbsellers; i++) {

            let sellerAddress = daisee.sellerIndex(i);
            if (sellerAddress === nodeAddress) { continue; }

            let allowance = parseInt(daisee.allowance(sellerAddress, nodeAddress), 10);
            let consumptionFromSeller = parseInt(daisee.energyConsumption(nodeAddress, sellerAddress), 10);
            let totalPurchasedEnergy = allowance + consumptionFromSeller;
            if (totalPurchasedEnergy === 0) { continue; }
            else { j += 1 }

            let sellerTd = {
                nb: j,
                from: sellerAddress,
                consumed: consumptionFromSeller,
                remain: allowance,
                total: totalPurchasedEnergy
            };
            sellersList.push(sellerTd);
        }
    }
    catch (error) {
        console.error(error.message)
    }

    return sellersList;
}

export const daiseeContract = daisee;