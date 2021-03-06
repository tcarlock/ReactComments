var gulp = require('gulp');
var clean = require('gulp-clean');
var react = require('gulp-react');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var nodemon = require('gulp-nodemon');


// Clean dist directory
gulp.task('clean', function() {
  return gulp.src(['dist/*'], {read: false}).pipe(clean());
});

// Parse and compress JS and JSX files
gulp.task('build_scripts', function() {
  // Listen to every JS file in ./src/javascript
  return gulp.src('src/javascript/**/*.js*')
    // Turn React JSX syntax into regular javascript
    .pipe(react())
    // Output each file into the ./dist/javascript/ directory
    .pipe(gulp.dest('dist/javascript/'))
    // Optimize each JavaScript file
    .pipe(uglify())
    // Add .min.js to the end of each optimized file
    .pipe(rename({suffix: '.min'}))
    // Output each optimized .min.js file into the ./dist/javascript/ dir
    .pipe(gulp.dest('dist/javascript/'));
});

gulp.task('build_styles', function() {
	return gulp.src('src/css/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css/'))
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css/'))
});

gulp.task('default', ['clean'], function() {
  return gulp.start('browserify');
});

function browserifyTask() {
  return gulp.src('dist/javascript/main.js')
    .pipe(browserify({
      transform: ['envify']
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/javascript/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/javascript/'));
}

gulp.task('browserify', ['build_scripts'], browserifyTask);
gulp.task('browserify_nodep', browserifyTask);

gulp.task('watch', ['clean'], function() {
  var watching = false;
  gulp.start('browserify', 'build_styles', function() {
    // Protect against this function being called twice. (Bug?)
    if (!watching) {
      watching = true;

      // Watch for changes in src js and run the 'build_scripts' task
      gulp.watch('src/**/*.js*', ['build_scripts']);

      // Watch for changes in src css and run the 'build_styles' task
      gulp.watch('src/**/*.scss', ['build_styles']);

      // Run the 'browserify_nodep' task when main.js changes
      gulp.watch('dist/javascript/main.js', ['browserify_nodep']);

      // Watch for .less file changes and re-run the 'styles' task
      // gulp.watch('src/**/*.less', ['styles']);

      // Start up the server and have it reload when anything in the
      // ./dist/ directory changes
      nodemon({script: 'server.js', watch: 'dist'});
    }
  });
});