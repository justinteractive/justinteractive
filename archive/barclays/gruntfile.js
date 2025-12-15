(function () {
    'use strict';
}());
module.exports = function(grunt) {
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                //separator: 'rn'
            },
            dist: {
                src: ['js/main.js', 'js/plugins.js', 'js/chatbot.js', 'js/search.js', 'vendor/type_ahead/typeahead.bundle.js'],
                dest: 'js/master.js'
            }
        },

  //       jshint: {
		// 	files: ['gruntfile.js', 'js/master.js'],
		// 	options: {
		// 		globals: {
		// 			jQuery: true,
		// 			console: true,
		// 			module: true
		// 		}
		// 	}
		// },

        uglify: {
		    options: {
		        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '+'<%= grunt.template.today("yyyy-mm-dd") %> */'
		    },
		    dist: {
		        files: {
		        	'js/master.min.js': ['js/master.js']
		     	}
		    }
		},

		compass: {
		    dist: {
		        options: {
		            sassDir: 'sass',
		            cssDir: 'css',
		            environment: 'development',
		            outputStyle: 'compressed'
		        }
		    }
		},

		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'css/master.css': ['css/main.css', 'css/normalize.css']
				}
			}
		},

		watch: {
		    files: ['js/**/*.js', 'sass/**/*.scss'],
		    tasks: ['concat', 'uglify', 'compass', 'cssmin']
		}
    });
    
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'uglify', 'compass', 'cssmin', 'watch']);
};