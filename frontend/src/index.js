import React from "react";
import { createRoot } from "react-dom/client";
import { ColorModeScript } from "@chakra-ui/react";

import { Dapp } from "./components/Dapp";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={"dark"} />
    <Dapp />
  </React.StrictMode>
);
