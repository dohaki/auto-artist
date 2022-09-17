pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AutoArtist is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // mapping token id => creator address
  mapping(uint256 => address payable) public creators;
  // mapping token id => prompt 
  mapping(uint256 => string) public prompts;
  // mapping token id => highest bids / prices
  mapping(uint256 => uint256) public highestBids;
  // mapping token id => highest bidder
  mapping(uint256 => address) public highestBidders;
  // mapping token id => auction end time
  mapping(uint256 => uint256) public auctionEndTimes;
  // mapping token id => auction ended
  mapping(uint256 => bool) public auctionFinalizations;

  // Allowed withdrawals of previous bids
  mapping(address => uint) pendingReturns;

  // duration in seconds where bids are allowed
  uint public biddingDuration;

  event HighestBidIncreased(uint indexed tokenId, address bidder, uint amount);
  event AuctionEnded(uint indexed tokenId, address winner, uint amount);  

  constructor(uint256 _biddingDuration) ERC721("AutoArtist", "AA") {
    biddingDuration = _biddingDuration;
  }

  function mint(
    address payable creator,
    string memory tokenURI,
    string memory prompt
  ) public onlyOwner returns (uint256) {
    _tokenIds.increment();

    uint256 id = _tokenIds.current();
    _mint(address(this), id);
    _setTokenURI(id, tokenURI);
    creators[id] = creator;
    auctionEndTimes[id] = block.timestamp + biddingDuration;
    prompts[id] = prompt;
 
    return id;
  }

  function bid(uint256 tokenId) public payable {
    address tokenOwner = ownerOf(tokenId);
    uint256 auctionEndTime = auctionEndTimes[tokenId];
    uint256 highestBid = highestBids[tokenId];

    require(tokenOwner == address(this), 'Owner is not the contract');
    require(block.timestamp <= auctionEndTime, 'Auction already ended');

    require(msg.value > highestBid, 'There already is a higher bid');

    // set new highest bid and bidder
    highestBids[tokenId] = msg.value;
    highestBidders[tokenId] = msg.sender;
    pendingReturns[msg.sender] += highestBid;
    
    emit HighestBidIncreased(tokenId, msg.sender, msg.value);
  }

  /**
   * Bidders can withdraws their overbid funds or creators can
   * withdraw their rewards.
   */
  function withdraw() public returns (bool) {
    uint amount = pendingReturns[msg.sender];
    if (amount > 0) {
      // It is important to set this to zero because the recipient
      // can call this function again as part of the receiving call
      // before `send` returns.
      pendingReturns[msg.sender] = 0;

      if (!payable(msg.sender).send(amount)) {
          // No need to call throw here, just reset the amount owing
          pendingReturns[msg.sender] = amount;
          return false;
      }
    }
    return true;
  }

  function auctionEnd(uint256 tokenId) public {
    address creator = creators[tokenId];
    uint256 auctionEndTime = auctionEndTimes[tokenId];
    uint256 highestBid = highestBids[tokenId];
    address highestBidder = highestBidders[tokenId];
    bool ended = auctionFinalizations[tokenId];

    require(block.timestamp >= auctionEndTime, "Auction not yet ended.");
    require(!ended, "auctionEnd has already been called.");

    // split price between treasury and creator
    uint256 treasuryFee = highestBid / 100; // 1%
    uint256 creatorRewards = highestBid - treasuryFee;
    pendingReturns[creator] += creatorRewards;
    auctionFinalizations[tokenId] = true;
    emit AuctionEnded(tokenId, highestBidder, highestBid);

    // if no bids, then transfer to creator
    if (highestBidder == address(0)) {
      _transfer(address(this), creator, tokenId);
    } else {
      _transfer(address(this), highestBidder, tokenId);
    }
  }

  function getCurrentTokenId() external view returns (uint256) {                  
    return _tokenIds.current();
  }

  function getNextTokenId() external view returns (uint256) {                  
    return _tokenIds.current() + 1;
  }

  function getTokenInfo(
    uint256 tokenId
  ) external view returns (address, address, uint256, uint256, bool, string memory) {
    require(_exists(tokenId), "Token does not exist");
  
    address creator = creators[tokenId];
    address highestBidder = highestBidders[tokenId];
    uint256 highestBid = highestBids[tokenId];
    uint256 auctionEndTime = auctionEndTimes[tokenId];
    bool auctionEnded = auctionFinalizations[tokenId];
    string memory prompt = prompts[tokenId];

    return (creator, highestBidder, highestBid, auctionEndTime, auctionEnded, prompt);
  }
}
