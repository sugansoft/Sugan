package com.example.android.effectivenavigation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.json.JSONException;
import org.json.JSONObject;

import com.djax.utils.Cdlog;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;



public class RequestFragment  extends Fragment {
	
	public TextView txtrequest;
	public TextView txtresponse = null;
	
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.request_view, container, false);

        String myTag = getTag();
        ((MainActivity)getActivity()).setRequestFragment(myTag);
        
        txtrequest = (TextView) v.findViewById(R.id.request_text);
        txtresponse = (TextView) v.findViewById(R.id.response_text);
        
        //Log.d("Received request url", Cdlog.getLastRequest());
        
        //txtrequest.setText("This is the test request");
        
        return v;
    }
	
	@SuppressLint("NewApi")
	public void displayRequestUrl()
	{
		Log.d("Received request url", Cdlog.getLastRequest());
		//request_url.setText(Cdlog.getLastRequest());
		
		if (txtrequest != null){
			if (!Cdlog.getLastRequest().isEmpty()) {
				txtrequest.setText(Cdlog.getLastRequest());
			}else{
				txtrequest.setText(R.string.request_text);
			}
		}
		else {
			txtrequest.setText(R.string.request_text);
		}
		
		Log.d("Received response",Cdlog.getLastResponse());
		
		if (txtresponse != null) {
            if (!Cdlog.getLastResponse().isEmpty()) {
                String jsonString = null;
                try {
                    JSONObject responseObject = new JSONObject(Cdlog.getLastResponse());
                    jsonString = responseObject.toString(Constants.JSON_INDENT_SPACES);
                } catch (JSONException e) {
                    Cdlog.e(Constants.BASE_LOG_TAG, "JSONException in response", e);
                }
                txtresponse.setText(jsonString != null ? jsonString : Cdlog.getLastResponse());
            } else
                txtresponse.setText(R.string.debug_msg_response_empty);
        }
		
	}
}
