import { useState, useCallback } from "react";

import { ElectionService } from "../services/electionService";
import { ERROR_MESSAGES } from "../utilities/messages/errorMessages";

export const useElections = () => {
  const [elections, setElections] = useState([]);
  const [electionName, setElectionName] = useState("");
  const [electionStart, setElectionStart] = useState("");
  const [electionEnd, setElectionEnd] = useState("");

  const addElection = useCallback(
    async (name, start, end, connectedWallets) => {
      try {
        const newElection = await ElectionService.createElection(
          name,
          start,
          end,
          connectedWallets
        );
        setElections((prev) => [...prev, newElection]);
      } catch (err) {
        alert(ERROR_MESSAGES.ADDING_ELECTION_FAILED.message);
      }
    },
    []
  );

  return {
    elections,
    electionName,
    setElectionName,
    electionStart,
    setElectionStart,
    electionEnd,
    setElectionEnd,
    addElection,
  };
};
