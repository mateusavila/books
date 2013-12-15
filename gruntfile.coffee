harp = require 'harp'
module.exports = (grunt) ->

  pkg = grunt.file.readJSON('package.json')

  # Project Configuration
  grunt.initConfig
    clean:
      ['public/compiled', 'public/livereload']
    watch:
      public:
        files: ['public/**', 'views/**', '!public/components/**']
        options:
          livereload: true
      test:
        files: ['test/**', 'app/**']
        tasks: ['mochaTest']

    nodemon:
      main:
        options:
          file: 'server.js'
          ignoredFiles: ['node_modules/**', 'public/**', '.git/**']
          watchedFolders: ['app', 'config']
          debug: true
          delayTime: 1

    less:
      main:
        files:
          'public/styles/app.css': 'public/styles/app.less'

    concurrent:
      main:
        tasks: ['nodemon', 'watch:public']
        options:
          logConcurrentOutput: true
          limit: 2
      compile: 
        tasks: ['less']

  #Load NPM tasks
  grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-'

  grunt.registerTask "test-env", -> process.env.NODE_ENV = 'test'
  grunt.registerTask "default", ["clean", "concurrent:compile", "concurrent:main"]
  # grunt.registerTask "dist", ["clean", "harp"]
  