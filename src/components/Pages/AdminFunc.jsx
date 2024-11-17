import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from '../../constants/index.js';

const AdminFunc = () => {
  const [admin, setAdmin] = useState('');
  const [newAdmin, setNewAdmin] = useState('');
  const connectedWallets = useWallets();

  const handleInitGetAdmin = async () => {
    if (!connectedWallets.length) {
      console.log('No wallets connected');
      return;
    }

    const injectedProvider = connectedWallets[0].provider;
    const provider = new ethers.providers.Web3Provider(injectedProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

    try {
      const res = await contract.admin();
      setAdmin(res);
    } catch (err) {
      console.error('Error fetching admin:', err);
    }
  };

  const handleChangeAdmin = async () => {
    if (!connectedWallets.length) {
      console.log('No wallets connected');
      return;
    }

    if (newAdmin) {
      const injectedProvider = connectedWallets[0].provider;
      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      try {
        const tx = await contract.changeAdmin(newAdmin);
        await tx.wait();
        setAdmin(newAdmin);
        alert(`Admin changed to: ${newAdmin}`);
        setNewAdmin('');
      } catch (err) {
        console.error('Error changing admin:', err);
      }
    } else {
      alert('Please enter a valid admin.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleInitGetAdmin}>Init Get Admin</button>
        <p style={{ marginTop: '10px' }}>
          <strong>Admin:</strong> {admin || 'No admin initialized yet'}
        </p>
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter new admin"
          value={newAdmin}
          onChange={(e) => setNewAdmin(e.target.value)}
          style={{
            padding: '5px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button onClick={handleChangeAdmin}>Change Admin</button>
      </div>
    </div>
  );
};

export default AdminFunc;