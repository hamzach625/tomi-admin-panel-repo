import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getMarketContract } from "../../utils/contractHelpers";
const Claim = () => {
    const web3 = useWeb3();
    const contractAddress = environment.MarketContract;
    const contract = getMarketContract(contractAddress, web3);
    const UserClaim = useCallback(
        async (tokenId, account) => {
            try {
                const details = await contract.methods
                    .claim(tokenId)
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
    return { UserClaim: UserClaim };
};
export default Claim;