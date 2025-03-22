// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



interface ITaxContract {
    // Get the balances of GST, Main, and DeFi accounts
    function taxInfo()
        external
        view
        returns (
            uint256 gstBalance,
            uint256 mainBalance,
            uint256 defiBalance
        );

    // Check if a payment has been received
    function hasPaymentBeenReceived() external view returns (bool);

    // Transfer the contents of the GST account to a fixed IRD account
    function withdrawGST() external;

    // Emit an event for withdrawing GST
    event GSTWithdrawn(address indexed IRDAccount, uint256 amount);

    // Change the IRD account
    function changeIRDAccount(address newIRDAccount) external;

    // Emit an event forcChange of IRD account
    event IRDAccountChangedr(address indexed oldaddr, address indexed newaddr);

    // Transfer an amount to a payee
    function transferToPayee(
        address payee,
        uint256 amount,
        uint256 code
    ) external;

    // Emit an event for transferring to a payee
    event PayeeTransfer(address indexed payee, uint256 amount, uint256 code);

    // Split GST to Main and GST accounts, optionally to DeFi strategy
    function splitGST()
        external
        returns (bool);
}
