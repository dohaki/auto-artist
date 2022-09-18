import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Header } from "../components/Header";
import { GallerySlider } from "../components/GallerySlider";
import { About } from "../components/About";

export function Gallery() {
  const params = useParams();

  return (
    <Flex direction="column">
      <Header />
      <GallerySlider tokenId={params.tokenId} />
      <About tokenId={params.tokenId} />
    </Flex>
  );
}
