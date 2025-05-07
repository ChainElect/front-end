import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useThemeColors } from "@hooks/useThemeColors";
import { Title, Paragraph } from "@theme/src/foundation/typography";
import { Card } from "@theme/src/components/cards/Card";
import { ActionButton } from "@theme/src/components/buttons/ActionButton";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { VotePreparation } from "../../../components/voting/VotePreparation";
import { VoteConfirmation } from "../../../components/voting/VoteConfirmation";
import { ethers } from "ethers";
import { FaExclamationTriangle, FaCheckCircle, FaLock } from "react-icons/fa";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from "../../../utils/wallet/walletConstants"

export const ZkpVotingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { primary, secondary, text, background, border } = useThemeColors();
  const navigate = useNavigate();

  const [election, setElection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedParty, setSelectedParty] = useState<any>(null);
  const [step, setStep] = useState<"selection" | "preparation" | "confirmation" | "success">("selection");
  const [voteData, setVoteData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const connectedWallets = useWallets();

  // Fetch election details
  useEffect(() => {
    const fetchElection = async () => {
      setLoading(true);
      try {
        const injectedProvider = connectedWallets[0]?.provider;
        if (!injectedProvider) {
          throw new Error("No wallet connected. Please connect your wallet first.");
        }

        const provider = new ethers.providers.Web3Provider(injectedProvider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          ERC20_ADDRESS,
          ERC20_ABI,
          signer
        );

        // Fetch election details from blockchain
        const [electionDetails, parties] = await Promise.all([
          contract.getElectionDetails(id),
          contract.getElectionParties(id)
        ]);

        // Convert BigNumber to milliseconds timestamp
        const endTime = electionDetails.endTime.mul(1000).toNumber();

        // Format parties data
        const formattedParties = parties.map((party: any, index: number) => ({
          id: party.id.toString(),
          name: party.name,
          description: party.description || "No description available",
        }));

        setElection({
          id,
          name: electionDetails.name,
          endTime,
          parties: formattedParties
        });

        // Start countdown timer
        startCountdown(endTime);

      } catch (error) {
        console.error("Error fetching election:", error);
        setError(error.message || "Failed to fetch election from blockchain.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchElection();
    }
  }, [id]);

  // Start a countdown timer
  const startCountdown = (endTime: number) => {
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft("Voting has ended");
        setError("This election has ended and is no longer accepting votes.");
      } else {
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  };

  // Handle party selection
  const handleSelectParty = (party: any) => {
    setSelectedParty(party);
  };

  // Proceed to vote preparation
  const handleProceedToPreparation = () => {
    if (!selectedParty) {
      setError("Please select a party before proceeding");
      return;
    }
    setStep("preparation");
  };

  // Handle vote preparation completion
  const handlePreparationComplete = (data: any) => {
    setVoteData(data);
    setStep("confirmation");
  };

  // Handle vote confirmation completion
  const handleVoteComplete = () => {
    setStep("success");
    // Show success message for a few seconds, then redirect
    setTimeout(() => {
      navigate(`/results/${id}`);
    }, 5000);
  };

  // Handle cancellation/back button
  const handleCancel = () => {
    if (step === "preparation") {
      setStep("selection");
    } else if (step === "confirmation") {
      setStep("preparation");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: background }}>
        <Paragraph>Loading election details...</Paragraph>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 text-center">
            <FaExclamationTriangle className="mx-auto text-red-500 h-16 w-16 mb-4" />
            <Title as="h2" size="3xl" className="mb-4">
              Something Went Wrong
            </Title>
            <Paragraph className="mb-6">{error}</Paragraph>
            <SecondaryButton text="Back to Elections" onClick={() => navigate("/onGoingElections")} />
          </Card>
        </div>
      </div>
    );
  }

  // Success page
  if (step === "success") {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <FaCheckCircle className="mx-auto text-green-500 h-16 w-16 mb-4" />
            <Title as="h2" size="3xl" className="mb-4">
              Vote Cast Successfully!
            </Title>
            <Paragraph className="mb-6">
              Your vote has been anonymously recorded on the blockchain.
            </Paragraph>
            <Paragraph className="text-sm opacity-80 mb-8">
              Redirecting to results page in a few seconds...
            </Paragraph>
            <ActionButton text="View Results Now" onClick={() => navigate(`/results/${id}`)} />
          </Card>
        </div>
      </div>
    );
  }

  // Vote preparation page
  if (step === "preparation") {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <VotePreparation
            electionId={id || ""}
            partyId={selectedParty.id}
            partyName={selectedParty.name}
            onComplete={handlePreparationComplete}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  // Vote confirmation page
  if (step === "confirmation" && voteData) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <VoteConfirmation
            voteData={{
              ...voteData,
              partyName: selectedParty.name
            }}
            onComplete={handleVoteComplete}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  // Party selection page (default view)
  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
      <header
        className="py-16 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Title variant="gradient" size="4xl" className="mb-4">
            {election?.name || "Vote Now"}
          </Title>
          <Paragraph className="text-lg opacity-90" style={{ color: text }}>
            Select a party and cast your anonymous vote securely
          </Paragraph>
          {timeLeft && (
            <div className="mt-4 inline-block px-4 py-2 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${primary} 20%, transparent)` }}>
              <Paragraph className="font-semibold">Time remaining: {timeLeft}</Paragraph>
            </div>
          )}
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `color-mix(in srgb, ${primary} 10%, transparent)` }}>
            <div className="flex items-center gap-3">
              <FaLock className="flex-shrink-0" style={{ color: primary }} />
              <Paragraph style={{ color: text }}>
                Your vote is anonymous and secured using zero-knowledge proofs. No personal information is tied to your vote.
              </Paragraph>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {election?.parties?.map((party: any) => (
              <div 
                key={party.id}
                onClick={() => handleSelectParty(party)}
                className="cursor-pointer transition-all hover:scale-105"
              >
                <Card
                  className="p-6 h-full flex flex-col"
                  style={{
                    borderColor: selectedParty?.id === party.id ? primary : border,
                    borderWidth: selectedParty?.id === party.id ? '2px' : '1px'
                  }}
                >
                  <div className="flex-1">
                    <Title as="h3" size="xl" className="mb-2">
                      {party.name}
                    </Title>
                    <Paragraph className="mb-4 opacity-80">
                      {party.description || "No description available"}
                    </Paragraph>
                  </div>
                  <div 
                    className="w-6 h-6 rounded-full border-2 ml-auto mt-2 flex items-center justify-center"
                    style={{ 
                      borderColor: primary,
                      backgroundColor: selectedParty?.id === party.id ? primary : 'transparent'
                    }}
                  >
                    {selectedParty?.id === party.id && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <SecondaryButton 
              text="Cancel" 
              onClick={() => navigate("/onGoingElections")} 
            />
            <div className="w-4"></div>
            <ActionButton 
              text="Continue to Vote" 
              onClick={handleProceedToPreparation} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};