module.exports = {
    /**
     * `build_dir` - where our projects are compiled during development
     * `compile_dir` - folder where our app resides once it's completely built - server ready
     */
    build_dir: 'build',
    compile_dir: 'bin',

    /**
     * our app files
    */
    app_files: {
        js: [ 'src/**/*.js' ],

        atpl: [ 'src/app/**/*.tpl.html' ],

        html: [ 'src/index.html' ],
        sass: 'src/scss'
    }
};