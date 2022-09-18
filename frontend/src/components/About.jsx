import {
  Flex,
  Heading,
  Container,
  Divider,
  Text,
  Image,
  Link,
  Code
} from "@chakra-ui/react";
import { ChatIcon } from '@chakra-ui/icons';

export function About({ tokenId }) {

  return (
    <Container pt={8} maxW="container.md">
      <Divider pt={8} orientation='horizontal' />
      <Flex pt={8} direction="column" gap={8}>
          <Heading>Creating the best artwork in the world</Heading>
          <Text >
            Our tool allows Discord communities to create unique pieces of art, vote on their favorites and automatically mint them.
          </Text>
          <Text>
            The first crowd we dedicate our work to is the global hacker community. This is why this month's topic is hacking anywhere, anytime.
          </Text>
          <Text>
            <Link href='https://discord.gg/zrcWQCKnRB' isExternal>
             Drop into our Discord
            </Link>
             &nbsp; and type <Code children='/imagine' /> plus any prompt your beautiful mind will come up with, including phrases related to hacking:
          </Text>
          <Text>
            "Computer hacker, computer, octane render, 3d, 8k, high quality"
          </Text>
          <Text>
            Each day, we will mint our community’s daily favorite creation and mint it as a unique NFT in an auction. This will give us a record of how humans and machines interact. Will images converge over time? Which prompts will be most highly valued?
          </Text>


          <Text>
            <Link href='https://discord.gg/zrcWQCKnRB' isExternal>
            Join our Discord, create art and vote on your favorite pieces <ChatIcon mx='2px' />
            </Link>
          </Text>

          <Image
            //boxSize='500px'
            objectFit='cover'
            src='https://i.imgur.com/PxBZubh.png'
            alt='Cybernetic-Organism.png'
          />
          <Image
            //boxSize='500px'
            objectFit='cover'
            src='https://i.imgur.com/kg5v28Y.png'
            alt='Berlin-hacker.png'
          />


      </Flex>
    </Container>
  );
}
