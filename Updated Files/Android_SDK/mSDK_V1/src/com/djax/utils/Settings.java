package com.djax.utils;

import android.os.Build;

import java.util.Locale;
import java.util.TimeZone;

public class Settings {
    public String hidmd5 = null;
    public String hidsha1 = null;
    public String carrierName = null;

    public final String deviceMake = Build.MANUFACTURER;
    public final String deviceModel = Build.MODEL;

    public String app_id = null;

    public boolean test_mode = false;
    public String ua = null;
    public boolean first_launch;
    public final String sdkVersion = "1.8";

    public String mcc;
    public String mnc;
    public final String dev_timezone = TimeZone.getDefault().getID();
    public final String language = Locale.getDefault().getLanguage();

    public final int HTTP_CONNECTION_TIMEOUT = 15000;
    public final int HTTP_SOCKET_TIMEOUT = 20000;

    public final int FETCH_THREAD_COUNT = 4;

    public final int MIN_REFRESH_MILLISECONDS = 15000;





    // STATICS
    private static Settings settings_instance = null;

    public static Settings getSettings() {
        if (settings_instance == null) {
            settings_instance = new Settings();
            Cdlog.v(Cdlog.baseLogTag, "The Msdk " + Cdlog.baseLogTag
                    + " is initializing.");
        }
        return settings_instance;
    }

    private Settings() {

    }

}
