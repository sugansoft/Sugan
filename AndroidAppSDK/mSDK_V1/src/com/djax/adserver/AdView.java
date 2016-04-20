package com.djax.adserver;


import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;


import com.djax.mtrack.Device_settings;
import com.djax.mtrack.Utils;
import com.djax.utils.Cdlog;
import com.djax.utils.ConnectionDetecter;
import com.djax.utils.Settings;
import com.dragonmedia.msdk_v1.R;


import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.res.TypedArray;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.os.StrictMode;
import android.preference.PreferenceManager;

import android.text.Html;
import android.util.AttributeSet;
import android.util.Log;
import android.util.Pair;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;

import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.ImageView;

public class AdView extends FrameLayout{
	
	private String zoneid 		= null;
	private String ad_width 	= null;
	private String ad_height 	= null;
	
	private String layer_style 	= null;
	private String align		= null;
	private String padding	 	= null;
	
	private String ad_tag 		= null;
	private String ad_type 		= null;
	private String click_url 	= null;
	private String imp_url	 	= null;
	
	private boolean auto_refresh 	  = false;	
	private int auto_refresh_time; // Seconds
	private boolean isInternetPresent = false;
	FrameLayout ad_container = null;
	FrameLayout.LayoutParams ad_container_params=null;
	
	public AdListener adListen = null;
	public Context adViewContext = null;
	
	
	
	AdFetcher mAdFetcher;
	
	AdRequestParam adRequestObj = new AdRequestParam();
	
	Device_settings settings = null;
	
	String placementID;
	boolean opensNativeBrowser = false;
	int measuredWidth;
	int measuredHeight;
	private boolean measured = false;
	//private int width = -1;
	//private int height = -1;
	boolean shouldServePSAs = true;
	//private float reserve = 0.00f;
	String age;
	//GENDER gender = GENDER.UNKNOWN;
	ArrayList<Pair<String, String>> customKeywords = new ArrayList<Pair<String, String>>();
	boolean mraid_expand = false;
	//AdListener adListener;
	//private BrowserStyle browserStyle;
	//private LinkedList<MediatedAd> mediatedAds;
	final Handler handler = new Handler(Looper.getMainLooper());
	//private Displayable lastDisplayable;
	public AdListenerDispatch dispatcher;
    boolean loadedOffscreen = false;
    private boolean running;
    private boolean receiversRegistered = false;
    private BroadcastReceiver receiver;
    
    public void setAdListener(AdListener listener) {
		
		synchronized (listener) {
			
			Cdlog.d(Cdlog.debugLogTag,"Ad Listener Called..");			
			adListen = listener;
		}
		
	}

	public AdView(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
		setup(context, attrs);
		// TODO Auto-generated constructor stub
	}

	public AdView(Context context, AttributeSet attrs) {
		super(context, attrs);
	    setup(context,attrs);
	}

	public AdView(Context context) {
		super(context);
		setup(context,null);
	}
	
