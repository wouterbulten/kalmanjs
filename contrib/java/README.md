# Java Adaptation of KalmanFilter

Authors:
- Sifan Ye (initial version)
- Andreas Eppler (Oct 18 update)

## Example Usage

        KalmanFilter test = new KalmanFilter(0.008, 0.1);       
        double[] testData = {66,64,63,63,63,66,65,67,58};
        for(double x: testData){
            System.out.println("Input data: " + x);
            System.out.println("Filtered data: " + test.filter(x));
        }'

		
		
		
## Example Usage with controlled input 

        KalmanFilter test = new KalmanFilter(0.008, 0.1, 1, 1, 1);       
        double[] testData = {66,64,63,63,63,66,65,67,58};
		double u = 0.2;
        for(double x: testData){
            System.out.println("Input data: " + x);
            System.out.println("Filtered data: " + test.filter(x, u));
        }'
