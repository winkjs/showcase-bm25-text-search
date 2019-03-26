module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'bundle.js': 'search.js'
    },
    watch: {
      files: ['search.js'],
      tasks: ['browserify']
    }
  });

  grunt.registerTask('default', ['watch']);
};
