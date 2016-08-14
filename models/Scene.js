'use strict';

var _ = require('lodash');
var fs = require('fs');
var log = console.log;
var Promise = require('bluebird');

function Scene(api, path){
    var me = this;
    me.api = api;
    me.config = {};
    me.frame = null;
    if(_.isString(path)){
        if(fs.existsSync(path)){
            me.config = JSON.parse(fs.readFileSync(path).toString());
        }
        else{
            console.warn('Cannot find path "'+path+'"; continuing with empty config.');
        }
    }
    else{
        me.config = path; //Use parameter as JSON config
    }
}

Scene.prototype.run = function(){
    var me = this;
    if(!me.config.frames){
        console.warn('No me.config.frames to run');
        return Promise.resolve();
    }
    else {
        return new Promise(function(resolve, reject){
            if(!me.frame){
                me.frame = me.config.frames.shift();
                me.applyFrame();
                resolve(me.frame);

                //Set a timeout?
                if(me.frame.duration){
                    me.timeout = setTimeout(function(){
                        me.config.frames.push(me.frame);
                        delete me.frame;
                        me.run();
                    }, (me.frame.duration * 1000));
                }

            }
        });
    }
};

Scene.prototype.applyFrame = function(){
    var me = this;
    if(!me.frame){
        console.warn('applyFrame() missing me.frame property')
    }
    else {
        return Promise.all(me.frame.lights.map(function(vals){

            log('vals:', vals);

            var lights = _.filter(me.api.bridge.lights, function(light){
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