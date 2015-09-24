/*!
 * Kalmanjs
 * http://github.com/wouterbulten/kalmanjs
 * Version: 1.0.0-beta
 *
 * Copyright 2015 Wouter Bulten
 * Released under the GNU LESSER GENERAL PUBLIC LICENSE v3
 */

/**
 * KalmanFilter
 * @class
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KalmanFilter = (function () {

	/**
  * Create 1-dimensional kalman filter
  * @param  {Number} options.R Process noise
  * @param  {Number} options.Q Measurement noise
  * @param  {Number} options.A State vector
  * @param  {Number} options.B Control vector
  * @param  {Number} options.C Measurement vector
  * @return {KalmanFilter}
  */

	function KalmanFilter() {
		var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _ref$R = _ref.R;
		var R = _ref$R === undefined ? 1 : _ref$R;
		var _ref$Q = _ref.Q;
		var Q = _ref$Q === undefined ? 1 : _ref$Q;
		var _ref$A = _ref.A;
		var A = _ref$A === undefined ? 1 : _ref$A;
		var _ref$B = _ref.B;
		var B = _ref$B === undefined ? 0 : _ref$B;
		var _ref$C = _ref.C;
		var C = _ref$C === undefined ? 1 : _ref$C;

		_classCallCheck(this, KalmanFilter);

		this.R = R; // noise power desirable
		this.Q = Q; // noise power estimated

		this.A = A;
		this.C = C;
		this.B = B;
		this.cov = NaN;
		this.x = NaN; // estimated signal without noise
	}

	/**
  * Filter a new value
  * @param  {Number} z Measurement
  * @param  {Number} u Control
  * @return {Number}
  */

	_createClass(KalmanFilter, [{
		key: "filter",
		value: function filter(z) {
			var u = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			if (isNaN(this.x)) {
				this.x = 1 / this.C * z;
				this.cov = 1 / this.C * this.Q * (1 / this.C);
			} else {

				//Compute prediction
				var predX = this.A * this.x + this.B * u;
				var predCov = this.A * this.cov * this.A + this.R;

				//Kalman gain
				var K = predCov * this.C * (1 / (this.C * predCov * this.C + this.Q));

				//Correction
				this.x = predX + K * (z - this.C * predX);
				this.cov = predCov - K * this.C * predCov;
			}

			return this.x;
		}

		/**
   * Return the last filtered measurement
   * @return {Number}
   */
	}, {
		key: "lastMeasurement",
		value: function lastMeasurement() {
			return this.x;
		}

		/**
   * Set measurement noise Q
   * @param {Number} noise
   */
	}, {
		key: "setMeasurementNoise",
		value: function setMeasurementNoise(noise) {
			this.Q = noise;
		}

		/**
   * Set the process noise R
   * @param {Number} noise
   */
	}, {
		key: "setProcessNoise",
		value: function setProcessNoise(noise) {
			this.R = noise;
		}
	}]);

	return KalmanFilter;
})();
