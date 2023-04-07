// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

// npm install @openzeppelin/contracts
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// - 支持项目方增发的功能
// - 支持销毁的功能
// - 支持交易收取手续费至项目方配置的地址
// - 支持交易销毁部分代币的功能
contract RToken is ERC20, Ownable {
    using SafeMath for uint256;

    address private _feeAddr;
    address public deadAddr = 0x0000000000000000000000000000000000000001;

    constructor(uint256 initialSupply, address feeAddr) ERC20("RToken", "R") {
        _mint(msg.sender, initialSupply);
        _feeAddr = feeAddr;
    }

    // 增发
    function mintToken(address target, uint256 mintAmount) public onlyOwner {
        _mint(target, mintAmount);
    }

    // 销毁
    function burnToken(address target, uint256 burnAmount) public onlyOwner {
        require(balanceOf(target) >= burnAmount);
        _burn(target, burnAmount);
    }

    function transfer(
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        // 支持交易收取手续费至项目方配置的地址
        uint256 feeAmount = amount.mul(10).div(100);
        super.transfer(_feeAddr, feeAmount);

        // 支持交易销毁部分代币的功能
        uint256 burnAmount = amount.mul(5).div(100);
        super.transfer(deadAddr, burnAmount);

        uint256 leftAmount = amount.sub(burnAmount).sub(feeAmount);
        return super.transfer(recipient, leftAmount);
    }
}

// 参考：https://blog.csdn.net/qq_20314141/article/details/119712281
