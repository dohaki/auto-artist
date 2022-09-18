import {
  Button,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Container,
  Box,
} from "@chakra-ui/react";
import { utils } from "ethers";
import { useNavigate } from "react-router-dom";

import { NftCard } from "./NftCard";
import { BidInput } from "./BidInput";
import { Finalize } from "./Finalize";
import { AuctionEndCountdown } from "./AuctionEndCountdown";

import { useTokenInfo } from "../hooks/useTokenInfo";
import { useTokenUri } from "../hooks/useTokenUri";
import { useTokenIdToDisplay } from "../hooks/useTokenIdToDisplay";
import { useCurrentTokenId } from "../hooks/useCurrentTokenId";

import { truncateAddress } from "../utils";

export function GallerySlider({ tokenId }) {
  const currentTokenId = useCurrentTokenId();
  const tokenIdToDisplay = useTokenIdToDisplay(tokenId);

  const tokenUri = useTokenUri(tokenIdToDisplay);
  const tokenInfo = useTokenInfo(tokenIdToDisplay);

  const navigate = useNavigate();

  const isLoading =
    tokenUri.isLoading || tokenInfo.isLoading || currentTokenId.isLoading;

  const didAuctionEnd = Date.now() / 1000 > tokenInfo.data?.auctionEndTime;
  const isAuctionFinalized = tokenInfo.data?.auctionEnded;

  return (
    <Container maxW="container.md">
      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <Flex direction="row" gap={8}>
          <NftCard tokenUri={tokenUri.data} prompt={tokenInfo.data?.prompt} />
          <Flex direction="column" gap={4}>
            <Flex direction="row" alignItems="center" gap={4}>
              <Button
                disabled={tokenIdToDisplay === 1}
                size="sm"
                onClick={() => navigate(`/${Number(tokenIdToDisplay) - 1}`)}
              >
                {"<"}
              </Button>
              <Button
                disabled={
                  Number(tokenIdToDisplay) === currentTokenId.data.toNumber()
                }
                size="sm"
                onClick={() => navigate(`/${Number(tokenIdToDisplay) + 1}`)}
              >
                {">"}
              </Button>
            </Flex>
            <Heading>AA #{tokenIdToDisplay}</Heading>
            <Flex>
              <Stat>
                <StatLabel>
                  {isAuctionFinalized ? "Sold for" : "Highest bid"}
                </StatLabel>
                <StatNumber>
                  Ξ {utils.formatEther(tokenInfo.data?.highestBid || 0)}
                </StatNumber>
              </Stat>
            </Flex>
            <Flex>
              <AuctionEndCountdown
                didAuctionEnd={didAuctionEnd}
                auctionEndTime={tokenInfo.data?.auctionEndTime?.toNumber()}
                onEnd={tokenInfo.refetch()}
              />
            </Flex>
            <Flex>
              <Stat>
                <StatLabel>
                  {isAuctionFinalized ? "Owner" : "Highest bidder"}
                </StatLabel>
                <StatNumber>
                  {truncateAddress(tokenInfo.data?.highestBidder)}
                </StatNumber>
              </Stat>
            </Flex>
            <Flex>
              <Stat>
                <StatLabel>Creator</StatLabel>
                <StatNumber>
                  {truncateAddress(tokenInfo.data?.creator)}
                </StatNumber>
              </Stat>
            </Flex>
            <Flex gap={4}>
              {didAuctionEnd ? (
                !isAuctionFinalized ? (
                  <Finalize tokenId={tokenIdToDisplay} />
                ) : null
              ) : (
                <BidInput tokenId={tokenIdToDisplay} />
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Container>
  );
}
