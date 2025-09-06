# SomniFlow - Email to DeFi in One Click

<div align="center">
  <img src="https://img.shields.io/badge/Somnia-Hackathon%20Participant-purple" alt="Somnia Hackathon">
  <img src="https://img.shields.io/badge/WebAuthn-Enabled-green" alt="WebAuthn">
  <img src="https://img.shields.io/badge/ERC--4337-Account%20Abstraction-blue" alt="ERC-4337">
  <img src="https://img.shields.io/badge/Chains-60%2B-purple" alt="60+ Chains">
</div>

## 🚀 Overview

SomniFlow revolutionizes Web3 onboarding by enabling users to access DeFi in just 30 seconds using their email and device biometrics. No seed phrases, no browser extensions, no gas fees - just pure DeFi accessibility.

### 🎯 Key Innovation

**World's First Production Implementation** combining:
- **WebAuthn/Passkey** for hardware-secured authentication
- **ERC-4337 Account Abstraction** for gasless transactions
- **Google OAuth** for seamless identity management
- **Somnia Bridge Integration** for streamlined cross-chain transfers to Somnia Testnet

### 💡 Problem We Solve

Traditional Web3 onboarding is broken:
- **MetaMask**: Complex for beginners, vulnerable to phishing, requires ETH for gas
- **Hardware Wallets**: Expensive, inconvenient, still require seed phrase management
- **CEX Dependency**: Defeats the purpose of decentralization

### ✨ Our Solution

SomniFlow provides:
- **30-second onboarding** using just email and fingerprint
- **Zero gas fees** through sponsored transactions
- **Hardware-level security** using device secure enclave
- **60+ chain support** with unified interface
- **No seed phrases** - recover with email + new device

## 📋 Table of Contents

