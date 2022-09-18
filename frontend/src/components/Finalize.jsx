import { useState } from "react";
import { Button } from "@chakra-ui/react";

import { useFinalize } from "../hooks/useFinalize";
import { useTokenInfo } from "../hooks/useTokenInfo";

export function Finalize({ tokenId }) {
  const finalize = useFinalize(tokenId);
  const [txHash, setTxHash] = useState();

  const tokenInfo = useTokenInfo(tokenId);

  return (
    <Button
      colorScheme="purple"
      disabled={!finalize.write || txHash}
      onClick={() => {
        finalize
          ?.writeAsync()
          .then((data) => {
            setTxHash(data.hash);
            return data.wait();
          })
          .then((receipt) => {
            setTxHash("");
            tokenInfo.refetch();
          });
      }}
      isLoading={finalize.isLoading}
    >
      Finalize
    </Button>
  );
}
