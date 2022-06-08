import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getMarketContract } from "../../utils/contractHelpers";

export const CheckHigh = () => {
  const web3 = useWeb3();
  const tokenAddress = environment.MarketContract;
  const contract = getMarketContract(tokenAddress, web3);
  const HighestBid = useCallback(
    async (tokenId) => {
      const data = await contract.methods.tokenIdForCurrentBid(tokenId).call();
      return data;
    },
    [contract]
  );

  return { HighestBid: HighestBid };
};

export default CheckHigh;
