'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.login.index);
  router.post('/register', controller.register.index);
  router.post('/vericode', controller.register.vericode);
  router.get('/', controller.home.index);
};
