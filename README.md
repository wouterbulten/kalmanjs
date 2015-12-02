# KalmanJS

Javascript based Kalman filter for 1D data. Sometimes you need a simple noise filter without any dependencies; for those cases *Kalman.js* is perfect.

![Kalman filter applied to a noisy dataset.](/resources/kalman-example.png?raw=true "Kalman filter applied to a noisy dataset.")

## Installation

The KalmanJS library is a small javascript library and can easily be integrated in to your project manually. Alternatively, the library can be included using npm.

### Node (es6)
`npm install kalmanjs`

```javascript
import KalmanFilter from 'kalmanjs';

const kf = new KalmanFilter();
kf.filter(2);
```

### Node (es5)
`npm install kalmanjs`

```javascript
var KalmanFilter = require('kalmanjs').default;

var kf = new KalmanFilter();
kf.filter(2);

```

## Applying the filter on a dataset

Using the filter is simple. First we create a simple dataset with random noise:

```javascript
//Generate a simple static dataset
var dataConstant = Array.apply(null, {length: dataSetSize}).map(function() {
  return 4;
});
//Add noise to data
var noisyDataConstant = dataConstant.map(function(v) {
  return v + randn(0, 3);
});
```

Then we apply the filter iteratively on each data element:

```javascript
//Apply kalman filter
var kalmanFilter = new KalmanFilter({R: 0.01, Q: 3});

var dataConstantKalman = noisyDataConstant.map(function(v) {
  return kalmanFilter.filter(v);
});
```

See [this blog post](https://wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/) for screenshots and more examples.

## Background

* [KalmanJS, Lightweight Javascript Library for Noise filtering](https://wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/)
* [Kalman filters explained: Removing noise from RSSI signals](https://wouterbulten.nl/blog/tech/kalman-filters-explained-removing-noise-from-rssi-signals/)

## Copyright

Copyright (C) 2015 Wouter Bulten

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
