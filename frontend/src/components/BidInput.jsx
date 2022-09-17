import { useState } from "react";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import { useBid } from "../hooks/useBid";
import { useTokenInfo } from "../hooks/useTokenInfo";

export function BidInput({ tokenId }) {
  const [bidAmount, setBidAmount] = useState();

  const bid = useBid(tokenId, bidAmount);
  const tokenInfo = useTokenInfo(tokenId);

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children="Ξ" />
        <Input
          placeholder="Enter amount"
          onChange={(e) => setBidAmount(e.currentTarget.value)}
          value={bidAmount}
        />
      </InputGroup>
      <Button
        colorScheme="purple"
        disabled={!bidAmount || !bid.write}
        onClick={() => {
          bid?.writeAsync().then(() => {
            setBidAmount("");
            tokenInfo.refetch();
          });
        }}
        isLoading={bid.isLoading}
      >
        Place bid
      </Button>
    </>
  );
}
