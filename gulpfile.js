'use strict'
import gulp from 'gulp'
import { deleteAsync } from 'del'

const paths = {
  scripts: {
    src: ['**/*.js', '!node_modules/**', '!gulpfile.js'],
    dest: 'dist/'
  }
}

export function scripts () {
  return gulp.src(paths.scripts.src, { sourcemaps: false })
    .pipe(gulp.dest(paths.scripts.dest))
}

export const clean = () => deleteAsync(['dist'])
const build = gulp.series(clean, gulp.parallel(scripts))
export default build
