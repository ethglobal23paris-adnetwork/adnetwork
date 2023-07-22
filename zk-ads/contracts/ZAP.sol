// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ZAP {
    string advertiserName;
    string metadata;
    address advertiserAddress;
    address payable publisherAddress;
    address payable backendAddress;
    uint cpc;
    uint pi;

    Ad[] ads;

    modifier onlyAdvertiser() {
        require(
            msg.sender == advertiserAddress,
            "Only the owner can call this function."
        );
        _;
    }

    modifier onlyBackend() {
        require(
            msg.sender == backendAddress,
            "Only the owner can call this function."
        );
        _;
    }

    struct Ad {
        string ipfsCid;
        string redirectUrl;
        string category;
        int16 currentClicks;
        uint upVotes;
        uint downVotes;
    }

    event AdClicked(string ipfsCid, uint timestamp, string worldId);
    event AdReviewed(string ipfsCid, string worldId, bool review);
    event AdCreated(string ipfsCid);

    constructor(
        string memory name,
        string memory data,
        uint costPerClick,
        uint payoutInterval,
        address payable _publisherAddress,
        address payable _backendAddress
    ) payable {
        advertiserName = name;
        metadata = data;
        advertiserAddress = msg.sender;
        cpc = costPerClick;
        pi = payoutInterval;
        publisherAddress = _publisherAddress;
        backendAddress = _backendAddress;
    }

    function createAd(
        string memory ipfsCid,
        string memory redirectUrl,
        string memory category
    ) public onlyAdvertiser {
        ads.push(Ad(ipfsCid, redirectUrl, category, 0, 0, 0));
        emit AdCreated(ipfsCid);
    }

    function clicked(uint timestamp, string memory worldId, string memory ipfsCid) public onlyBackend {
        for (uint i = 0; i < ads.length; i++) {
            if (keccak256(abi.encodePacked(ads[i].ipfsCid)) == keccak256(abi.encodePacked(ipfsCid))) {
                ads[i].currentClicks += 1;
                publisherAddress.transfer(cpc * 9 / 10);
                backendAddress.transfer(cpc / 10);
                emit AdClicked(ads[i].ipfsCid, timestamp, worldId);
            }
        }
    }

    function reviewAd(string memory worldId, string memory ipfsCid, bool review) public onlyBackend {
        for (uint i = 0; i < ads.length; i++) {
            if (keccak256(abi.encodePacked(ads[i].ipfsCid)) == keccak256(abi.encodePacked(ipfsCid))) {
                if (review) {
                    ads[i].upVotes += 1;
                } else {
                    ads[i].downVotes += 1;
                }
                emit AdReviewed(ipfsCid, worldId, review);
            }
        }
    }

    // This function allows your contract to receive Ether
    receive() external payable {}
}
