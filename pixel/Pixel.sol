// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract Pixel {

    string[32][32] public canvas;

    function getCanvas() public view returns (string[32][32] memory) {
        return canvas;
    }

    function paintPixel(uint row, uint col, string memory _color) public {
        canvas[row][col] = _color;
    }
}