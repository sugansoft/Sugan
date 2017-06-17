package com.adserversdk.dj.sdk.msdk_v1;

import com.adserversdk.dj.sdk.adserver.AdListener;
import com.adserversdk.dj.sdk.adserver.AdView;
import com.adserversdk.dj.sdk.*;


import android.os.Bundle;
import android.app.Activity;
import android.util.Log;
import android.view.Menu;
import android.widget.LinearLayout;
import android.widget.Toast;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        
     // Adding the layout with the user defined / default Ad parameters
       
     /*   LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.WRAP_CONTENT);
        
        LinearLayout adFrame = (LinearLayout) findViewById(R.id.preview);
        
        // Image Ad
        final AdView ad = new AdView(this);        
        ad.setZoneid("104"); 
        ad.setAd_width("300");
        ad.setAd_height("250");        
        
        ad.setAdListener(adListener);
        ad.setLayoutParams(params);
        ad.setPadding(10, 10, 10, 10);
        ad.setAuto_refresh_time(60000);
        ad.LoadAd();
        adFrame.addView(ad,adFrame.getChildCount());
        
         // HTML Ad
        final AdView HtmlAd = new AdView(this);
        
        HtmlAd.setZoneid("115");        
        HtmlAd.setAd_width("468");
        HtmlAd.setAd_height("60");        
        HtmlAd.LoadAd();
        HtmlAd.setAdListener(adListener);
        HtmlAd.setLayoutParams(params);
        HtmlAd.setPadding(10, 10, 10, 10);
        adFrame.addView(HtmlAd,adFrame.getChildCount());
        
       /* // Text Ad
        final AdView txtAd = new AdView(this);
        txtAd.setZoneid("98");        
        txtAd.setAd_width("468");
        txtAd.setAd_height("60");        
        txtAd.LoadAd();
        txtAd.setAdListener(adListener);
        txtAd.setLayoutParams(params);
        txtAd.setPadding(10, 10, 10, 10);
        adFrame.addView(txtAd,adFrame.getChildCount());
        
        // Floading HTML Ad
        AdView floatAd = new AdView(this);
        floatAd.setZoneid("101");        
        floatAd.setAd_width("468");
        floatAd.setAd_height("60");
        floatAd.setLayer_style("geocities");
        floatAd.setAlign("right");
        floatAd.setPadding("2");        
        floatAd.LoadAd();
        floatAd.setAdListener(adListener);
        floatAd.setLayoutParams(params);
        floatAd.setPadding(10, 10, 10, 10);
        adFrame.addView(floatAd,adFrame.getChildCount());     */
    }
    
    

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
    final private AdListener adListener = new AdListener() {

		@Override
		public void param_required(AdView ad, boolean flag) {
			
			Log.d("mSDK Debug","param_required called");
			
			// TODO Auto-generated method stub
			if(flag == true){
				Toast.makeText(getApplicationContext(), "INPUT PARAMS REQUIRED", Toast.LENGTH_LONG).show();
				Log.d("mSDK Debug","INPUT REQUIRED");
			}
			else
			{
				Log.d("mSDK Debug","INPUT SUCCESS");
			}
		}

		@Override
		public void internet_connection_failed(AdView ad, boolean flag) {
			// TODO Auto-generated method stub
			
			if(flag == true){
				Toast.makeText(getApplicationContext(), "INTERNET CONNECTION REQUIRED", Toast.LENGTH_LONG).show();
				Log.d("mSDK Debug","INTERNET CONNECTION REQUIRED");
			}
			else
			{
				Log.d("mSDK Debug","INTERNET CONNECTION AVAILABLE");
			}
		}

		@Override
		public void load_ad_failed(AdView ad, boolean flag, String ecode,
				String edesc) {
			// TODO Auto-generated method stub
			if(flag == true){
				Log.d("mSDK Debug","LOAD AD FAILED");
				Log.d("mSDK Debug","Error Code:"+ecode);
				Log.d("mSDK Debug","Error Desc:"+edesc);
				Toast.makeText(getApplicationContext(), "LOAD AD FAILED", Toast.LENGTH_LONG).show();
			}
			
		}
    	
    };
    
}
