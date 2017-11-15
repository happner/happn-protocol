var install = require("gulp-install");
var gulp = require('gulp');
var transform = require('gulp-transform');
var runSequence = require('run-sequence');
var exec = require('gulp-exec');

var clientVersion = process.argv[2];
var serverVersion = process.argv[3];

function updateVersion(content, file) {

  if (file.path.indexOf('server/package.json'))
    content = content.replace('{{compare-server-version}}', serverVersion);

  if (file.path.indexOf('client/package.json'))
    content = content.replace('{{compare-client-version}}', clientVersion);

  return content;
}

gulp.task('build', function (callback) {
  runSequence(
    'build-server',
    'build-client',
    'start-server',
    'run-tests',
    'kill-server',
    callback);
});

gulp
  .task('build-server', function () {
    return gulp
      .src(__dirname + '/__resources/server/**')
      .pipe(transform('utf8', updateVersion))
      .pipe(gulp.dest(__dirname + '/server/' + serverVersion + '/'))
      .pipe(install());
  });

gulp.task('build-client', function () {
  return gulp
    .src(__dirname + '/__resources/client/**')
    .pipe(transform('utf8', updateVersion))
    .pipe(gulp.dest(__dirname + '/client/' + clientVersion + '/'))
    .pipe(install());
});

var child_process = require('child_process');
var server;

gulp.task('start-server', function (callback) {

    server = child_process.fork(__dirname + '/server/' + serverVersion + '/server-start');

    server.on('message', function (data) {

      var message = data.toString();

      if (message == 'STARTED') {
        callback();
      }

      if (message.indexOf('ERROR') > -1) {
        callback(new Error('failed to start server'));
      }
    });
});

gulp.task('run-tests', function (callback) {

  console.log('running tests:::');

  child_process.exec('mocha ' + __dirname + '/client/' + clientVersion + '/tests/** > ' + __dirname + '/client/' + clientVersion + '/results/latest.txt', function(e, stdout, stderr){

    console.log('run finished, check test results here: \r\n');
    console.log(__dirname + '/client/' + clientVersion + '/results/latest.txt');

    callback();
  });

});

gulp.task('kill-server', function (callback) {
  server.kill();
  callback();
});

gulp.start('build');

