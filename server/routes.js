/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var user = require('./user');
var lesson = require('./lesson');
var lessonAsync = require('./lessonAsync');
module.exports = function(app) {

  // Insert routes below
  // app.use('/api/things', require('./api/thing'));
  app.post('/api/login',user.login);
  app.post('/api/checkSession',user.checkSession);
  app.post('/api/delSession',user.logout);
  app.post('/api/reg',user.reg);
  app.post('/api/regInvite',user.regInvite);

  app.post('/api/checkUserExist',user.checkUserExist);

  app.post('/api/getLessonsAmount',lesson.getLessonsAmount);
  // app.post('/api/getLessonsGroupByCode',lesson.getLessonsGroupByCode);
  app.post('/api/getLessonsGroupByCode',lessonAsync.getLessonsGroupByCode);
  app.post('/api/lesson/submitComment',lesson.submitComment);
  app.post('/api/lesson/praiseLesson',lesson.praiseLesson);
  app.post('/api/getServerTime',function(req,res){
    var timestamp = Date.parse(new Date());
    res.json({"serverTime":timestamp});
  })

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
