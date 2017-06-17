package com.adserversdk.dj.sdk.mtrack;

import android.util.Log;
import android.widget.EditText;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

public class ExternalIP  {
        EditText ip;
        EditText aip;
  
    
    public String getAndroidIP () {
            try {
                for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements();) {
                    NetworkInterface intf = en.nextElement();
                    for (Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses(); enumIpAddr.hasMoreElements();) {
                        InetAddress inetAddress = enumIpAddr.nextElement();
                        if (!inetAddress.isLoopbackAddress()) {
                            //return inetAddress.getHostAddress().toString();
                            return inetAddress.getHostAddress();
                        }
                    }
                }
            } catch (SocketException ex) {
                Log.i("externalip", ex.toString());
            }
            return null;
    }
    
    public void dispAndroidIP () {
        String andIP;
        aip.setText("Please wait...");
        andIP = getAndroidIP();
        if (andIP==null) {
                aip.setText("Error");
        } else {
                aip.setText(andIP);
        }
        
        
        
    }
    public String getCurrentIP () {
       
        try {
                HttpClient httpclient = new DefaultHttpClient();
                HttpGet httpget = new HttpGet("http://www.whatismyip.org/");
                // HttpGet httpget = new HttpGet("http://whatismyip.everdot.org/ip");
                // HttpGet httpget = new HttpGet("http://whatismyip.com.au/");
                // HttpGet httpget = new HttpGet("http://www.whatismyip.org/");
                HttpResponse response;
                
                Log.d("External IP - Debug","Step1");
                
                response = httpclient.execute(httpget);
                
                //Log.i("externalip",response.getStatusLine().toString());
                
                Log.d("External IP - Debug","Step2");
                
                HttpEntity entity = response.getEntity();
                if (entity != null) {
                        long len = entity.getContentLength();
                        if (len != -1 && len < 1024) {
                                String str=EntityUtils.toString(entity);
                                //Log.i("externalip",str);
                                
                                Log.d("External IP - Debug","Step3");
                                
                                return str;
                                
                        } else {
                               // ip.setText("Response too long or error.");
                                //debug
                                //ip.setText("Response too long or error: "+EntityUtils.toString(entity));
                                //Log.i("externalip",EntityUtils.toString(entity));
                        	Log.d("External IP - Debug","Step4");
                        	return "";
                        }            
                } else {
                        //ip.setText("Null:"+response.getStatusLine().toString());
                	Log.d("External IP - Debug","Step5");
                	return "";
                }
            
        }
        catch (Exception e)
        {
           //ip.setText("Error");
        	Log.d("External IP - Debug","Step6");
        	return "";
        }

    }
}

