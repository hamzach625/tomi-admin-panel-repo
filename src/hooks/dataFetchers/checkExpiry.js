import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getMarketContract } from "../../utils/contractHelpers";

export const CheckExpire = () => {
  const web3 = useWeb3();
  const tokenAddress = environment.MarketContract;
  const contract = getMarketContract(tokenAddress, web3);
  const CheckExpiry = useCallback(async (tokenId) => {
    const data = await contract.methods.tokenIdForWordInfo(tokenId).call();
    return data;
  }, [contract]);

  return { CheckExpiry: CheckExpiry };
};

export default CheckExpire;
