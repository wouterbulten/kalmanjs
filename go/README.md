# Go Adaptation of KalmanFilter

Authors:
- Rishabh Katiyar

## Example Usage

        test, err := NewKalmanFilter(0.008, 0.1)
        if err != nil {
            log.Println(err)
        } else {
            testData := []float64{66, 64, 63, 63, 63, 66, 65, 67, 58}
            for _, x := range testData {
                fmt.Println("Input data: ", x)
                val, err := test.Filter(x)
                if err != nil {
                    log.Println(err)
                } else {
                    fmt.Println("Filtered data: ", val)
                }
            }
        }

		
		
		
## Example Usage with controlled input 

        test, err := NewKalmanFilter(0.008, 0.1, 1, 1, 1)
        if err != nil {
            log.Println(err)
        } else {
            testData := []float64{66, 64, 63, 63, 63, 66, 65, 67, 58}
            u := 0.2
            for _, x := range testData {
                fmt.Println("Input data: ", x)
                val, err := test.Filter(x, u)
                if err != nil {
                    log.Println(err)
                } else {
                    fmt.Println("Filtered data: ", val)
                }
            }
        }
