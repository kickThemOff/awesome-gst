// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NZDD is ERC20 {

    constructor(uint256 initialSupply, address testAccount) ERC20("New Zealand Digital Dollar", "NZDD") {
        _mint(msg.sender, initialSupply * 10**6 -1000*10**6); // Multiply by 10^6 to account for 6 decimal places
        _mint(testAccount, 1000 * 10**6); // Multiply by 10^6 to account for 6 decimal places
    }
}
