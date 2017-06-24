const gulp = require('gulp');
const babel = require('gulp-babel');
var jest = require('gulp-jest').default;

gulp.task('set-test-node-env', function() {
    return process.env.NODE_ENV = 'test';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('dist', ['set-prod-node-env'], () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});


gulp.task('jest', () => {
  return gulp.src('test').pipe(jest({
    config: {
      "transformIgnorePatterns": ["<rootDir>/dist/", "<rootDir>/node_modules/"],
      "automock": false
    }
  }));
});

gulp.task('default', ['dist']);
