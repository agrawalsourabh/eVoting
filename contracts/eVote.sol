// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './Ownable.sol';

contract eVote is Ownable{
    function getOwnerAdd() view public returns(address){
        return getOwner();
    }
}