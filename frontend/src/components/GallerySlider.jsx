import {
  Button,
  Text,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Input,
  InputGroup,
  InputLeftElement,
  Container,
} from "@chakra-ui/react";

import { NftCard } from "./NftCard";

export function GallerySlider() {
  return (
    <Container maxW="container.md">
      <Flex direction="row" gap={8}>
        <NftCard />
        <Flex direction="column" gap={4}>
          <Flex direction="row" alignItems="center" gap={4}>
            <Button size="sm">{"<"}</Button>
            <Button size="sm">{">"}</Button>
            <Text>Date</Text>
          </Flex>
          <Heading>AA #1</Heading>
          <Flex>
            <Stat>
              <StatLabel>Current price</StatLabel>
              <StatNumber>0.01 Ξ</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Next price in</StatLabel>
              <StatNumber>1 h</StatNumber>
            </Stat>
          </Flex>
          <Flex>
            <Stat>
              <StatLabel>Auction ends in</StatLabel>
              <StatNumber>1 h</StatNumber>
            </Stat>
          </Flex>
          <Flex>
            <Stat>
              <StatLabel>Creator</StatLabel>
              <StatNumber>0x</StatNumber>
            </Stat>
          </Flex>
          <Flex gap={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children="Ξ" />
              <Input placeholder="Enter amount" />
            </InputGroup>
            <Button colorScheme="purple">Buy</Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
