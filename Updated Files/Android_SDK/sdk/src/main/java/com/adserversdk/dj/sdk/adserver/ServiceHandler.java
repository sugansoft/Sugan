package com.adserversdk.dj.sdk.adserver;

import android.util.Log;

import com.adserversdk.dj.sdk.utils.Cdlog;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;


public class ServiceHandler {

	static String response = null;
	public final static int GET = 1;
	public final static int POST =2;
	
	public ServiceHandler() {
		
		// TODO Auto-generated constructor stub
	}
/*
	List<Pair<String, String>> params = new ArrayList<>();
	params.add(new Pair<>("username", username));
	params.add(new Pair<>("password", password));
	 */
	/**
	 * Making service call
	 * @url - url to make request
	 * @method - http request method
	 */
	public String makeServiceCall(AdRequestParam reqObj, int method){
		return this.makeServiceCall(reqObj,method, null);
	}
	
	/**
     * Making service call
     * @url - url to make request
     * @method - http request method
     * @params - http request params
     * */
	public String makeServiceCall(AdRequestParam reqObj,int method,List<NameValuePair> params){

		List<NameValuePair> hParams = null;
		
		try{
			
			String url = AdRequestParam.getURL();
			
			//http client
			DefaultHttpClient httpClient = new DefaultHttpClient();
			HttpEntity httpEntity = null;
			HttpResponse httpResponse = null;
			
			//checking http request method type
			if(method == POST){
				HttpPost httpPost = new HttpPost();
				//adding post params
				if(params != null){
					httpPost.setEntity(new UrlEncodedFormEntity(params));
				}
				httpResponse = httpClient.execute(httpPost);
			}else if(method == GET){
				//appending params to url

				params = AdRequestParam.getURL_PARAMS();

				if(params != null){
					String paramString = URLEncodedUtils.format(params,"utf-8");
					url += "?" + paramString;
				}

				HttpGet httpGet = new HttpGet(url);

				// SET HEADERS PARAMETERS

				hParams = AdRequestParam.getHEADER_PARAMS();

				for (NameValuePair nvp : hParams) {
				    String name = nvp.getName();
				    String value = nvp.getValue();
				    Cdlog.d(Cdlog.httpReqLogTag,name+"=>"+value);
				    httpGet.setHeader(name,value);
				}

				httpResponse = httpClient.execute(httpGet);
			}
			
			Cdlog.d(Cdlog.httpReqLogTag,url);
			Cdlog.setLastRequest(url);
			
			httpEntity = httpResponse.getEntity();
			response = EntityUtils.toString(httpEntity);
			
			Cdlog.d(Cdlog.httpResLogTag,response);
			Cdlog.setLastResponse(response);
			
		} catch (UnsupportedEncodingException e){
			Log.d("Unsupported Encode Expt",e.getMessage());
			e.printStackTrace();
		} catch (ClientProtocolException e){
			Log.d("Client Protocol Exptn",e.getMessage());
			e.printStackTrace();
		} catch (IOException e){
			Log.d("IO Exception",e.getMessage());
			e.printStackTrace();
		} catch(SecurityException e){
			Log.d("Security Exception",e.getMessage());
			//response = e.getMessage();
			e.printStackTrace();
			
			
		}
		
		return response;
	}
}
