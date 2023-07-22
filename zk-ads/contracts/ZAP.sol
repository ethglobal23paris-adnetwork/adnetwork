// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ZAP {
    string advertiser_name;
    string metadata;
    address payable advertiser_address;
    address payable backend_address;
    uint cpm;
    uint pi;

    modifier onlyAdvertiser() {
        require(
            msg.sender == advertiser_address,
            "Only the owner can call this function."
        );
    }

    modifier onlyBackend() {
        require(
            msg.sender == backend_address,
            "Only the owner can call this function."
        );
    }

    Ad[] ads;

    struct Ad {
        string ipfsCid;
        string redirectUrl;
        string category;
        int16 current_clicks;
    }

    constructor(
        string memory name,
        string memory data,
        uint cost_per_mille,
        uint payout_interval
    ) {
        advertiser_name = name;
        metadata = data;
        advertiser_address = payable(msg.sender);
        cpm = cost_per_mille;
        pi = payout_interval;
    }

    event AdClicked(uint timestamp);

    function createAd(
        string memory ipfsCid,
        string memory redirectUrl,
        string memory category
    ) public onlyAdvertiser {
        ads.push(Ad(ipfsCid, redirectUrl, category, 0));
    }

    function clicked(uint timestamp, bytes memory zkproof) public onlyBackend {
        emit AdClicked(timestamp);
    }
}
