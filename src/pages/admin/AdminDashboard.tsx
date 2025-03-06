import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { useThemeColors } from "@hooks/useThemeColors";
import { Card } from "@theme/src/components/cards/Card";
import { Title } from "@theme/src/foundation/typography/Title";
import { Paragraph } from "@theme/src/foundation/typography/Paragraph";
import { Input } from "@theme/src/components/Form/Input";
import { ActionButton } from "@theme/src/components";
import { ERC20_ABI, ERC20_ADDRESS } from "@utils/wallet/walletConstants";
import { t } from "i18next";
import { Textarea } from "@theme/src/components/Form/TextArea";

export const AdminDashboard = () => {
  const { primary, background } = useThemeColors();
  const [partyName, setPartyName] = useState("");
  const [partyDescription, setPartyDescription] = useState("");
  const [electionName, setElectionName] = useState("");
  const [electionStart, setElectionStart] = useState("");
  const [electionEnd, setElectionEnd] = useState("");
  const [parties, setParties] = useState<any[]>([]);
  const [elections] = useState<any[]>([]);
  const connectedWallets = useWallets();

  const handleAddParty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm([partyName, partyDescription])) return;

    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) {
        alert(t("admin.connectWalletAlert"));
        return;
      }

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);
      const electionId = await contract.electionCount();

      const tx = await contract.addParty(
        electionId,
        partyName,
        partyDescription
      );
      await tx.wait();
      alert(t("admin.partySuccess"));
    } catch (err) {
      console.error("Error adding party:", err);
      alert(t("admin.partyError"));
    }
  };

  const handleCreateElection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm([electionName, electionStart, electionEnd])) return;

    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) {
        alert(t("admin.connectWalletAlert"));
        return;
      }

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const startTime = Math.floor(new Date(electionStart).getTime() / 1000);
      const endTime = Math.floor(new Date(electionEnd).getTime() / 1000);

      const tx = await contract.createElection(
        electionName,
        startTime,
        endTime
      );
      await tx.wait();
      alert(t("admin.electionSuccess"));
    } catch (err) {
      console.error("Error creating election:", err);
      alert(t("admin.electionError"));
    }
  };

  const validateForm = (fields: string[]) => {
    if (fields.some((field) => !field.trim())) {
      alert(t("admin.formError"));
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
      <header
        className="py-20 backdrop-blur-lg border-b text-center"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <Title variant="gradient" className="text-4xl font-bold">
          {t("admin.title")}
        </Title>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Create Party Section */}
          <Card
            variant="elevated"
            className="p-8 min-h-[400px] h-full flex flex-col"
          >
            <div className="flex-1">
              <Title as="h2" size="2xl" variant="gradient" className="mb-6">
                {t("admin.createParty")}
              </Title>

              <form onSubmit={handleAddParty} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    label={t("admin.partyName")}
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    required
                  />
                  <Textarea
                    label={t("admin.partyDescription")}
                    value={partyDescription}
                    onChange={(e) => setPartyDescription(e.target.value)}
                    required
                    rows={5}
                  />
                </div>
                <ActionButton text={t("admin.addParty")} size="md" />
              </form>
            </div>

            {parties.length > 0 && (
              <div className="mt-8">
                <Title as="h3" size="xl" className="mb-4">
                  {t("admin.existingParties")}
                </Title>
                <div className="space-y-4">
                  {parties.map((party) => (
                    <Card key={party.id} className="p-4">
                      <Title as="h4" size="2xl" style={{ color: primary }}>
                        {party.name}
                      </Title>
                      <Paragraph className="mt-2 opacity-80">
                        {party.description}
                      </Paragraph>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Create Election Section */}
          <Card variant="elevated" className="p-8 min-h-[400px] flex flex-col">
            {/* Title */}
            <Title as="h2" size="2xl" variant="gradient" className="mb-6">
              {t("admin.createElection")}
            </Title>

            {/* Form fills the remaining space */}
            <form
              onSubmit={handleCreateElection}
              className="flex flex-col flex-grow"
            >
              {/* Inputs grow */}
              <div className="flex-grow space-y-4">
                <Input
                  label={t("admin.electionName")}
                  value={electionName}
                  onChange={(e) => setElectionName(e.target.value)}
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t("admin.startDate")}
                    type="datetime-local"
                    value={electionStart}
                    onChange={(e) => setElectionStart(e.target.value)}
                    required
                  />
                  <Input
                    label={t("admin.endDate")}
                    type="datetime-local"
                    value={electionEnd}
                    onChange={(e) => setElectionEnd(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Button pinned at the bottom */}
              <div className="mt-auto pt-4">
                <ActionButton
                  text={t("admin.createElectionButton")}
                  size="md"
                />
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};
