import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { utils } from "ethers";

import { contractAddress, contractAbi } from "../constants";

export function useBid(tokenId, bidAmount) {
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: contractAbi,
    functionName: "bid",
    args: tokenId || "1",
    overrides: {
      value: utils.parseEther(bidAmount || "0"),
    },
  });
  return useContractWrite(config);
}
