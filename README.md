# ETHBerlin - AutoArtist

This repository contains the "AutoArtist" submission for the ETHBerlin3 hackathon.

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/dohaki/auto-artist
cd auto-artist
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npm run deploy:local
```

Also, you can mint an NFT by running the following:

```sh
npx hardhat mint \
--network localhost \
--creator 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 \
--cid QmbJaJGaJMJ4TqbTKKc3RiBXSLNaD57XsoKt5Q6mhwrVUF \
--prompt "prompt"
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see the Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.
