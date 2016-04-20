package com.example.android.effectivenavigation;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;

public class Settings_Fragment extends Fragment {
	
	OnButtonPressListener mListener;
	EditText Edit_zoneid;
	Spinner Size_Spinner,Refresh_Spinner,Layer_Style_Spinner,Align_Spinner,Padding_Spinner;
	Button A_enter;
    ViewPager mVP;
	private Spinner dropSize,dropRefresh,dropLayerstyle,dropAlign,dropPadding;
    @SuppressWarnings("unused")
	private TextView txt_zone_id,txtSize,txtRefresh;
    
    //keep saved settings in memory in order to optimize writes
    String savedPlacement, savedSize, savedRefresh,savedLayerstyle,savedAlign,savedPadding; 
    
    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        try {
            mListener = (OnButtonPressListener) activity;
        } catch (ClassCastException e) {
            throw new ClassCastException(activity.toString() + " must implement OnButtonClickedListener ");
        }
    }
    
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		
		Log.d("Load view","Settings Fragment OnCreateView Loaded");
		
		View v = inflater.inflate(R.layout.settings_view, container, false);
		
		Edit_zoneid 	= (EditText)v.findViewById(R.id.edit_zoneid);
		
		// create drop-down
        dropSize 		= initDropdown(v, container, R.id.dropdown_size, R.array.size);
        dropRefresh 	= initDropdown(v, container, R.id.dropdown_refresh, R.array.refresh);      
        dropLayerstyle 	= initDropdown(v, container, R.id.dropdown_layer_style, R.array.layer_style);
        dropAlign 		= initDropdown(v, container, R.id.dropdown_align, R.array.alignment);
        dropPadding 	= initDropdown(v, container, R.id.dropdown_padding, R.array.padding);
        
        Size_Spinner 	= (Spinner)v.findViewById(R.id.dropdown_size); 
        Refresh_Spinner = (Spinner)v.findViewById(R.id.dropdown_refresh);
        Layer_Style_Spinner = (Spinner)v.findViewById(R.id.dropdown_layer_style);
        Align_Spinner 	= (Spinner)v.findViewById(R.id.dropdown_align);
        Padding_Spinner = (Spinner)v.findViewById(R.id.dropdown_padding);
        
        
        A_enter = (Button)v.findViewById(R.id.btn_load_ad);
		A_enter.setOnClickListener(A_enterOnClickListener);
		
		// load saved or default settings
		Saved_values_settings();
        
		return v;
    }
	
	OnClickListener A_enterOnClickListener
	= new OnClickListener(){

		@Override
		public void onClick(View v) {
			mListener.onButtonClicked();
			// save user entered values in settings tab
	        Save_entered_values_settings(v);
			String TabOfPreview_Fragment 		= ((MainActivity)getActivity()).getPreview_Fragment();
			Preview_Fragment fragment_preview 	= (Preview_Fragment)getActivity().getSupportFragmentManager().findFragmentByTag(TabOfPreview_Fragment);
			fragment_preview.Settings_params();
		}};
		
		// generic function to create drop-down views
	    private static Spinner initDropdown(View out, ViewGroup container, int resId, int stringsId) {
	        Spinner dropdown = (Spinner) out.findViewById(resId);
	        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
	                container.getContext(), stringsId,
	                android.R.layout.simple_spinner_item);
	        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

	        dropdown.setAdapter(adapter);
	        return dropdown;
	    }
	    
	    //Load saved settings from Saved_values
	    private void Saved_values_settings() {
	        // Load default zone id
	        savedPlacement = Savedvalues.getPlacementId(getActivity());
		    Edit_zoneid.setText(savedPlacement);

	       // Load size
	        savedSize = Savedvalues.getSize(getActivity());
	        String[] sizeStrings = getResources().getStringArray(R.array.size);
	        for (int i = 0; i < sizeStrings.length; i++) {
	            if (sizeStrings[i].equals(savedSize)) {
	                dropSize.setSelection(i);
	            }
	        }

	        // Load refresh
	        savedRefresh = Savedvalues.getRefresh(getActivity());
	        String[] refreshStrings = getResources().getStringArray(R.array.refresh);
	        for (int i = 0; i < refreshStrings.length; i++) {
	            if (refreshStrings[i].equals(savedRefresh)) {
	                dropRefresh.setSelection(i);
	            }
	        }
	        // Load layer style
	        savedLayerstyle = Savedvalues.getLayerstlye(getActivity());
	        String[] layerstyleStrings = getResources().getStringArray(R.array.layer_style);
	        for (int i = 0; i < layerstyleStrings.length; i++) {
	            if (layerstyleStrings[i].equals(savedLayerstyle)) {
	            	dropLayerstyle.setSelection(i);
	            }
	        }
	        // Load align setting
	        savedAlign = Savedvalues.getAlign(getActivity());
	        String[] alignStrings = getResources().getStringArray(R.array.alignment);
	        for (int i = 0; i < alignStrings.length; i++) {
	            if (alignStrings[i].equals(savedAlign)) {
	            	dropAlign.setSelection(i);
	            }
	        }
	        // Load padding
	        savedPadding = Savedvalues.getPadding(getActivity());
	        String[] paddingStrings = getResources().getStringArray(R.array.padding);
	        for (int i = 0; i < paddingStrings.length; i++) {
	            if (paddingStrings[i].equals(savedPadding)) {
	            	dropPadding.setSelection(i);
	            }
	        }
	    }
		private void Save_entered_values_settings(View v) {
			
			// only write if something has changed
			Savedvalues saved_val = new Savedvalues(getActivity());
			
			if (!savedPlacement.equals(Edit_zoneid.getText().toString())) {
	            savedPlacement = Edit_zoneid.getText().toString();
	            Log.d("Edit_saved_placement=",savedPlacement);
	            saved_val.writeString(Savedvalues.KEY_PLACEMENT, savedPlacement);
	        }

	        if (!savedSize.equals(dropSize.getSelectedItem())) {
	            savedSize = (String) dropSize.getSelectedItem();
	            Log.d("Edit_saved_size=",savedSize);
	            saved_val.writeString(Savedvalues.KEY_SIZE, savedSize);
	        }
	        if (!savedRefresh.equals(dropRefresh.getSelectedItem())) {
	        	Log.d("Edit_saved_refresh=",savedRefresh);
	        	savedRefresh = (String) dropRefresh.getSelectedItem();
	            saved_val.writeString(Savedvalues.KEY_REFRESH, savedRefresh);
	        }
	        if (!savedLayerstyle.equals(dropLayerstyle.getSelectedItem())) {
	        	Log.d("Edit_saved_layer_style=",savedLayerstyle);
	        	savedLayerstyle = (String) dropLayerstyle.getSelectedItem();
	            saved_val.writeString(Savedvalues.KEY_LAYER_STYLE, savedLayerstyle);
	        }
	        if (!savedAlign.equals(dropAlign.getSelectedItem())) {
	        	Log.d("Edit_saved_align=",savedAlign);
	        	savedAlign = (String) dropAlign.getSelectedItem();
	            saved_val.writeString(Savedvalues.KEY_ALIGN, savedAlign);
	        }
	        if (!savedPadding.equals(dropPadding.getSelectedItem())) {
	        	Log.d("Edit_saved_padding=",savedPadding);
	        	savedPadding = (String) dropPadding.getSelectedItem();
	            saved_val.writeString(Savedvalues.KEY_PADDING, savedPadding);
	        }
	        // Apply the change made to the shared preference
	        saved_val.applyChanges();
		}	
}
