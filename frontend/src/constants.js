import { config } from "./config";

import artifact from "./contracts/AutoArtist.json";
import addresses from "./contracts/contract-address.json";

export const contractAddress = addresses[config.networkName].AutoArtist;
export const contractAbi = artifact.abi;
