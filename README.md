# KalmanJS

Javascript based Kalman filter for 1D data. Sometimes you need a simple noise filter without any dependencies; for those cases *KalmanJS* is perfect.

I wrote two blog posts on explaining Kalman filters in general and applying them on noisy data in particular:

* [KalmanJS, Lightweight Javascript Library for Noise filtering](https://www.wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/)
* [Kalman filters explained: Removing noise from RSSI signals](https://www.wouterbulten.nl/blog/tech/kalman-filters-explained-removing-noise-from-rssi-signals/)

For other languages than Javascript, please see the note on the [contrib folder](https://github.com/wouterbulten/kalmanjs#other-languages).

![Kalman filter applied to a noisy dataset.](/resources/kalman-example.png?raw=true "Kalman filter applied to a noisy dataset.")

## Questions?

Please see the blog post ([KalmanJS, Lightweight Javascript Library for Noise filtering](https://wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/)) for more information about using this library. Any questions can be posted there as comments.

## Examples

An collection of examples can be found here: 

- A [standalone demo of a simple system](https://benwinding.github.io/kalmanjs-examples/examples/demo1.html) modeled with the filter. ([source code](https://github.com/benwinding/kalmanjs-examples))
- [Interactive demo](https://benwinding.github.io/kalmanjs-examples/examples/demo2-vue.html) created with VueJs that allows for experimenting with the different settings. ([source code](https://github.com/benwinding/kalmanjs-examples))
- Please take a look at this [blog post](https://www.wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/) for some examples and explanation of the variables.

## Installation

The KalmanJS library is a small javascript library and can easily be integrated in to your project manually. Alternatively, the library can be included using npm.

[Try KalmanJS in the browser on Runkit](https://runkit.com/embed/0kyrdew43pyw)

### In the browser

Include the `kalman.js` or `kalman.min.js` from the `dist` folder on your webpage, the filter can then be used directly.

```html
<script src="kalman.min.js" type="text/javascript"></script>
<script type="text/javascript">
  var kf = new KalmanFilter();
  console.log(kf.filter(3));
  console.log(kf.filter(2));
  console.log(kf.filter(1));
</script>
```

Should output (with default settings):

```
3
2.3333333333333335
1.5000000000000002
```

### Node (es6)
`npm install kalmanjs`

```javascript
import KalmanFilter from 'kalmanjs';

const kf = new KalmanFilter();
console.log(kf.filter(3));
console.log(kf.filter(2));
console.log(kf.filter(1));
```

Should output (with default settings):

```
3
2.3333333333333335
1.5000000000000002
```

### Node (es5)
`npm install kalmanjs`

```javascript
var KalmanFilter = require('kalmanjs')

var kf = new KalmanFilter();
console.log(kf.filter(3));
console.log(kf.filter(2));
console.log(kf.filter(1));

```

Should output (with default settings):

```
3
2.3333333333333335
1.5000000000000002
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

This project was part of my research on indoor localization. Please see my [paper](http://ieeexplore.ieee.org/document/7471364) or this [presentation](https://www.wouterbulten.nl/blog/tech/iotdi-ic2e-conference-presentation-human-slam/) for more information. You can use the following reference if you want to cite my paper:

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

Kalman filters can be useful in a broad range of projects. Regularly I get questions whether KalmanJS is available in other languages than Javascript and sometimes another library is available. I would encourage searching for it if you require another implementation. For convenience, this repository contains a [*contrib* folder](https://github.com/wouterbulten/kalmanjs/tree/master/contrib) with user-submitted implementations in other languages.

## Copyright

MIT License

Copyright (c) 2018 Wouter Bulten

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
