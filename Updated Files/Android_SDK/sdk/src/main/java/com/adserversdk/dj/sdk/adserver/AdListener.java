package com.adserversdk.dj.sdk.adserver;

public interface AdListener {
	public void param_required(AdView ad, boolean flag);
	
	public void internet_connection_failed(AdView ad, boolean flag);
	
	public void load_ad_failed(AdView ad, boolean flag, String ecode, String edesc);
	
}
