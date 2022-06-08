import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getApproveContract } from "../../utils/contractHelpers";

const BidApprove = () => {
    const web3 = useWeb3();
    const contractAddress = environment.WethApproveContract;
    const contract = getApproveContract(contractAddress, web3);
    const UserApprove = useCallback(
        async (nBid,account) => {
            let nd = nBid*100;
            nd = web3.utils.toWei(nd.toString(), "ether");
            try {
                const details = await contract.methods
                    .approve(environment.MarketContract, nd)
                    .send({
                        from: account,
                    })
                return details;
            } catch (error) {
                throw (error)
            }
        },
        [contract]
    );
    return { UserApprove: UserApprove };
};
export default BidApprove;