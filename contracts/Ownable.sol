// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Ownable{
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner!");
        _;
    }

    function getOwner() view public returns(address){
        return owner;
    }
}