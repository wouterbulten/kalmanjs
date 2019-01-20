import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [{
  // Build for NodeJS
  input: 'src/kalman.js',
  output: {
    file: 'lib/kalman.js',
    format: 'cjs',
    name: 'KalmanFilter',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}, {
  // Build for the browser
  input: 'src/kalman.js',
  output: {
    file: 'dist/kalman.js',
    format: 'iife',
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
