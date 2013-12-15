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
      compile: 
        tasks: ['newer:less', 'newer:imagemin', 'newer:uglify']
      dev: 
        tasks: ['newer:copy:scripts', 'newer:copy:images', 'newer:less']

  #Load NPM tasks
  grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-'

  grunt.registerTask "dist", ["dist-env", "clean", "concurrent:compile", "nodemon"]

  grunt.registerTask "default", ["dev-env", "clean", "concurrent:dev", "concurrent:main"]
  
  grunt.registerTask "dist-env", -> process.env.NODE_ENV = 'PROD'  
  grunt.registerTask "dev-env", -> process.env.NODE_ENV = 'DEV'  
  # grunt.registerTask "dist", ["clean", "harp"]
  # grunt.registerTask "test-env", -> process.env.NODE_ENV = 'test'
  