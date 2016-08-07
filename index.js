'use strict';

const _ = require('lodash');
const hue = require('node-hue-api');
const Promise = require('bluebird');

const log = console.log;
const displayResult = log;
const exit = function(){process.exit(0)}

const default_id = "08a902b95915cdd9b75547cb50892dc4";
const huebot_id = process.env.HUEBOT_ID;

hue.nupnpSearch()
    .then(function(bridges){
        if(!bridges.length){
            log('no bridges found');
            exit();
        }

        let bridge = bridges[0];
        log(bridge);
        let api = new hue.HueApi(bridge.ipaddress, huebot_id);

        api.config().then(function(config){

            log('got config:', config);

            api.getFullState().then(displayResult).done();


        }).done();


}).done();


