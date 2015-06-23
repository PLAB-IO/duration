(function () {

    "use strict";

    module.exports = function(grunt) {
        grunt.initConfig({
            watch: {
                compass: {
                    files: ['scss/*.scss'],
                    tasks: ['compass']
                },
                app: {
                    files: ['app.js'],
                    tasks: ['uglify:watch']
                },
                livereload: {
                    options: {
                        livereload: 35729
                    },
                    files: ["*.html", "app.js"]
                }
            },
            compass: {
                dev: {
                    options: {
                        sassDir: 'scss',
                        cssDir: 'css'
                    }
                }
            },
            bower_concat: {
                all: {
                    dest: 'vendor.js',
                    cssDest: 'vendor.css'
                }
            },
            cssmin: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                target: {
                    files: {
                        'vendor.min.css': 'vendor.css'
                    }
                }
            },
            uglify: {
                bower: {
                    options: {
                        mangle: true,
                        compress: true
                    },
                    files: [{
                        'vendor.min.js': 'vendor.js'
                    }]
                },
                watch: {
                    options: {
                        mangle: true,
                        compress: true
                    },
                    files: [{
                        'app.min.js': 'app.js'
                    }]
                }
            },
            copy: {
                dist: {
                    files: [{
                        src: ['vendor.min.js', 'app.min.js', 'popup.js', 'icon.png', 'bower_components/fontawesome/**', 'bower_components/bootstrap/**'],
                        dest: 'dist/'
                    }, {
                        src: "index.html",
                        dest: "dist/popup.html"
                    }, {
                        src: "chrome-manifest.json",
                        dest: "dist/manifest.json"
                    }]
                }
            },
            clean: {
                dist: "dist",
                bower: "bower_components",
                build: ["vendor.*"]
            }
        });

        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-compass');
        grunt.loadNpmTasks('grunt-bower-concat');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-clean');

        grunt.registerTask("build", function(target) {
            return grunt.task.run(["bower_concat", "cssmin", "uglify"]);
        });

        grunt.registerTask("dev", function(target) {
            return grunt.task.run(["watch"]);
        });

        grunt.registerTask("dist", function(target) {
            return grunt.task.run(["bower_concat", "cssmin", "uglify", "copy:dist"]);
        });

        return grunt.registerTask("default", ["build", "dev"]);
    };

})();