package com.adserversdk.dj.sdk.utils;

import android.content.Context;
import android.content.res.Configuration;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;


public class ConnectionDetecter {

	private Context _context;
	
	public ConnectionDetecter(Context context){
		this._context = context;
	}
	
	/*public boolean isConnectingToInternet(){
		ConnectivityManager connectivity = (ConnectivityManager) this._context.getSystemService(Context.CONNECTIVITY_SERVICE);
		if(connectivity !=null){
			NetworkInfo[] info = connectivity.getAllNetworkInfo();
			//NetworkInfo info= connectivity.getActiveNetworkInfo();
			if(info !=null){
				for(int i=0;i< info.length; i++){
					if(info[i].getState() == NetworkInfo.State.CONNECTED);
					{
						return true;
					}
				}
			}
		}
		
	
	return false;	
	} */
	
	public boolean isConnectingToInternet(){
		final ConnectivityManager conMgr =  (ConnectivityManager) this._context.getSystemService(Context.CONNECTIVITY_SERVICE);
		final NetworkInfo activeNetwork = conMgr.getActiveNetworkInfo();
		if (activeNetwork != null && activeNetwork.isConnected()) {
		    //notify user you are online
			return true;
		} else {
		    //notify user you are not online
			return false;
		} 
	}
	
	 /**
	   * Determine if the device is a tablet (i.e. it has a large screen).
	   * 
	   * @param
	   */
	  public boolean isTablet() {
	    return (this._context.getResources().getConfiguration().screenLayout
	            & Configuration.SCREENLAYOUT_SIZE_MASK)
	            >= Configuration.SCREENLAYOUT_SIZE_LARGE;
	  }
	
}
