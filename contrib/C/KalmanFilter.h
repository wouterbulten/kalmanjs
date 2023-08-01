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

#ifndef __KALMAN_FILTER_H__
#define __KALMAN_FILTER_H__

#include <math.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

struct kalman_filter_t {
  float covariance, output;
};

struct kalman_filter_coefficients_t {
  float matrix_A;
  float matrix_B;
  float matrix_C;
  float process_noise;
  float measurement_noise;
};

void kalman_filter_init(struct kalman_filter_t *this);
float kalman_filter(struct kalman_filter_t *this,
                    const struct kalman_filter_coefficients_t *coefficients,
                    int measurement);

#endif
