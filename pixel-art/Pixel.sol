// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract Pixel {

    string[32][32] public canvas;
    // mapping(address => uint[][]) public addressToPainted;

    function getCanvas() public view returns (string[32][32] memory) {
        return canvas;
    }

    function paintPixel(uint row, uint col, string memory _color) public {
        canvas[row][col] = _color;
        // addressToPainted[msg.sender].push([row, col]);

        // if ([row, col] assigned to other address) {
        //     transaction
        // } else {
        //     set the price for repainting
        //     up to twice of original (previous) price
        // }
    }
}