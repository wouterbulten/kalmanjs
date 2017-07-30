# KalmanJS

Javascript based Kalman filter for 1D data. Sometimes you need a simple noise filter without any dependencies; for those cases *Kalman.js* is perfect.

![Kalman filter applied to a noisy dataset.](/resources/kalman-example.png?raw=true "Kalman filter applied to a noisy dataset.")

## Background

I wrote two blog posts on explaining Kalman filters in general and applying them on noisy data in particular:

* [KalmanJS, Lightweight Javascript Library for Noise filtering](https://www.wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/)
* [Kalman filters explained: Removing noise from RSSI signals](https://www.wouterbulten.nl/blog/tech/kalman-filters-explained-removing-noise-from-rssi-signals/)

## Questions?

Please see the blog post ([KalmanJS, Lightweight Javascript Library for Noise filtering](https://wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/)) for more information about using this library. Any questions can be posted there as comments. 

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

## Reference

This project was part of my research on indoor localization. Please see my [paper](http://ieeexplore.ieee.org/document/7471364) or this [presentation](http://localhost:4000/blog/tech/iotdi-ic2e-conference-presentation-human-slam/) for more information. You can use the following reference if you want to cite my paper:

> W. Bulten, A. C. V. Rossum and W. F. G. Haselager, "Human SLAM, Indoor Localisation of Devices and Users," *2016 IEEE First International Conference on Internet-of-Things Design and Implementation (IoTDI)*, Berlin, 2016, pp. 211-222. doi: 10.1109/IoTDI.2015.19 [URL](http://ieeexplore.ieee.org/document/7471364)

Or, if you prefer in BibTeX format:

```tex
@INPROCEEDINGS{7471364, 
author={W. Bulten and A. C. V. Rossum and W. F. G. Haselager}, 
booktitle={2016 IEEE First International Conference on Internet-of-Things Design and Implementation (IoTDI)}, 
title={Human SLAM, Indoor Localisation of Devices and Users}, 
year={2016}, 
pages={211-222}, 
keywords={RSSI;data privacy;indoor environment;ubiquitous computing;FastSLAM;RSSI update;SLAC algorithm;device RSSI;device indoor localisation;device location;device position;environment noise;human SLAM;nontrivial environment;received signal strength indicator;simultaneous localisation and configuration;smart space;user indoor localisation;user motion data;user privacy;Estimation;Performance evaluation;Privacy;Simultaneous localization and mapping;Privacy;Simultaneous localization and mapping;Smart Homes;Ubiquitous computing;Wireless sensor networks}, 
doi={10.1109/IoTDI.2015.19}, 
month={April},}
```

## Other languages

Kalman filters can be useful in a broad range of projects. Regularly I get questions whether KalmanJS is available in other languages than Javascript and sometimes another library is available. I would encourage searching for it if you require another implementation. For convenience, this repository contains a *contrib* folder with user-submitted implementations in other languages.

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
