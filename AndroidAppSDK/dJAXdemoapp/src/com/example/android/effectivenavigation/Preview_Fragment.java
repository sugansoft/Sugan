package com.example.android.effectivenavigation;
import com.djax.adserver.AdListener;
import com.djax.adserver.AdView;
import com.djax.utils.Cdlog;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.SpannableStringBuilder;
import android.text.style.ForegroundColorSpan;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

public class Preview_Fragment extends Fragment {
	
	private String ad_placement_id;
	private String temp_size;
	private String ad_width;
	private String ad_height;
	private String ad_refresh;
	private String ad_layerstyle;
	private String ad_align;
	private String ad_padding;
	private int refresh_time= 0;
	private LinearLayout adFrame;
	private AdView display_ad;
	int mCurrentPosition = -1;
	
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        
		Log.d("Loaded = ","Preview fragment - OnCreateView");
		
		final View v = inflater.inflate(R.layout.preview_view, container, false);
       
        String myTag = getTag();
        ((MainActivity)getActivity()).setPreview_Fragment(myTag);
        adFrame = (LinearLayout) v.findViewById(R.id.preview_frag);
        //adFrame.bringToFront();
        Snippet_component_call(v);
        Snippet_program_call(v);
        return v;
    }
	
	final private AdListener adListener = new AdListener() {

		@Override
		public void param_required(AdView ad, boolean flag) {
			
			Log.d("mSDK Debug","param_required called");
			
			// TODO Auto-generated method stub
			if(flag == true){
				Toast.makeText((MainActivity) getActivity(), "INPUT PARAMS REQUIRED", Toast.LENGTH_LONG).show();
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
				Toast.makeText((MainActivity) getActivity(), "INTERNET CONNECTION REQUIRED", Toast.LENGTH_LONG).show();
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
				Toast.makeText((MainActivity) getActivity(), "LOAD AD FAILED", Toast.LENGTH_LONG).show();
			}
			
		}
    	
    };
	
	/****
	 * Gets the settings paramaters like zoneid etc and
	 * display the ad
	 */
	
	@SuppressLint("NewApi") public void Settings_params(){	
		
		// Remove the layout view before loading Ad
		//adFrame.removeView(display_ad);
		adFrame.removeAllViews();
		
		Context context = getActivity();
		RetrieveValues retrieveval = RetrieveValues.RetrieveValuesFromSavedvalues(context);
		
		// Retrieve value from shared reference		
		ad_placement_id	= retrieveval.getPlacementId();
		temp_size		= retrieveval.getSize();
		String[] dimens = temp_size.split("x");
		ad_width 		= (String) dimens[0];
		ad_height 		= (String) dimens[1];
		ad_layerstyle	= retrieveval.getLayer_style();
		ad_align		= retrieveval.getAlign();
		ad_padding		= retrieveval.getPadding();
		ad_refresh		= retrieveval.getRefresh();
		
		// converting refresh time value for String to Integer type
		 if (ad_refresh.equals("Off"))
			refresh_time= 0;
        else {
        	refresh_time= (1000 * Integer.parseInt(ad_refresh.replace(" seconds", "")));
        }
		
		Log.d("Requested Value","Requested Zone ID: "+ad_placement_id);
		
		Log.d("Requested Value","Requested Width x Height: "+temp_size);
		
		Log.d("Requested Value","Requested refresh time: "+ad_refresh);
		
		// Adding the layout with the user defined / default Ad parameters
		LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,LinearLayout.LayoutParams.WRAP_CONTENT);
		
		Cdlog.d("DEMO APP","Placement ID"+ad_placement_id);
		float str=50;
		// Loading Ad
        AdView ad = new AdView(this.getActivity());
      
        ad.setZoneid(ad_placement_id); 
        ad.setAd_width(ad_width);
        ad.setAd_height(ad_height);
        params.setMargins(10,25,10,50);
        ad.setAdListener(adListener);
        ad.setLayoutParams(params);
        ad.setPadding(10, 10, 10, 10);
        ad.setAuto_refresh_time(refresh_time);
        ad.setLayer_style(ad_layerstyle);
        ad.setPadding(ad_padding+"px");
        ad.setAlign(ad_align);
        
      
        
        ad.LoadAd();
        adFrame.addView(ad,adFrame.getChildCount());
        
       // adFrame.setMaxZoom(4f);
      ///  adFrame.setPivotX(str);
       // adFrame.setPivotY(str);
        
       // adFrame.setScaleX(str);
      //  adFrame.setScaleY(str);
        //adFrame.s
       // adFrame.setScaleY(str);
       // adFrame.setScaleY(str);
	}
	
	/**
	 * 
	 * @param v
	 *
	 *Display the sample Xml Component
	 */
	
	private void Snippet_component_call(View v) {
		
		TextView codecontent = (TextView)v.findViewById(R.id.snippet_component_content);
			
		SpannableString codecontent_header = new SpannableString("XML Format");
		codecontent_header.setSpan(new ForegroundColorSpan(Color.parseColor("#0D1D27")), 0,
				10, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		
		
		SpannableString tag = new SpannableString("<com.djax.adserver.AdView");
		tag.setSpan(new ForegroundColorSpan(Color.parseColor("#009999")), 0,
				"<com.djax.adserver.AdView".length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString id = new SpannableString("android:id=");
		id.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0, 11,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);   
		
		SpannableString id_value = new SpannableString("\"@+id/adView1\"");
		id_value.setSpan(new ForegroundColorSpan(Color.parseColor("#6699ff")),
				0, 14, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString width = new SpannableString(
				"android:layout_width=");
		width.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0,
				21, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString width_value = new SpannableString("\"wrap_content\"");
		width_value.setSpan(
				new ForegroundColorSpan(Color.parseColor("#6699ff")), 0, 14,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString height = new SpannableString(
				"android:layout_height=");
		height.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0,
				22, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString height_value = new SpannableString("\"wrap_content\"");
		height_value.setSpan(
				new ForegroundColorSpan(Color.parseColor("#6699ff")), 0, 14,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString marginTop = new SpannableString(
				"android:layout_marginTop=");
		marginTop.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0,
				25, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString marginTop_value = new SpannableString("\"10dp\"");
		marginTop_value.setSpan(
				new ForegroundColorSpan(Color.parseColor("#6699ff")), 0, 6,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		SpannableString zone_id = new SpannableString(
				"msdk:zone_id=");
		zone_id.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0,
				13, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString zone_id_value = new SpannableString("\"115\"");
		zone_id_value.setSpan(
				new ForegroundColorSpan(Color.parseColor("#6699ff")), 0, 5,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		SpannableString zone_id_comment = new SpannableString(" //Your Zone id");
		zone_id_comment.setSpan(
				new ForegroundColorSpan(Color.parseColor("#099981")), 0, 15,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString ad_width = new SpannableString(
				"msdk:ad_width=");
		ad_width.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")),
				0, 14, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString ad_width_value = new SpannableString("\"468\"");
		ad_width_value.setSpan(
				new ForegroundColorSpan(Color.parseColor("#6699ff")), 0, 5,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		SpannableString ad_width_comment = new SpannableString(" //Your Ad width");
		ad_width_comment.setSpan(
				new ForegroundColorSpan(Color.parseColor("#099981")), 0, 16,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		SpannableString ad_height = new SpannableString(
				"msdk:ad_height=");
		ad_height.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")),
				0, 15, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString ad_height_value = new SpannableString("\"60\"");
		ad_height_value.setSpan(
				new ForegroundColorSpan(Color.parseColor("#6699ff")), 0, 4,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		SpannableString ad_height_comment = new SpannableString(" //Your Ad Height");
		ad_height_comment.setSpan(
				new ForegroundColorSpan(Color.parseColor("#099981")), 0, 17,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		SpannableString ad_refresh = new SpannableString(
				"msdk:auto_refresh_time=");
		ad_refresh.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")),
				0, 23, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

		SpannableString ad_refresh_value = new SpannableString("\"30\">");
		ad_refresh_value.setSpan(
				new ForegroundColorSpan(Color.parseColor("#6699ff")), 0, 5,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		SpannableString ad_refresh_comment = new SpannableString(" //Interval in Milliseconds");
		ad_refresh_comment.setSpan(
				new ForegroundColorSpan(Color.parseColor("#099981")), 0, 27,
				Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		SpannableString final_close_tag = new SpannableString("</com.djax.adserver.AdView>");
		final_close_tag.setSpan(new ForegroundColorSpan(Color.parseColor("#009999")),
				0, "</com.djax.adserver.AdView>".length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
		
		SpannableStringBuilder codecomp = new SpannableStringBuilder();
		
		codecomp.append("\r\n").append("\r\n")
		.append(codecontent_header).append("\r\n").append("\r\n")
		.append(tag).append("\r\n").append(id).append(id_value)
		.append("\r\n").append(width).append(width_value)
		.append("\r\n").append(height).append(height_value)
		.append("\r\n").append(marginTop).append(marginTop_value)
		.append("\r\n").append(zone_id).append(zone_id_value).append(zone_id_comment)
		.append("\r\n").append(ad_width).append(ad_width_value).append(ad_width_comment)
		.append("\r\n").append(ad_height).append(ad_height_value).append(ad_height_comment)
		.append("\r\n").append(ad_refresh).append(ad_refresh_value).append(ad_refresh_comment)
		.append("\r\n").append(final_close_tag);

		codecontent.setText(codecomp); 
	}
	
	/**
	 * 
	 * @param v
	 * 
	 * Displays the code snippet at the UI 
	 * 
	 */
	
	private void Snippet_program_call(View v) {
			
			TextView progcontent = (TextView)v.findViewById(R.id.snippet_program_content);
			
			SpannableString progcontent_header = new SpannableString("Code Format");
			progcontent_header.setSpan(new ForegroundColorSpan(Color.parseColor("#0D1D27")), 0,
					11, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
			
			SpannableString show_initiate = new SpannableString("AdView ad = new AdView(this);");
			show_initiate.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0,
					29, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

			SpannableString setZoneid = new SpannableString("ad.setZoneid(\"104\");");
			setZoneid.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0, 20,
					Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);   
			
			SpannableString setzone_id_comment = new SpannableString(" //Your Zone id");
			setzone_id_comment.setSpan(
					new ForegroundColorSpan(Color.parseColor("#099981")), 0, 15,
					Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
			
			SpannableString setAd_width = new SpannableString("ad.setAd_width(\"300\");");
			setAd_width.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")),
					0, 22, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
			
			SpannableString setad_width_comment = new SpannableString(" //Your Ad width");
			setad_width_comment.setSpan(
					new ForegroundColorSpan(Color.parseColor("#099981")), 0, 16,
					Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

			SpannableString setAd_height = new SpannableString("ad.setAd_height(\"250\");");
			setAd_height.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0,
					23, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
			
			SpannableString setad_height_comment = new SpannableString(" //Your Ad Height");
			setad_height_comment.setSpan(
					new ForegroundColorSpan(Color.parseColor("#099981")), 0, 17,
					Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
			
			SpannableString setAd_refresh = new SpannableString("ad.setAuto_refresh_time(\"45000\");");
			setAd_refresh.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0,
					33, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
			
			SpannableString setad_refresh_comment = new SpannableString(" //Interval in Milliseconds");
			setad_refresh_comment.setSpan(
					new ForegroundColorSpan(Color.parseColor("#099981")), 0, 27,
					Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

			SpannableString addView = new SpannableString("adFrame.addView(ad);");
			addView.setSpan(new ForegroundColorSpan(Color.parseColor("#993399")), 0, 20,
					Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

			SpannableStringBuilder codeprog = new SpannableStringBuilder();
			
			codeprog.append(progcontent_header).append("\r\n").append("\r\n")
			.append(show_initiate).append("\r\n").append(setZoneid).append(setzone_id_comment)
			.append("\r\n").append(setAd_width).append(setad_width_comment)
			.append("\r\n").append(setAd_height).append(setad_height_comment)
			.append("\r\n").append(setAd_refresh).append(setad_refresh_comment)
			.append("\r\n").append(addView);

			progcontent.setText(codeprog); 
	}
}