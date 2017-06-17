package com.adserversdk.dj.sdk.adserver;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;

import com.adserversdk.dj.sdk.R;
import com.adserversdk.dj.sdk.adserver.*;


public class AdScreenLayout extends Activity{

	public String zone_id;

	@Override
	public void onCreate(Bundle savedInstanceState) {

		    super.onCreate(savedInstanceState);
		
		    this.requestWindowFeature(Window.FEATURE_NO_TITLE);
	        //Remove notification bar
	        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
	        this.setContentView(R.layout.ad_interstitial);

	        Bundle extras = getIntent().getExtras();
	        if (extras != null) {
	        	zone_id = extras.getString("zone_id");
	        }
	        else{
	        	zone_id ="1";
	        }

	        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.WRAP_CONTENT);
    		LinearLayout adFrame = (LinearLayout)findViewById(R.id.preview_frag);
    		AdView ad = new AdView(this);
    		ad.setZoneid(zone_id); //Place Your Zone id
    		ad.setAuto_refresh_time(45000); //Interval in Milliseconds
    		ad.LoadAd();
    		ad.setLayoutParams(params);
    		adFrame.addView(ad);
   		    		
    		Button closeButton = (Button) findViewById(R.id.bClose);     	
    		closeButton.bringToFront();
    	    }

	public void cancelActivity(View v){
	  			android.os.Process.killProcess(android.os.Process.myPid());
	  			System.exit(1);
			 //finish();		
		}


}
