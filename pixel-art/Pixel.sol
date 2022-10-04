// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Pixel {

    string[][] public canvas;
    string[] public row_ = ["#FFFFFF"];

    constructor() {
        for (uint i = 0; i < 32; i++) {
            canvas.push(row_);
            for (uint j = 0; j < 31; j++) {
                canvas[i].push("#FFFFFF");
            }
        }
    }

    function getCanvas() public view returns (string[][] memory) {
        return canvas;
    }

    function paintPixel(uint row, uint col, string memory _color) public {
        canvas[row][col] = _color;
    }
}