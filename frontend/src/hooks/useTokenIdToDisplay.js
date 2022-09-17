import { useCurrentTokenId } from "./useCurrentTokenId";

export function useTokenIdToDisplay(tokenId) {
  const currentTokenId = useCurrentTokenId();
  const tokenIdToDisplay = tokenId || currentTokenId.data?.toNumber() || 1;

  return Number(tokenIdToDisplay);
}
