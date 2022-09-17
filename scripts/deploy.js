const path = require("path");
const hre = require("hardhat");

const { ethers } = hre;

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const AutoArtist = await ethers.getContractFactory("AutoArtist");
  const autoArtist = await AutoArtist.deploy(
    1 * 10 * 60 // bidding duration in seconds
  );
  await autoArtist.deployed();

  console.log("AutoArtist address:", autoArtist.address);

  saveFrontendFiles(network.name, autoArtist);
}

function saveFrontendFiles(networkName, autoArtist) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const addressesFilePath = path.join(contractsDir, "contract-address.json");
  const existingAddressesFile = fs.existsSync(addressesFilePath)
    ? JSON.parse(fs.readFileSync(addressesFilePath))
    : {};

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(
      {
        ...existingAddressesFile,
        [networkName]: {
          AutoArtist: autoArtist.address,
        },
      },
      undefined,
      2
    )
  );

  const AutoArtistArtifact = artifacts.readArtifactSync("AutoArtist");

  fs.writeFileSync(
    path.join(contractsDir, "AutoArtist.json"),
    JSON.stringify(AutoArtistArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
