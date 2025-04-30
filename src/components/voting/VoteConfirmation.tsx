import React, { useState } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/src/components/buttons/ActionButton";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { Title, Paragraph, Badge } from "@theme/src/foundation/typography";
import { Card } from "@theme/src/components/cards/Card";
import axios from "axios";
import { BACKEND_DATA_API_ENDPOINTS } from "@utils/endpoints";

interface VoteConfirmationProps {
  voteData: {
    electionId: string;
    partyId: string;
    partyName: string;
    nullifierHash: string;
    root: string;
    proof_a: [string, string];
    proof_b: [[string, string], [string, string]];
    proof_c: [string, string];
  };
  onComplete: () => void;
  onCancel: () => void;
}

export const VoteConfirmation: React.FC<VoteConfirmationProps> = ({
  voteData,
  onComplete,
  onCancel,
}) => {
  const { primary, text, background, border } = useThemeColors();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleCastVote = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call backend API to cast the vote
      const response = await axios.post(BACKEND_DATA_API_ENDPOINTS.CAST_VOTE, voteData);

      if (response.data.success) {
        setTxHash(response.data.data.transactionHash);
        setTimeout(() => {
          onComplete();
        }, 3000); // Show success message for 3 seconds
      } else {
        setError(response.data.message || "Failed to cast vote");
      }
    } catch (error: any) {
      console.error("Error casting vote:", error);
      setError(
        error.response?.data?.message || 
        "Failed to cast vote. Please try again."
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
        Confirm Your Vote
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
          {voteData.partyName}
        </Paragraph>
      </div>

      <div className="space-y-4">
        <Paragraph className="text-sm opacity-80">
          Your zero-knowledge proof has been successfully prepared. This ensures that your vote 
          remains anonymous while preventing double-voting.
        </Paragraph>

        {txHash && (
          <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 p-4 rounded-lg">
            <Paragraph className="text-sm font-semibold mb-2">
              Vote successfully cast!
            </Paragraph>
            <Paragraph className="text-xs">
              Transaction hash: <span className="font-mono">{txHash.substring(0, 10)}...{txHash.substring(txHash.length - 10)}</span>
            </Paragraph>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 p-4 rounded-lg">
            <Paragraph className="text-sm">{error}</Paragraph>
          </div>
        )}
        
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Paragraph className="text-xs opacity-70 mb-2">
            Technical details (Zero-Knowledge Proof):
          </Paragraph>
          <div className="space-y-1">
            <Badge size="sm">Nullifier Hash: {voteData.nullifierHash.substring(0, 10)}...</Badge>
            <Badge size="sm">Root: {voteData.root.substring(0, 10)}...</Badge>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <SecondaryButton 
          text="Back" 
          onClick={onCancel} 
        />
        <ActionButton
          text={loading ? "Processing..." : "Cast Vote"}
          onClick={handleCastVote}
        />
      </div>
    </Card>
  );
};