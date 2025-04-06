// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TradingFlow - FlowFund
 * @dev A decentralized investment fund on Flow EVM that enables users to invest tokens,
 * receive dividends, and manage withdrawals. The fund is represented as an NFT,
 * where each fund manager position is a unique NFT token.
 * @author TradingFlow Team
 */
contract FlowFund is ERC721, Ownable, ReentrancyGuard {
    IERC20 public immutable token;  // TradingFlow token contract address
    address public immutable carryAddress; // Address for performance fee collection
    uint256 public constant CARRY_PERCENTAGE = 1500; // 15% in basis points (15.00%)
    uint256 public constant BASIS_POINTS = 10000;    // 100.00%

    struct Investor {
        uint256 totalInvestment;    // Total investment amount
        uint256 pendingDividends;   // Pending dividends to claim
        uint256 withdrawalAmount;   // Requested withdrawal amount
        uint256 withdrawalTime;     // Withdrawal request timestamp
        bool hasActiveWithdrawal;   // Flag for active withdrawal request
    }

    mapping(address => Investor) public investors;
    address[] public investorList;
    uint256 public totalFunds;      // Total funds in the pool
    uint256 public constant WITHDRAWAL_DELAY = 10 minutes;

    event Invested(address indexed investor, uint256 amount);
    event WithdrawalRequested(address indexed investor, uint256 amount, uint256 withdrawalTime);
    event WithdrawalProcessed(address indexed investor, uint256 amount);
    event DividendDistributed(uint256 totalAmount);
    event DividendClaimed(address indexed investor, uint256 amount, uint256 carryAmount);
    event CarryFeePaid(uint256 amount);
    event FundManagerCreated(uint256 indexed tokenId, address indexed manager, uint256 performanceFee);
    event FundManagerMetadataUpdated(uint256 indexed tokenId, string metadata);
    event FundManagerPerformanceFeeUpdated(uint256 indexed tokenId, uint256 newFee);

    /**
     * @dev Contract constructor
     * @param _token Address of the BSC token contract
     * @param _carryAddress Address to receive carry fees (15% of dividends)
     */
    // Fund manager NFT data
    struct FundManager {
        uint256 performanceFee;    // Custom performance fee in basis points
        uint256 managedFunds;      // Total funds under management
        string metadata;           // IPFS hash of manager's metadata
    }

    // Mapping from token ID to fund manager data
    mapping(uint256 => FundManager) public fundManagers;
    uint256 public nextFundId = 1;

    constructor(
        string memory _name,
        string memory _symbol,
        address _token,
        address _carryAddress
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        require(_carryAddress != address(0), "Invalid carry address");
        token = IERC20(_token);
        carryAddress = _carryAddress;
        
        // Create initial fund manager position for contract owner
        _createFundManager(msg.sender, CARRY_PERCENTAGE, "");
    }

    /**
     * @dev Creates a new fund manager position as an NFT
     * @param _manager Address of the fund manager
     * @param _performanceFee Performance fee in basis points
     * @param _metadata IPFS hash of manager's metadata
     */
    function createFundManager(
        address _manager,
        uint256 _performanceFee,
        string memory _metadata
    ) external onlyOwner {
        _createFundManager(_manager, _performanceFee, _metadata);
    }

    /**
     * @dev Internal function to create a fund manager NFT
     */
    function _createFundManager(
        address _manager,
        uint256 _performanceFee,
        string memory _metadata
    ) internal {
        require(_performanceFee <= BASIS_POINTS, "Fee too high");
        uint256 tokenId = nextFundId++;

        _mint(_manager, tokenId);
        fundManagers[tokenId] = FundManager({
            performanceFee: _performanceFee,
            managedFunds: 0,
            metadata: _metadata
        });

        emit FundManagerCreated(tokenId, _manager, _performanceFee);
    }

    /**
     * @dev Updates the metadata for a fund manager
     * @param _tokenId The ID of the fund manager NFT
     * @param _metadata New IPFS hash of manager's metadata
     */
    function updateFundManagerMetadata(
        uint256 _tokenId,
        string memory _metadata
    ) external {
        require(ownerOf(_tokenId) == msg.sender, "Not token owner");
        fundManagers[_tokenId].metadata = _metadata;
        emit FundManagerMetadataUpdated(_tokenId, _metadata);
    }

    /**
     * @dev Updates the performance fee for a fund manager
     * @param _tokenId The ID of the fund manager NFT
     * @param _newFee New performance fee in basis points
     */
    function updatePerformanceFee(
        uint256 _tokenId,
        uint256 _newFee
    ) external {
        require(ownerOf(_tokenId) == msg.sender, "Not token owner");
        require(_newFee <= BASIS_POINTS, "Fee too high");
        fundManagers[_tokenId].performanceFee = _newFee;
        emit FundManagerPerformanceFeeUpdated(_tokenId, _newFee);
    }

    /**
     * @dev Allows users to invest tokens into the fund
     * @param amount Amount of tokens to invest
     */
    function invest(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        if (investors[msg.sender].totalInvestment == 0) {
            investorList.push(msg.sender);
        }

        investors[msg.sender].totalInvestment += amount;
        totalFunds += amount;

        emit Invested(msg.sender, amount);
    }

    /**
     * @dev 查询可领取的分红
     */
    function getClaimableDividends() external view returns (uint256) {
        return investors[msg.sender].pendingDividends;
    }

    /**
     * @dev 预约取款
     * @param amount 取款金额
     */
    function requestWithdrawal(uint256 amount) external nonReentrant {
        Investor storage investor = investors[msg.sender];
        require(amount > 0 && amount <= investor.totalInvestment, "Invalid withdrawal amount");
        require(!investor.hasActiveWithdrawal, "Active withdrawal exists");

        investor.withdrawalAmount = amount;
        investor.withdrawalTime = block.timestamp + WITHDRAWAL_DELAY;
        investor.hasActiveWithdrawal = true;

        emit WithdrawalRequested(msg.sender, amount, investor.withdrawalTime);
    }

    /**
     * @dev Owner处理取款请求
     * @param investorAddress 投资人地址
     */
    function processWithdrawal(address investorAddress) external onlyOwner nonReentrant {
        Investor storage investor = investors[investorAddress];
        require(investor.hasActiveWithdrawal, "No active withdrawal");
        require(block.timestamp >= investor.withdrawalTime, "Withdrawal time not reached");

        uint256 amount = investor.withdrawalAmount;
        require(amount <= totalFunds, "Insufficient funds");

        investor.totalInvestment -= amount;
        totalFunds -= amount;
        investor.withdrawalAmount = 0;
        investor.withdrawalTime = 0;
        investor.hasActiveWithdrawal = false;

        require(token.transfer(investorAddress, amount), "Transfer failed");

        emit WithdrawalProcessed(investorAddress, amount);
    }

    /**
     * @dev Owner查询所有待处理的取款请求
     */
    function getPendingWithdrawals() external view onlyOwner returns (address[] memory, uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < investorList.length; i++) {
            if (investors[investorList[i]].hasActiveWithdrawal) {
                count++;
            }
        }

        address[] memory addresses = new address[](count);
        uint256[] memory amounts = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < investorList.length; i++) {
            address investorAddress = investorList[i];
            if (investors[investorAddress].hasActiveWithdrawal) {
                addresses[index] = investorAddress;
                amounts[index] = investors[investorAddress].withdrawalAmount;
                index++;
            }
        }

        return (addresses, amounts);
    }

    /**
     * @dev Owner分配分红
     */
    function distributeDividends() external onlyOwner nonReentrant {
        uint256 dividendAmount = token.balanceOf(address(this)) - totalFunds;
        require(dividendAmount > 0, "No dividends to distribute");

        for (uint256 i = 0; i < investorList.length; i++) {
            address investorAddress = investorList[i];
            Investor storage investor = investors[investorAddress];
            if (investor.totalInvestment > 0) {
                uint256 share = (dividendAmount * investor.totalInvestment) / totalFunds;
                investor.pendingDividends += share;
            }
        }

        emit DividendDistributed(dividendAmount);
    }

    /**
     * @dev Allows investors to claim their dividends with 15% carry fee
     */
    /**
     * @dev Allows investors to claim their dividends with dynamic carry fee based on fund manager
     * @param _fundManagerId The ID of the fund manager NFT to pay fees to
     */
    function claimDividends(uint256 _fundManagerId) external nonReentrant {
        uint256 amount = investors[msg.sender].pendingDividends;
        require(amount > 0, "No dividends to claim");

        uint256 carryAmount = (amount * fundManagers[_fundManagerId].performanceFee) / BASIS_POINTS;
        uint256 netAmount = amount - carryAmount;

        investors[msg.sender].pendingDividends = 0;
        
        require(token.transfer(carryAddress, carryAmount), "Carry transfer failed");
        require(token.transfer(msg.sender, netAmount), "Dividend transfer failed");

        emit DividendClaimed(msg.sender, netAmount, carryAmount);
        emit CarryFeePaid(carryAmount);
    }

    /**
     * @dev 查询投资人信息
     */
    function getInvestorInfo(address investorAddress) external view returns (
        uint256 totalInvestment,
        uint256 pendingDividends,
        uint256 withdrawalAmount,
        uint256 withdrawalTime,
        bool hasActiveWithdrawal
    ) {
        Investor memory investor = investors[investorAddress];
        return (
            investor.totalInvestment,
            investor.pendingDividends,
            investor.withdrawalAmount,
            investor.withdrawalTime,
            investor.hasActiveWithdrawal
        );
    }
}
