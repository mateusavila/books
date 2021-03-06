module.exports = (grunt) ->

  pkg = grunt.file.readJSON('package.json')

  # Project Configuration
  grunt.initConfig
    clean:
      ['public/dist']

    copy:
      scripts:
        expand: true,
        cwd: 'public/src/scripts/',
        src: ['*.js'],
        dest: 'public/dist/scripts/'
      images:
        expand: true,
        cwd: 'public/src/images/',
        src: ['*.*'],
        dest: 'public/dist/images/'

    watch:
      public:
        files: ['public/src/**/*.*', 'views/**/*.*']
        options:
          livereload: true
        tasks: ["concurrent:dev"]
      prod:
        files: ['public/src/**/*.*', 'views/**/*.*']
        options:
          livereload: true
        tasks: ["concurrent:compile"]

    nodemon:
      main:
        options:
          env:
            port: 35728
          file: 'server.js'
          ignoredFiles: [
            'node_modules/**', 'public/**', '.git/**'
          ]
          watchedFolders: ['app', 'config']
          debug: true
          delayTime: 1

    less:
      main:
        options:
          cleancss: true
        files:
          'public/dist/styles/app.css': 'public/src/styles/app.less'

    uglify:
      main:
        files: [
          expand: true,
          cwd: 'public/src/scripts/',
          src: ['**/*.js'],
          dest: 'public/dist/scripts/'        
        ]

    imagemin:
      main: 
        files: [
          expand: true,
          cwd: 'public/src/images/', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/dist/images/'
        ]

    concurrent:
      main:
        tasks: ['nodemon', 'watch:public']
        options:
          logConcurrentOutput: true,
          limit: 2
      dev: 
        tasks: ['copy:scripts', 'copy:images', 'newer:less']
        options:
          logConcurrentOutput: true,
          limit: 2
      prod:
        tasks: ['nodemon', 'watch:prod']
        options:
          logConcurrentOutput: true,
          limit: 2
      compile: 
        tasks: ['less', 'imagemin', 'uglify']
        options:
          logConcurrentOutput: true,
          limit: 2

  #Load NPM tasks
  grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-'

  grunt.registerTask "start-server", ["dist-env", "concurrent:prod"]

  grunt.registerTask "default", ["dev-env", "clean", "concurrent:dev", "concurrent:main"]
  
  grunt.registerTask "dist-env", -> process.env.NODE_ENV = 'PROD'  
  grunt.registerTask "dev-env", -> process.env.NODE_ENV = 'DEV'  
  # grunt.registerTask "dist", ["clean", "harp"]
  # grunt.registerTask "test-env", -> process.env.NODE_ENV = 'test'
  