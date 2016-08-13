'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const hue = require('node-hue-api');
const log = console.log;

module.exports = new Promise(function(resolve, reject){

    hue.nupnpSearch()
        .then(function(bridges){
            if(!bridges.length){
                log('no bridges found');
                reject();
            }

            let bridge = bridges[0];
            let api = new hue.HueApi(bridge.ipaddress, process.env.HUEBOT_ID);

            resolve({hue: hue, api: api});

            // api.configAsync().then(function(config){
            //
            //     log('got config:', config);
            //
            //     api.getFullState().then(function(result){
            //
            //         require('fs').writeFileSync('./bridge.json', JSON.stringify(result, 0, 2));
            //
            //     });
            //
            // });

        });

});