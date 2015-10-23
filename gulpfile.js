var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');
gulp.task('default', function() {
  return gulp.src(['typing.edit.js', 'function.js'])
    .pipe(closureCompiler({
      compilerPath: 'bower_components/closure-compiler/compiler.jar',
      fileName: 'typing.js'
    }))
    .pipe(gulp.dest('./'));
});
