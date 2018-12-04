# Objective-C Adaptation of KalmanFilter

Authors:
- Biraj Dhakal

## Example Usage

int main () {

    double ret;
    KalmanFilter *kalmanFilter = [[KalmanFilter alloc]init];

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
        ret = [kalmanFilter filter:value];
        NSLog(@"Filtered value is : %.2f\n", ret );
    }
    return 0;
}
