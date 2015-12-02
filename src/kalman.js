/**
* KalmanFilter
* @class
* @author Wouter Bulten
* @see {@link http://github.com/wouterbulten/kalmanjs}
* @version Version: 1.0.0-beta
* @copyright Copyright 2015 Wouter Bulten
* @license GNU LESSER GENERAL PUBLIC LICENSE v3
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
  * @param  {Number} z Measurement
  * @param  {Number} u Control
  * @return {Number}
  */
  filter(z, u = 0) {

    if (isNaN(this.x)) {
      this.x = (1 / this.C) * z;
      this.cov = (1 / this.C) * this.Q * (1 / this.C);
    }
    else {

      // Compute prediction
      const predX = (this.A * this.x) + (this.B * u);
      const predCov = ((this.A * this.cov) * this.A) + this.R;

      // Kalman gain
      const K = predCov * this.C * (1 / ((this.C * predCov * this.C) + this.Q));

      // Correction
      this.x = predX + K * (z - (this.C * predX));
      this.cov = predCov - (K * this.C * predCov);
    }

    return this.x;
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
