package com.djax.adserver;

import com.djax.utils.Cdlog;

import android.os.AsyncTask;

public class AdRequest extends AsyncTask<AdRequestParam, Void, AdResponse>{

	AdRequestParam adReqObj[];
	AdResponse adResObj = new AdResponse();
	
	@Override
	protected AdResponse doInBackground(AdRequestParam... reqObj) {
		// TODO Auto-generated method stub
		Cdlog.d(Cdlog.baseLogTag,"AsyncTask In-Progress.");
		adReqObj = reqObj;
		Cdlog.d(Cdlog.baseLogTag,"Request Count::"+reqObj.length);
		if(reqObj.length > 0){
			String jsonStr = new ServiceHandler().makeServiceCall(reqObj[0], ServiceHandler.GET);
			adResObj.readAndParseJSON(jsonStr);
			return adResObj;			
		}else{
			Cdlog.d(Cdlog.debugLogTag,"AdRequest Object Required.");
		}
		
		return null;
	}
	
	@Override
	protected void onPreExecute(){
		super.onPreExecute();
		Cdlog.d(Cdlog.baseLogTag,"AsyncTask Process Started.");
	}
	
	@Override
	protected void onCancelled(){
		
	}
	
	@Override
	protected void onPostExecute(AdResponse result){
		super.onPostExecute(result);
		//dismiss the progress dialog
		this.cancel(true);		
		Cdlog.d(Cdlog.baseLogTag,"AsyncTask Process Completed.");
		
	}

}
