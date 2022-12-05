/**
 * Simple implementation of the Kalman Filter for 1D data.
 * Originally written in JavaScript by Wouter Bulten
 *
 * Now rewritten into Go
 * 2022
 *
 * @license MIT License
 *
 * @author Rishabh Katiyar
 *
 * @see https://github.com/wouterbulten/kalmanjs
 *
 */
package main

import (
	"errors"
	"math"
)

type KalmanFilter struct {
	a            float64
	b            float64
	c            float64
	r            float64
	q            float64
	cov          float64
	x            float64
	isControlled bool
}

/**
 * Constructor
 *
 * @param R Process noise
 * @param Q Measurement noise

 * @param options
 * options[0] = A State vector
 * options[1] = B Control vector
 * options[2] = C Measurement vector
 */
func NewKalmanFilter(r, q float64, options ...float64) (*KalmanFilter, error) {
	var err error
	kf := new(KalmanFilter)
	kf.r = r
	kf.q = q
	kf.cov = math.NaN()
	kf.x = math.NaN()
	kf.isControlled = false

	if len(options) == 3 {
		kf.a = options[0]
		kf.b = options[1]
		kf.c = options[2]

		kf.isControlled = true
	} else if len(options) == 0 {
		kf.a = 1
		kf.b = 0
		kf.c = 1
	} else {
		err = errors.New("optional parameters are incorrect")
	}
	return kf, err
}

/**
 * Filters a measurement
 *
 * @param measurement The measurement value to be filtered
 * @param u The controlled input value
 * @return The filtered value
 */
func (kf *KalmanFilter) Filter(measurement float64, u ...float64) (float64, error) {
	var err error
	var U float64
	if kf.isControlled {
		if len(u) == 1 {
			U = u[0]
		} else if len(u) == 0 {
			err = errors.New("parameter u is required when initialized with controlled inputs")
		} else {
			err = errors.New("only 1 parameter as u should be passed")
		}
	} else if !kf.isControlled && len(u) != 0 {
		err = errors.New("parameter u is not required when initialized without controlled inputs")
	} else {
		U = 0
	}
	if err == nil {
		if math.IsNaN(kf.x) {
			kf.x = (1 / kf.c) * measurement
			kf.cov = (1 / kf.c) * kf.q * (1 / kf.c)
		} else {
			predX := (kf.a * kf.x) + (kf.b * U)
			predCov := ((kf.a * kf.cov) * kf.a) + kf.r

			// Kalman gain
			K := predCov * kf.c * (1 / ((kf.c * predCov * kf.c) + kf.q))

			// Correction
			kf.x = predX + K*(measurement-(kf.c*predX))
			kf.cov = predCov - (K * kf.c * predCov)
		}
	}
	return kf.x, err
}

/**
 * Set the last measurement.
 * @return The last measurement fed into the filter
 */
func (kf *KalmanFilter) LastMeasurement() float64 {
	return kf.x
}

/**
 * Sets measurement noise
 *
 * @param noise The new measurement noise
 */
func (kf *KalmanFilter) SetMeasurementNoise(noise float64) {
	kf.q = noise
}

/**
 * Sets process noise
 *
 * @param noise The new process noise
 */
func (kf *KalmanFilter) SetProcessNoise(noise float64) {
	kf.r = noise
}
