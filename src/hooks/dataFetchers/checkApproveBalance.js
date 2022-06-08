import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getApproveContract } from "../../utils/contractHelpers";

export const CheckApprove = () => {
  const web3 = useWeb3();
  const tokenAddress = environment.WethApproveContract;
  const contract = getApproveContract(tokenAddress, web3);
  const CheckAvailableApprove = useCallback(async (account) => {
    const approved = await contract.methods.balanceOf(account).call();
    return approved;
  }, [contract]);

  return { CheckAvailableApprove: CheckAvailableApprove };
};

export default CheckApprove;