	@SuppressLint("Recycle")
	void setup(Context context, AttributeSet attrs) {
		
		dispatcher = new AdView.AdListenerDispatch(handler);
		
		mAdFetcher = new AdFetcher(AdView.this);
		
		this.adViewContext = context;

		// Store self.context in the settings for errors
		Cdlog.error_context = this.getContext();

		Cdlog.d(Cdlog.publicFunctionsLogTag, Cdlog.getString(R.string.new_adview));

		SharedPreferences prefs = PreferenceManager
				.getDefaultSharedPreferences(context);
		
		settings = Device_settings.getSettings(context);
		
		if (prefs.getBoolean("msdk_first_launch", true)) {
			// This is the first launch, store a value to remember
			Cdlog.v(Cdlog.baseLogTag,
					Cdlog.getString(R.string.first_opensdk_launch));
			settings.first_launch = true;
			prefs.edit().putBoolean("msdk_first_launch", false).commit();
		} else {
			// Found the stored value, this is NOT the first launch
			Cdlog.v(Cdlog.baseLogTag,
					Cdlog.getString(R.string.not_first_opensdk_launch));
			settings.first_launch = false;
		}

		Cdlog.v("mSDK","Device Info::"+settings.app_id);
		
		// Load user variables only if attrs isn't null
		if (attrs != null){
			 TypedArray imgAttr = context.obtainStyledAttributes(attrs, R.styleable.ad_param);				
			 zoneid 		= imgAttr.getString(R.styleable.ad_param_zone_id);
			 ad_width 		= (imgAttr.getString(R.styleable.ad_param_ad_width) != null)?imgAttr.getString(R.styleable.ad_param_ad_width):null;
			 ad_height 		= (imgAttr.getString(R.styleable.ad_param_ad_height)!= null)?imgAttr.getString(R.styleable.ad_param_ad_height):null;
			 layer_style 	= (imgAttr.getString(R.styleable.ad_param_layer_style)!= null)?imgAttr.getString(R.styleable.ad_param_layer_style):null;
			 setAlign((imgAttr.getString(R.styleable.ad_param_align)!= null)?imgAttr.getString(R.styleable.ad_param_align):null);
			 padding	 	= (imgAttr.getString(R.styleable.ad_param_padding)!= null)?imgAttr.getString(R.styleable.ad_param_padding):null;
			 
			 if(imgAttr.getInteger(R.styleable.ad_param_auto_refresh_time,0)>0){
					auto_refresh_time=imgAttr.getInteger(R.styleable.ad_param_auto_refresh_time,30000);
					setAuto_refresh_time(auto_refresh_time);
					Log.d("Inside True Case","Auto Refresh Time::"+auto_refresh_time);
				}else{
					Log.d("Inside False Case","Auto Refresh Time::"+auto_refresh_time);
					setAuto_refresh_time(0);
					
				}
			 
			 LoadAd();	
		}
		
		 if(getAd_width() == null)
			 setAd_width(Utils.convertToString(settings.display_width));
		 
		 if(getAd_height() == null)
			 setAd_height(Utils.convertToString(settings.display_height));

		// We don't start the ad requesting here, since the view hasn't been
		// sized yet.
		 
		 //Set the autorefreshInterval and also autorefresh
		 mAdFetcher.setPeriod(auto_refresh_time);
		 mAdFetcher.setAutoRefresh(isAuto_refresh());
	}
	
	/**
	 * Starts the ad request and fetching the ad
	 */
	
	void start() {
        Cdlog.d(Cdlog.publicFunctionsLogTag, Cdlog.getString(R.string.start));
        mAdFetcher.start();
        running = true;
	}
	 
	/**
	 * Stops the ad request and all other related operations 
	 */

    void stop() {
        Cdlog.d(Cdlog.publicFunctionsLogTag, Cdlog.getString(R.string.stop));
        mAdFetcher.stop();
        running = false;
    }
	
	
	public void LoadAd(){
		
		Cdlog.i(Cdlog.baseLogTag, "Zone ID::"+zoneid);
		
		if(this.adViewContext != null){
			
			// INTEGRATE AD CONTAINER
			
			LayoutInflater inflater = (LayoutInflater) this.adViewContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	 
		    inflater.inflate(R.layout.ad_container, this, true);
		    
		    ConnectionDetecter cd = new ConnectionDetecter(adViewContext);
		    
		    ad_container = (FrameLayout) findViewById(R.id.ad_container);
					    
		    
		    Cdlog.e(Cdlog.debugLogTag, "Text View Added.");
		    
		    Log.d("Child Count+","cc "+ad_container.getChildCount());
			isInternetPresent = cd.isConnectingToInternet();
			
			if(isInternetPresent){
				
				// Generate Ad Request Parameters 
				//adRequestObj = adRequestObj.GenerateRequestURL(settings, AdView.this);

				// START AD REQUEST TASK
				mAdFetcher.start();
				running = true;
				
			}else{
				Cdlog.e(Cdlog.debugLogTag, "Internet Connection Failed.");
				dispatcher.internet_connection_failed(AdView.this, true);
			}
		    
		}else{
			Cdlog.e(Cdlog.debugLogTag, "Ad View Not Initialized");
		}
	}
	
	
	public String getZoneid() {
		return zoneid;
	}

	public void setZoneid(String zoneid) {
		this.zoneid = zoneid;
	}

