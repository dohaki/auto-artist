import { Flex, Box, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <Flex
      width="full"
      alignItems="center"
      justifyContent="space-between"
      padding={8}
      marginBottom={16}
    >
      <Heading size="md">AutoArtist</Heading>
      <Box>
        <ConnectButton />
      </Box>
    </Flex>
  );
}
