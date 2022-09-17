import { useContractRead } from "wagmi";

import { config } from "../config";

import artifact from "../contracts/AutoArtist.json";
import addresses from "../contracts/contract-address.json";

const address = addresses[config.networkName].AutoArtist;

export function useTokenUri(tokenId) {
  return useContractRead({
    addressOrName: address,
    contractInterface: artifact.abi,
    functionName: "tokenURI",
    args: tokenId,
  });
}
