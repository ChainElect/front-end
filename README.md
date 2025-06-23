# 🗳️ ChainElect Frontend – ZKP Voting dApp

This is the Web3 frontend for the ChainElect decentralized voting system, built with React and TypeScript. It connects to Ethereum wallets, manages user sessions, and submits ZK proofs to on-chain verifier contracts.

---

## 🌐 Features

- 🔐 **Connect with Wallets** (MetaMask, WalletConnect, etc.)
- 🧾 **Proof Submission** – Submit ZKP proofs to smart contracts
- 📄 **Voting Interface** – View polls, cast anonymous votes
- 📡 **Smart Contract Integration** – Call Solidity verifier contracts
- ⚡ **Client-Side Validation** – Check public signals and Merkle proofs

---

## 🧱 Tech Stack

- **React + TypeScript** – Frontend framework
- **ethers.js** – Ethereum wallet & contract interaction
- **wagmi / viem** – Web3 hooks & wallet management
- **Tailwind CSS** – Styling
- **ZK Components** – Inputs from backend & circuits

---

## 🗂️ Folder Structure


- [`components/`](https://github.com/ChainElect/front-end/tree/main/src/components) – UI elements like `ConnectButton`, `VoteCard`
- [`pages/`](https://github.com/ChainElect/front-end/tree/main/src/pages) – Routes for voting, results, etc.
- [`contracts/`](https://github.com/ChainElect/front-end/tree/main/src/contracts) – ABI and deployed addresses
- [`hooks/`](https://github.com/ChainElect/front-end/tree/main/src/hooks) – Wallet + contract integration

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v18+ recommended)
- MetaMask or other Web3 wallet

### 🔨 Install

```bash
git clone https://github.com/ChainElect/front-end.git
cd front-end
npm install
cp .env.example .env
