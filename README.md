# TradingFlow AlphaVerse 🌌

> *Revolutionizing Quantitative Trading through NFT-Powered Fund Management on Flow EVM*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Flow EVM](https://img.shields.io/badge/Flow%20EVM-Ready-blue)](https://developers.flow.com/evm)
[![Smart Contract](https://img.shields.io/badge/Smart%20Contract-Audited-green)](#)

## 🚀 Vision

TradingFlow AlphaVerse represents the next evolution in decentralized quantitative trading. By combining cutting-edge NFT technology with sophisticated fund management mechanisms, we're creating an ecosystem where traditional finance meets Web3 innovation.

### ⭐ Key Features

- **NFT-Powered Fund Management**: Unique fund manager positions represented as NFTs
- **Dynamic Performance Fees**: Customizable fee structures for each fund manager
- **Transparent Dividend Distribution**: Automated and verifiable profit sharing
- **Real-time Portfolio Tracking**: Advanced analytics and performance metrics
- **Decentralized Governance**: Community-driven decision making

## 🔧 Technical Architecture

### Smart Contracts

1. **TradingFlowToken (TFT)**
   - ERC20-compliant utility token
   - Powers the entire ecosystem
   - Used for investments and dividend distributions

2. **FlowFund**
   - ERC721-based fund management system
   - Handles investments, withdrawals, and dividend distributions
   - Implements dynamic performance fee mechanisms
   - Manages fund manager NFTs

### Technical Stack

- **Blockchain**: Flow EVM
- **Smart Contract Development**: Solidity 0.8.20
- **Development Framework**: Hardhat
- **Testing**: Chai & Mocha
- **Frontend**: React & TypeScript
- **Web3 Integration**: ethers.js

## 🛠 Development Setup

### Prerequisites

```bash
# Required tools
node >= 16.0.0
npm >= 7.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/TradingFlow-AlphaVerse.git
cd TradingFlow-AlphaVerse

# Install dependencies
pnpm install

# Compile contracts
npm run compile

# Install frontend dependencies
cd frontend
pnpm install

# Run tests
pnpm dev
```

### Environment Setup

1. Create `.env` file in the root directory:
```env
# Your wallet private key
PRIVATE_KEY=your_private_key_here

# FlowScan API key for contract verification
FLOWSCAN_API_KEY=your_flowscan_api_key_here
```

### Deployment

```bash
# Deploy to Flow EVM Testnet
npm run deploy:testnet

# Deploy to Flow EVM Mainnet
npm run deploy:mainnet
```

## 🔐 Security

- All smart contracts are thoroughly tested and audited
- Implements OpenZeppelin's security standards
- Features reentrancy protection and access controls
- Regular security updates and improvements

## 🌐 Network Configuration

### Flow EVM Mainnet
- Network Name: Flow EVM
- RPC URL: https://mainnet.evm.nodes.onflow.org
- Chain ID: 747
- Currency Symbol: FLOW
- Block Explorer: https://evm.flowscan.io

### Flow EVM Testnet
- Network Name: Flow EVM Testnet
- RPC URL: https://testnet.evm.nodes.onflow.org
- Chain ID: 545
- Currency Symbol: FLOW
- Block Explorer: https://evm-testnet.flowscan.io

## 📚 API Documentation

### Fund Manager NFT Functions

```solidity
// Create new fund manager
function createFundManager(address manager, uint256 performanceFee, string memory metadata)

// Update fund manager metadata
function updateFundManagerMetadata(uint256 tokenId, string memory metadata)

// Update performance fee
function updatePerformanceFee(uint256 tokenId, uint256 newFee)
```

### Investment Operations

```solidity
// Invest in fund
function invest(uint256 amount)

// Request withdrawal
function requestWithdrawal(uint256 amount)

// Claim dividends
function claimDividends(uint256 fundManagerId)
```

## 🤝 Contributing

We welcome contributions from the community! Please check our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Support

For support and inquiries:
- Join our [Discord Community](#)
- Follow us on [Twitter](https://x.com/TradingFlowAI)
- Visit our [Documentation](#)

---

<p align="center">Built with ❤️ by the TradingFlow Team</p>
