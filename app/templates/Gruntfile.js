module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    prepare: {
      html: 'index.html'
    },
    watch: {
      sass: {
        files: ['css/sass/**/*.{scss,sass}',  '../../css/editorial.scss'],
        tasks: ['sass:dev']
      },
      handlebars: {
        files: ['js/tpl/handlebars/*.handlebars'],
        tasks: ['handlebars']
      }
    },
    sass: {
      dist: {
        options: {                      // Dictionary of render options
          outputStyle: [
            'compressed'
          ]
        },
        files: {
          'css/style.css': 'css/sass/style.scss'
        }
      },
      dev: {
        files: {
          'css/style.css': 'css/sass/style.scss'
        }
      }
    },
    jshint: {
      files: ['js/**/*.js', '!js/init.min.js',  '!js/tpl/template.js'],
      options: {
        camelcase: true,
        curly:   true,
        eqeqeq:  true,
        forin: true,
        immed:   true,
        latedef: true,
        newcap:  true,
        noarg:   true,
        sub:     true,
        undef:   true,
        boss:    true,
        eqnull:  true,
        browser: true,
        strict: true,
        trailing: true,

        globals: {
          // AMD
          module:     true,
          require:    true,
          requirejs:  true,
          define:     true,
          Handlebars: true,

          // Environments
          console:    true,

          // General Purpose Libraries
          $:          true,
          jQuery:     true,
          sinon:      true,
          describe:   true,
          it:         true,
          expect:     true,
          beforeEach: true,
          afterEach:  true
        }
      }
    },
    handlebars: {
      all: {
        files: {
            'js/tpl/template.js': 'js/tpl/handlebars/*.handlebars'
        }
      }
    },
    jasmine: {
      src: ['js/*.js', '../../js/*.js', '!js/init.min.js'],
      options: {
        specs: ['js/tests/*tests.js', '../../js/tests/*tests.js'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-handlebars-compiler');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-usemin');

  // Compile sass and handlebars on the fly.
  grunt.registerTask('default', ['sass:dev', 'handlebars', 'watch']);

  // Unit Testing Task
  grunt.registerTask('getready', ['jasmine', 'jshint']);

  // Run this task when the code is ready for production.
  grunt.registerTask('production', ['prepare', 'concat', 'uglify', 'sass:dist']);
};