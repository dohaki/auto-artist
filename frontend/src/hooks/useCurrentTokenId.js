import { useContractRead } from "wagmi";

import { contractAddress, contractAbi } from "../constants";

export function useCurrentTokenId() {
  const getCurrentTokenId = useContractRead({
    addressOrName: contractAddress,
    contractInterface: contractAbi,
    functionName: "getCurrentTokenId",
  });

  return getCurrentTokenId;
}
