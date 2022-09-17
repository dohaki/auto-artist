import { Flex } from "@chakra-ui/react";

import { Header } from "../components/Header";
import { GallerySlider } from "../components/GallerySlider";
import { useTokenDetails } from "../hooks/useTokenDetails";

export function Gallery() {
  const tokenDetails = useTokenDetails();
  console.log(tokenDetails);
  return (
    <Flex direction="column">
      <Header />

      <GallerySlider />
    </Flex>
  );
}
