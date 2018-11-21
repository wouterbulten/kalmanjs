#import <Foundation/Foundation.h>

@interface SampleClass:NSObject
/* method declaration */
- (double)filter:(double)measurement;
@end

@implementation SampleClass
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

@end

int main () {
    
    double ret;
    SampleClass *sampleClass = [[SampleClass alloc]init];
    
    NSMutableArray *pointA10Recordings= [[NSMutableArray alloc] init];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:12.59]];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:8.91]];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:10.0]];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:12.59]];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:7.94]];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:11.22]];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:12.59]];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:10.0]];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:12.59]];
    [pointA10Recordings addObject:[NSNumber numberWithDouble:10.0]];
    
    
    
    for(int i=0;i<10;i++){
        double value   = [[pointA10Recordings objectAtIndex:i] doubleValue];
        ret = [sampleClass filter:value];
        NSLog(@"Max value is : %.2f\n", ret );
    }
    return 0;
}
