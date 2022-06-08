import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import environment from "../../utils/Environment";
import { getMintContract } from "../../utils/contractHelpers";
const ImgMinting = () => {
    const web3 = useWeb3();
    const contractAddress = environment.MintContract;
    const contract = getMintContract(contractAddress, web3);
    const userMinting = useCallback(
        async (account, ipfs, word) => {
            try {
                const details = await contract.methods
                    .mintWord(account, ipfs, word)
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
    return { userMinting: userMinting };
};
export default ImgMinting;