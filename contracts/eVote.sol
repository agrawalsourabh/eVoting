// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './Ownable.sol';

contract eVote is Ownable{

    mapping (address => bool) public isVotedMapping;
    uint participantCount;

    modifier onlyAllowed() {
        require(!isVotedMapping[msg.sender], "You already voted!");
        _;
    }


    mapping (string => uint) participantMapping;

//  function to add participants - only owner can add.
    function addParticipant(string memory _name) public onlyOwner{
        participantMapping[_name] = 0;
        participantCount += 1;
    }

    function getOwnerAdd() view public returns(address){
        return getOwner();
    }

//  function to cast vote - one add one vote
    function castVote(string memory _name) public onlyAllowed{
        participantMapping[_name] += 1;
        isVotedMapping[msg.sender] = true;
    }

//  get total vote count of the given participants;
    function getVoteCount(string memory _name) public view returns(uint){
        return participantMapping[_name];
    }
}