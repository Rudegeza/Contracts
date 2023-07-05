// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ProductContract {
    struct Product {
        string name;
        string imageUrl;
    }

    mapping(address => Product[]) public productsByManufacturer;
    mapping(address => Product[]) public productsByFranchisee;

    function publishProduct(
        string memory _name,
        string memory _imageUrl
    ) public {
        Product memory newProduct = Product(_name, _imageUrl);

        productsByManufacturer[msg.sender].push(newProduct);
        productsByFranchisee[msg.sender].push(newProduct);
    }

    function getProductsByManufacturer(
        address _manufacturer
    ) public view returns (Product[] memory) {
        return productsByManufacturer[_manufacturer];
    }

    function getProductsByFranchisee(
        address _franchisee
    ) public view returns (Product[] memory) {
        return productsByFranchisee[_franchisee];
    }
}
