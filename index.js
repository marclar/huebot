'use strict';
require('dotenv').load({silent: true});

var _ = require('lodash');
var log = console.log;
var Promise = require('bluebird');

var api = require('./models/Api');
var Scene = require('./models/Scene');
var scene = null;

module.exports = {
    
    apply: function(frames){
        if(scene && scene.timeout){
            clearTimeout(scene.timeout);
        }
        scene = new Scene(api, {frames: frames});
        return scene.run();
    }
    
};
