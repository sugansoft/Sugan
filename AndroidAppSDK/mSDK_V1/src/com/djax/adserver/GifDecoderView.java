package com.djax.adserver;

import java.io.InputStream;

import com.djax.utils.GifDecoder;

import android.content.Context;
import android.graphics.Bitmap;
import android.os.Handler;
import android.util.Log;
import android.widget.ImageView;


public class GifDecoderView extends ImageView{

	private boolean mIsPlayingGif = false;
	
	private GifDecoder mGifDecoder;
	
	private Bitmap mTmpBitmap;
	
	final Handler mHandler = new Handler();
	
	final Runnable mUpdateResults = new Runnable(){
		
		public void run(){
			if(mTmpBitmap != null && !mTmpBitmap.isRecycled()){
				GifDecoderView.this.setImageBitmap(mTmpBitmap);
			}
		}
	};
	
	
	public GifDecoderView(Context context, InputStream stream) {
		// TODO Auto-generated constructor stub
		super(context);
		Log.d("Debug info","Here Gif decoder");
		playGif(stream);
	}

	private void playGif(InputStream stream) {
		// TODO Auto-generated method stub
		mGifDecoder = new GifDecoder();
		mGifDecoder.read(stream);
		mIsPlayingGif = true;
		
		new Thread(new Runnable(){
			public void run() {
				final int n = mGifDecoder.getFrameCount();
				System.out.println("Frame count"+n);
				final int ntimes = mGifDecoder.getLoopCount();
				int repetitionCounter = 0;
				do{
					for(int i =0; i<n; i++){
						mTmpBitmap = mGifDecoder.getFrame(i);
						final int t =mGifDecoder.getDelay(i);
						mHandler.post(mUpdateResults);
						try{
							Thread.sleep(t);
						} catch (InterruptedException e){
							e.printStackTrace();
						}
					}
					if(ntimes !=0) {
						repetitionCounter ++;
					}
				} while (mIsPlayingGif && (repetitionCounter <= ntimes));
			}
		}).start();
	}

}
