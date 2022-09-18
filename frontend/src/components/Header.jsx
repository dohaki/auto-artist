import { Flex, Box, Heading, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChatIcon } from '@chakra-ui/icons';

export function Header() {
  return (
    <Flex
      width="full"
      alignItems="center"
      justifyContent="space-between"
      padding={8}
      marginBottom={16}
    >
      <Heading size="md">Arty</Heading>
      <Link href='https://discord.gg/zrcWQCKnRB' isExternal>
      Create art with us <ChatIcon mx='2px' />
      </Link>
      <Box>
        <ConnectButton />
      </Box>
    </Flex>
  );
}
