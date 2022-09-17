import { createBrowserRouter } from "react-router-dom";

import { Gallery } from "./Gallery";

export const router = createBrowserRouter([
  {
    path: "/:tokenId",
    element: <Gallery />,
  },
  {
    path: "/",
    element: <Gallery />,
  },
]);
