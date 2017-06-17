package com.adserversdk.dj.sdk.utils;

import android.content.Context;
import android.util.Log;

import java.util.ArrayList;

import static com.adserversdk.dj.sdk.utils.CdlogListener.LOG_LEVEL;

public class Cdlog {

	public static boolean cdlogged = false;
	
	public static void v(String LogTag,String msg){
		if(!cdlogged && msg != null){
			 notifyListener(LOG_LEVEL.V, LogTag, msg);
			Log.v(LogTag, msg);
		}
	}

	public static void v(String LogTag,String msg,Throwable tr){
		if(!cdlogged && msg != null){
			notifyListener(LOG_LEVEL.V, LogTag, msg, tr);	
			Log.v(LogTag, msg,tr);
		}
	}
	
	public static void d(String LogTag,String msg){
		if(!cdlogged && msg != null){
			notifyListener(LOG_LEVEL.D,LogTag, msg);
			Log.d(LogTag, msg);
		}
	}
	
	public static void d(String LogTag,String msg,Throwable tr ){
		if(!cdlogged && msg != null){
			notifyListener(LOG_LEVEL.D, LogTag, msg, tr);
			Log.d(LogTag, msg, tr);
		}
	}
	
	public static void i(String LogTag,String msg){
		if(!cdlogged && msg != null){
			notifyListener(LOG_LEVEL.I, LogTag, msg);
			Log.i(LogTag, msg);
		}
	}
	
	public static void i(String LogTag,String msg, Throwable tr){
		if(!cdlogged && msg != null){
			notifyListener(LOG_LEVEL.I, LogTag, msg, tr);
			Log.i(LogTag, msg, tr);
		}
	}
	
	public static void w(String LogTag,String msg){
		if(!cdlogged && msg != null){
			notifyListener(LOG_LEVEL.W, LogTag, msg);
			Log.w(LogTag, msg);
		}
	}
	
	public static void w(String LogTag,String msg,Throwable tr){
		if(!cdlogged && msg != null){
			notifyListener(LOG_LEVEL.W, LogTag, msg, tr);
			Log.w(LogTag, msg,tr);
		}
	}
	
	public static void e(String LogTag,String msg){
		if(!cdlogged && msg != null){
			notifyListener(LOG_LEVEL.E, LogTag, msg);
			Log.e(LogTag, msg);
		}
	}
	
	public static void e(String LogTag,String msg,Throwable tr){
		if(!cdlogged && msg != null){
			notifyListener(LOG_LEVEL.E, LogTag, msg, tr);
			Log.e(LogTag, msg,tr);
		}
	}
	
	/**
	 *  Logging helper function for SDK
	 */
	
	public static final String baseLogTag = "MSDK";
	public static final String httpReqLogTag = baseLogTag +" -REQUEST";
	public static final String httpResLogTag = baseLogTag +" -RESPONSE";
	public static final String debugLogTag = baseLogTag +" -DEBUG";
	
	public static final String publicFunctionsLogTag = baseLogTag +" -PUBLIC FUNCTION";
	
	public static Context error_context;
	
	public static String getString(int id){
		if(error_context ==null)
			return null;
		return error_context.getString(id);
	}
	
	public static String getString(int id, long l){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),l);
	}
	
	public static String getString(int id, String s){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id), s);
	}
	
	public static String getString(int id, String s, int i){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),s,i);
	}
	
	public static String getString(int id, int a, int b,int c,int d){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),a,b,c,d);
	}
	
	public static String getString(int id, boolean b){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),b);
	}
	
	public static String getString(int id, String s,String ss){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),s,ss);
	}
	
	public static String getString(int id, int i, String s, String ss){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),i,s,ss);
	}
	
	public static String getString(int id, String s, int i, String ss){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),s,i,ss);
	}
	
	public static String getString(int id, int i, String s){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),i,s);
	}
	
	public static String getString(int id, boolean b, int i){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),b,i);
	}
	
	public static String getString(int id, int i, int j){
		if(cdlogged || error_context == null)
			return null;
		return String.format(error_context.getString(id),i,j);
	}
	
	/**
     * lastRequest/lastResponse helper methods
     */
	
	private static String lastRequest = "";
	private static String lastResponse = "";
	
	synchronized public static void setLastRequest(String LastRequest){
		Cdlog.lastRequest = LastRequest; 
	}
	
	synchronized public static String getLastRequest(){
		return lastRequest;
	}
	
	synchronized public static void ClearLastResponse(){
		Cdlog.lastResponse ="";  
	}
	
	synchronized public static void setLastResponse(String LastResponse){
		Cdlog.lastResponse = LastResponse;
	}
	
	synchronized public static String getLastResponse(){
		return lastResponse;
	}
	
	/**
	 * CdlogListener helper methods
	 */
	
	private static final ArrayList<CdlogListener> alisteners = new ArrayList<CdlogListener>();
	
	synchronized public static boolean registerListener(CdlogListener listener){
		return listener != null && alisteners.add(listener);
	}
	
	synchronized public static boolean unregisterListeners(CdlogListener listener){
		return listener != null && alisteners.remove(listener);
	}
	
	synchronized public static void unregisterAllListeners(){
		alisteners.clear();
	}
	
	private synchronized static void notifyListener(LOG_LEVEL level, String LogTag, String message){
		notifyListener(level,LogTag,message, null);
	}
	
	private synchronized static void notifyListener(LOG_LEVEL level, String LogTag, String message, Throwable tr){
		for(CdlogListener listener: alisteners){
			if(level.ordinal() >= listener.getLogLevel().ordinal()){
				if(tr != null)
					listener.onReceiveMessage(level, LogTag, message, tr);
				else
					listener.onReceiveMessage(level, LogTag, message);
			}
		}
	}
	
}
