import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContractRead } from "wagmi";

import { config } from "../config";

import artifact from "../contracts/AutoArtist.json";
import addresses from "../contracts/contract-address.json";

const address = addresses[config.networkName].AutoArtist;

export function useTokenDetails() {
  const { tokenId = "1" } = useParams();

  const tokenPriceRead = useContractRead({
    addressOrName: address,
    contractInterface: artifact.abi,
    functionName: "tokenPrice",
    args: [tokenId],
  });

  const tokenUriRead = useContractRead({
    addressOrName: address,
    contractInterface: artifact.abi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  return { tokenPriceRead, tokenUriRead };
}
