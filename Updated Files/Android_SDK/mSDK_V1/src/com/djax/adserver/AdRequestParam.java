package com.djax.adserver;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import com.djax.mtrack.Device_settings;
import com.djax.utils.Cdlog;

public class AdRequestParam extends Config{

	private static String URL = ADSERVER_URL;
	
	private static List<NameValuePair> URL_PARAMS = null;
	
	private static List<NameValuePair> HEADER_PARAMS = null;
	
	
	public static String getURL() {
		return URL;
	}

	public static void setURL(String uRL) {
		URL = uRL;
	}

	public static List<NameValuePair> getURL_PARAMS() {
		return URL_PARAMS;
	}

	public static void setURL_PARAMS(List<NameValuePair> uRL_PARAMS) {
		URL_PARAMS = uRL_PARAMS;
	}

	public static List<NameValuePair> getHEADER_PARAMS() {
		return HEADER_PARAMS;
	}

	public static void setHEADER_PARAMS(List<NameValuePair> hEADER_PARAMS) {
		HEADER_PARAMS = hEADER_PARAMS;
	}

	public AdRequestParam() {
		super();
		// TODO Auto-generated constructor stub
		if(HEADER_PARAMS != null)HEADER_PARAMS.clear();
		if(URL_PARAMS != null)URL_PARAMS.clear();
	}
	
	
	
	public AdRequestParam GenerateRequestURL(Device_settings dInfo,AdView imgad){
		
		List<NameValuePair> url_params = new ArrayList<NameValuePair>();
		
		List<NameValuePair> h_params = new ArrayList<NameValuePair>();
		
		
		url_params.add(new BasicNameValuePair("zoneid", imgad.getZoneid()));
		
		url_params.add(new BasicNameValuePair("adwidth",""+dInfo.screen_width));
		
		url_params.add(new BasicNameValuePair("adheight",""+dInfo.screen_height));
		
	/*	url_params.add(new BasicNameValuePair("age", imgad.getAge()));
		url_params.add(new BasicNameValuePair("gender", imgad.getGender()));
		url_params.add(new BasicNameValuePair("color", imgad.getColor()));
		url_params.add(new BasicNameValuePair("loc", imgad.getLoc()));
		*/
		
		url_params.add(new BasicNameValuePair("age","25"));
		url_params.add(new BasicNameValuePair("gender","male"));
		//url_params.add(new BasicNameValuePair("color","fair"));
		url_params.add(new BasicNameValuePair("loc","http://www.w3schools.com"));
		url_params.add(new BasicNameValuePair("keyword","books,movies"));
		
		URL_PARAMS = url_params;
		
		h_params.add(new BasicNameValuePair("screenwidth",""+dInfo.screen_width));
		
		h_params.add(new BasicNameValuePair("screenheight",""+dInfo.screen_height));
		
		h_params.add(new BasicNameValuePair("displaywidth",""+dInfo.display_width));
		
		h_params.add(new BasicNameValuePair("displayheight",""+dInfo.display_height));
		
		h_params.add(new BasicNameValuePair("model", dInfo.model));
		
		h_params.add(new BasicNameValuePair("make", dInfo.make));
		
		h_params.add(new BasicNameValuePair("os", dInfo.os));
		
		h_params.add(new BasicNameValuePair("osv", dInfo.os_ver));	
		
		h_params.add(new BasicNameValuePair("carrier", dInfo.carrier));
		
		h_params.add(new BasicNameValuePair("udid",  dInfo.android_id));
		
		h_params.add(new BasicNameValuePair("didsha1",  dInfo.didsha1));
		
		h_params.add(new BasicNameValuePair("didmd5",  dInfo.didmd5));
		
		
		h_params.add(new BasicNameValuePair("js",""+ dInfo.js_enable));
		
		h_params.add(new BasicNameValuePair("appId",  dInfo.app_id));
		
		h_params.add(new BasicNameValuePair("ipv6",  dInfo.ipv6));
		
		h_params.add(new BasicNameValuePair("useragent",  dInfo.ua));
		
		h_params.add(new BasicNameValuePair("language",  dInfo.language));
		
		h_params.add(new BasicNameValuePair("connectionType",  dInfo.connection_type));
		
		h_params.add(new BasicNameValuePair("dataSpeed",  dInfo.data_speed));
		
		h_params.add(new BasicNameValuePair("deviceType", dInfo.device_type));
		
		h_params.add(new BasicNameValuePair("time",dInfo.time));
		
		h_params.add(new BasicNameValuePair("timezone",  dInfo.timezone));		
		
		h_params.add(new BasicNameValuePair("viewerName",  dInfo.user_name));	
		
		h_params.add(new BasicNameValuePair("viewerEmail",  dInfo.user_email));	
		
		h_params.add(new BasicNameValuePair("viewerPhone",  dInfo.user_phone));	
		
		
		HEADER_PARAMS = h_params;
		
		return this;
	}
	
	
}
