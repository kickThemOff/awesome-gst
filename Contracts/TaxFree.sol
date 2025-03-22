// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ITaxFree.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TaxFree is ITaxContract {

    address owner;

    constructor() {
        owner = msg.sender;
    }

    uint256 private mainBalance;
    uint256 private gstBalance;
    uint256 private defiBalance;
    uint256 private lastSplitBalance;

    address private IRDAccount = address(0xB59d7642e8267A1e8517b2ED6769F036558dFb80); //Fix this if needed.

    IERC20 private NZDD = IERC20(address(0x0a5638C76b46F9756e54945a9E7345FE2978Ae9A)); //Fix this if needed.

    // Get the balances of GST, Main, and DeFi accounts
    function taxInfo()
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (gstBalance, mainBalance, defiBalance);
    }

    // Transfer the contents of the GST account to a fixed IRD account
    function withdrawGST() external {
        // require (owner == msg.sender | IRDAccount == msg.sender, "Not allowed");
        require((NZDD.balanceOf(address(this)) & block.number >0), "Nothing to withdraw");
        // Transdfer the GST to IRD account
        NZDD.transfer(IRDAccount, gstBalance);
        // Emit an event for withdrawing GST
        emit GSTWithdrawn(IRDAccount, gstBalance);
        gstBalance = 0;
    }

    // Change the IRD account
    function changeIRDAccount(address newIRDAccount) external {
        // require (owner == msg.sender, "Not allowed"); 
        address _account = IRDAccount;
        IRDAccount = newIRDAccount;
        emit IRDAccountChangedr(_account, newIRDAccount);
    }

    // Transfer an amount to a payee
    function transferToPayee(
        address payee,
        uint256 amount,
        uint256 code
    ) external {
        //require (owner == msg.sender, "Not allowed"); 
        require(mainBalance >= amount, "Insufficient working capital");
        uint256 gst = (amount * 15) / 100; // calc GST
        gstBalance = gstBalance - gst; // Take GST from our GST account
        mainBalance = mainBalance - (amount - gst); // Take remainder from mail account.
        // Andres fixes this and pretect it from re-entrancy
        // Emit an event for transferring to a payee
        emit PayeeTransfer(payee, amount, code);
    }

    // Check if a payment has been received
    function hasPaymentBeenReceived() external view returns (bool) {
        return (NZDD.balanceOf(address(this)) != gstBalance + mainBalance); //Any new deposits?
    }

    // Split GST to Main and GST accounts, optionally to DeFi strategy
    function splitGST() external returns (bool){
        //require (owner == msg.sender, "Not allowed"); 
        if (NZDD.balanceOf(address(this)) != gstBalance + mainBalance) {
            uint256 income = NZDD.balanceOf(
                address(this)) - (gstBalance + mainBalance);
            gstBalance = gstBalance + (income * 15) / 100; //take 15% for GST
            mainBalance = mainBalance + income - gstBalance;
            return (true);
        }
        return (true);
    }

    function claimETH() external {
        //require (owner == msg.sender, "Not allowed"); 
        if (address(this).balance > 0) {
            (bool sent, bytes memory data) = msg.sender.call{
                value: address(this).balance
            }("");
            require(sent, "Failed to send Ether");
        }
    }

    fallback() external payable {}

    receive() external payable {}
}
