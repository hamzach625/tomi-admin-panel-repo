import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getMarketContract } from "../../utils/contractHelpers";
const CancelBid = () => {
    const web3 = useWeb3();
    const contractAddress = environment.MarketContract;
    const contract = getMarketContract(contractAddress, web3);
    const CancelBiding = useCallback(
        async (account, bidAmount,tokenId) => {
            try {
                const details = await contract.methods
                    .cancelBid(bidAmount, tokenId)
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
    return { CancelBiding: CancelBiding };
};
export default CancelBid;