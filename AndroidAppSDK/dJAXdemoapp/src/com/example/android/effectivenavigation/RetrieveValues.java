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

public class RetrieveValues {
    private String placementId;
    private String size;
    private String refresh;
    private String padding;
    private String align;
    private String layer_style;
    private int width, height;

    public String getPlacementId() {
        return placementId;
    }
  
	public void setPlacementId(String placementId) {
        this.placementId = placementId;
    }
    
    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
        parseSize();
    }
    
    public String getRefresh() {
        return refresh;
    }
    
    public void setRefresh(String refresh) {
        this.refresh = refresh;
    }
    
    public String getLayer_style() {
		return layer_style;
	}

	public void setLayer_style(String layer_style) {
		this.layer_style = layer_style;
	}
	
	public String getAlign() {
		return align;
	}

	public void setAlign(String align) {
		this.align = align;
	}
    
    public String getPadding() {
        return padding;
    }
    
    public void setPadding(String padding) {
        this.padding = padding;
    }

    public static RetrieveValues RetrieveValuesFromSavedvalues(Context context) {
    	RetrieveValues rvalues 	= new RetrieveValues();
    	rvalues.placementId 	= Savedvalues.getPlacementId(context);
    	rvalues.size 			= Savedvalues.getSize(context);
    	rvalues.parseSize();
    	rvalues.refresh 		= Savedvalues.getRefresh(context);
    	rvalues.layer_style 	= Savedvalues.getLayerstlye(context);
    	rvalues.align			= Savedvalues.getAlign(context);
    	rvalues.padding 		= Savedvalues.getPadding(context);
    	
        return rvalues;
    }

    //format converters
    public int getRefreshPeriod() {
        if (refresh.equals("Off"))
            return 0;
        else {
        	return (1000 * Integer.parseInt(refresh.replace(" seconds", "")));
        }
    }

    private void parseSize() {
        String[] dimens = size.split("x");
        try {
            width = Integer.parseInt(dimens[0]);
            height = Integer.parseInt(dimens[1]);
        } catch (NumberFormatException e) {
            width = 0;
            height = 0;
        }
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }
}