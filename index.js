'use strict';
require('dotenv').load({silent: true});

const _ = require('lodash');
const log = console.log;
const Promise = require('bluebird');

require('./lib/api').then(function(result){

    const hue = result.hue;
    const api = result.api;

    //Set bar light to random brightness
    let bright = parseInt(Math.random() * 100, 10);
    let state = hue.lightState.create().on().white(500, 100);

    log('setting bright', bright);

    api.setLightState(2, state, function(err, result){
        console.error(err);
        log(result);
        process.exit(0);
    });



});

/*
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = "192.168.1.140",
    username = process.env.HUEBOT_ID,
    api = new HueApi(host, username),
    state;

// Set light state to 'on' with warm white value of 500 and brightness set to 100%
let bright = parseInt(Math.random() * 100, 10);
state = lightState.create().on().white(500, bright);

// // --------------------------
// // Using a promise
// api.setLightState(2, state)
//     .then(displayResult)
//     .done();

// --------------------------
// Using a callback
api.setLightState(2, state, function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});
*/
