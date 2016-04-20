package com.djax.adserver;

import java.io.InputStream;

import com.djax.utils.Cdlog;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;

public class AdImpression extends AsyncTask<String, Void, Bitmap> {
	   

    public AdImpression() {
        //this.bmImage = bmImage;
    }

    protected Bitmap doInBackground(String... urls) {
        String urldisplay = urls[0];
        Cdlog.d(Cdlog.debugLogTag, "Impression URL::"+urldisplay);
        Bitmap mIcon11 = null;
        try {
            InputStream in = new java.net.URL(urldisplay).openStream();
            mIcon11 = BitmapFactory.decodeStream(in);
        } catch (Exception e) {
            Log.e("Error", ""+e.getMessage());
            e.printStackTrace();
        }
        return mIcon11;
    }

    protected void onPostExecute(Bitmap result) {
    	Cdlog.d(Cdlog.debugLogTag,"Image Ad - Impression Calculated.");
    }
}
