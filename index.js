'use strict';
require('dotenv').load({silent: true});

const _ = require('lodash');
const log = console.log;
const Promise = require('bluebird');

const api = require('./models/Api');
const Scene = require('./models/Scene');

module.exports = {
    
    apply: function(frames){
        let scene = new Scene(api, {frames: frames});
        return scene.run();
    }
    
};

// api.setAllBrightness(10).then(function(result){
//
//     log(result);
//
//     process.exit(0);
//
// });

let scene = new Scene(api, './scenes/sample.json');

log(scene);

scene.run();



setTimeout(function(){
    process.exit(0);
}, 120000);

