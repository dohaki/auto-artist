import { useContractRead } from "wagmi";

import { contractAddress, contractAbi } from "../constants";

export function useTokenUri(tokenId) {
  return useContractRead({
    addressOrName: contractAddress,
    contractInterface: contractAbi,
    functionName: "tokenURI",
    args: tokenId,
  });
}