	public String getAd_width() {
		return ad_width;
	}

	public void setAd_width(String ad_width) {
		this.ad_width = ad_width;
	}

	public String getAd_height() {
		return ad_height;
	}

	public void setAd_height(String ad_height) {
		this.ad_height = ad_height;
	}

	public String getLayer_style() {
		return layer_style;
	}

	public void setLayer_style(String layer_style) {
		this.layer_style = layer_style;
	}

	public String getPadding() {
		return padding;
	}

	public void setPadding(String padding) {
		this.padding = padding;
	}

	public String getAd_tag() {
		return ad_tag;
	}

	public void setAd_tag(String ad_tag) {
		this.ad_tag = ad_tag;
	}

	public String getAd_type() {
		return ad_type;
	}

	public void setAd_type(String ad_type) {
		this.ad_type = ad_type;
	}

	public String getClick_url() {
		return click_url;
	}

	public void setClick_url(String click_url) {
		this.click_url = click_url;
	}

	public String getImp_url() {
		return imp_url;
	}

	public void setImp_url(String imp_url) {
		this.imp_url = imp_url;
	}

	public boolean isAuto_refresh() {
		return auto_refresh;
	}

	public void setAuto_refresh(boolean auto_refresh) {
		Log.d("Inside Set Auto Refresh","Auto Refresh::" + auto_refresh);
		this.auto_refresh = auto_refresh;
		
		if (mAdFetcher != null) {
			mAdFetcher.setAutoRefresh(auto_refresh);
            mAdFetcher.clearDurations();
        }
        if (this.auto_refresh && !running && mAdFetcher != null) {
            start();
        }
	}

	public int getAuto_refresh_time() {
		return auto_refresh_time;
	}

	public void setAuto_refresh_time(int auto_refresh_time) {
		this.auto_refresh_time = Math.max(Settings.getSettings().MIN_REFRESH_MILLISECONDS, auto_refresh_time);
		
		if(auto_refresh_time>0){
			Cdlog.d(Cdlog.baseLogTag,Cdlog.getString(R.string.set_period,auto_refresh_time));
			setAuto_refresh(true);
		}else{
			setAuto_refresh(false);
		}
	
		Cdlog.d("Auto Refresh Time","Time :"+ this.auto_refresh_time);
		if(mAdFetcher !=null)
			mAdFetcher.setPeriod(this.auto_refresh_time);
	}

	/**
	 * The view layout
	 */
	
	@Override
	protected void onLayout(boolean changed, int left, int top, int right,
			int bottom) {
		super.onLayout(changed, left, top, right, bottom);
		
		if (!measured || changed) {
			
			// Convert to dips
			float density = getContext().getResources().getDisplayMetrics().density;
			measuredWidth = (int) ((right - left) / density + 0.5f);
			measuredHeight = (int) ((bottom - top) / density + 0.5f);
			
			//settings.display_height = measuredHeight;
			//settings.display_width  = measuredWidth;
			
			/*if ((measuredHeight < Integer.valueOf(ad_height) || measuredWidth < Integer.valueOf(ad_width))
					&& measuredHeight > 0 && measuredWidth > 0) {
				Cdlog.e(Cdlog.baseLogTag, Cdlog.getString(R.string.adsize_too_big,
						measuredWidth, measuredHeight, width, height));
				// Hide the space, since no ad will be loaded due to error
				//hide();
				// Stop any request in progress
				if (mAdFetcher != null)
					mAdFetcher.stop();
				// Returning here allows the SDK to re-request when the layout
				// next changes, and maybe the error will be amended.
				return;
			}*/

			// Hide the adview
			//if (!measured && !loadedOffscreen) {
			//	hide();
			//}

			measured = true;

		}
		
		 // Are we coming back from a screen/user presence change?
        if (running) {
            if (!receiversRegistered) {
                setupBroadcast(getContext());
                receiversRegistered = true;
            }
            
        }
	}
	
	  private boolean requesting_visible = true;
	
