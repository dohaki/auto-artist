import { Box, Image, Text } from "@chakra-ui/react";

export function NftCard({ tokenUri, prompt }) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image width={400} height={400} src={tokenUriToPinataUrl(tokenUri)} />
      <Box p="6">
        <Box mt="1" lineHeight="tight">
          <Text fontSize="sm">{prompt}</Text>
        </Box>
      </Box>
    </Box>
  );
}

function tokenUriToPinataUrl(tokenUri) {
  const cid = tokenUri.replace("ipfs://", "");
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}
