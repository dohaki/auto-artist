import { useContractRead } from "wagmi";

import { config } from "../config";

import artifact from "../contracts/AutoArtist.json";
import addresses from "../contracts/contract-address.json";

const address = addresses[config.networkName].AutoArtist;

export function useTokenInfo(tokenId) {
  const getTokenInfoRead = useContractRead({
    addressOrName: address,
    contractInterface: artifact.abi,
    functionName: "getTokenInfo",
    args: tokenId,
  });

  return {
    ...getTokenInfoRead,
    data: {
      creator: getTokenInfoRead.data?.at(0),
      highestBidder: getTokenInfoRead.data?.at(1),
      highestBid: getTokenInfoRead.data?.at(2),
      auctionEndTime: getTokenInfoRead.data?.at(3),
      auctionEnded: getTokenInfoRead.data?.at(4),
    },
  };
}
