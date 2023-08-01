/**
 * @brief 1D kalman filter to smoothen a noisy signal
 * Originally written in JavaScript by Wouter Bulten.
 *
 * Now rewritten in C
 *
 * @license MIT License
 *
 * @author Vinay Divakar
 *
 * @see https://github.com/wouterbulten/kalmanjs
 */

#include "KalmanFilter.h"

/**
 * @brief initializes the filter
 *
 * @param this points to the filter object
 * @return None
 */
void kalman_filter_init(struct kalman_filter_t *this) {
  this->covariance = NAN;
  this->output = NAN;
}

/**
 * @brief filters a measurement
 *
 * @param this points to the filter object
 * @param coefficients points to filter co-efficients object
 * @param measurement meseasurement value to be filtered
 * @return filtered value
 */
float kalman_filter(struct kalman_filter_t *this,
                    const struct kalman_filter_coefficients_t *coefficients,
                    int measurement) {
  const float u = 0.0;
  float predicted_output = 0.0, predicted_covariance = 0.0, gain = 0.0;

  if (isnan(this->output)) { // check for NaN
    this->output = (1 / coefficients->matrix_C) * measurement;
    this->covariance = (1 / coefficients->matrix_C) *
                       coefficients->measurement_noise *
                       (1 / coefficients->matrix_C);
  } else {
    predicted_output =
        (coefficients->matrix_A * this->output) + (coefficients->matrix_B * u);
    predicted_covariance =
        ((coefficients->matrix_A * this->covariance) * coefficients->matrix_A) +
        coefficients->process_noise;

    // kalman gain
    gain = predicted_covariance * coefficients->matrix_C *
           (1 / ((coefficients->matrix_C * predicted_covariance *
                  coefficients->matrix_C) +
                 coefficients->measurement_noise));

    // correction
    this->output =
        predicted_output +
        gain * (measurement - (coefficients->matrix_C * predicted_output));
    this->covariance = predicted_covariance -
                       (gain * coefficients->matrix_C * predicted_covariance);
  }

  return this->output;
}
