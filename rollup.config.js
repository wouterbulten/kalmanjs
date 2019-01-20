import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [{
  input: 'src/kalman.js',
  output: {
    file: 'lib/kalman.js',
    format: 'umd',
    name: 'KalmanFilter'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}, {
  input: 'src/kalman.js',
  output: {
    file: 'dist/kalman.js',
    format: 'umd',
    name: 'KalmanFilter',
    sourcemap: true,
    banner: '/*kalmanjs, Wouter Bulten, MIT, https://github.com/wouterbulten/kalmanjs */'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}];
