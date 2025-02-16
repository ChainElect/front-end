import { useState, useCallback } from "react";

import { PartyService } from "../services/partyService";
import { ERROR_MESSAGES } from "../utils/messages/errorMessages";

export const useParties = () => {
  const [parties, setParties] = useState([]);
  const [partyName, setPartyName] = useState("");
  const [partyDescription, setPartyDescription] = useState("");

  const fetchParties = useCallback(async () => {
    try {
      const fetchedParties = await PartyService.fetchParties();
      setParties(fetchedParties);
    } catch (err) {
      alert(ERROR_MESSAGES.FETCH_PARTIES_FAILED.message);
    }
  }, []);

  const addParty = useCallback(async (name, description, connectedWallets) => {
    try {
      const newParty = await PartyService.addParty(
        name,
        description,
        connectedWallets
      );
      setParties((prev) => [...prev, newParty]);
    } catch (err) {
      alert(ERROR_MESSAGES.ADDING_PARTY_FAILED.message);
    }
  }, []);

  return {
    parties,
    partyName,
    setPartyName,
    partyDescription,
    setPartyDescription,
    fetchParties,
    addParty,
  };
};
