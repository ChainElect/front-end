import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from '../../constants/index.js';

const Vote = () => {
  const [electionId, setElectionId] = useState('');
  const [partyId, setPartyId] = useState('');
  const connectedWallets = useWallets();

  const handleVote = async () => {
    if (!electionId || !partyId) {
      alert('Please enter both Election ID and Party ID');
      return;
    }

   
    const injectedProvider = connectedWallets[0].provider;
    const provider = new ethers.providers.Web3Provider(injectedProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

    try{
        const tx = await contract.vote(electionId, partyId);
        await tx.wait();
        alert(`Thanks for your vote`);
    }catch(err){
        console.log(err);
    }
  };

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Enter Election ID"
          value={electionId}
          onChange={(e) => setElectionId(e.target.value)}
          style={{
            padding: '5px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Enter Party ID"
          value={partyId}
          onChange={(e) => setPartyId(e.target.value)}
          style={{
            padding: '5px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <div>
        <button onClick={handleVote}>Vote</button>
      </div>
    </div>
  );
};

export default Vote;