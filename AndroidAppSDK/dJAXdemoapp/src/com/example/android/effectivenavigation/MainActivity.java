package com.example.android.effectivenavigation;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import com.djax.utils.Cdlog;
import com.djax.utils.CdlogListener;

import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.app.AlertDialog;
import android.app.FragmentTransaction;
import android.app.ProgressDialog;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

@SuppressLint({ "NewApi", "SimpleDateFormat" })
public class MainActivity extends FragmentActivity implements ActionBar.TabListener, OnButtonPressListener  {
	
    App mApp;
    ViewPager mVP;
    
    String Preview_Fragment;
    String RequestFragment;
    
    private AlertDialog logDialog, progressDialog;
    
    private boolean isShowingLogs;
	
	public void setPreview_Fragment(String t){
		Log.d("Preview Fragment set",t);
		Preview_Fragment = t;
	}
	
	public String getPreview_Fragment(){
		return Preview_Fragment;
	}
	
	public void setRequestFragment(String s){
		Log.d("Request Fragment set",s);
		RequestFragment = s;
	}
	
	public String getRequestFragment(){
		return RequestFragment;
	}
	
	public void onButtonClicked() { 
		mVP.setCurrentItem(1);
	}
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.my_activity_main);
        
       Cdlog.d("Test debug","testr");
       
       //System.out.println(String.format(getString(R.string.fetch_url), "Test url"));
       
      // Cdlog.d(Cdlog.httpReqLogTag,Cdlog.getString(R.string.fetch_url, "Test url"));
        
        mApp = new App(getSupportFragmentManager());
        
        final ActionBar actionBar = getActionBar();

        actionBar.setHomeButtonEnabled(true);

        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);
        
        //actionBar.setDisplayShowTitleEnabled(false);
        
        mVP = (ViewPager) findViewById(R.id.pager);
        mVP.setAdapter(mApp);
        mVP.setOnPageChangeListener(new ViewPager.SimpleOnPageChangeListener() {
            @Override
            public void onPageSelected(int position) {
            	
            	//Hide the keypad on selecting another page
            	InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(mVP.getApplicationWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
         
                actionBar.setSelectedNavigationItem(position);
            }
        });
        
        for (int i = 0; i < mApp.getCount(); i++) {
            actionBar.addTab(
                    actionBar.newTab()
                            .setText(mApp.getPageTitle(i))
                            .setTabListener(this));
        }
        
        Log.d("Listener","Called register listener");
        Cdlog.registerListener(logTabClogListener);
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        Cdlog.v(Constants.BASE_LOG_TAG, "App paused");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (logDialog != null)
            logDialog.dismiss();
        if (progressDialog != null)
            progressDialog.dismiss();
        Cdlog.unregisterListeners(logTabClogListener);
        Cdlog.v(Constants.BASE_LOG_TAG, "App destroyed");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Cdlog.v(Constants.BASE_LOG_TAG, "App resumed");
//        checkToUploadLogFile();
    }
    
    

    @Override
    public void onTabUnselected(ActionBar.Tab tab, FragmentTransaction fragmentTransaction) {
    }

    @Override
    public void onTabSelected(ActionBar.Tab tab, FragmentTransaction fragmentTransaction) {
        mVP.setCurrentItem(tab.getPosition());
        
       
        
        Log.d("Tab Debug","Selected tab"+tab.getPosition());
        
        switch(tab.getPosition()){
        case 0:
        	Log.d("Selected Tab","Settings Tab");
        	break;
        case 1:
        	Log.d("Selected Tab","Preview Tab");
        	break;
        case 2:
        	Log.d("Selected Tab","Request Tab");
        	
        	//String TabOfRequestFragment = this.getRequestFragment();
			
        	  String TabOfRequestFragment = this.getRequestFragment();
        	   
        	   RequestFragment reqFragment = (RequestFragment)this.
        	     getSupportFragmentManager()
        	     .findFragmentByTag(TabOfRequestFragment);

        	   if(reqFragment == null){
        		   Log.d("Request fragment","It is empty");
        	   }else{
        		   Log.d("Request fragment","It is not empty");
        	   }
        	   
        	   reqFragment.displayRequestUrl();       
        	
        	
        	break;	
        }
        
    }

    @Override
    public void onTabReselected(ActionBar.Tab tab, FragmentTransaction fragmentTransaction) {
    }
    
    public static class App extends FragmentPagerAdapter {

        public App(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int i) {
        	switch (i) {
            case 0: return new Settings_Fragment();
            case 1: return new Preview_Fragment();
            case 2: return new RequestFragment();
            default:
              return new Settings_Fragment();
        	}
        }

        @Override
        public int getCount() {
            return 3;
        }

        @Override
        public CharSequence getPageTitle(int position) {
        	switch (position) {
            case 0: return "Settings";
            case 1: return "Preview";
            case 2: return "Req/Res";
            default: return "Section " + (position + 1);
        	}
        }
    }  
    	
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu items for use in the action bar
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main_activity_actions, menu);
        return super.onCreateOptionsMenu(menu);
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle presses on the action bar items
        switch (item.getItemId()) {
            case R.id.action_search:
                showLogDialog();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
    public void select_preview_mode(View view)
    {       
    	//mApp = new App(getSupportFragmentManager());
        final ActionBar actionBar = getActionBar();
        actionBar.setHomeButtonEnabled(true);
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);
        mVP = (ViewPager) findViewById(R.id.pager);
        mVP.setAdapter(mApp);
        mVP.setCurrentItem(1);
    }
    
    /*********
     * Shows the log dialog and also display the logs for the sample app
     * 
     */
    
    public void showLogDialog(){
    	if(!isShowingLogs){
    		progressDialog = ProgressDialog.show(MainActivity.this, null, " Please wait...Loading Logs", true,false);
    		
    		readFromLogFile();
    		isShowingLogs = true;
    	}
    }
    
    /***
     * CdlogListener for log screen
     * 
     */
    final CdlogListener logTabClogListener = new CdlogListener(){
    	
    	@Override
    	public void onReceiveMessage(LOG_LEVEL level,String LogTag, String message){
    		Log.d("Inside Receive Message","Inside the receive message");
    		writetoLogFile(buildBasicLogMessage(level,LogTag,message));
    	}
    	
    	@Override
    	public void onReceiveMessage(LOG_LEVEL level,String LogTag, String message, Throwable tr){
    		Log.d("Inside Receive Message","Inside the receive message tr");
    		String msgwithTr = buildBasicLogMessage(level, LogTag, message);
    		
    		StringBuilder trSb = new StringBuilder();
    		StackTraceElement[] trElements = tr.getStackTrace();
    		
    		for(StackTraceElement e: trElements){
    			trSb.append(e.toString()).append("\n");
    		}
    			
    		msgwithTr = msgwithTr + trSb.toString();
    		
    		writetoLogFile(msgwithTr);
    	}
    	
    	@Override
    	public LOG_LEVEL getLogLevel(){
    		return LOG_LEVEL.V;
    	}
    	
    	private String buildBasicLogMessage(LOG_LEVEL level, String LogTag, String message){
    		Log.d("Inside buildbasic","Inside Buildbasic");
    		
    		int pid = android.os.Process.myPid();
    		
    		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS:");
    		String dateString = formatter.format(new Date());
    		
    		String messageFormat = "%s (%d) %s%s  %s";
    		
    		return String.format(messageFormat, dateString, pid, level, LogTag, message);
    	}
    	
    	
    };
    
    /***
     * Log File management code
     * 
     */
    
    synchronized public void writetoLogFile(String message){
    	PrintWriter out = null;
    	try{
    		out = new PrintWriter(openFileOutput(Constants.LOG_FILENAME, Context.MODE_APPEND));
    		//System.out.println("Inside wite file"+message);
    		Log.d("Inside write log file",message);
    		out.println(message);
    	} catch(IOException e){
    		Log.e("Base Log", e.getMessage());
    	} finally{
    		if(out != null)
    			out.close();
    	}
    }
    
    /***
     * Reads the logs from the file
     */
    synchronized public void readFromLogFile()
    {
    	Cdlog.d("MSDK debug", "Reading from log file");
    	
    	ReadLogFileTask task = new ReadLogFileTask();
    	
    	if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB){
    		task.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    	}else{
    		task.execute();
    	}
    }
    
    /***
     * Clears the Log 
     */
    synchronized public void clearLogFile(){
    	PrintWriter out = null;
    	try{
    		out = new PrintWriter(openFileOutput(Constants.LOG_FILENAME, Context.MODE_PRIVATE));
    		out.write("");
    		Cdlog.d(Constants.BASE_LOG_TAG,"Log files are cleared");
    	}catch (IOException e){
    		Cdlog.e(Constants.BASE_LOG_TAG, "IOException on clearing of log file",e);
    	}finally {
    		if(out !=null)
    			out.close();
    	}
    }
    
    
    
    /***
     * Read the logs asynchronously
     */
    
    private class ReadLogFileTask extends AsyncTask<Void, Void, ArrayList<String>> {
    	
    	@Override
    	protected ArrayList<String> doInBackground(Void...voids){
    		int count =0;
    		ArrayList<String> logs = new ArrayList<String>(Constants.LOG_MAX_LINES);
    		
    		BufferedReader in = null;
    		
    		try{
    			in = new BufferedReader(new FileReader(getFilesDir() + "/"+Constants.LOG_FILENAME));
    			
    			String storedMessages;
    			
    			while((count < Constants.LOG_MAX_LINES) && ((storedMessages = in.readLine()) != null)){
    				logs.add(storedMessages + "\n");
    				count++;
    			}
    		}catch(IOException io){
    			Cdlog.e(Constants.BASE_LOG_TAG, "IOException on reading the log file",io);
    		}finally{
    			if(in !=null)
    				try{
    					in.close();
    				}catch(IOException io){
    					Cdlog.e(Constants.BASE_LOG_TAG,"IOException on closing the log input stram file",io);
    				}
    		}
    		return logs;
    	}
    	
    	/***
    	 * Creates the log file to display the logs
    	 */
    	
    	@Override
    	protected void onPostExecute(ArrayList<String> logs){
    		super.onPostExecute(logs);
    		
    		final StringBuilder sb = new StringBuilder();
    		
    		for(int i = logs.size() - 1;
    				(sb.length()< Constants.LOG_MAX_CHAR) && (i > -1); i--){
    			sb.append(logs.get(i));
    		}
    		
    		RelativeLayout dialogLayout = (RelativeLayout) getLayoutInflater().inflate(R.layout.dialog_log, null);
    		View frame = dialogLayout.findViewById(R.id.frame);
    		TextView txtAppLogs = (TextView) frame.findViewById(R.id.log_txt_applogs);
    		Log.d("Sb string",sb.toString());
    		
    		txtAppLogs.setText(sb.toString());
    		Button btn = (Button) dialogLayout.findViewById(R.id.log_btn_email);
    		btn.setOnClickListener(new OnClickListener() {
				
				@Override
				public void onClick(View arg0) {
					// TODO Auto-generated method stub
					try{
						Intent emailIntent = new Intent(Intent.ACTION_SEND);
						emailIntent.setType("message/rfc822");
						emailIntent.putExtra(Intent.EXTRA_TEXT, sb.toString());
						
						startActivity(Intent.createChooser(emailIntent, "Choose the app for sending debug information"));
					}catch(ActivityNotFoundException e){
						Toast.makeText(MainActivity.this, "No E-mail App Installed", Toast.LENGTH_LONG).show();
					}
				}
			});
    		
    		if(progressDialog !=null)
    			progressDialog.cancel();
    		
    		logDialog = new AlertDialog.Builder(MainActivity.this)
    					.setView(dialogLayout)
    					.setOnCancelListener(logOnCancel)
    					.show();
    		
    	}
    }
    
    /**
     * Dialog interface for cancelling of logs
     */
    
    final DialogInterface.OnCancelListener logOnCancel = new DialogInterface.OnCancelListener() {
		
		@Override
		public void onCancel(DialogInterface dialog) {
			// TODO Auto-generated method stub
			isShowingLogs = false;
			//TODO remove this
			clearLogFile();
		}
	};
}