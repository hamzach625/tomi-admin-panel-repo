import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getMarketContract } from "../../utils/contractHelpers";

export const BidBalance = () => {
  const web3 = useWeb3();
  const tokenAddress = environment.MarketContract;
  const contract = getMarketContract(tokenAddress, web3);
  const CurrentBid = useCallback(async (account, tokenId) => {
    const approved = await contract.methods.addressForBalance(account, tokenId).call();
    return approved;
  }, [contract]);

  return { CurrentBid: CurrentBid };
};

export default BidBalance;
