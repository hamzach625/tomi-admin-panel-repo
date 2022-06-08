import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getMarketContract } from "../../utils/contractHelpers";

export const TotalOffers = () => {
  const web3 = useWeb3();
  const tokenAddress = environment.MarketContract;
  const contract = getMarketContract(tokenAddress, web3);
  const Toffers = useCallback(
    async (token) => {
      const approved = await contract.methods
        .lengthForAllBids(parseInt(token))
        .call();
      return approved;
    },
    [contract]
  );

  return { Toffers: Toffers };
};
export default TotalOffers;
