package com.adserversdk.dj.sdk.adserver;

public class Config {
	
	//public static String ADSERVER_URL 	= "http://182.72.85.2/djaxtesting/enterprise_test/api/request1.php"; // Live
	public static String ADSERVER_URL	= "http://182.72.85.2/djaxtesting/howardnew_test/api/request1.php";
	
	public static String PUBLISHER_KEY = "";
	public static Boolean AUTO_REFERESH = false; // true | false
	public static Integer REFRESH_INTERVAl = 2; // Minutes: 2 to 10
	
	// AD REQUEST API RESPONSE - JSON FIELDS LIST
		
	final static public String TAG_AD_RESPONSE 		= "response";
	final static public String TAG_ADS 				= "ads";
	final static public String TAG_CLICK_URL 		= "click_url";
	final static public String TAG_ADTAG			= "ad_tag";
	final static public String TAG_IMAGE_PATH		= "image_path";
	final static public String TAG_BEACON_URL		= "imp_url";
	final static public String TAG_AD_TYPE			= "ad_type";	
	final static public String TAG_ERROR			= "error";
	final static public String TAG_ERR_CODE			= "code";
	final static public String TAG_ERR_DESC			= "description";
	
	
}
