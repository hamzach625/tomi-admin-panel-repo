import web3NoAccount from "./web3";
import factory from './factoryAbi.json'
import StakeBnbToBnb from "./stakeBnbtoBnbAbi.json"
import StakeBnbToToken from "./stakeBnbforTokenAbi.json"
import StakeTokenToBnb from "./stakeTokentoBnbAbi.json"
import StakeTokenToToken from "./stakeTokentoTokenAbi.json"

const getContract = (abi, address, web3) => {
  const _web3 = web3 ?? web3NoAccount;
  // console.log('_web3',_web3);
  return new _web3.eth.Contract(abi, address);
};

export const getFactoryContract = (address, web3) => {
  return getContract(factory, address, web3);
};

export const getStakeBNBtoBNB = (address, web3) => {
  return getContract(StakeBnbToBnb, address, web3);
};

export const getStakeBNBtoToken = (address, web3) => {
  return getContract(StakeBnbToToken, address, web3);
};

export const getStakeTokentoToken = (address, web3) => {
  return getContract(StakeTokenToToken, address, web3);
};

export const getStakeTokentoBNB = (address, web3) => {
  return getContract(StakeTokenToBnb, address, web3);
};


