'use strict';

const _ = require('lodash');
const fs = require('fs');
const log = console.log;
const Promise = require('bluebird');

function Scene(api, path){
    const me = this;
    me.api = api;
    me.config = {};
    me.frame = null;
    if(fs.existsSync(path)){
        me.config = JSON.parse(fs.readFileSync(path).toString());
    }
    else{
        console.warn('Cannot find path "'+path+'"; continuing with empty config.');
    }
}

Scene.prototype.run = function(){
    const me = this;
    if(!me.config.frames){
        return;
    }
    if(!me.frame){
        me.frame = me.config.frames.shift();
        log(me.frame);
        log('Setting me.frame, duration: ', me.frame.duration);
        me.applyFrame();
        me.timeout = setTimeout(function(){
            me.config.frames.push(me.frame);
            log('Deleting me.frame...');
            delete me.frame;
            me.run();
        }, ((me.frame.duration * 1000) || 1000));
    }
};

Scene.prototype.applyFrame = function(){
    const me = this;
    if(!me.frame){
        console.warn('applyFrame() missing me.frame property')
    }
    else {
        return Promise.all(me.frame.lights.map(function(vals){

            log('vals:', vals);

            let lights = _.filter(me.api.bridge.lights, function(light){
                return (light.name.toLowerCase().indexOf(vals.query.toLowerCase()) > -1);
            });

            return Promise.all(lights.map(function(light){
                log('api light:', light);
                return me.api.setLight(light, vals);
            }))


        })).then(function(results){
                log('applyFrame done');
            });
    }
};

module.exports = Scene;