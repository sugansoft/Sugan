package com.djax.adserver;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.json.JSONException;
import org.json.JSONObject;

import com.djax.utils.Cdlog;

import android.util.Log;

public class AdResponse {

	
	private String adtag = null;	
	private String ad_type = null;	
	private String imp_url = null;
	private String click_url= null;
	private String viewer_id= null;
	
	public volatile boolean parsingComplete = true;
	
	public volatile boolean failed	= false;
	private String error_code 		= null;
	private String error_desc 		= null;
	
	public String getAdtag() {
		return adtag;
	}
	public void setAdtag(String adtag) {
		this.adtag = adtag;
	}
	public String getAd_type() {
		return ad_type;
	}
	public void setAd_type(String ad_type) {
		this.ad_type = ad_type;
	}
	public String getImp_url() {
		return imp_url;
	}
	public void setImp_url(String imp_url) {
		this.imp_url = imp_url;
	}
	public String getClick_url() {
		return click_url;
	}
	public void setClick_url(String click_url) {
		this.click_url = click_url;
	}
	public String getViewer_id() {
		return viewer_id;
	}
	public void setViewer_id(String viewer_id) {
		this.viewer_id = viewer_id;
	}
	public boolean isParsingComplete() {
		return parsingComplete;
	}
	public void setParsingComplete(boolean parsingComplete) {
		this.parsingComplete = parsingComplete;
	}
	public boolean isFailed() {
		return failed;
	}
	public void setFailed(boolean failed) {
		this.failed = failed;
	}
	public String getError_code() {
		return error_code;
	}
	public void setError_code(String error_code) {
		this.error_code = error_code;
	}
	public String getError_desc() {
		return error_desc;
	}
	public void setError_desc(String error_desc) {
		this.error_desc = error_desc;
	}
	
	
	public void readAndParseJSON(String result){
		
		try{
			
			JSONObject reader = new JSONObject(result);
		
			String ad_response = reader.getString(Config.TAG_AD_RESPONSE);
			
			ad_response = ad_response.trim();
			
			if(ad_response.equalsIgnoreCase("success")){
				
				
				JSONObject ads = reader.getJSONObject(Config.TAG_ADS);
				
				
				if(ads !=null){
					
					
					try {
					
					click_url 			= URLDecoder.decode(ads.getString(Config.TAG_CLICK_URL),"UTF-8");
					
					imp_url 			= URLDecoder.decode(ads.getString(Config.TAG_BEACON_URL),"UTF-8");
					
					ad_type 			= ads.getString(Config.TAG_AD_TYPE);
					
					if(ad_type.equalsIgnoreCase("IMAGE")){
						adtag 				= URLDecoder.decode(ads.getString(Config.TAG_IMAGE_PATH),"UTF-8");
					}else{
						adtag 				= URLDecoder.decode(ads.getString(Config.TAG_ADTAG),"UTF-8");
					}
					
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}					
					
				}else{
					failed = true;
					Cdlog.d("mSDK Debug","Ads not found.");
					error_code = "2000";
					error_desc = "Ads Not Found";
				}
			}else{
				
				// Handle Error Flow
				Cdlog.d("mSDK Debug",ad_response);
				failed = true;
				JSONObject error = reader.getJSONObject(Config.TAG_ERROR);				
				error_code = error.getString(Config.TAG_ERR_CODE);
				error_desc = error.getString(Config.TAG_ERR_DESC);
				
			}			
			
			parsingComplete = false;
				
		}catch(JSONException e){
			Log.d("mSDK Debug",e.getMessage());
			e.printStackTrace();
		}
	}
	
	

}
