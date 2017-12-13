#
# Simple Implementation of the Kalman Filter for 1D data, without any dependencies
# Originally written in JavaScript by Wouter Bulten
# Now rewritten in Python
#
# 2017
#
# license GNU LESSER GENERAL PUBLIC LICENSE v3
# author Sifan Ye
#
# see https://github.com/wouterbulten/kalmanjs
#

import math

class KalmanFilter:
    A = 1
    B = 0
    C = 1

    R = 0
    Q = 0

    cov = float('nan')
    x = float('nan')

    # Constructor
    #
    # R: Process Noise
    # Q: Measurement Noise
    def __init__(self, R, Q):
        self.R = R
        self.Q = Q

    # Filters a Measurement
    #
    # Measurement: The measurement value to be filtered
    # return: The filtered value
    def filter(self, measurement):
        u = 0
        if math.isnan(self.x):
            self.x = (1 / self.C) * measurement
            self.cov = (1 / self.C) * self.Q * (1 / self.C)
        else:
            predX = (self.A * self.x) + (self.B * u)
            predCov = ((self.A * self.cov) * self.A) + self.R

            # Kalman Gain
            K = predCov * self.C * (1 / ((self.C * predCov * self.C) + self.Q));

            # Correction
            self.x = predX + K * (measurement - (self.C * predX));
            self.cov = predCov - (K * self.C * predCov);

        return self.x

    # Returns the last measurement fed into the filter
    def last_measurement(self):
        return self.x

    # Sets measurement noise
    #
    # noise: The new measurement noise
    def set_measurement_noise(self, noise):
        self.Q = noise

    # Sets process noise
    #
    # noise: The new measurement noise
    def set_process_noise(self, noise):
        self.R = noise

# Main method as an example
def main():
    test = KalmanFilter(0.008, 0.1)
    testData = [66,64,63,63,63,66,65,67,58]
    for x in testData:
        print "Data:", x
        print "Filtered Data: ", test.filter(x)

main()