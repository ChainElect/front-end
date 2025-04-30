import React, { useState } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { Card } from "@theme/src/components/cards/Card";
import { Title, Paragraph, Badge } from "@theme/src/foundation/typography";
import { ActionButton } from "@theme/src/components/buttons/ActionButton";
import { FaCheckCircle, FaExclamationTriangle, FaDownload } from "react-icons/fa";

interface Step4ZkpCredentialProps {
  credentials: {
    nullifier: string;
    secret: string;
  };
  userData?: {
    fullName?: string;
    idNumber?: string;
    birthDate?: string;
  };
  onComplete: () => void;
}

export const Step4ZkpCredential: React.FC<Step4ZkpCredentialProps> = ({
  credentials,
  userData,
  onComplete,
}) => {
  const { primary, secondary, text, background, border } = useThemeColors();
  const [showCredentials, setShowCredentials] = useState(false);
  const [savedBackup, setSavedBackup] = useState(false);

  const handleDownloadCredentials = () => {
    const data = {
      credentials,
      userData,
      generatedAt: new Date().toISOString(),
      app: "ChainElect",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chainelect-zkp-credentials.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSavedBackup(true);
  };

  return (
    <Card
      variant="elevated"
      className="p-6 space-y-6"
      style={{ backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)` }}
    >
      <div className="flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: `color-mix(in srgb, ${primary} 20%, transparent)` }}
        >
          <FaCheckCircle className="w-8 h-8" style={{ color: primary }} />
        </div>
      </div>

      <Title as="h2" size="2xl" className="text-center">
        Registration Complete!
      </Title>

      <Paragraph className="text-center opacity-90">
        Your identity has been verified and your anonymous voting credentials have been generated.
      </Paragraph>

      <div
        className="p-4 rounded-lg border"
        style={{ borderColor: `color-mix(in srgb, ${border} 50%, transparent)` }}
      >
        <Paragraph weight="medium" className="mb-2">
          What happens next?
        </Paragraph>
        <ul className="list-disc pl-5 space-y-1" style={{ color: text }}>
          <li>
            <Paragraph size="sm">
              Your credentials have been securely stored in your browser for voting.
            </Paragraph>
          </li>
          <li>
            <Paragraph size="sm">
              When you vote, these credentials will be used to generate a zero-knowledge proof.
            </Paragraph>
          </li>
          <li>
            <Paragraph size="sm">
              This ensures your vote remains anonymous while preventing double-voting.
            </Paragraph>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-2 p-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-lg">
        <FaExclamationTriangle className="flex-shrink-0" />
        <Paragraph size="sm">
          We strongly recommend backing up your credentials. If they are lost, you may not be able
          to vote in future elections.
        </Paragraph>
      </div>

      <div className="pt-4 border-t" style={{ borderColor: border }}>
        <Paragraph className="mb-4 opacity-80 text-center">
          Your ZKP Credentials
        </Paragraph>

        {showCredentials ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Paragraph size="sm" weight="medium">
                Nullifier:
              </Paragraph>
              <div
                className="p-3 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs break-all"
                style={{ color: text }}
              >
                {credentials.nullifier}
              </div>
            </div>

            <div className="space-y-2">
              <Paragraph size="sm" weight="medium">
                Secret:
              </Paragraph>
              <div
                className="p-3 rounded bg-gray-100 dark:bg-gray-800 font-mono text-xs break-all"
                style={{ color: text }}
              >
                {credentials.secret}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                onClick={handleDownloadCredentials}
                style={{
                  backgroundColor: savedBackup
                    ? `color-mix(in srgb, ${secondary} 10%, transparent)`
                    : secondary,
                  color: savedBackup ? secondary : "white",
                  border: `1px solid ${secondary}`,
                }}
              >
                <FaDownload />
                {savedBackup ? "Downloaded ✓" : "Download Backup"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button
              className="px-4 py-2 rounded-lg transition-colors"
              onClick={() => setShowCredentials(true)}
              style={{
                backgroundColor: `color-mix(in srgb, ${primary} 10%, transparent)`,
                color: primary,
                border: `1px solid ${primary}`,
              }}
            >
              Show Credentials
            </button>
            <Paragraph size="sm" className="mt-2 opacity-70">
              These are private. Only show them in a secure environment.
            </Paragraph>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <ActionButton
          text="Continue to Voting"
          onClick={onComplete}
        />
      </div>
    </Card>
  );
};