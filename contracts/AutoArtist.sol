pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AutoArtist is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // Seed data to calculate price
  struct PriceSeed {
    uint256 maxPrice;
    uint256 minPrice;
    uint256 priceDelta;
    uint256 timeDelta;
    uint256 expirationTime;
  }

  // mapping token id => mint time
  mapping(uint256 => uint256) public mintTimes;
  // mapping token id => creator address
  mapping(uint256 => address payable) public creators;
  // price seed
  PriceSeed public priceSeed;
  // Mapping from token ID to price
  mapping(uint256 => uint256) private prices;
    

  constructor(PriceSeed memory _priceSeed) ERC721("AutoArtist", "AA") {
    priceSeed.maxPrice = _priceSeed.maxPrice;
    priceSeed.minPrice = _priceSeed.minPrice;
    priceSeed.priceDelta = _priceSeed.priceDelta;
    priceSeed.timeDelta = _priceSeed.timeDelta;
    priceSeed.expirationTime = _priceSeed.expirationTime;
  }


  function mint(
    address payable creator,
    string memory tokenURI
  ) public onlyOwner returns (uint256) {
    _tokenIds.increment();

    uint256 id = _tokenIds.current();
    _mint(address(this), id);
    _setTokenURI(id, tokenURI);
    creators[id] = creator;
 
    return id;
  }

  function buy(uint256 tokenId) external payable {
    address from = ownerOf(tokenId);
    address to = msg.sender;
    address payable creator = creators[tokenId];
    uint256 currentPrice = price(tokenId);
    bool isExpired = getIsExpired(tokenId);

    require(from == address(this), 'Owner is not the contract');

    // if buy phase expired, creator gets token 
    if (isExpired) {
      return transferFrom(from, creator, tokenId);
    }

    require(msg.value >= currentPrice, 'Must send at least currentPrice');

    // split price between treasury and creator
    uint256 treasuryFee = msg.value / 100; // 1%
    uint256 creatorRewards = msg.value - treasuryFee;
    creator.transfer(creatorRewards);
    prices[tokenId] = msg.value;

    return transferFrom(from, to, tokenId);
  }

  function getCurrentTokenId() external view returns (uint256) {                  
    return _tokenIds.current();
  }

  function getMintTime(uint256 tokenId) external view returns (uint256) {
    return mintTimes[tokenId];
  }

  function getIsExpired(uint256 tokenId) private view returns (bool) {
    uint256 timeDiff = block.timestamp - mintTimes[tokenId];
    return timeDiff > priceSeed.expirationTime;
  }

  function price(uint256 tokenId) private view returns (uint256) {
    uint256 timeDiff = block.timestamp - mintTimes[tokenId];
    if (timeDiff < priceSeed.timeDelta ) {
      return priceSeed.maxPrice;
    }
    uint256 priceDiff = uint256(timeDiff / priceSeed.timeDelta) * priceSeed.priceDelta;
    if (priceDiff >= priceSeed.maxPrice - priceSeed.minPrice) {
      return priceSeed.minPrice;
    }
    return priceSeed.maxPrice - priceDiff;
  }

  function tokenPrice(uint256 tokenId) public view returns (uint256) {
    address owner = ownerOf(tokenId);

    if (owner == address(this)) {
      return price(tokenId);
    }

    return prices[tokenId];
  }
}
