/**
 * Simple implementation of the Kalman Filter for 1D data.
 * Originally written in JavaScript by Wouter Bulten.
 *
 * Now rewritten into Objective-C
 *
 * @license MIT License
 *
 * @author Biraj Dhakal
 *
 * @see https://github.com/wouterbulten/kalmanjs
 *
 */

#import <Foundation/Foundation.h>

@interface KalmanFilter:NSObject
/* method declaration */
- (double)filter:(double)measurement;
- (double)filter:(double)measurement:(double)u;
@end

@implementation KalmanFilter
double cov=NAN;
double x=NAN;
- (double)filter:(double)measurement {
    double A=1;
    double B=0;
    double C=1;
    double R=0.008;
    double Q=0.1;
    double u=0.0;
    if(isnan(x)){
        x = (1/C) * measurement;
        cov = (1/C) * Q * (1/C);
    }else{
        double predX = (A*x) + (B*u);
        double predCov = ((A * cov) * A) + R;

        double K = predCov * C * (1/((C * predCov * C) + Q));

        x = predX + K *(measurement - (C * predX));
        cov = predCov - (K * C * predCov);
    }
    return x;
}
- (double)filter:(double)measurement:(double)u {
    double A=1;
    double B=0;
    double C=1;
    double R=0.008;
    double Q=0.1;
    if(isnan(x)){
        x = (1/C) * measurement;
        cov = (1/C) * Q * (1/C);
    }else{
        double predX = (A*x) + (B*u);
        double predCov = ((A * cov) * A) + R;

        double K = predCov * C * (1/((C * predCov * C) + Q));

        x = predX + K *(measurement - (C * predX));
        cov = predCov - (K * C * predCov);
    }
    return x;
}

@end
