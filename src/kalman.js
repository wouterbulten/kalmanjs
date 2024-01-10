/**
* KalmanFilter
* @class
* @author Wouter Bulten
* @see {@link http://github.com/wouterbulten/kalmanjs}
* @version Version: 1.0.0-beta
* @copyright Copyright 2015-2018 Wouter Bulten
* @license MIT License
* @preserve
*/
export default class KalmanFilter {

  /**
  * Create 1-dimensional kalman filter
  * @param  {Number} options.R Process noise
  * @param  {Number} options.Q Measurement noise
  * @param  {Number} options.A State vector
  * @param  {Number} options.B Control vector
  * @param  {Number} options.C Measurement vector
  * @return {KalmanFilter}
  */
  constructor({R = 1, Q = 1, A = 1, B = 0, C = 1} = {}) {

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
  * @param  {Number} z Measurement. Either a value or an array with measurement and error.
  * @param  {Number} u Control
  * @return {Number}
  */
  filter(z, u = 0) {

    let zVal = z;
    let zErr = this.Q;

    if (Array.isArray(z)) {
      zVal = z[0];
      zErr = z[1];
    }

    if (isNaN(this.x)) {
      this.x = (1 / this.C) * zVal;
      this.cov = (1 / this.C) * zErr * (1 / this.C);
    }
    else {

      // Compute prediction
      const predX = this.predict(u);
      const predCov = this.uncertainty();

      // Kalman gain
      const K = predCov * this.C * (1 / ((this.C * predCov * this.C) + zErr));

      // Correction
      this.x = predX + K * (zVal - (this.C * predX));
      this.cov = predCov - (K * this.C * predCov);
    }

    return this.x;
  }

  /**
  * Predict next value
  * @param  {Number} [u] Control
  * @return {Number}
  */
  predict(u = 0) {
    return (this.A * this.x) + (this.B * u);
  }

  /**
  * Return uncertainty of filter
  * @return {Number}
  */
  uncertainty() {
    return ((this.A * this.cov) * this.A) + this.R;
  }

  /**
  * Return the last filtered measurement
  * @return {Number}
  */
  lastMeasurement() {
    return this.x;
  }

  /**
  * Set measurement noise Q
  * @param {Number} noise
  */
  setMeasurementNoise(noise) {
    this.Q = noise;
  }

  /**
  * Set the process noise R
  * @param {Number} noise
  */
  setProcessNoise(noise) {
    this.R = noise;
  }
}
