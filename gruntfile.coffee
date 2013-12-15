module.exports = (grunt) ->

  pkg = grunt.file.readJSON('package.json')

  # Project Configuration
  grunt.initConfig
    clean:
      ['public/dist']

    watch:
      public:
        files: ['public/src/**/*.*', 'views/**/*.*']
        options:
          livereload: true
        tasks: ['build-client']

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
          'public/dist/styles/app.min.css': 'public/src/styles/app.less'

    uglify:
      main:
        files: [
          expand: true,
          cwd: 'public/src/scripts/',
          src: ['**/*.js'],
          dest: 'public/dist/scripts/',
          ext: '.min.js'          
        ]

    imagemin:
      main: 
        files: [
          expand: true,
          cwd: 'public/src/images/', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/dist/images/'
        ]

    shell:
      mongo:
        command: 'mongod'
        options:
          async: true

    concurrent:
      main:
        tasks: ['nodemon', 'watch:public']
        options:
          logConcurrentOutput: true,
          limit: 2
      compile: 
        tasks: ['newer:less', 'newer:imagemin', 'newer:uglify']

  #Load NPM tasks
  grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-'

  grunt.registerTask "test-env", -> process.env.NODE_ENV = 'test'
  grunt.registerTask "build-client", ["clean", "concurrent:compile"]
  grunt.registerTask "default", ["shell", "clean", "concurrent:compile", "concurrent:main"]
  # grunt.registerTask "dist", ["clean", "harp"]
  