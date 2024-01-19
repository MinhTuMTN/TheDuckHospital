package com.example.theduckmobile;


import android.content.Context;
import android.content.SharedPreferences;


public class SharedPreferenceManager {
    public static final String THE_DUCK_FOOD_REFERENCE_NAME = "TheDuckMobile";
    public static final String AUTH_TOKEN_KEY = "authToken";
    public static final String USER_PROFILE_FCM_TOKEN_KEY = "fcmToken";

    private final Context context;
    SharedPreferences sharedPreferences = null;

    public SharedPreferenceManager(Context context) {
        this.context = context;
        if (sharedPreferences == null)
            sharedPreferences = context.getSharedPreferences(
                    THE_DUCK_FOOD_REFERENCE_NAME, Context.MODE_PRIVATE);
    }

    public void clear() {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.apply();
    }


    public String getStringValue(String key) {
        return sharedPreferences.getString(key, null);
    }

    public void setStringValue(String key, String value) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.apply();
    }

    public void setLongValue(String key, Long value) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putLong(key, value);
        editor.apply();
    }

    public float getFloatValue(String key) {
        return sharedPreferences.getFloat(key, 0f);
    }

    public boolean getBooleanValue(String key) {
        return sharedPreferences.getBoolean(key, false);
    }

    public Long getLongValue(String key) {
        return sharedPreferences.getLong(key, 0L);
    }

}
