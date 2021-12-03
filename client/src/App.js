import React, { Component } from "react";
import eVoteContract from "./contracts/eVote.json";
import getWeb3 from "./getWeb3";

import 'tachyons';

import "./App.css";
import Participant from "./components/Participant";

class App extends Component {

  state = {
    web3: null,
    accounts: null,
    contract: null,
    participants : [],
    owner: null,
    votes: []
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = eVoteContract.networks[networkId];
      const instance = new web3.eth.Contract(
        eVoteContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  addParticipants = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    const ownerAdd = await contract.methods.getOwnerAdd().call();

    await contract.methods.addParticipant("Dominos").send({from: accounts[0]});
    await contract.methods.addParticipant("MOD").send({from: accounts[0]});

    this.setState({owner: ownerAdd});
    this.setState({participants: ["Dominos", "MOD"]});
    
    await this.countVote();
  };

  castVote = async(name) =>{
    const {web3, contract} = this.state;
    await contract.methods.castVote(String(name)).send({from: web3.currentProvider.selectedAddress});
    this.countVote();
  };

  countVote = async() => {
    const {contract} = this.state;
    const voteForP1 = await contract.methods.getVoteCount(this.state.participants[0]).call();
    const voteForP2 = await contract.methods.getVoteCount(this.state.participants[1]).call();

    this.setState({votes: [voteForP1, voteForP2]});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <header className="tc ph4">
          <h1 className="f3 f2-m f1-l fw2 black-90 mv3">
            eVoting
          </h1>
          <div>
            <p className="center pa3 mr2 f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
              This web app is used to cast a vote.
            </p>
            <a className="center f6 link h-50 mr2 dim br3 ph3 pv2 mb2 dib white bg-dark-gray" href="#0" onClick={this.addParticipants}>Add Participants </a>
          </div>
        </header>

        <div className='flex'>
          <Participant participant={this.state.participants[0]} vote={this.state.votes[0]} onClick={this.castVote}/>
          <Participant participant={this.state.participants[1]} vote={this.state.votes[1]} onClick={this.castVote} />
        </div>

        <header className="tc ph4">
          <h2 className="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
            Total Vote casted: <strong> {parseInt(this.state.votes[0]) + parseInt(this.state.votes[1])} </strong>
          </h2>
        </header>

      </div>
    );
  }
}

export default App;
