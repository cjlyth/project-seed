var path = require('path');
module.exports = function ( grunt ) {
  var mountFolder = function mountFolder(connect, point) {
    return connect.static(path.resolve(point));
  };
  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    meta: {
      dest: './build'
    },
    clean: {
      dev: ['<%= meta.dest %>']
    },
    less: {
      compile: {
        expand: true,
        cwd: './src',
        src: ['**/*.less'],
        dest: '<%= meta.dest %>',
        ext: '.css'
      }
    },
    coffee: {
      compile: {
        expand: true,
        cwd: './src',
        src: ['**/*.coffee'],
        dest: '<%= meta.dest %>',
        ext: '.js'
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            title: "project seed",
            debug: false
          }
        },
        src: ["src/index.jade"],
        dest: '<%= meta.dest %>/index.html'
      }
    },
    connect: {
      dev: {
        options: {
          port: 9001,
          base: '<%= meta.dest %>',
          middleware: function (connect) {
            return [
              require('connect-livereload')({port: 1337}),
              mountFolder(connect, 'build')
            ];
          }
        }
      }
    },
    watch: {
      options: {
        livereload: 1337
      },
      scripts: {
        files: '<%= coffee.compile.src %>',
        tasks: ['coffee:compile']
      },
      styles: {
        files: '<%= less.compile.src %>',
        tasks: ['less:compile']
      },
      jade: {
        files: 'src/**/*.jade',
        tasks: ['jade:compile']
      }
    },
  });
  grunt.registerTask('default', [
                     'clean',
                     'less', 'coffee', 'jade',
                     'connect:dev', 'watch'
   ]);
};
