package com.adserversdk.dj.sdk.adserver;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ImageView;

public class DownloadImagesTask extends AsyncTask<String, Void, Bitmap>{
	
	 public ImageView _imgview;
	 
	
	public DownloadImagesTask(ImageView _imgview) {
		super();
		this._imgview = _imgview;
	}

	@Override
	protected Bitmap doInBackground(String... urls)
	{
		return download_Image(urls[0]);
	}
	
	@Override
	protected void onPostExecute(Bitmap result)
	{
		try{
		_imgview.setImageBitmap(result);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	private Bitmap download_Image(String url){
		Bitmap bm = null;
		Log.d("mSDK Debug","Image URL:"+url);
		try{
			URL aURL = new URL(url);
			URLConnection conn = aURL.openConnection();
			conn.connect();
			InputStream is = conn.getInputStream();
			BufferedInputStream bis = new BufferedInputStream(is);
			bm = BitmapFactory.decodeStream(bis);
			bis.close();
			is.close();
		}catch(IOException e){
			e.printStackTrace();
		}
		return bm;
	}
	
}