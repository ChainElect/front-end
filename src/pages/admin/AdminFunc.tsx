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

export const AdminFunc = () => {
  const { primary, background, border } = useThemeColors();
  const [admin, setAdmin] = useState("");
  const [newAdmin, setNewAdmin] = useState("");
  const connectedWallets = useWallets();

  const handleInitGetAdmin = async () => {
    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) {
        alert(t("admin.connectWalletAlert"));
        return;
      }

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const res = await contract.admin();
      setAdmin(res);
    } catch (err) {
      console.error("Error fetching admin:", err);
      alert(t("admin.adminFetchError"));
    }
  };

  const handleChangeAdmin = async () => {
    try {
      if (!newAdmin.trim()) {
        alert(t("admin.invalidAdminAlert"));
        return;
      }

      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) {
        alert(t("admin.connectWalletAlert"));
        return;
      }

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const tx = await contract.changeAdmin(newAdmin);
      await tx.wait();
      setAdmin(newAdmin);
      alert(t("admin.adminChangeSuccess", { admin: newAdmin }));
      setNewAdmin("");
    } catch (err) {
      console.error("Error changing admin:", err);
      alert(t("admin.adminChangeError"));
    }
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
          {t("admin.adminManagement")}
        </Title>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12">
          <Card variant="elevated" className="p-8">
            <Title as="h2" size="2xl" variant="gradient" className="mb-6">
              {t("admin.currentAdmin")}
            </Title>

            <div className="space-y-6">
              <ActionButton
                text={t("admin.fetchAdminButton")}
                onClick={handleInitGetAdmin}
                size="md"
                className="mb-6"
              />

              {admin && (
                <Card className="p-4">
                  <Paragraph className="font-mono break-all">
                    <span className="font-bold">
                      {t("admin.currentAdminLabel")}
                    </span>{" "}
                    {admin}
                  </Paragraph>
                </Card>
              )}
            </div>
          </Card>

          <Card variant="elevated" className="p-8">
            <Title as="h2" size="2xl" variant="gradient" className="mb-6">
              {t("admin.changeAdmin")}
            </Title>

            <div className="space-y-6">
              <Input
                label={t("admin.newAdminAddress")}
                value={newAdmin}
                onChange={(e) => setNewAdmin(e.target.value)}
                placeholder={t("admin.newAdminPlaceholder")}
                className="mb-4"
              />

              <ActionButton
                text={t("admin.changeAdminButton")}
                onClick={handleChangeAdmin}
                size="md"
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
