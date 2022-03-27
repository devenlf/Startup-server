'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  mongoose:{
    enable: true,
    package:'egg-mongoose'
  },
  cors:{
    enable: true,
    package: 'egg-cors',
  },
  redis:{
    enable:true,
    package:'egg-redis'
  }
};
