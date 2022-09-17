import { Button } from "@chakra-ui/react";

import { useFinalize } from "../hooks/useFinalize";

export function Finalize({ tokenId }) {
  const finalize = useFinalize(tokenId);

  return (
    <Button
      colorScheme="purple"
      disabled={!finalize.write}
      onClick={() => finalize?.write()}
      isLoading={finalize.isLoading}
    >
      Finalize
    </Button>
  );
}
