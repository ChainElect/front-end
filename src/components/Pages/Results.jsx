import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from '../../constants/index.js';

const ElectionResults = () => {
  const [electionId, setElectionId] = useState('');
  const [results, setResults] = useState('');
  const [electionName, setElectionName] = useState('');
  const connectedWallets = useWallets();

  const handleGetResults = async () => {
    if (!electionId) {
      alert('Please enter an election ID');
      return;
    }

    const injectedProvider = connectedWallets[0].provider;
    const provider = new ethers.providers.Web3Provider(injectedProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

    try {
      // Fetching the results
      const electionResults = await contract.getResults(electionId);
      const electionDetails = await contract.elections(electionId);

      const electionName = electionDetails.name;

      // Format results based on the structure
      
      const formattedResults = electionResults.map((party) => (
        <div key={party.id}>
          <strong>{party.name}</strong>: {ethers.utils.formatUnits(party.voteCount, 0)} votes
        </div>
      ));
      setElectionName(electionName);
      setResults(formattedResults);
    } catch (err) {
      console.log('Error fetching results:', err);
      setResults('Error fetching results.');
    }
  };

  return (
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
      <button onClick={handleGetResults}>Get Results</button>
      <div className="electionName">
        {electionName? electionName : 'Election name will appear here.'}
      </div>
      <div>        
        {results ? results : 'Election results will appear here.'}
      </div>
    </div>
  );
};

export default ElectionResults;