import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/src/components/buttons/ActionButton";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { Title, Paragraph } from "@theme/src/foundation/typography";
import { Card } from "@theme/src/components/cards/Card";
import axios from "axios";

interface VotePreparationProps {
  electionId: string;
  partyId: string;
  partyName: string;
  onComplete: (voteData: any) => void;
  onCancel: () => void;
}

export const VotePreparation: React.FC<VotePreparationProps> = ({
  electionId,
  partyId,
  partyName,
  onComplete,
  onCancel,
}) => {
  const { primary, text, background, border } = useThemeColors();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<any>(null);
  const navigate = useNavigate();

  // Try to load credentials from localStorage
  useEffect(() => {
    try {
      const savedCredentials = localStorage.getItem("zkp_credentials");
      if (savedCredentials) {
        setCredentials(JSON.parse(savedCredentials));
      }
    } catch (error) {
      console.error("Error loading credentials:", error);
    }
  }, []);

  const handlePrepareVote = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!credentials || !credentials.nullifier || !credentials.secret) {
        // No credentials found, redirect to registration
        navigate("/register2");
        return;
      }

      // Call backend API to prepare the vote with ZKP
      const response = await axios.post("/api/zkp/prepare-vote", {
        electionId,
        partyId,
        userData: {
          nullifier: credentials.nullifier,
          secret: credentials.secret
        }
      });

      if (response.data.success) {
        // Pass the vote data to the parent component
        onComplete(response.data.data);
      } else {
        setError(response.data.message || "Failed to prepare vote");
      }
    } catch (error) {
      console.error("Error preparing vote:", error);
      setError(
        error.response?.data?.message || 
        "Failed to prepare vote. Please make sure you've completed registration."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      variant="elevated"
      className="max-w-md mx-auto p-6 space-y-6"
      style={{ backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)` }}
    >
      <Title as="h2" size="2xl" className="text-center">
        Prepare Your Vote
      </Title>

      <div className="border-t border-b py-4" style={{ borderColor: border }}>
        <Paragraph className="text-center mb-2" weight="medium">
          You are voting for:
        </Paragraph>
        <Paragraph
          className="text-center text-xl"
          style={{ color: primary }}
          weight="semibold"
        >
          {partyName}
        </Paragraph>
      </div>

      <div className="space-y-4">
        <Paragraph className="text-sm opacity-80">
          Before casting your vote, we need to prepare a zero-knowledge proof to ensure
          your vote remains anonymous while maintaining the integrity of the election.
        </Paragraph>

        {!credentials ? (
          <div className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 p-4 rounded-lg">
            <Paragraph className="text-sm">
              You need to complete the identity verification process before voting.
              Click Continue to proceed with registration.
            </Paragraph>
          </div>
        ) : (
          <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 p-4 rounded-lg">
            <Paragraph className="text-sm">
              Your identity credentials have been found. Click "Prepare Vote" to continue.
            </Paragraph>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 p-4 rounded-lg">
            <Paragraph className="text-sm">{error}</Paragraph>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-4">
        <SecondaryButton text="Cancel" onClick={onCancel} />
        <ActionButton
          text={loading ? "Processing..." : "Prepare Vote"}
          onClick={handlePrepareVote}
        />
      </div>
    </Card>
  );
};