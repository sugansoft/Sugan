/*
 *    Copyright 2013 APPNEXUS INC
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

package com.example.android.effectivenavigation;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
public class Savedvalues {
	public static final String MyPREFERENCES 	= "MyPrefs" ;
    public static final String KEY_PLACEMENT 	= "PLACEMENT";
    public static final String KEY_SIZE 		= "SIZE";
    public static final String KEY_REFRESH 		= "REFRESH";
    public static final String KEY_LAYER_STYLE	= "LAYER_STYLE";
    public static final String KEY_ALIGN		= "ALIGN";
    public static final String KEY_PADDING		= "PADDING";

    // default values for all the settings
    public static final String DEF_PLACEMENT 	= "71";
    public static final String DEF_SIZE 		= "468x60";
    public static final String DEF_REFRESH 		= "0";
    public static final String DEF_LAYER_STYLE	= "geocities";
    public static final String DEF_ALIGN		= "left";
    public static final String DEF_PADDING		= "2";

    private SharedPreferences.Editor editor;

    public Savedvalues(Context context) {
        editor = getPreferences(context).edit();
    }

    private static SharedPreferences getPreferences(Context context) {
        return context.getApplicationContext().getSharedPreferences(
        		MyPREFERENCES, Context.MODE_PRIVATE);
    }

    public static String getString(Context context, String key, String def) {
       return getPreferences(context).getString(key, def);
    }

    public void writeString(String key, String value) {
        editor.putString(key, value);
    }

    public static int getInt(Context context, String key, int def) {
        return getPreferences(context).getInt(key, def);
        
    }

    public void writeInt(String key, int value) {
        editor.putInt(key, value);
    }

    public static boolean getBoolean(Context context, String key, boolean def) {
        return getPreferences(context).getBoolean(key, def);
        
    }

    public void writeBoolean(String key, boolean value) {
        editor.putBoolean(key, value);
    }

    public static long getLong(Context context, String key, long def) {
        return getPreferences(context).getLong(key, def);
        
    }
	public void applyChanges() {
        editor.commit();
    }

    public static String getPlacementId(Context context) {
    	return getString(context, Savedvalues.KEY_PLACEMENT, Savedvalues.DEF_PLACEMENT);
    }

    public static String getSize(Context context) {
        return getString(context, Savedvalues.KEY_SIZE, Savedvalues.DEF_SIZE);
    }

    public static String getRefresh(Context context) {
        return getString(context, Savedvalues.KEY_REFRESH, Savedvalues.DEF_REFRESH);
    }
    public static String getLayerstlye(Context context) {
        return getString(context, Savedvalues.KEY_LAYER_STYLE, Savedvalues.DEF_LAYER_STYLE);
    }
    public static String getAlign(Context context) {
    	return getString(context, Savedvalues.KEY_ALIGN, Savedvalues.DEF_ALIGN);
    }
    public static String getPadding(Context context) {
    	return getString(context, Savedvalues.KEY_PADDING, Savedvalues.DEF_PADDING);
    }
}