	@Override
    protected void onWindowVisibilityChanged(int visibility) {
        super.onWindowVisibilityChanged(visibility);
        if (visibility == VISIBLE) {
            // Register a broadcast receiver to pause and refresh when the phone
            // is
            // locked
            if (!receiversRegistered) {
                setupBroadcast(getContext());
                receiversRegistered = true;
            }
            Cdlog.d(Cdlog.baseLogTag, Cdlog.getString(R.string.unhidden));
            if (mAdFetcher != null
                    && (!requesting_visible || running || auto_refresh))
                start();
            else {
                // Were' not displaying the adview, the system is
                requesting_visible = false;
            }

        } else {
            // Unregister the receiver to prevent a leak.
            if (receiversRegistered) {
                dismantleBroadcast();
                receiversRegistered = false;
            }
            Cdlog.d(Cdlog.baseLogTag, Cdlog.getString(R.string.hidden));
            if (mAdFetcher != null && running) {
                stop();
            }
        }
    }

	/**
	 * To check the Screen off and on visibility
	 * @param context
	 */
	
	void setupBroadcast(Context context) {
        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_OFF);
        filter.addAction(Intent.ACTION_SCREEN_ON);
        receiver = new BroadcastReceiver() {

            @Override
            public void onReceive(Context context, Intent intent) {
                if (intent.getAction().equals(Intent.ACTION_SCREEN_OFF)) {
                    stop();
                    Cdlog.d(Cdlog.baseLogTag,
                            Cdlog.getString(R.string.screen_off_stop));
                } else if (intent.getAction().equals(Intent.ACTION_SCREEN_ON)) {
                    if (auto_refresh)
                        start();
                   
                    start();
                    Cdlog.d(Cdlog.baseLogTag,
                            Cdlog.getString(R.string.screen_on_start));
                }

            }

        };
        context.registerReceiver(receiver, filter);
    }
	
	private void dismantleBroadcast() {
	        getContext().unregisterReceiver(receiver);
	}
	
	/**
	 * Private class to bridge events from mediation to the user
	 * AdListener class.
	 *
	 */
	class AdListenerDispatch implements AdListener {

		Handler handler;

		public AdListenerDispatch(Handler h) {
			handler = h;
		}

		@Override
		public void param_required(final AdView ad, final boolean flag) {
			// TODO Auto-generated method stub
			handler.post(new Runnable() {
				@Override
					public void run() {
						if(adListen !=null){
						adListen.param_required(ad,flag);
					 }
				}
			});
		}

		@Override
		public void internet_connection_failed(final AdView ad, final boolean flag) {
			// TODO Auto-generated method stub
			handler.post(new Runnable() {
				@Override
					public void run() {
						if(adListen !=null){
						adListen.internet_connection_failed(ad,flag);
					 }
				}
			});
		}

		@Override
		public void load_ad_failed(final AdView ad, final boolean flag, final String ecode,
				final String edesc) {
			// TODO Auto-generated method stub
			handler.post(new Runnable() {
				@Override
					public void run() {
						if(adListen !=null){
							 Cdlog.d(Cdlog.baseLogTag,"adListen Initialized");	
						adListen.load_ad_failed(ad,flag,ecode,edesc);
					 }
				}
			});
			
		}
	}
	
	void unhide() {
		if (getVisibility() != VISIBLE) {
			setVisibility(VISIBLE);
		}
	}

	void hide() {
		if (getVisibility() != GONE)
			setVisibility(GONE);
	}

	public String getAlign() {
		return align;
	}

	public void setAlign(String align) {
		this.align = align;
	}
	
	@SuppressLint("SetJavaScriptEnabled") 
	public void displayHTMLAd(AdResponse adResult){	
		Log.d("mSDK Debug","ENCODE HTML CODE:"+adResult.getAdtag());
		String HtmlCode = Html.fromHtml(adResult.getAdtag()).toString();
		Log.d("mSDK Debug","HTML CODE:"+HtmlCode);
		WebView htmlAd = new WebView(adViewContext);
		htmlAd.setBackgroundColor(0);
		htmlAd.setPadding(0,0,0,0);
		htmlAd.getSettings().setJavaScriptEnabled(true);
		String html = "<!DOCTYPE html><html><body style= \"width=\"100%\";height=\"100%\";initial-scale=\"1.0\"; maximum-scale=\"1.0\"; user-scalable=\"no\";\">"+HtmlCode+"</body></html>";
		htmlAd.loadData(html, "text/html", "UTF-8");
		ad_container_params = new FrameLayout.LayoutParams(-2,-2);
		htmlAd.setLayoutParams(ad_container_params);
		htmlAd.setClickable(true);
		htmlAd.setVerticalScrollBarEnabled(false);
		htmlAd.setHorizontalScrollBarEnabled(false);					
		ad_container.removeAllViews();
		ad_container.addView(htmlAd);	
	}
	
	@SuppressLint("SetJavaScriptEnabled") 
	public void displayIABAd(AdResponse adResult){	
		Log.d("mSDK Debug","ENCODE HTML CODE:"+adResult.getAdtag());
		String HtmlCode = Html.fromHtml(adResult.getAdtag()).toString();
		Log.d("mSDK Debug","HTML CODE:"+HtmlCode);
		WebView htmlAd = new WebView(adViewContext);
		htmlAd.setBackgroundColor(0);
		htmlAd.setPadding(0,0,0,0);
		htmlAd.getSettings().setJavaScriptEnabled(true);
		String html = "<html><body style='width:98%;height:98%;'>"+HtmlCode + "</body></html>";
		htmlAd.loadData(html, "text/html", "UTF-8");
		ad_container_params = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,FrameLayout.LayoutParams.MATCH_PARENT);
		htmlAd.setLayoutParams(ad_container_params);
		htmlAd.setClickable(true);
		htmlAd.setVerticalScrollBarEnabled(false);
		htmlAd.setHorizontalScrollBarEnabled(false);					
		ad_container.removeAllViews();
		ad_container.addView(htmlAd);	
	}
	
	/*
	@SuppressLint("SetJavaScriptEnabled") 
	public void displayHTMLAd(AdResponse adResult){		
		Log.d("mSDK Debug","ENCODE HTML CODE:"+adResult.getAdtag());		
		String HtmlCode = Html.fromHtml(adResult.getAdtag()).toString();				
		Log.d("mSDK Debug","HTML CODE:"+HtmlCode);	
		WebView htmlAd = new WebView(adViewContext);		
		htmlAd.setBackgroundColor(0);
		htmlAd.getSettings().setBuiltInZoomControls(true);
		htmlAd.getSettings().setSupportZoom(true);
		htmlAd.setPadding(0, 0, 0, 0);
		//htmlAd.setInitialScale(10);  
		htmlAd.getSettings().setJavaScriptEnabled(true);		
		//String html = "<!DOCTYPE html><html><body style= \"width=\"100%\";height=\"100%\";initial-scale=\"1.0\"; maximum-scale=\"1.0\"; user-scalable=\"no\";\">"+HtmlCode+"</body></html>";
	     String html = "<html><body style='width:98%;height:98%;' >"+HtmlCode +     "</body></html>";
		htmlAd.loadData(html, "text/html", "UTF-8");		
		ad_container_params = new FrameLayout.LayoutParams(-2,-2);		
		htmlAd.setLayoutParams(ad_container_params);
		htmlAd.setClickable(true);		
		htmlAd.bringToFront();		
		htmlAd.setVerticalScrollBarEnabled(false);
		htmlAd.setHorizontalScrollBarEnabled(false);							
		ad_container.removeAllViews();		
		ad_container.addView(htmlAd);
		
	}
	*/
	
	@SuppressLint("SetJavaScriptEnabled") 
	public void displayVideoAd(AdResponse adResult){
		
		Log.d("mSDK Debug","ENCODE HTML CODE:"+adResult.getAdtag());
		
		String HtmlCode = Html.fromHtml(adResult.getAdtag()).toString();
		
		Log.d("mSDK Debug","HTML CODE:"+HtmlCode);
	
		WebView htmlAd = new WebView(adViewContext);
		htmlAd.setBackgroundColor(0);
		htmlAd.getSettings().setJavaScriptEnabled(true);
		
		htmlAd.loadUrl(HtmlCode);
		

		ad_container_params = new FrameLayout.LayoutParams(-2,-2);
		
		htmlAd.setLayoutParams(ad_container_params);
		htmlAd.setClickable(true);
		
		htmlAd.setVerticalScrollBarEnabled(false);
		htmlAd.setHorizontalScrollBarEnabled(false);					
		
		ad_container.removeAllViews();
		
		ad_container.addView(htmlAd);
		
	}
	
	@SuppressLint("NewApi") 
	public void displayImageAd(AdResponse adResult){
		
		ad_tag = adResult.getAdtag();
		
		String mime_type = Utils.getMimeType(ad_tag);
		
		
		if(mime_type.equalsIgnoreCase("image/gif")){
			
			/* 
			 * GIF DECODER
			 */
			
			try{
				
				StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

				StrictMode.setThreadPolicy(policy); 
				
				URL url = new URL(ad_tag);
				
				URLConnection conn = url.openConnection();
				
				InputStream is = conn.getInputStream();
				
				BufferedInputStream bis = new BufferedInputStream(is);
				
				GifDecoderView gview = new GifDecoderView(adViewContext, bis);
				
				ad_container_params = new FrameLayout.LayoutParams(Integer.parseInt(ad_width), Integer.parseInt(ad_height));
				//ad_container_params = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,FrameLayout.LayoutParams.MATCH_PARENT);
				gview.setLayoutParams(ad_container_params);
				
				ad_container.removeAllViews();
				
				ad_container.addView(gview);
				
				// Add Image Ad Click Listener
				
				Ad_click(adResult.getClick_url(), gview);
				
				
				Cdlog.d(Cdlog.debugLogTag,"GIF Ad Viewed");
				
				// Call Impression URL
				new AdImpression().execute(adResult.getImp_url());
				
				}catch(Exception e){
					e.printStackTrace();
				}
			
			/* END OF GIF DECODER 
			 * */		 
			
			
		}else
		{
			Cdlog.d(Cdlog.debugLogTag,"Image Ad::"+ad_tag);
			
			ImageView imgAd = (ImageView) findViewById(R.id.imageAd);//new ImageView(this.getContext());
			
			ad_container_params = new FrameLayout.LayoutParams(Integer.parseInt(ad_width), Integer.parseInt(ad_height));
			
			imgAd.setLayoutParams(ad_container_params);
			
			ad_container.removeAllViews();
			
			//Load Image Ad			
			new DownloadImagesTask(imgAd).execute(ad_tag);
			
			ad_container.addView(imgAd,ad_container_params);
			
			Cdlog.d(Cdlog.debugLogTag,"Image Ad Loaded");
			
			// Call Impression URL
			new AdImpression().execute(adResult.getImp_url());
			
			// Add Image Ad Click Listener
			
			Ad_click(adResult.getClick_url(), imgAd);
		}
	}
	
	private void Ad_click(final String click_url,ImageView imgAd){
		
		ImageView  imgObj = imgAd;
		
		imgObj.setOnClickListener(new OnClickListener() {
				
				@Override
				public void onClick(View arg0) {
					// TODO Auto-generated method stub
					Cdlog.d(Cdlog.debugLogTag,"Image Ad Clicked.");
					Intent internet = new Intent(); 
					internet.setAction(Intent.ACTION_VIEW); 
					internet.addCategory(Intent.CATEGORY_BROWSABLE); 
					internet.setData(Uri.parse(click_url)); 
					adViewContext.startActivity(internet); 
				}
			});
	}
 
	private void Ad_click(final String click_url,WebView htmlAd){
		
		
		htmlAd.setOnTouchListener(new OnTouchListener() {
			
			@Override
			public boolean onTouch(View v, MotionEvent event) {
				// TODO Auto-generated method stub
				if(event.getAction() == MotionEvent.ACTION_UP){
					Cdlog.d(Cdlog.debugLogTag,"HTML Ad Clicked.");
					Intent internet = new Intent(); 
					internet.setAction(Intent.ACTION_VIEW); 
					internet.addCategory(Intent.CATEGORY_BROWSABLE); 
					internet.setData(Uri.parse(click_url)); 
					adViewContext.startActivity(internet); 
				}
				
				return false;
			}
		});
	}
	
}