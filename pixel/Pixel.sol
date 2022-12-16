// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract Pixel {

    struct pixel {
        uint256 id;
        string color;
        uint256 price;
        address payable painter;
    }

    string[32][32] public canvas;
    pixel[1024] public pixels;
    mapping (address => pixel[]) public addressToPaintedPixels;


    function getCanvas() public view returns (string[32][32] memory) {
        return canvas;
    }

    function getPixels() public view returns (pixel[1024] memory) {
        return pixels;
    }

    function sendViaCall(address payable _to) public payable {
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function paintPixel(uint _row, uint _col, string memory _color) public payable {

        uint id = (_row * 32) + _col;

        if (pixels[id].painter != msg.sender) {
            sendViaCall(pixels[id].painter);
        }

        canvas[_row][_col] = _color;

        pixel memory newPixel;
        newPixel.id = id;
        newPixel.color = _color;
        newPixel.painter = payable(msg.sender);
        pixels[newPixel.id] = newPixel;

        addressToPaintedPixels[msg.sender].push(newPixel);
    }

    function setPrice(uint _id, uint _price) public {
        pixels[_id].price = _price;
    }
}