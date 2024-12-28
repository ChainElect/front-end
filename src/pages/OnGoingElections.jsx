import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from "../utilities/wallet/walletConstants";

export const OngoingElections = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const connectedWallets = useWallets();

  const fetchOngoingElections = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      if (!connectedWallets || connectedWallets.length === 0) {
        throw new Error("No wallet connected");
      }

      const injectedProvider = connectedWallets[0].provider;
      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      // Fetch all ongoing elections
      const electionCount = await contract.electionCount();
      let onGoingElections = [];
      for (let index = electionCount.toNumber(); index >= 0; index--) {
        const electionDetails = await contract.elections(index);

        // Check if election is ongoing
        if (electionDetails.endTime > Math.floor(Date.now() / 1000)) {
          onGoingElections.push(electionDetails);
        }
      }

      //console.log(onGoingElections);
      setElections(onGoingElections);
    } catch (err) {
      console.error("Error fetching elections:", err);
      setError("Failed to load ongoing elections.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Ongoing Elections</h1>
      <button onClick={fetchOngoingElections} disabled={loading}>
        {loading ? "Loading..." : "Fetch Ongoing Elections"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ marginTop: "20px" }}>
        {elections.length > 0
          ? elections.map((election, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h2>
                  {election.name} (ID: {election.id.toNumber()})
                </h2>
                <p>
                  Start Time:{" "}
                  {new Date(election.startTime * 1000).toLocaleString()}
                </p>
                <p>
                  End Time: {new Date(election.endTime * 1000).toLocaleString()}
                </p>
              </div>
            ))
          : !loading && <p>No ongoing elections found.</p>}
      </div>
    </div>
  );
};
