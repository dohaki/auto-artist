import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { contractAddress, contractAbi } from "../constants";

export function useFinalize(tokenId) {
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: contractAbi,
    functionName: "auctionEnd",
    args: tokenId || "1",
  });
  return useContractWrite(config);
}
