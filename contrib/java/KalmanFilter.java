/**
 * Simple implementation of the Kalman Filter for 1D data, without any dependencies
 * Originally written in JavaScript by Wouter Bulten
 * 
 * Now rewritten into Java
 * 2017
 * 
 * @license MIT License
 *
 * @author Sifan Ye
 * 
 * @see https://github.com/wouterbulten/kalmanjs
 *
 */
public class KalmanFilter {

	private double A = 1;
	private double B = 0;
	private double C = 1;
	
	private double R;
	private double Q;
	
	private double cov = Double.NaN;
	private double x = Double.NaN;
	
	/**
	 * Constructor
	 * 
	 * @param R Process noise
	 * @param Q Measurement noise
	 */
	public KalmanFilter(double R, double Q){
		this.R = R;
		this.Q = Q;
	}
	
	/**
	 * Filters a measurement
	 * 
	 * @param measurement The measurement value to be filtered
	 * @return The filtered value
	 */
	public double filter(double measurement){
		double u = 0;
		if (Double.isNaN(this.x)) {
			this.x = (1 / this.C) * measurement;
			this.cov = (1 / this.C) * this.Q * (1 / this.C);
		}else {	
			double predX = (this.A * this.x) + (this.B * u);
			double predCov = ((this.A * this.cov) * this.A) + this.R;

			// Kalman gain
			double K = predCov * this.C * (1 / ((this.C * predCov * this.C) + this.Q));

		    // Correction
		    this.x = predX + K * (measurement - (this.C * predX));
		    this.cov = predCov - (K * this.C * predCov);
		}
		return this.x;
	}
	
	/**
	 * 
	 * @return The last measurement fed into the filter
	 */
	public double lastMeasurement(){
		return this.x;
	}
	
	/**
	 * Sets measurement noise
	 *
	 * @param noise The new measurement noise
	 */
	public void setMeasurementNoise(double noise){
		    this.Q = noise;
	}
	
	/**
	 * Sets process noise
	 *
	 * @param noise The new process noise
	 */
	public void setProcessNoise(double noise){
		    this.R = noise;
	}
}
