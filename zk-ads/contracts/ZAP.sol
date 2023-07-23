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

    mapping(uint => Ad) ads;

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
        uint id;
        string ipfsCid;
        string redirectUrl;
        string category;
        uint16 currentClicks;
        uint upVotes;
        uint downVotes;
    }

    event AdClicked(string ipfsCid, uint timestamp, string worldId);
    event AdReviewed(string ipfsCid, string worldId, bool review);
    event AdCreated(uint id, string ipfsCid);

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
        uint id,
        string memory ipfsCid,
        string memory redirectUrl,
        string memory category
    ) public onlyAdvertiser {
        ads[id] = Ad(id, ipfsCid, redirectUrl, category, 0, 0, 0);
        emit AdCreated(id, ipfsCid);
    }

    function clicked(
        uint id,
        uint timestamp,
        string memory worldId
    ) public onlyBackend {
                ads[id].currentClicks += 1;
                publisherAddress.transfer((cpc * 9) / 10);
                backendAddress.transfer(cpc / 10);
                emit AdClicked(ads[id].ipfsCid, timestamp, worldId);
    }
    

    function reviewAd(
        uint id,
        string memory worldId,
        string memory ipfsCid,
        bool review
    ) public onlyBackend {
            if (review) {
                ads[id].upVotes += 1;
            } else {
                ads[id].downVotes += 1;
            }
            emit AdReviewed(ipfsCid, worldId, review);
    }

    // This function allows your contract to receive Ether
    receive() external payable {}
}
