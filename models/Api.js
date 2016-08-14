'use strict';

var _ = require('lodash');
var hue = require('node-hue-api');
var HueApi = hue.HueApi;
var lightState = hue.lightState;
var log = console.log;
var Promise = require('bluebird');

function Api(){
    var me = this;
    me.bridge = require('../config.json');
    Object.keys(me.bridge.lights).forEach(function(key){
        me.bridge.lights[key].id = parseInt(key, 10);
    });
    me.api = new HueApi(me.bridge.config.ipaddress, process.env.HUEBOT_ID);
}

Api.prototype.setLight = function(light, vals){
    var me = this;
    var state = null;
    return new Promise(function(resolve){

        if(vals.rgb) {
            state = lightState.create().on().rgb(vals.rgb);
        }
        else {
            state = lightState.create().on().white(vals.white[0], vals.white[1]);
        }

        return me.api.setLightState(light.id, state, function(err, result) {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });

    });
};

Api.prototype.setAllLights = function(state){
    var me = this;
    var light_ids = Object.keys(me.bridge.lights);
    return Promise.all(light_ids.map(function(id){
        return me.setLight(id, state);
    }));
};

Api.prototype.setAllBrightness = function(val){
    var me = this;
    var state = lightState.create().on().white(500, val);
    return me.setAllLights(state);
};

module.exports = new Api();
