import { useEffect, useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { Contract } from "ethers";

import { config } from "../config";

import artifact from "../contracts/AutoArtist.json";
import addresses from "../contracts/contract-address.json";

const address = addresses[config.networkName];
const abi = artifact.abi;

export function useAutoArtistContract() {
  const [contract, setContract] = useState();

  const provider = useProvider();
  const signer = useSigner();
  const { isConnected } = useAccount();

  console.log(provider);

  useEffect(() => {
    if (isConnected && signer) {
      setContract(new Contract(address, abi, signer));
    } else if (provider) {
      setContract(new Contract(address, abi, provider));
    }
  }, [isConnected, signer, provider]);

  return contract;
}
