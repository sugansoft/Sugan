package com.djax.adserver;

import java.lang.ref.WeakReference;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.djax.utils.Cdlog;
import com.djax.utils.Settings;
import com.dragonmedia.msdk_v1.R;

import android.annotation.SuppressLint;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

public class AdFetcher {

	AdView owner;
	boolean isParamReq = false;
	
	private boolean autoRefresh = false;
	private int period = -1;
	private long lastFetchTime = -1;
    private long timePausedAt = -1;
    
	//final Handler handler = new Handler(Looper.getMainLooper());
	private final RequestHandler handler;
    
    private AdRequest AdLoadAsyncTask;
	private AdResponse adResponseObj;
	
	private ScheduledExecutorService scheduler;
	
	 // Fires requests whenever it receives a message
    public AdFetcher(AdView owner) {
        this.owner = owner;
        handler = new RequestHandler(this);
    }
    
    boolean isAutoRefresh() {
        return autoRefresh;
    }

	public void setAutoRefresh(boolean autoRefresh) {
		this.autoRefresh = autoRefresh;
	}

	public int getPeriod() {
		return period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}
	
	public void stop(){
		if (AdLoadAsyncTask != null) {
			AdLoadAsyncTask.cancel(true);
			AdLoadAsyncTask = null;
        }

        if (scheduler == null)
            return;
        scheduler.shutdownNow();
        try {
        	scheduler.awaitTermination(period, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
        	scheduler = null;
            return;
        }
        scheduler = null;
        Cdlog.d(Cdlog.baseLogTag, Cdlog.getString(R.string.stop));
        timePausedAt = System.currentTimeMillis();
	}
	
	void start(){
		Cdlog.d(Cdlog.baseLogTag, Cdlog.getString(R.string.start));
		
		if(scheduler !=null){
			Cdlog.d(Cdlog.baseLogTag, Cdlog.getString(R.string.moot_restart));
			//requestFailed();
			return;
		}
		 makeTasker(); 
	}
	
	@SuppressLint("NewApi") 
	synchronized public void makeTasker(){
		
		Log.d("mSDK Debug","Make Tasker Called");
		
		//Start a scheduler to execute recurring tasks
		scheduler = Executors.newScheduledThreadPool(Settings.getSettings().FETCH_THREAD_COUNT);
		
		 // Get the period from the settings
        //final int msPeriod = owner.getAuto_refresh_time() <= 0 ? 30 * 1000 : owner.getAuto_refresh_time() * 1000;
        
		final int msPeriod = period <=0 ? 30 * 1000 : period;
		
		Cdlog.d("Auto Refresh Enable","Enable :" + owner.getAuto_refresh_time());
		
		if(!isAutoRefresh()){
			
			Cdlog.v(Cdlog.baseLogTag, Cdlog.getString(R.string.fetcher_start_single));
			
			//Requesting an ad only once
			scheduler.execute(new MessageRunnable());
			
			Cdlog.i(Cdlog.baseLogTag, "Single THREAD Called");
			
			
		}else{
			Cdlog.v(Cdlog.baseLogTag, Cdlog.getString(R.string.fetcher_start_auto));
			
			//Start requesting recurring number of ad request
			long temp_stall;
			if(timePausedAt != -1 && lastFetchTime != -1){
				temp_stall = msPeriod - (timePausedAt - lastFetchTime);
			}else{
				temp_stall = 0;
			}
			
			final long stall = temp_stall;
			
			 Cdlog.v(Cdlog.baseLogTag,
	                    Cdlog.getString(R.string.request_delayed_by_x_ms, stall));
			 scheduler.schedule(new Runnable() {
				
				 
				@Override
				public void run() {
					Cdlog.i(Cdlog.baseLogTag, "AUTO REFRESH THREAD Called");
					// TODO Auto-generated method stub
					 Cdlog.v(Cdlog.baseLogTag, Cdlog.getString(
	                            R.string.request_delayed_by_x_ms, stall));
					 scheduler.scheduleAtFixedRate(new MessageRunnable(), 0, msPeriod, TimeUnit.MILLISECONDS);
				}
			}, stall, TimeUnit.MILLISECONDS);
			
		}

		Log.d("mSDK Debug","Period::"+msPeriod);
	}
	
	
	/* Message Runnable is the runnable class */
	
	 private class MessageRunnable implements Runnable {

	        @Override
	        public void run() {
	            Cdlog.v(Cdlog.baseLogTag,
	                    Cdlog.getString(R.string.handler_message_pass));
	            handler.sendEmptyMessage(0);
	            Cdlog.i(Cdlog.baseLogTag, "MessageRunnable Called");
	           
	        }

	 }
	 
	 /**
	  * Create a handler which will receive the AsyncTasks and also spawn from the
	  * main Thread
	 **/	 
	 
	 static class RequestHandler extends Handler{
		 private final WeakReference<AdFetcher> mAdFetcher;
		 private AdFetcher fetcher;
		 
		 public RequestHandler(AdFetcher f) {
			// TODO Auto-generated constructor stub
			 mAdFetcher = new WeakReference<AdFetcher>(f);
		}
		 
		@SuppressLint("NewApi")
		@Override 
		synchronized public void handleMessage(Message msg){
			
			
			
			fetcher = mAdFetcher.get();
				//If the adFetcher is vanished foe some reason, do nothing with 
				// this message. 
			
			Cdlog.i(Cdlog.baseLogTag, " HANDLE MESSAGE PARAM :  Zone ID::"+fetcher.owner.getZoneid());
			
			if(fetcher.owner.getZoneid() != null){
					
					try{
						
						
						 // Update last fetch time once
			            Cdlog.d(Cdlog.baseLogTag,
			                    Cdlog.getString(
			                            R.string.new_ad_since,
			                            (int) (System.currentTimeMillis() - fetcher.lastFetchTime)));
			            fetcher.lastFetchTime = System.currentTimeMillis();
						
			            //Spawn an AdRequest
			            fetcher.AdLoadAsyncTask = new AdRequest();
			            
			         // Generate Ad Request Parameters 
			            fetcher.owner.adRequestObj = fetcher.owner.adRequestObj.GenerateRequestURL(fetcher.owner.settings, fetcher.owner);
			            
			            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB){
							fetcher.adResponseObj = fetcher.AdLoadAsyncTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR,fetcher.owner.adRequestObj).get();
					    }else{
					    	fetcher.adResponseObj = fetcher.AdLoadAsyncTask.execute(fetcher.owner.adRequestObj).get();
					    }
			            
			            //Handle the Response for the fetcher
			            handlingResponse(fetcher.adResponseObj);
			            
					}catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					 } catch (ExecutionException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
					 }
				}else{
					 // ZONE ID NOT EXISTS
		    		 Cdlog.d(Cdlog.baseLogTag,"Zone ID is required.");				 
					 fetcher.isParamReq = true;
					 fetcher.owner.dispatcher.param_required(fetcher.owner, fetcher.isParamReq);
				}
		}
	
		/**
		 * Handle the Response from the given request	
		 * @param adResponseObj
		 */
			
		private void handlingResponse(AdResponse adResponseObj){
			if(!adResponseObj.isParsingComplete()){
				Cdlog.i(Cdlog.baseLogTag,"Got Ad Response");
				if(!adResponseObj.isFailed()){
					
					fetcher.owner.setAd_type(adResponseObj.getAd_type().trim());
					if(fetcher.owner.getAd_type().equalsIgnoreCase("IMAGE")){
						Cdlog.i(Cdlog.baseLogTag,"Image Ad");
						fetcher.owner.displayImageAd(adResponseObj);
					}else if(fetcher.owner.getAd_type().equalsIgnoreCase("HTML") 
							|| fetcher.owner.getAd_type().equalsIgnoreCase("Floating HTML") 
							|| fetcher.owner.getAd_type().equalsIgnoreCase("TEXT")){
						fetcher.owner.displayHTMLAd(adResponseObj);
					}else if(fetcher.owner.getAd_type().equalsIgnoreCase("Video"))
					{
						fetcher.owner.displayVideoAd(adResponseObj);
					}else if(fetcher.owner.getAd_type().equalsIgnoreCase("IAB"))
					{
						fetcher.owner.displayIABAd(adResponseObj);
					}
					
				}else{
					Cdlog.i(Cdlog.debugLogTag,"Ad Response Failed");
					fetcher.owner.dispatcher.load_ad_failed(fetcher.owner, true, adResponseObj.getError_code(), adResponseObj.getError_desc());
					
				}
			}
		}
		
	 }
	
	 
	 public void clearDurations() {
	        lastFetchTime = -1;
	        timePausedAt = -1;

	    } 
	
}

