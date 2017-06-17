package com.djax.adserver;

import com.dragonmedia.msdk_v1.R;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.widget.FrameLayout;
import android.widget.TextView;

public class TestView extends FrameLayout{

	public TestView(Context context) {
		super(context);
		// TODO Auto-generated constructor stub
		LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);		 
	    inflater.inflate(R.layout.ad_container, this, true);
	    
	    FrameLayout ad_container = (FrameLayout) findViewById(R.id.ad_container);
	    
	    TextView t = new TextView(context);
	    t.setText("View From Component");
	    ad_container.addView(t);
	    
	    
	}

	public TestView(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
		
		// TODO Auto-generated constructor stub
	}

	public TestView(Context context, AttributeSet attrs) {
		super(context, attrs);
		// TODO Auto-generated constructor stub
		LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);		 
	    inflater.inflate(R.layout.ad_container, this, true);
	    
	    FrameLayout ad_container = (FrameLayout) findViewById(R.id.ad_container);
	    
	    TextView t = new TextView(context);
	    t.setText("View From Component");
	    ad_container.addView(t,ad_container.getChildCount());
	    Log.d("mSDK Debug","Test View Component");
	}
	
}
