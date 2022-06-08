import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getMarketContract } from "../../utils/contractHelpers";

export const ClaimNft = () => {
  const web3 = useWeb3();
  const tokenAddress = environment.MarketContract;
  const contract = getMarketContract(tokenAddress, web3);
  const CheckClaimNft = useCallback(
    async (token) => {
      const claim = await contract.methods.tokenIdForWordInfo(token).call();
      return claim;
    },
    [contract]
  );

  return { CheckClaimNft: CheckClaimNft };
};

export default ClaimNft;
