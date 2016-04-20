package com.djax.utils;

public abstract class CdlogListener {
	
	/**
	 * Log level options corresponding to Android Logcat options:
	 * Verbose, Debug, Info, Warnings, Error
	 */
	
	public enum LOG_LEVEL{
		V,
		D,
		I,
		W,
		E
	}
	
	/**
	 * Callback for all the messages sent to Cdlog after listener is registered.
	 * Implement special handling of Cdlog messages here.
	 * Make sure not to print to Cdlog in this method because
	 * the program will deadlock.
	 * 
	 * @param level - the level of verbosity like verbose,error etc
	 * @param LogTag - the log tag associated with the receiving message
	 * @param message - the String message passed to Cdlog
	 */
	public abstract void onReceiveMessage(LOG_LEVEL level, String LogTag, String message);
	
	/**
	 * Callback for all the messages sent to Cdlog after listener is registered.
	 * Implement special handling of Cdlog messages here.
	 * Make sure not to print to Cdlog in this method because
	 * the program will deadlock.
	 * 
	 * @param level - the level of verbosity like verbose,error etc
	 * @param LogTag - the log tag associated with the receiving message
	 * @param message - the String message passed to Cdlog
	 * @param tr - the throwable associated with the Cdlog message
	 */
	
	public abstract void onReceiveMessage(LOG_LEVEL level, String LogTag, String message, Throwable tr);
	
	/**
	 * Specify filtering level of Cdlog messages
	 * 
	 *  @return minimum level of verbosity to filter messages at.
	 *  For eg;- returning V (Verbose) will receive all messages.
	 *  returning E (Error) will receive only E-Level (error) messages.
	 */
	
	public abstract LOG_LEVEL getLogLevel();
	
}