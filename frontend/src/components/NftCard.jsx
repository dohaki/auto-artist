import { Box, Image } from "@chakra-ui/react";

export function NftCard() {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image width={400} height={300} src={"https://picsum.photos/400/300"} />
      <Box p="6">
        <Box mt="1" as="h4" lineHeight="tight">
          This is the prompt that created the image
        </Box>
      </Box>
    </Box>
  );
}
