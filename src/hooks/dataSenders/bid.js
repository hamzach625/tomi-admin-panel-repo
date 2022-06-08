import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getMarketContract } from "../../utils/contractHelpers";
const Nftbiding = () => {
  const web3 = useWeb3();
  const contractAddress = environment.MarketContract;
  const contract = getMarketContract(contractAddress, web3);
  const UserBiding = useCallback(
    async (nBid, tokenId, account) => {
      let nd = web3.utils.toWei(nBid.toString(), "ether");
      const gas = await contract.methods
        .bid(tokenId)
        .estimateGas({ from: account, value: nd });
      let gasPrice = await web3.eth.getGasPrice();
      try {
        const details = await contract.methods.bid(tokenId).send({
          from: account,
          value: nd,
          gas, 
          gasPrice: gasPrice
        });
        return details;
      } catch (error) {
        throw error;
      }
    },
    [contract]
  );
  return { UserBiding: UserBiding };
};

export default Nftbiding;