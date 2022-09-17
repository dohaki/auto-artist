import { useContractRead } from "wagmi";

import { contractAddress, contractAbi } from "../constants";

export function useTokenInfo(tokenId) {
  const getTokenInfoRead = useContractRead({
    addressOrName: contractAddress,
    contractInterface: contractAbi,
    functionName: "getTokenInfo",
    args: tokenId,
    cacheOnBlock: true,
  });

  return {
    ...getTokenInfoRead,
    data: {
      creator: getTokenInfoRead.data?.at(0),
      highestBidder: getTokenInfoRead.data?.at(1),
      highestBid: getTokenInfoRead.data?.at(2),
      auctionEndTime: getTokenInfoRead.data?.at(3),
      auctionEnded: getTokenInfoRead.data?.at(4),
      prompt: getTokenInfoRead.data?.at(5),
    },
  };
}
