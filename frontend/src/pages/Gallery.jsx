import { Flex } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { GallerySlider } from "../components/GallerySlider";
import { useTokenInfo } from "../hooks/useTokenInfo";
import { useTokenUri } from "../hooks/useTokenUri";

export function Gallery() {
  const tokenInfo = useTokenInfo(1);
  const tokenUri = useTokenUri(1);
  console.log(tokenInfo.data, tokenUri.data);
  return (
    <Flex direction="column">
      <Header />
      <GallerySlider />
    </Flex>
  );
}
