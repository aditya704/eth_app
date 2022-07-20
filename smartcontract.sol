// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.0/utils/Counters.sol";

contract UZHgroup11 is ERC721, ERC721URIStorage, Ownable {
    uint256 public minMintRate = 0.001 ether;
     // Mapping from token ID to price
    mapping(uint256 => uint256) private _sellPrice;
    mapping(uint256 => address) private _originalOwner;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("UZHgroup11", "UZH11") {}

    function safeMint(address to, string memory uri,uint256 sellprice) public payable {
        require(msg.value  > minMintRate, "Value should be greater than 0.001 UZHETH.");
        uint256 tokenId = _tokenIdCounter.current();
        _sellPrice[tokenId]=sellprice;//set the sell price
        _originalOwner[tokenId]=to;//set the minted owner
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
function getPrice(uint256 tokenId) public view returns(uint256){
    return _sellPrice[tokenId];
}
    function buyNFT(address buyer,uint256 tokenId,uint256 newsp) public payable{
        address owneraddress = ownerOf(tokenId);
        require(msg.value >= _sellPrice[tokenId] ,"Price very less.");
        (bool sent,) = owneraddress.call{value: msg.value}("");
        require(sent, "Failed to send UZHETH");
        (bool sentowner,) = _originalOwner[tokenId].call{value: 1}("");
        require(sentowner, "Failed to send Royalty");
        _transfer(owneraddress, buyer, tokenId);
        _sellPrice[tokenId]=newsp;
    }
    function getNFTCount() public view returns(uint256){
        return _tokenIdCounter.current();
    }
}