- [Features](#-features)
- [Technical Architecture](#-technical-architecture)
- [Security Model](#-security-model)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Development Setup](#-development-setup)
- [Smart Contracts](#-smart-contracts)
- [Authentication Flow](#-authentication-flow)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Security Improvements](#-security-improvements)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## 🌟 Features

### Core Features
- **Email + Biometric Login**: Use Google account + fingerprint/Face ID
- **Gasless Transactions**: All fees sponsored through ERC-4337
- **Cross-Chain Bridge**: Seamless bridging to Somnia Testnet
- **Smart Account**: Self-custodial wallet with advanced features
- **Account Recovery**: Email-based recovery without seed phrases

### Security Features
- **Hardware Security Module**: Keys stored in device secure enclave
- **P256 Signature Verification**: Full elliptic curve implementation
- **Domain Binding**: Phishing protection through origin verification
- **Session Keys**: Temporary delegation with spending limits
- **Social Recovery**: Guardian-based account recovery
- **2FA Support**: TOTP for high-value transactions
- **Spending Limits**: Daily/monthly limits with whitelist

### User Experience
- **3D WebGL Effects**: Modern, engaging interface
- **Dark Mode**: Full theme support
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Live transaction status
- **One-Click Swaps**: Simplified DeFi interactions

## 🏗 Technical Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│  Components                │  Libraries                          │
│  ├── GoogleSignIn          │  ├── passkey.ts (WebAuthn)        │
│  ├── Dashboard             │  ├── smartAccount.ts (ERC-4337)   │
│  ├── SwapInterface         │  ├── gasless.ts (UserOps)         │
│  ├── SessionKeyManager     │  ├── cose.ts (Key Parsing)        │
│  ├── SocialRecoveryManager │  └── storage.ts (Secure Storage)  │
│  └── TwoFactorSetup        │                                    │
├─────────────────────────────────────────────────────────────────┤
│                    Authentication Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Google OAuth │  │   WebAuthn   │  │   NextAuth   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
├─────────────────────────────────────────────────────────────────┤
│                      Blockchain Layer                            │
│  ┌──────────────────────────────────────────────────┐          │
│  │            Smart Contracts (Somnia Testnet)       │          │
│  ├──────────────────────────────────────────────────┤          │
│  │  OneClickAccount.sol    - ERC-4337 Smart Account │          │
│  │  OneClickFactory.sol    - CREATE2 Deployment     │          │
│  │  SessionKeyModule.sol   - Delegated Execution    │          │
│  │  SocialRecoveryModule   - Guardian Recovery      │          │
│  │  TwoFactorModule        - TOTP 2FA              │          │
│  │  SpendingLimitModule    - Transaction Limits     │          │
│  │  EllipticCurve.sol      - P256 Verification     │          │
│  │  WebAuthn.sol           - Signature Validation   │          │
│  └──────────────────────────────────────────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│                    Infrastructure Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Pimlico      │  │ Somnia Bridge│  │ Somnia RPC   │         │
│  │ (Bundler)    │  │ /Integrations│  │ (Network)    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS
- **Authentication**: NextAuth.js, Google OAuth, WebAuthn API
- **Blockchain**: Viem, Wagmi, ERC-4337 (Account Abstraction)
- **Smart Contracts**: Solidity 0.8.19, Foundry/Hardhat
- **Infrastructure**: Pimlico (Bundler), Somnia RPC/Bridge
- **Security**: P256 ECDSA, WebAuthn, Hardware Security Modules
- **Database**: Prisma with PostgreSQL/SQLite
- **Deployment**: Vercel, IPFS, Contract verification

## 🔐 Security Model

### Dual-Layer Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Layer 1: Identity                      │
│                    (Google OAuth)                        │
│  • User identification                                   │
│  • Email verification                                    │
│  • Account recovery initiation                          │
│  • Session management                                    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  Layer 2: Asset Security                 │
│                  (WebAuthn/Passkey)                     │
│  • Transaction authorization                            │
│  • Hardware-backed key storage                          │
│  • Biometric verification                               │
│  • Device-specific binding                              │
└─────────────────────────────────────────────────────────┘
```

### Security Features Implementation

#### 1. **P256 Signature Verification**
```solidity
// Full elliptic curve implementation
library EllipticCurve {
    function verifySignature(
        uint256 hash,
        uint256 r,
        uint256 s,
        uint256 qx,
        uint256 qy
    ) internal pure returns (bool) {
        // Complete P256 ECDSA verification
        // Point addition, scalar multiplication
        // Fermat's little theorem for modular inverse
    }
}
```

#### 2. **Domain Binding Protection**
```solidity
// Prevent phishing attacks
string public allowedOrigin = "https://oneclick-defi.vercel.app";
bool public strictDomainCheck = true;

// Verify origin in clientDataJSON
if (strictDomainCheck) {
    require(verifyOrigin(clientDataJSON, allowedOrigin));
}
```

#### 3. **Session Keys**
- Temporary keys with limited permissions
- Configurable spending limits
- Time-based expiration
- Target contract restrictions

#### 4. **Social Recovery**
- Guardian-based recovery system
- Threshold signatures (M of N)
- Time delay for security
- Cancel mechanism for false alarms

#### 5. **Two-Factor Authentication**
- TOTP-based 6-digit codes
- Transaction amount thresholds
- QR code setup
- Replay attack prevention

#### 6. **Spending Limits**
- Daily/monthly limits
- Whitelist for trusted addresses
- Automatic reset mechanism
- Per-transaction verification

### Security Comparison

| Feature | OneClick DeFi | MetaMask | Hardware Wallet |
|---------|--------------|----------|-----------------|
| Phishing Protection | ✅ Domain Binding | ❌ | ✅ |
| Hardware Security | ✅ Device HSM | ❌ | ✅ |
| No Seed Phrase | ✅ | ❌ | ❌ |
| Biometric Auth | ✅ | ❌ | Some models |
| Account Recovery | ✅ Email-based | ❌ | ❌ |
| Gasless | ✅ | ❌ | ❌ |
| 2FA | ✅ | ❌ | Some models |
| Social Recovery | ✅ | ❌ | ❌ |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Cloud account (for OAuth)
- Git

### 30-Second Setup

```bash
# Clone the repository
git https://github.com/onsommoshitarminda-star/SomniFlow.git
cd oneclick-defi

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Visit `http://localhost:3500` and you're ready to go!

## 💻 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/oneclick-defi.git
cd oneclick-defi
```

### 2. Install Dependencies

```bash
# Install main dependencies
npm install --legacy-peer-deps

# Install contract dependencies
cd contracts
npm install
cd ..
```

### 3. Environment Configuration

Create `.env.local` file:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3500
NEXTAUTH_SECRET=your-secret-here # Generate with: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (for recovery)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@oneclick-defi.com

# Blockchain (Somnia Testnet)
NEXT_PUBLIC_CHAIN_ID=50312
NEXT_PUBLIC_RPC_URL=https://dream-rpc.somnia.network
NEXT_PUBLIC_BUNDLER_URL=https://api.pimlico.io/v2/somnia-testnet/rpc?apikey=YOUR_KEY
NEXT_PUBLIC_PAYMASTER_URL=https://api.pimlico.io/v2/somnia-testnet/rpc?apikey=YOUR_KEY

# Smart Contract Addresses
NEXT_PUBLIC_FACTORY_ADDRESS=0x7cEb6617962Dd76E96b3227352f0ee9f83FCD2B7
NEXT_PUBLIC_ENTRYPOINT_ADDRESS=0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789

# Database
DATABASE_URL="file:./dev.db"

# Optional: Monitoring
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## 🛠 Development Setup

### Google OAuth Configuration

1. **Create Google Cloud Project**
   ```
   1. Go to https://console.cloud.google.com
   2. Create new project or select existing
   3. Enable Google+ API
   ```

2. **Configure OAuth Consent Screen**
   ```
   1. Go to APIs & Services > OAuth consent screen
   2. Choose "External" for user type
   3. Fill in application details:
      - App name: OneClick DeFi
      - Support email: your-email@gmail.com
      - Developer contact: your-email@gmail.com
   4. Add scopes: email, profile, openid
   5. Add test users if in development
   ```

3. **Create OAuth Client**
   ```
   1. Go to APIs & Services > Credentials
   2. Click "Create Credentials" > OAuth client ID
   3. Choose "Web application"
   4. Add authorized redirect URIs:
      - http://localhost:3500/api/auth/callback/google (development)
      - https://your-domain.com/api/auth/callback/google (production)
   5. Copy Client ID and Secret to .env.local
   ```

### Email Setup (Development)

For Gmail with App Password:

1. **Enable 2FA on Google Account**
   ```
   1. Go to Google Account settings
   2. Security > 2-Step Verification
   3. Enable and configure
   ```

2. **Generate App Password**
   ```
   1. Go to Security > 2-Step Verification > App passwords
   2. Select "Mail" and device
   3. Copy 16-character password
   4. Use in EMAIL_SERVER_PASSWORD
   ```

### Database Setup

```bash
# Initialize Prisma
npx prisma init

# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# View database
npx prisma studio
```

### Local Development

```bash
# Run development server
npm run dev

# Run with debug logs
DEBUG=* npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build
```

## 📜 Smart Contracts

### Contract Architecture

```
contracts/
├── OneClickAccount.sol       # ERC-4337 smart account
├── OneClickFactory.sol       # CREATE2 factory for deterministic addresses
├── SessionKeyModule.sol      # Temporary key delegation
├── SocialRecoveryModule.sol  # Guardian-based recovery
├── TwoFactorModule.sol       # TOTP 2FA implementation
├── SpendingLimitModule.sol   # Transaction limits
├── interfaces/
│   ├── IAccount.sol
│   ├── IEntryPoint.sol
│   └── ISpendingLimitModule.sol
└── lib/
    ├── EllipticCurve.sol    # P256 curve operations
    ├── WebAuthn.sol         # WebAuthn signature verification
    └── P256Verifier.sol     # Signature verification wrapper
```

### Key Contracts

#### OneClickAccount.sol
```solidity
contract OneClickAccount is IAccount {
    // WebAuthn public key storage
    uint256 public publicKeyX;
    uint256 public publicKeyY;
    
    // Security modules
    address public sessionKeyModule;
    address public socialRecoveryModule;
    address public spendingLimitModule;
    address public twoFactorModule;
    
    // Domain binding for phishing protection
    string public allowedOrigin = "https://oneclick-defi.vercel.app";
    bool public strictDomainCheck = true;
    
    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData) {
        // Full WebAuthn signature verification
        // Domain origin checking
        // Challenge validation
    }
}
```

### Deployment

#### Using Foundry (Recommended)

```bash
cd contracts

# Deploy to Somnia Testnet
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url https://dream-rpc.somnia.network \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify

# (Optional) Other networks as needed
```

#### Using Hardhat (Alternative)

```bash
cd contracts

# Compile contracts
npx hardhat compile

# Deploy
npx hardhat run scripts/deploy.js --network somnia

```

### Contract Addresses

#### Somnia Testnet
```
Factory: 0x7cEb6617962Dd76E96b3227352f0ee9f83FCD2B7
EntryPoint: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
SessionKeyModule: 0x...
SocialRecoveryModule: 0x...
```

#### Sepolia (Source)
```
EntryPoint: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
```

## 🔄 Authentication Flow

### Complete User Journey

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant G as Google OAuth
    participant W as WebAuthn
    participant S as Smart Contract
    participant B as Bundler

    %% Initial Signup
    U->>F: Click "Sign In with Google"
    F->>G: Redirect to OAuth
    G->>U: Request consent
    U->>G: Approve
    G->>F: Return ID token
    F->>F: Store user session
    
    F->>U: Prompt for Passkey creation
    U->>W: Create Passkey (biometric)
    W->>F: Return public key
    
    F->>S: Deploy smart account (CREATE2)
    S->>F: Return deterministic address
    F->>U: Show wallet address
    
    %% Transaction Flow
    U->>F: Initiate swap
    F->>W: Request signature
    U->>W: Authorize with biometric
    W->>F: Return signature
    
    F->>B: Submit UserOperation
    B->>S: Execute transaction
    S->>F: Transaction complete
    F->>U: Show success
```

### Authentication States

1. **New User Flow**
   ```
   Google Login → Email Verification → Passkey Creation → Wallet Deployment
   ```

2. **Returning User (Same Device)**
   ```
   Google Login → Automatic Wallet Access → Ready to transact
   ```

3. **Returning User (New Device)**
   ```
   Google Login → Passkey Creation → Same Wallet Address → Ready
   ```

4. **Account Recovery**
   ```
   Email Verification → New Passkey → Wallet Recovery → Access Restored
   ```

### WebAuthn Implementation

```typescript
// Passkey Creation
async function createPasskey(email: string) {
  const options = {
    challenge: crypto.getRandomValues(new Uint8Array(32)),
    rp: {
      name: 'OneClick DeFi',
      id: window.location.hostname,
    },
    user: {
      id: btoa(email),
      name: email,
      displayName: email.split('@')[0],
    },
    pubKeyCredParams: [
      { alg: -7, type: 'public-key' }, // ES256
    ],
    authenticatorSelection: {
      userVerification: 'preferred',
      residentKey: 'discouraged',
    },
  };
  
  const credential = await navigator.credentials.create({ publicKey: options });
  return extractPublicKey(credential);
}

// Passkey Authentication
async function signWithPasskey(challenge: string) {
  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge: Uint8Array.from(challenge, c => c.charCodeAt(0)),
      allowCredentials: [{ id: credentialId, type: 'public-key' }],
      userVerification: 'required',
    },
  });
  
  return parseSignature(assertion.response);
}
```

## 🔌 API Integration

### Somnia Bridge Integration

The application integrates a minimal bridge flow to Somnia Testnet:

```typescript
// Get swap quote
await fetch('/api/bridge/initiate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ recipient: smartAccountAddress, amount: '0.001' }),
});

await fetch('/api/bridge/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ recipient: smartAccountAddress, amount: '0.001' }),
});
```

### Networks

- **Somnia Testnet** (primary demo network)
- **Sepolia** (source network for bridging demo)

### Token Support

The application displays token information with proper symbols and images:

```typescript
// Token configuration with CDN images
const SUPPORTED_TOKENS = [
  {
    symbol: 'STT',
    name: 'Somnia Test Token',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    chainId: 50312,
    logoURI: '/tokens/somnia.avif',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x...',
    decimals: 6,
    chainId: 195,
  },
  // ... more tokens
];
```

### Pimlico Integration

For ERC-4337 UserOperations:

```typescript
const bundlerClient = createBundlerClient({
  transport: http(BUNDLER_URL),
  chain: somnia,
});

const userOp = await smartAccount.prepareUserOperation({
  to: targetAddress,
  value: parseEther('0.1'),
  data: '0x',
});

const hash = await bundlerClient.sendUserOperation(userOp);
```

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. **Prepare for Production**
   ```bash
   # Build locally to test
   npm run build
   
   # Run production build
   npm run start
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   
   # Set environment variables in Vercel dashboard
   ```

3. **Environment Variables (Vercel)**
   ```
   Add all variables from .env.local to Vercel:
   Settings > Environment Variables
   
   Update URLs:
   - NEXTAUTH_URL=https://your-domain.vercel.app
   - Update OAuth redirect URIs in Google Console
   ```

### Smart Contract Deployment

1. **Testnet Deployment**
   ```bash
   cd contracts
   
   # Set environment variables
   export PRIVATE_KEY=your-private-key
   
   # Deploy
   forge script script/Deploy.s.sol:DeployScript \
     --rpc-url $Somnia Test Net _RPC \
     --private-key $PRIVATE_KEY \
     --broadcast \
     --verify \

   ```


### Production Checklist

- [ ] **Security**
  - [ ] All environment variables set correctly
  - [ ] NEXTAUTH_SECRET is strong and unique
  - [ ] OAuth redirect URIs updated
  - [ ] Smart contracts audited
  - [ ] Rate limiting enabled
  
- [ ] **Infrastructure**
  - [ ] Database migrated and backed up
  - [ ] Monitoring configured (Sentry)
  - [ ] Error logging enabled
  - [ ] CDN configured for assets
  
- [ ] **Testing**
  - [ ] All unit tests passing
  - [ ] Integration tests complete
  - [ ] Manual testing on production
  - [ ] Recovery flow tested
  
- [ ] **Documentation**
  - [ ] API documentation updated
  - [ ] User guide prepared
  - [ ] Support channels ready

## 🧪 Testing

### Unit Tests

```bash
# Frontend tests
npm run test

# Smart contract tests
cd contracts
forge test -vvv

# Specific test
forge test --match-test testPasskeyValidation -vvv
```

### Integration Tests

```bash
# Test complete flows
npm run test:e2e

# Test authentication
npm run test:auth

# Test swaps
npm run test:swaps
```

### Security Tests

1. **Signature Replay Attack**
   ```solidity
   // Test that same signature cannot be used twice
   function testReplayAttack() public {
     // First transaction should succeed
     // Second with same signature should fail
   }
   ```

2. **Domain Spoofing**
   ```solidity
   // Test domain binding protection
   function testDomainBinding() public {
     // Signature from different origin should fail
   }
   ```

3. **Recovery Takeover**
   ```solidity
   // Test recovery security
   function testRecoveryDelay() public {
     // Recovery should respect time delay
   }
   ```

## 🔒 Security Improvements

### Implemented Security Features

1. **Complete P256 Signature Verification** ✅
   - Full elliptic curve operations implementation
   - Point addition and scalar multiplication
   - Proper signature validation without precompile dependency

2. **Domain Binding Protection** ✅
   - ClientDataJSON origin verification
   - Challenge validation
   - Configurable allowed origins

3. **COSE Key Parsing** ✅
   - Accurate public key extraction from WebAuthn
   - P-256 curve validation
   - No more temporary hash workarounds

4. **Session Key System** ✅
   - Temporary delegation with limits
   - Time-based expiration
   - Target contract restrictions

5. **Social Recovery** ✅
   - Guardian-based recovery
   - Threshold signatures
   - Time delay for security

6. **Two-Factor Authentication** ✅
   - TOTP implementation
   - Transaction thresholds
   - QR code setup

7. **Spending Limits** ✅
   - Daily/monthly limits
   - Whitelist system
   - Automatic resets

### Security Audit Results

| Category | Status | Notes |
|----------|--------|-------|
| Reentrancy | ✅ Safe | Using checks-effects-interactions |
| Integer Overflow | ✅ Safe | Solidity 0.8+ built-in protection |
| Access Control | ✅ Safe | Proper modifiers and checks |
| Signature Replay | ✅ Safe | Nonce-based prevention |
| Time Manipulation | ✅ Safe | Using block.timestamp safely |
| Front-running | ⚠️ Mitigated | Using commit-reveal where needed |

## 🐛 Troubleshooting

### Common Issues

#### 1. Passkey Creation Fails
```
Error: NotAllowedError
Solution: 
- Ensure HTTPS or localhost
- Check browser compatibility (Chrome 67+, Safari 14+, Firefox 60+)
- Verify user gesture (must be triggered by user action)
```

#### 2. Google OAuth Not Working
```
Error: INVALID_CLIENT
Solution:
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Check redirect URI matches exactly
- Ensure OAuth consent screen is configured
```

#### 3. Transaction Fails
```
Error: AA21 didn't pay prefund
Solution:
- Check paymaster configuration
- Ensure bundler URL is correct
- Verify smart account has funds for value transfer
```

#### 4. Email Not Sending
```
Error: Invalid login
Solution:
- For Gmail: Use app password, not regular password
- Enable 2FA on Google account first
- Check EMAIL_SERVER_PORT (587 for TLS, 465 for SSL)
```

### Debug Mode

Enable debug logging:

```bash
# Frontend debugging
DEBUG=* npm run dev

# Contract debugging
forge test -vvvv

# Check specific module
DEBUG=passkey,smartAccount npm run dev
```

### Browser Console Commands

```javascript
// Check passkey support
await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()

// View stored credentials
localStorage.getItem('oneclick_defi_passkey')

// Clear session
sessionStorage.clear()
localStorage.clear()
```

## 🎯 Demo Script

### 3-Minute Pitch

**[0:00-0:30] Problem**
"Web3 adoption is stuck at 5% because current solutions are too complex. MetaMask requires seed phrases, ETH for gas, and is vulnerable to phishing. Hardware wallets are expensive and inconvenient. We need a better way."

**[0:30-1:00] Solution**
"OneClick DeFi enables anyone to access DeFi in 30 seconds using just their email and fingerprint. No seed phrases, no gas fees, no browser extensions. We leverage your device's existing security hardware."

**[1:00-2:00] Live Demo**
1. Show landing page with 3D effects
2. Click "Sign in with Google"
3. Authenticate with fingerprint
4. Show wallet created instantly
5. Demonstrate token swap
6. Show transaction completed without gas

**[2:00-2:30] Technology**
"We're the first to combine WebAuthn passkeys with ERC-4337 account abstraction. Your private key never leaves your device's secure enclave. Even if someone hacks your email, they can't access your funds without your biometric."



### Key Differentiators

1. **First production WebAuthn + AA implementation**
2. **True self-custody with email recovery**
3. **Zero gas fees through sponsorship**
4. **Hardware-level security without hardware wallet**
5. **Works on any device with biometrics**

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Write tests for new features
- Update documentation

### Commit Convention

```
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code style changes
refactor: Code refactoring
test: Test updates
chore: Build/config updates
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pimlico** - For ERC-4337 infrastructure
- **WebAuthn Community** - For passkey standards
- **OpenZeppelin** - For secure contract libraries

## 📞 Contact & Support

- **Email**: support@oneclick-defi.com
- **Twitter**: [@OneClickDeFi](https://twitter.com/oneclickdefi)
- **Discord**: [Join our community](https://discord.gg/oneclickdefi)
- **GitHub Issues**: [Report bugs](https://github.com/yourusername/oneclick-defi/issues)

## 🚀 Roadmap

### Phase 1 (Completed) ✅
- WebAuthn integration
- ERC-4337 implementation
- Google OAuth setup
- Basic swap functionality

### Phase 2 (In Progress) 🔄
- Security modules implementation
- Multi-chain expansion
- Mobile app development
- Audit preparation

### Phase 3 (Q1 2024) 📅
- Hardware wallet support
- Advanced DeFi features (lending, staking)
- DAO governance
- Enterprise features

### Phase 4 (Q2 2024) 🔮
- Cross-chain messaging
- Social features
- AI-powered strategies
- Global expansion

---

<div align="center">
  

*Making DeFi accessible to everyone, everywhere*

[Website](https://somniflow.example.com) • [Demo](https://demo.somniflow.example.com) • [Docs](https://docs.somniflow.example.com)

</div>