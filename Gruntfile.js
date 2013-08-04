module.exports = function ( grunt ) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  var reloadPort = 1337;
  grunt.initConfig({
    watch: {
      dev: {
        files: [ 'app/**'],
        tasks:  [ 'express:dev' ],
        options: {
          livereload: reloadPort,
          nospawn: true
        }
      }
    },
    express: {
      dev: {
        options: {
          args: [reloadPort],
          script: 'dev-server.js'
        }
      }
    }
  });
  grunt.registerTask('default', ['express:dev', 'watch:dev']);
};
