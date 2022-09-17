const fs = require("fs");

task("mint", "Mint NFT")
  .addParam("creator", "The address of creator")
  .addParam("cid", "NFT image CID")
  .setAction(async ({ creator, cid }, { ethers }) => {
    if (network.name === "hardhat") {
      console.warn(
        "You are running the faucet task with Hardhat network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }

    if (!ethers.utils.isAddress(creator)) {
      console.error("Argument 'creator' is not a valid address");
      return;
    }

    if (!cid) {
      console.error("Argument 'cid' is not a valid string");
      return;
    }

    const addressesFile =
      __dirname + "/../frontend/src/contracts/contract-address.json";

    if (!fs.existsSync(addressesFile)) {
      console.error("You need to deploy your contract first");
      return;
    }

    const addressesJson = fs.readFileSync(addressesFile);
    const addresses = JSON.parse(addressesJson);
    const address = addresses[network.name].AutoArtist;

    if ((await ethers.provider.getCode(address)) === "0x") {
      console.error("You need to deploy your contract first");
      return;
    }

    const autoArtist = await ethers.getContractAt("AutoArtist", address);
    const [minter] = await ethers.getSigners();

    const owner = await autoArtist.owner();

    if (minter.address.toLowerCase() !== owner.toLowerCase()) {
      console.error("Signer is not owner");
      return;
    }

    const tx = await autoArtist.mint(creator, `ipfs://${cid}`);
    await tx.wait();

    const tokenId = await autoArtist.getCurrentTokenId();

    console.log(
      `Minted new token with id ${tokenId}, creator ${creator} and uri ipfs://${cid}`
    );
  });
